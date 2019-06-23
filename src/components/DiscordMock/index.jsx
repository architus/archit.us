import React from "react";
import PropTypes from "prop-types";
import {
  addMissingUnit,
  log,
  generateName,
  randomDigitString,
  takeOrReplenish
} from "../../util";

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

class DiscordMock extends React.Component {
  constructor(props) {
    super(props);
    const guildId = randomDigitString(9);
    const mockClientId = parseInt(guildId) % 100;
    const mockDiscriminator = nextDiscriminator(mockClientId);
    const mockNameColor = colors[mockDiscriminator];
    const mockUsername = generateName();
    this.state = {
      guildId,
      mockUser: {
        clientId: mockClientId,
        username: mockUsername,
        nameColor: mockNameColor,
        discriminator: mockDiscriminator,
        bot: false
      }
    };
  }

  render() {
    const { height = 100, channelName = "channel" } = this.props;
    const { mockUser } = this.state;
    const mockEmojiResponseUser = makeEmojiResponseUser(mockUser);

    const message1 = {
      sender: mockUser,
      messages: [`<span class="mention">@Linh</span> ur sooooo good`],
      timestamp: new Date()
    };
    const message2 = {
      sender: autBotUser,
      messages: [
        `normal message 1`,
        {
          content: `message with mention: <span class="mention">@dr diet pepp</span>`,
          mentionsUser: true
        },
        `message with formatting: <code>johny</code> <em>ur</em> <strike>really</strike> <b>bad</b> <u>(nice brain)</u>. now it's even longer to test line wrapping in a more controlled way.`,
        {
          reactions: [
            {
              emoji: `<img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/36x36/2764.png"/>`,
              number: 2,
              userHasReacted: false
            }
          ],
          content: `message with reactions`
        },
        {
          content: `this message has been edited`,
          edited: true
        },
        {
          reactions: [
            {
              emoji: `<img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/36x36/2764.png"/>`,
              number: 3,
              userHasReacted: false
            },
            {
              emoji: `<img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/36x36/2764.png"/>`,
              number: 7,
              userHasReacted: true
            }
          ],
          content: `<span class="mention">@dr diet pepp</span> test with reactions`,
          mentionsUser: true
        },
        `normal message 2`
      ],
      timestamp: new Date()
    };
    const message3 = {
      sender: mockEmojiResponseUser,
      messages: [`💕`],
      timestamp: new Date()
    };
    const exampleClumps = [
      message1,
      message2,
      message3,
      message1,
      message2,
      message3,
      message1,
      message2,
      message3
    ];
    exampleClumps[exampleClumps.length - 1].last = true;

    return (
      <DiscordView
        style={{ height: addMissingUnit(height) }}
        channelName={channelName}
        onSend={message => log(message)}
        clumps={exampleClumps}
      />
    );
  }
}

export default DiscordMock;

DiscordMock.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  channelName: PropTypes.string
};
