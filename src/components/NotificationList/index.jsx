import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import Notification from "components/Notification";

import "./style.scss";

function NotificationList({
  className,
  containerClass,
  items,
  onDismiss,
  type
}) {
  return (
    <div className={className}>
      <div className={classNames({ container: type === "alert" })}>
        <TransitionGroup className={containerClass}>
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
      </div>
    </div>
  );
}

export default NotificationList;

NotificationList.propTypes = {
  className: PropTypes.string,
  containerClass: PropTypes.string,
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
  containerClass: "",
  items: [],
  onDismiss() {},
  type: "toast"
};
