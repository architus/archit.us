import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Placeholder from "../../Placeholder";

import "./style.scss";

function Message({ content, className, amount = 80, ...rest }) {
  return (
    <div className={classNames("message", className)} {...rest}>
      <Placeholder.Multiline text={content} amount={amount} size="0.9em" light>
        {content}
      </Placeholder.Multiline>
    </div>
  );
}

export default Message;

Message.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
  amount: PropTypes.number
};
