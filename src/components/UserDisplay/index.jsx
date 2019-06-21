import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Placeholder from "../Placeholder";
import PlaceholderText from "../PlaceholderText";

import "./style.scss";

function UserDisplay({
  className,
  avatarUrl,
  username,
  discriminator,
  ...rest
}) {
  return (
    <div className={classNames("user-display", className)} {...rest}>
      <Avatar avatarUrl={avatarUrl} />
      <div>
        <PlaceholderText
          text={username}
          className="username"
          width={120}
          light
        />
        <PlaceholderText
          text={
            discriminator && discriminator.toString().trim()
              ? `#${discriminator}`
              : null
          }
          className="discriminator"
          size="0.9em"
          width={60}
          light
        />
      </div>
    </div>
  );
}

export default UserDisplay;

UserDisplay.propTypes = {
  className: PropTypes.string,
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  discriminator: PropTypes.number
};

// ? =================
// ? Helper components
// ? =================

const Avatar = ({ avatarUrl, className, ...rest }) =>
  avatarUrl && avatarUrl.trim() ? (
    <div
      className={classNames("avatar avatar-image", className)}
      style={{ backgroundImage: `url(${avatarUrl})` }}
      {...rest}
    />
  ) : (
    <Placeholder
      width={40}
      className={classNames("avatar", className)}
      light
      circle
      {...rest}
    />
  );
Avatar.propTypes = {
  avatarUrl: PropTypes.string,
  className: PropTypes.string
};
