import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { processIfNotEmptyOrNil, isNil, constructAvatarUrl } from "../../util";

import Placeholder from "../Placeholder";

import "./style.scss";

const avatarSize = 40;

function UserDisplay({
  className,
  avatarUrl,
  clientId,
  avatarHash,
  username,
  discriminator,
  ...rest
}) {
  const effectiveAvatarUrl = !isNil(avatarUrl)
    ? avatarUrl
    : constructAvatarUrl(clientId, avatarHash, avatarSize);
  return (
    <div className={classNames("user-display", className)} {...rest}>
      <Avatar avatarUrl={effectiveAvatarUrl} />
      <div>
        <Placeholder.Text
          text={username}
          className="username"
          width={120}
          light
        />
        <Placeholder.Text
          text={processIfNotEmptyOrNil(discriminator, d => `#${d}`)}
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
  clientId: PropTypes.string,
  avatarHash: PropTypes.string,
  username: PropTypes.string,
  discriminator: PropTypes.number
};

// ? =================
// ? Helper components
// ? =================

const Avatar = ({ avatarUrl, className, ...rest }) => (
  <Placeholder.Custom
    value={avatarUrl}
    className={classNames("avatar", className)}
    width={avatarSize}
    light
    circle
  >
    <div
      className={classNames("avatar-image", className)}
      style={{
        backgroundImage: `url(${avatarUrl})`,
        width: `${avatarSize}px`,
        height: `${avatarSize}px`
      }}
      {...rest}
    />
  </Placeholder.Custom>
);

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
  className: PropTypes.string
};
