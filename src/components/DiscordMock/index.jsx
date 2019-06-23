import React from "react";
import PropTypes from "prop-types";
import { addMissingUnit, log, generateName } from "../../util";

import DiscordView from "./DiscordView";

const makeMockUser = (username, index) => ({
  clientId: 340300 + index,
  discriminator: 8000 + index,
  username,
  nameColor: "white",
  bot: false
});
const autBotUser = {
  clientId: 448546825532866560,
  avatarHash: "b2979364dd5230ac3dc7ea98cb35a02c",
  discriminator: 7145,
  username: "aut-bot",
  nameColor: "#d34c4f",
  bot: true
};

function DiscordMock({ height = 100, channelName = "channel", index = 0 }) {
  const username = generateName();
  const mockUser = makeMockUser(username, index);
  const message1 = {
    sender: mockUser,
    messages: [`<span class="mention">@Linh</span> ur sooooo good`],
    timestamp: new Date()
  };
  const message2 = {
    sender: autBotUser,
    messages: [
      {
        reactions: [{ emote: "💕", amount: 2 }],
        content: `<code>johny</code> <em>ur</em> <strike>really</strike> <b>bad</b> <u>(nice brain)</u> <span class="mention">@dr diet pepp</span>`,
        mentionsUser: true
      }
    ],
    timestamp: new Date()
  };
  const message3 = {
    sender: {},
    messages: ["", ""]
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

export default DiscordMock;

DiscordMock.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  channelName: PropTypes.string,
  index: PropTypes.number
};
