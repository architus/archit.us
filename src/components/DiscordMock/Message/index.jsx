import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ReactionList from "components/DiscordMock/ReactionList";
import Placeholder from "components/Placeholder";

import "./style.scss";

function Message({
  contentHtml,
  className,
  amount = 80,
  mentionsUser = false,
  reactions = [],
  edited = false,
  onReact,
  onUnreact,
  ...rest
}) {
  return (
    <div {...rest}>
      <div
        className={classNames("message", className, {
          "mentions-user": mentionsUser
        })}
      >
        <Placeholder.Multiline
          text={contentHtml}
          displayBlank={true}
          amount={amount}
          size="0.9em"
          light
        >
          <div
            dangerouslySetInnerHTML={{
              __html: edited
                ? `${contentHtml}<span class="edited">(edited)</span>`
                : contentHtml
            }}
          />
        </Placeholder.Multiline>
      </div>
      <ReactionList
        reactions={reactions}
        onReact={onReact}
        onUnreact={onUnreact}
      />
    </div>
  );
}

export default Message;

Message.propTypes = {
  contentHtml: PropTypes.string,
  className: PropTypes.string,
  onReact: PropTypes.func,
  onUnreact: PropTypes.func,
  amount: PropTypes.number,
  edited: PropTypes.bool,
  reactions: PropTypes.arrayOf(PropTypes.object),
  mentionsUser: PropTypes.bool
};
