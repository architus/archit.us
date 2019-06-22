import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isNil } from "../../../util";

import MessageClump from "../MessageClump";

import "./style.scss";

function MessageView({ messages, className, channelName, ...rest }) {
  const isEmpty = isNil(messages) || messages.length === 0;
  // TODO remove test
  return (
    <div className={classNames(className, "discord-messages")} {...rest}>
      <article className="inner">
        <MessageClump
          avatar=""
          username="dr diet pepp"
          messages={["test message 1", "ur sooooo good"]}
          timestamp={new Date()}
          color="#099700"
        />
        <MessageClump
          avatar=""
          username="aut-bot"
          messages={["johny ur bad"]}
          timestamp={new Date()}
          color="#ba393c"
          bot
        />
        <MessageClump avatar="" username="" messages={["", ""]} last />
      </article>
    </div>
  );
}
export default MessageView;

MessageView.propTypes = {
  // TODO define message class
  messages: PropTypes.array,
  className: PropTypes.string,
  channelName: PropTypes.string
};
