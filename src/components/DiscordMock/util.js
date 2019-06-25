import {
  takeOrReplenish,
  reverseMapFromMap,
  includes,
  pick,
  isNil
} from "../../util";
import { transformMessage, transformReaction } from "./transform";

export const colors = ["#7e95e5", "#a0adbc", "#43B581", "#FAA61A", "#ef5b5b"];
export const autBotUser = {
  clientId: 448546825532866560,
  avatarHash: "b2979364dd5230ac3dc7ea98cb35a02c",
  discriminator: 7145,
  username: "aut-bot",
  nameColor: "#d34c4f",
  bot: true
};
export const makeEmojiResponseUser = baseUser => ({
  ...baseUser,
  clientId: baseUser.clientId + 1,
  nameColor: "white",
  bot: true
});

const discriminators = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 };
let discriminatorPool = { ...discriminators };
export const nextDiscriminator = clientId => {
  return takeOrReplenish(
    discriminatorPool,
    clientId % 5,
    key => (key + 1) % 5,
    discriminators
  );
};

export const shouldMergeClumps = (previousClump, nextClump) => {
  const { timestamp: prev } = previousClump;
  const { timestamp: next } = nextClump;
  return (
    !isNil(prev) &&
    !isNil(next) &&
    previousClump.sender.clientId === nextClump.sender.clientId &&
    prev.getHours() === next.getHours() &&
    prev.getMinutes() === next.getMinutes()
  );
};

export const mergeClumps = (prev, next) => ({
  ...prev,
  messages: [...prev.messages, ...next.messages]
});

export const addReactions = (clumps, reactions) => {
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

  const doesClumpNeedUpdating = index => dirtyClumps.includes(index);

  const doesMessageNeedUpdating = (clumpIndex, id) =>
    clumpIndicesToMessageIdsMap[clumpIndex].includes(id);

  const applyReactions = (prevReactions, newReactions) => {
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
  };

  const updatedClumps = clumps.map((clump, clumpIndex) =>
    doesClumpNeedUpdating(clumpIndex)
      ? {
          ...clump,
          messages: clump.messages.map(message =>
            doesMessageNeedUpdating(clumpIndex, message.messageId)
              ? {
                  ...message,
                  reactions: applyReactions(
                    message.reactions,
                    reactions
                      .filter(
                        reaction => reaction.targetId === message.messageId
                      )
                      .map(reaction =>
                        pick(reaction, ["emoji", "number", "userHasReacted"])
                      )
                  )
                }
              : message
          )
        }
      : clump
  );

  return updatedClumps;
};

export const updateReaction = (
  clumps,
  clumpIndex,
  messageId,
  reaction,
  transformNumber,
  userHasReacted
) => ({
  clumps: clumps.map((clump, index) =>
    index === clumpIndex
      ? {
          ...clump,
          messages: clump.messages.map(message =>
            message.messageId === messageId
              ? {
                  ...message,
                  reactions: message.reactions.map(r =>
                    r === reaction
                      ? {
                          ...r,
                          userHasReacted,
                          number: transformNumber(r.number)
                        }
                      : r
                  )
                }
              : message
          )
        }
      : clump
  )
});

export const addMessage = (messageData, clumps, thisUser, users) => {
  console.log({ messageData, clumps, thisUser, users });
  const { content, id, reactions, sender } = messageData;
  const { result, mentions } = transformMessage(content, users);
  const clump = {
    timestamp: new Date(),
    sender,
    messages: [
      {
        content: result,
        reactions: !isNil(reactions)
          ? reactions
              .filter(r => !isNil(r) && r[0] === id)
              .map(r => ({
                emoji: transformReaction(r[1]),
                number: 1,
                userHasReacted: false
              }))
          : undefined,
        mentionsUser: mentions.includes(thisUser.clientId),
        messageId: id
      }
    ]
  };

  let newClumps;
  if (clumps.length > 0) {
    const lastClump = clumps[clumps.length - 1];
    if (shouldMergeClumps(lastClump, clump)) {
      const otherClumps = clumps.slice(0, -1);
      newClumps = [...otherClumps, mergeClumps(lastClump, clump)];
    }
  }
  if (isNil(newClumps)) newClumps = [...clumps, clump];

  const otherReactions = !isNil(reactions)
    ? reactions
        .filter(r => !isNil(r) && r[0] !== id)
        .map(r => ({
          emoji: transformReaction(r[1]),
          number: 1,
          userHasReacted: false,
          targetId: r[0]
        }))
    : [];
  if (otherReactions.length > 0) {
    newClumps = addReactions(newClumps, otherReactions);
  }
  return newClumps;
};

const initialState = () => ({
  waitingLine: false,
  waitingCounter: 0,
  finished: false
});
export class MockTyper {
  constructor(options) {
    const { keypressDelay } = options;
    this.tick = this.tick.bind(this);
    this.tickLength = keypressDelay;
    this.options = options;
    this.initialize();
  }

  initialize() {
    this.tickTimer = setInterval(this.tick, this.tickLength);
    this.currentLine = 0;
    this.currentCharacter = 0;
    this.state = initialState();
  }

  tick() {
    const { waitingLine, waitingCounter, finished } = this.state;
    if (finished) return;
    if (waitingLine) {
      // Waiting at the end of a line
      const { lineDelay } = this.options;
      if (waitingCounter > lineDelay) {
        // Finished with waiting on the line
        this.state.waitingLine = false;
        this.state.waitingCounter = 0;
      } else {
        // Continue waiting
        this.state.waitingCounter += this.tickLength;
      }
    } else {
      const { lines } = this.options;
      const { currentLine, currentCharacter } = this;
      // Typing
      if (currentCharacter >= lines[currentLine].length) {
        // At the end of the line
        this.options.onEnter(lines[currentLine]);
        if (currentLine === lines.length - 1) {
          // Last line, finished
          this.state.finished = true;
          this.options.onFinish();
          this.stop();
        } else {
          // Go to the next line, but first wait
          ++this.currentLine;
          this.currentCharacter = 0;
          this.state.waitingLine = true;
        }
      } else {
        // Type a single character
        const typedChar = lines[currentLine].charAt(currentCharacter);
        this.options.onKeypress(typedChar);
        ++this.currentCharacter;
      }
    }
  }

  reset(options) {
    this.options = {
      ...this.options,
      ...options
    };
    this.initialize();
  }

  stop() {
    clearTimeout(this.tickTimer);
  }
}
