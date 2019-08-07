import React from "react";
import PropTypes from "prop-types";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import Notification from "components/Notification";

import "./style.scss";

function NotificationList({ className, items, onDismiss, type }) {
  return (
    <TransitionGroup className={className}>
      {items.map(({ id, message, variant }) => (
        <CSSTransition key={id} timeout={400} classNames="notification">
          <Notification
            id={id}
            type={type}
            message={message}
            variant={variant}
            onDismiss={onDismiss}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default NotificationList;

NotificationList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      message: PropTypes.string,
      variant: PropTypes.string
    })
  ),
  onDismiss: PropTypes.func,
  type: PropTypes.string
};

NotificationList.defaultProps = {
  className: "",
  items: [],
  onDismiss() {},
  type: "toast"
};
