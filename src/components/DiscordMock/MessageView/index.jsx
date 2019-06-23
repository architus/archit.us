import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MessageClump from "../MessageClump";

import "./style.scss";

function MessageView({ clumps, className, channelName, ...rest }) {
  clumps = [
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
      messages: ["", ""],
      last: true
    }
  ];

  // TODO remove test messages
  return (
    <div className={classNames(className, "discord-messages")} {...rest}>
      <article className="inner">
        {clumps.map((clump, index) => (
          <MessageClump key={`${clump.username}_${index}`} {...clump} />
        ))}
      </article>
    </div>
  );
}
export default MessageView;

MessageView.propTypes = {
  clumps: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  channelName: PropTypes.string
};
