import {
  takeOrReplenish,
  reverseMapFromMap,
  includes,
  pick,
  isNil
} from "utility";
import {
  transformMessage,
  transformReaction,
  transformOutgoingMessage
} from "components/DiscordMock/transform";
import { omit } from "lodash";
import { generateName } from "utility/string";

// ? ==========================
// ? User creation utilities
// ? ==========================

// Provisions discriminators to mock users, ensuring collisions don't occur
// unless the internal pool becomes depleted
class DiscriminatorProvisioner {
  constructor(max) {
    this.max = max;
    this.templatePool = {};
    for (let i = 0; i < max; ++i) {
      this.templatePool[i] = i;
    }
    this.currentPool = { ...this.templatePool };
  }

  // Attempts to provision the seed discriminator, trying each other discriminator
  // while increasing the current one (wrapping around), optionally until all
  // have been checked. At that point, the pool is replenished.
  provision(seed) {
    return takeOrReplenish(
      this.currentPool,
      seed % this.max,
      key => (key + 1) % this.max,
      this.templatePool
    );
  }
}

const discriminatorMax = 5;
const discriminatorProvisioner = new DiscriminatorProvisioner(discriminatorMax);

export const autBotUser = {
  clientId: 448546825532866560,
  avatarHash: "b2979364dd5230ac3dc7ea98cb35a02c",
  discriminator: 7145,
  username: "aut-bot",
  nameColor: "#d34c4f",
  bot: true
};

// Username colors of the default avatar users
export const colors = ["#7e95e5", "#a0adbc", "#43B581", "#FAA61A", "#ef5b5b"];
// Generates a mock user with a random client Id, discriminator, and username
export function createMockUser(guildId) {
  const mockClientId = parseInt(guildId) % 100;
  const mockDiscriminator = discriminatorProvisioner.provision(mockClientId);
  const mockNameColor = colors[mockDiscriminator];
  const mockUsername = generateName();
  return {
    clientId: mockClientId,
    username: mockUsername,
    nameColor: mockNameColor,
    discriminator: mockDiscriminator,
    bot: false
  };
}

// Creates the accompanying fake webhook user for a given real user
export function makeFakeWebhookUser(baseUser) {
  return {
    ...baseUser,
    clientId: baseUser.clientId + 1,
    nameColor: "white",
    bot: true
  };
}

// ? ==========================
// ? Message handling utilities
// ? ==========================

// Controls unique ID provisioning (also only uses even numbers)
export class IdProvisioner {
  constructor() {
    this.internalCount = 0;
  }

  provision() {
    return 2 * ++this.internalCount;
  }
}

// Converts message data to its websocket message format
export function serializeOutgoingMessage({
  content = "",
  messageId,
  guildId,
  allowedCommands = [],
  addedReactions = [],
  removedReactions = [],
  silent = false
}) {
  return {
    content: content === "" ? null : transformOutgoingMessage(content),
    message_id: messageId,
    guild_id: guildId,
    added_reactions: addedReactions,
    removed_reactions: removedReactions,
    allowed_commands: allowedCommands,
    silent
  };
}

// Whether two messsage clumps should be merged together (same sender/AMPM)
export function shouldMergeClumps(a, b) {
  return (
    a.sender.clientId === b.sender.clientId &&
    a.timestamp.getHours() === b.timestamp.getHours() &&
    a.timestamp.getMinutes() === b.timestamp.getMinutes()
  );
}

// Performs a clump merge, keeping the clump metadata of the first clump
export function mergeClumps(a, b) {
  return {
    // Keep clump A's other properties
    ...a,
    messages: [...a.messages, ...b.messages]
  };
}

// ? ==========================
// ? State mutation functions
// ? ==========================

// Applies a client-side update to the message clumps list, optionally adding a
// new message if applicable
export function withAddedMessage({ clumps, message, thisUser, users }) {
  let newClumps = clumps;
  const {
    content,
    messageId,
    addedReactions,
    edit,
    sender,
    customTransformer
  } = message;
  const reactions = addedReactions.map(parseReaction);

  // Handle the specific message if parameters are valid
  if (!isNil(content) && !isNil(messageId)) {
    newClumps = handleMessage(
      newClumps,
      { content, edit, customTransformer, messageId, reactions, sender },
      { thisUser, users }
    );
  }

  // Handle all other reactions
  const otherReactions = filterReactionsById(
    reactions,
    id => id !== messageId,
    false
  );
  if (otherReactions.length > 0) {
    newClumps = addReactions(newClumps, otherReactions);
  }

  return newClumps;
}

// Applies a client-side update to the message clumps list, removing a message
export function withRemovedMessage({ clumps, messageId }) {
  const clumpIndex = containingClumpIndex(clumps, messageId);
  const removedClumps = updateClumps({
    clumps,
    shouldUpdateClump: (_clump, index) => index === clumpIndex,
    map: clump => ({
      ...clump,
      messages: clump.messages.filter(m => m.messageId !== messageId)
    })
  });
  return removedClumps.filter(clump => clump.messages.length > 0);
}

// Handles either a message add or edit
function handleMessage(
  clumps,
  { content, edit, messageId, reactions, sender, customTransformer },
  context
) {
  const messageReactions = filterReactionsById(
    reactions,
    id => id === messageId
  );
  const messageData = {
    content,
    messageId,
    reactions: messageReactions,
    sender,
    customTransformer
  };
  if (edit) {
    return editMessage(clumps, messageData, context);
  } else {
    return addMessage(clumps, messageData, context);
  }
}

// Adds the specific message with the given content, id, reactions, and sender
function addMessage(
  clumps,
  { content, customTransformer, messageId, reactions, sender },
  context
) {
  const message = constructMessage(
    { content, customTransformer, messageId, reactions },
    context
  );
  const newClump = createClump({ message, sender });
  return withAddedClump(clumps, newClump);
}

// Edits the specific message, setting its content and optionally updating its reactions
function editMessage(
  clumps,
  { content, customTransformer, messageId, reactions },
  context
) {
  const clumpIndex = containingClumpIndex(clumps, messageId);
  return updateMessages({
    clumps,
    shouldUpdateClump: (_clump, index) => clumpIndex === index,
    shouldUpdateMessage: message => message.messageId === messageId,
    map: message =>
      constructMessage(
        {
          content,
          messageId,
          customTransformer,
          reactions: mergeReactions(message.reactions, reactions)
        },
        context
      )
  });
}

// Adds each reaction in the list to its corresponding message
function addReactions(clumps, reactions) {
  const messageIdToContainingClumpMap = Object.assign(
    {},
    ...reactions.map(reaction => ({
      [reaction.targetId]: clumps.findIndex(clump =>
        includes(
          clump.messages,
          message => message.messageId === reaction.targetId
        )
      )
    }))
  );

  const clumpIndicesToMessageIdsMap = reverseMapFromMap(
    messageIdToContainingClumpMap,
    x => parseInt(x)
  );

  const dirtyClumps = Object.keys(clumpIndicesToMessageIdsMap).map(index =>
    parseInt(index)
  );

  return updateMessages({
    clumps,
    shouldUpdateClump: (_clump, index) => dirtyClumps.includes(index),
    shouldUpdateMessage: (_message, id, _clump, clumpIndex) =>
      clumpIndicesToMessageIdsMap[clumpIndex].includes(id),
    map: message => ({
      ...message,
      reactions: mergeReactions(
        message.reactions,
        reactions
          .filter(reaction => reaction.targetId === message.messageId)
          .map(reaction =>
            pick(reaction, ["emoji", "rawEmoji", "number", "userHasReacted"])
          )
      )
    })
  });
}

// Applies a client-side update to the reactions of a specific message
export function withUpdatedReaction({
  clumps,
  clumpIndex,
  messageId,
  reaction,
  number = 1,
  userHasReacted = false
}) {
  return updateReactions({
    clumps,
    shouldUpdateClump: (_clump, index) => index === clumpIndex,
    shouldUpdateMessage: message => message.messageId === messageId,
    shouldUpdateReaction: r => r === reaction,
    map: r => ({
      ...r,
      userHasReacted,
      number: typeof number === "function" ? number(r.number) : number
    })
  });
}

// Parses a reaction from its network equivalent to the internal representation
function parseReaction(reaction) {
  return {
    emoji: transformReaction(reaction[1]),
    rawEmoji: reaction[1],
    number: 1,
    userHasReacted: false,
    targetId: reaction[0]
  };
}

// Converts a reaction to its network representation
export function serializeReaction(messageId, reaction) {
  return [messageId, reaction.rawEmoji];
}

// Filters a list of reactions by using an id filter predicate function, removing
// the targetId tag in the process
function filterReactionsById(reactions, idFilter, removeTag = true) {
  const filtered = reactions.filter(r => idFilter(r.targetId));
  return removeTag ? filtered.map(r => omit(r, ["targetId"])) : filtered;
}

// Initializes a new clump with a single message
function createClump({ message, sender }) {
  return {
    timestamp: new Date(),
    sender,
    messages: [message]
  };
}

// Adds a clump to the end of the clumps array, merging if neccessary
function withAddedClump(clumps, newClump) {
  if (clumps.length > 0) {
    const lastClump = clumps[clumps.length - 1];
    if (shouldMergeClumps(lastClump, newClump)) {
      const otherClumps = clumps.slice(0, -1);
      return [...otherClumps, mergeClumps(lastClump, newClump)];
    }
  }
  // Default: return with the new clump appended
  return [...clumps, newClump];
}

// Finds the index of the clump contanining the message with the given id
function containingClumpIndex(clumps, messageId) {
  return clumps.findIndex(clump =>
    includes(clump.messages, message => message.messageId === messageId)
  );
}

// Constructs a message object with the given content, reactions, and id
function constructMessage(
  { content, customTransformer, reactions, messageId },
  { thisUser, users }
) {
  // Transform the message to its display form
  const { result, mentions } = transformMessage(
    content,
    {
      users,
      clientId: thisUser.clientId
    },
    customTransformer
  );
  return {
    content: result,
    reactions,
    mentionsUser: mentions.includes(thisUser.clientId),
    messageId
  };
}

// Merges the two lists of reactions, merging old ones with ones from the new list
// if they match the same emoji
function mergeReactions(prevReactions, newReactions) {
  let baseReactionList = [...(!isNil(prevReactions) ? prevReactions : [])];
  for (let newReactionIndex in newReactions) {
    const newReaction = newReactions[newReactionIndex];
    const prevReaction = baseReactionList.find(
      reaction => reaction.emoji === newReaction.emoji
    );
    if (!isNil(prevReaction)) {
      // reaction is already included, merge
      const prevReactionIndex = baseReactionList.indexOf(prevReaction);
      baseReactionList[prevReactionIndex] = {
        ...prevReaction,
        newReaction
      };
    } else {
      baseReactionList.push(newReaction);
    }
  }
  return baseReactionList;
}

// ? ==========================
// ? State mutation utilities
// ? ==========================

// Performs an immutable deep update of the message clumps state object
function updateClumps({ clumps, shouldUpdateClump, map }) {
  return clumps.map((clump, index) =>
    shouldUpdateClump(clump, index) ? map(clump, index) : clump
  );
}

// Performs an immutable deep update of the message clumps state object, allowing
// for the update of specific messages that satisfy the given predicates
function updateMessages({
  clumps,
  shouldUpdateClump,
  shouldUpdateMessage,
  map
}) {
  return updateClumps({
    clumps,
    shouldUpdateClump,
    map: (clump, index) => ({
      ...clump,
      messages: clump.messages.map((message, messageIndex) =>
        shouldUpdateMessage(message, messageIndex, clump, index)
          ? map(message, messageIndex, clump, index)
          : message
      )
    })
  });
}

// Performs an immutable deep update of the message clumps state object, allowing
// for the update of specific reactions that satisfy the given predicates
function updateReactions({
  clumps,
  shouldUpdateClump,
  shouldUpdateMessage,
  shouldUpdateReaction,
  map
}) {
  return updateMessages({
    clumps,
    shouldUpdateClump,
    shouldUpdateMessage,
    map: (message, messageIndex, clump, index) => ({
      ...message,
      reactions: message.reactions.map((r, rIndex) =>
        shouldUpdateReaction(r, rIndex, message, messageIndex, clump, index)
          ? map(r, rIndex, message, messageIndex, clump, index)
          : r
      )
    })
  });
}

// ? ==========================
// ? Extension class definition
// ? ==========================

export class Extension {
  constructor(context, commands) {
    Object.assign(this, context, commands);
  }
  destruct() {}
  onSend() {
    return true;
  }
}
