import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Placeholder from "../../Placeholder";

import "./style.scss";

function Message({
  contentHtml,
  className,
  amount = 80,
  mentionsUser = false,
  reactions = [],
  ...rest
}) {
  return (
    <div
      className={classNames("message", className, {
        "mentions-user": mentionsUser
      })}
      {...rest}
    >
      <Placeholder.Multiline
        text={contentHtml}
        amount={amount}
        size="0.9em"
        light
      >
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </Placeholder.Multiline>
    </div>
  );
}

export default Message;

Message.propTypes = {
  contentHtml: PropTypes.string,
  className: PropTypes.string,
  amount: PropTypes.number,
  reactions: PropTypes.arrayOf(PropTypes.object),
  mentionsUser: PropTypes.bool
};
