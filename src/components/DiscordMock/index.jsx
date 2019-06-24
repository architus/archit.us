import React from "react";
import PropTypes from "prop-types";
import {
  addMissingUnit,
  log,
  generateName,
  randomDigitString,
  takeOrReplenish,
  isNil,
  reverseMapFromMap,
  includes,
  pick
} from "../../util";
import { transformMessage, transformReaction } from "./transform";

import DiscordView from "./DiscordView";

const colors = ["#7e95e5", "#a0adbc", "#43B581", "#FAA61A", "#ef5b5b"];
const autBotUser = {
  clientId: 448546825532866560,
  avatarHash: "b2979364dd5230ac3dc7ea98cb35a02c",
  discriminator: 7145,
  username: "aut-bot",
  nameColor: "#d34c4f",
  bot: true
};
const makeEmojiResponseUser = baseUser => ({
  ...baseUser,
  clientId: baseUser.clientId + 1,
  nameColor: "white",
  bot: true
});

const discriminators = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 };
let discriminatorPool = { ...discriminators };
const nextDiscriminator = clientId => {
  return takeOrReplenish(
    discriminatorPool,
    clientId % 5,
    key => (key + 1) % 5,
    discriminators
  );
};

const shouldMergeClumps = (previousClump, nextClump) => {
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

const mergeClumps = (prev, next) => ({
  ...prev,
  messages: [...prev.messages, ...next.messages]
});

const addReactions = (clumps, reactions) => {
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
                        pick(reaction, ["emoji", "quantity", "userHasReacted"])
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

class DiscordMock extends React.Component {
  constructor(props) {
    super(props);
    const guildId = randomDigitString(9);
    const mockClientId = parseInt(guildId) % 100;
    const mockDiscriminator = nextDiscriminator(mockClientId);
    const mockNameColor = colors[mockDiscriminator];
    const mockUsername = generateName();
    const mockUser = {
      clientId: mockClientId,
      username: mockUsername,
      nameColor: mockNameColor,
      discriminator: mockDiscriminator,
      bot: false
    };
    const emojiResponder = makeEmojiResponseUser(mockUser);
    // escape hatch to scroll to bottom imperatively
    this.view = React.createRef();
    this.state = {
      guildId,
      thisUser: mockUser,
      clumps: [],
      users: {
        [mockClientId]: mockUser,
        [emojiResponder.clientId]: emojiResponder,
        [autBotUser.clientId]: autBotUser
      },
      needsScroll: false,
      // TODO temp
      messageQueue: [
        {
          content: `message with formatting: \`johny\` *ur* ~~really~~ **bad** __(nice brain)__. now it's even longer to test line wrapping in a more controlled way.`,
          clientId: mockClientId,
          messageId: 0,
          guildId
        },
        {
          content: `this doesn't <@${autBotUser.clientId}>`,
          clientId: autBotUser.clientId,
          messageId: 2,
          guildId
        },
        {
          content: `this mentions me <@${mockClientId}>`,
          clientId: autBotUser.clientId,
          messageId: 1,
          guildId
        },
        {
          content: `**__cool event __**\n0\u20e3 **yes (0)**: \n1\u20e3 **no (0)**: \n`,
          clientId: autBotUser.clientId,
          messageId: 4,
          guildId
        },
        {
          content: `this message has unicode emoji: 😒💕🌹👌🔥🎟🎉🎶😎`,
          clientId: autBotUser.clientId,
          messageId: 4,
          guildId
        },
        {
          content: "I change previous reactions",
          reactions: [[6, "\u2705"]],
          messageId: 13,
          guildId,
          clientId: mockClientId
        },
        {
          content: `message with reactions`,
          reactions: [[13, "\u2705"], [6, "\u274c"], [6, "\ud83e\udd37"]],
          clientId: mockClientId + 1,
          messageId: 6,
          guildId
        },
        {
          content: `https://google.com [I'm an inline-style link](https://www.google.com)\nnewline right here`,
          clientId: autBotUser.clientId,
          messageId: 5,
          guildId
        },
        {
          content: `i got a reaction added to me!`,
          clientId: autBotUser.clientId,
          messageId: 13,
          guildId
        }
      ]
    };
    // TODO temp
    this.addNewMessage = this.addNewMessage.bind(this);
    setInterval(this.addNewMessage, 1000);
  }

  // TODO temp
  addNewMessage() {
    const { messageQueue, users } = this.state;
    if (messageQueue.length > 0) {
      const msg = messageQueue.pop();
      this.addMessage(
        msg.messageId,
        msg.content,
        users[msg.clientId],
        msg.reactions
      );
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (!prevState.needsScroll && this.state.needsScroll) {
      if (!isNil(this.view.current)) {
        this.view.current.scrollToBottom();
      }
      this.setState({
        needsScroll: false
      });
    }
  }

  addMessage(id, content, sender, reactions) {
    this.setState(({ clumps, thisUser, users }) => {
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
                    quantity: 1,
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
              quantity: 1,
              userHasReacted: false,
              targetId: r[0]
            }))
        : [];
      if (otherReactions.length > 0) {
        newClumps = addReactions(newClumps, otherReactions);
      }

      return {
        clumps: newClumps,
        needsScroll: true
      };
    });
  }

  render() {
    const { height = 100, channelName = "channel" } = this.props;
    const { clumps } = this.state;

    return (
      <DiscordView
        style={{ height: addMissingUnit(height) }}
        channelName={channelName}
        onSend={message => log(message)}
        clumps={clumps}
        ref={this.view}
      />
    );
  }
}

export default DiscordMock;

DiscordMock.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  channelName: PropTypes.string
};
