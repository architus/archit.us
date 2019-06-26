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
                        pick(reaction, [
                          "emoji",
                          "rawEmoji",
                          "number",
                          "userHasReacted"
                        ])
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
  const { content, id, reactions, sender } = messageData;
  const messageReactions = !isNil(reactions)
    ? reactions
        .filter(r => !isNil(r) && r[0] === id)
        .map(r => ({
          emoji: transformReaction(r[1]),
          rawEmoji: r[1],
          number: 1,
          userHasReacted: false
        }))
    : [];
  const otherReactions = !isNil(reactions)
    ? reactions
        .filter(r => !isNil(r) && r[0] !== id)
        .map(r => ({
          emoji: transformReaction(r[1]),
          rawEmoji: r[1],
          number: 1,
          userHasReacted: false,
          targetId: r[0]
        }))
    : [];

  let newClumps;
  if (content !== "" || messageReactions.length > 0) {
    // should process this message
    const { result, mentions } = transformMessage(content, {
      users,
      clientId: thisUser.clientId
    });
    const clump = {
      timestamp: new Date(),
      sender,
      messages: [
        {
          content: result,
          reactions: messageReactions,
          mentionsUser: mentions.includes(thisUser.clientId),
          messageId: id
        }
      ]
    };

    if (clumps.length > 0) {
      const lastClump = clumps[clumps.length - 1];
      if (shouldMergeClumps(lastClump, clump)) {
        const otherClumps = clumps.slice(0, -1);
        newClumps = [...otherClumps, mergeClumps(lastClump, clump)];
      }
    }
    if (isNil(newClumps)) newClumps = [...clumps, clump];
  } else newClumps = clumps;

  if (otherReactions.length > 0) {
    newClumps = addReactions(newClumps, otherReactions);
  }
  return newClumps;
};
