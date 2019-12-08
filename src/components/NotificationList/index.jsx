import React from "react";
import PropTypes from "prop-types";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import Notification from "components/Notification";
import { Container } from "react-bootstrap";

import "./style.scss";

function NotificationList({
  className,
  items,
  onDismiss,
  type,
  transitionLength,
  container
}) {
  return (
    <div className={className}>
      <ConditionalContainer useContainer={container}>
        <TransitionGroup className="notification-list--transition-group">
          {items.map(({ id, message, variant }) => (
            <CSSTransition
              key={id}
              timeout={transitionLength}
              classNames="notification"
            >
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
      </ConditionalContainer>
    </div>
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
  type: PropTypes.oneOf(["alert", "toast"]),
  transitionLength: PropTypes.number,
  container: PropTypes.bool
};

NotificationList.defaultProps = {
  className: "",
  items: [],
  onDismiss() {},
  type: "toast",
  transitionLength: 250,
  container: false
};

NotificationList.displayName = "NotificationList";

// ? =================
// ? Helper components
// ? =================

function ConditionalContainer({ useContainer, children }) {
  return useContainer ? <Container children={children} /> : children;
}

ConditionalContainer.propTypes = {
  useContainer: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
};

ConditionalContainer.displayName = "ConditionalContainer";
