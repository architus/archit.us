import React from "react";
import PropTypes from "prop-types";
import { addMissingUnit, log } from "../../util";

import DiscordView from "./DiscordView";

const exampleClumps = [
  {
    avatarUrl: "",
    username: "dr diet pepp",
    messages: [`<span class="mention">@Linh</span> ur sooooo good`],
    timestamp: new Date(),
    color: "#099700"
  },
  {
    avatarUrl: "",
    username: "aut-bot",
    messages: [
      {
        reactions: [{ emote: "💕", amount: 2 }],
        content: `<code>johny</code> <em>ur</em> <strike>really</strike> <b>bad</b> <u>(nice brain)</u> <span class="mention">@dr diet pepp</span>`,
        mentionsUser: true
      }
    ],
    timestamp: new Date(),
    color: "#ba393c",
    bot: true
  },
  {
    avatarUrl: "",
    username: "",
    messages: ["", ""]
  },
  {
    avatarUrl: "",
    username: "dr diet pepp",
    messages: [`<span class="mention">@Linh</span> ur sooooo good`],
    timestamp: new Date(),
    color: "#099700"
  },
  {
    avatarUrl: "",
    username: "aut-bot",
    messages: [
      {
        reactions: [{ emote: "💕", amount: 2 }],
        content: `<code>johny</code> <em>ur</em> <strike>really</strike> <b>bad</b> <u>(nice brain)</u> <span class="mention">@dr diet pepp</span>`,
        mentionsUser: true
      }
    ],
    timestamp: new Date(),
    color: "#ba393c",
    bot: true
  },
  {
    avatarUrl: "",
    username: "",
    messages: ["", ""]
  },
  {
    avatarUrl: "",
    username: "dr diet pepp",
    messages: [`<span class="mention">@Linh</span> ur sooooo good`],
    timestamp: new Date(),
    color: "#099700"
  },
  {
    avatarUrl: "",
    username: "dr diet pepp",
    messages: [`<span class="mention">@Linh</span> ur sooooo good`],
    timestamp: new Date(),
    color: "#099700"
  },
  {
    avatarUrl: "",
    username: "dr diet pepp",
    messages: [`<span class="mention">@Linh</span> ur sooooo good`],
    timestamp: new Date(),
    color: "#099700"
  },
  {
    avatarUrl: "",
    username: "aut-bot",
    messages: [
      {
        reactions: [{ emote: "💕", amount: 2 }],
        content: `<code>johny</code> <em>ur</em> <strike>really</strike> <b>bad</b> <u>(nice brain)</u> <span class="mention">@dr diet pepp</span>`,
        mentionsUser: true
      }
    ],
    timestamp: new Date(),
    color: "#ba393c",
    bot: true
  },
  {
    avatarUrl: "",
    username: "",
    messages: ["", ""]
  }
];
exampleClumps[exampleClumps.length - 1].last = true;

function DiscordMock({ height, channelName }) {
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
  channelName: PropTypes.string
};
