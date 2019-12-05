import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { processIfNotEmptyOrNil, isNil, constructAvatarUrl } from "Utility";

import Placeholder from "components/Placeholder";

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
  return (
    <div className={classNames("user-display", className)} {...rest}>
      <Avatar
        avatarUrl={avatarUrl}
        avatarHash={avatarHash}
        clientId={clientId}
        discriminator={discriminator}
      />
      <div>
        <Placeholder.Text
          text={username}
          className="username"
          width={90}
          size="0.95em"
          light
        />
        <Placeholder.Text
          text={processIfNotEmptyOrNil(discriminator, d => `#${d}`)}
          className="discriminator"
          size="0.85em"
          width={40}
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
  discriminator: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

// ? =================
// ? Helper components
// ? =================

const Avatar = ({
  avatarUrl,
  avatarHash,
  clientId,
  className,
  circle = false,
  size = avatarSize,
  discriminator = 0,
  ...rest
}) => {
  const effectiveAvatarUrl = !isNil(avatarUrl)
    ? avatarUrl
    : constructAvatarUrl(clientId, avatarHash, size, discriminator);
  return (
    <Placeholder.Custom
      value={effectiveAvatarUrl}
      className={classNames("avatar", className)}
      width={size}
      height={size}
      circle={circle}
      light
    >
      <div
        className={classNames("avatar-image", className, { circle })}
        style={{
          backgroundImage: `url(${effectiveAvatarUrl})`,
          width: `${size}px`,
          height: `${size}px`
        }}
        {...rest}
      />
    </Placeholder.Custom>
  );
};

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
  clientId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  avatarHash: PropTypes.string,
  className: PropTypes.string,
  circle: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  discriminator: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

UserDisplay.Avatar = Avatar;
