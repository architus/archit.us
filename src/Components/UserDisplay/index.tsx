import React from "react";
import classNames from "classnames";
import {
  constructAvatarUrl,
  attach,
  isDefined
} from "Utility";
import { User } from "Utility/types";
import { Option } from "Utility/option";
import Placeholder from "Components/Placeholder";
import "./style.scss";

const avatarSize = 40;

type UserDisplayProps = {
  className?: string;
  avatarUrl?: string;
  username?: string;
  user?: User;
  discriminator?: string;
} & Partial<React.HTMLAttributes<HTMLElement>>;

const UserDisplay: React.FC<UserDisplayProps> = ({
  className,
  avatarUrl,
  user,
  username,
  discriminator,
  ...rest
}) => (
  <div className={classNames("user-display", className)} {...rest}>
    <Avatar avatarUrl={avatarUrl} user={user} />
    <div>
      <Placeholder.Text
        text={Option.from(user?.username).getOrElse("")}
        className="username"
        width={90}
        size="0.95em"
        light
      />
      <Placeholder.Text
        text={Option.from(user?.discriminator || discriminator)
          .map(d => `#${d}`)
          .getOrElse("")}
        className="discriminator"
        size="0.95em"
        width={40}
        light
      />
    </div>
  </div>
);

// ? =================
// ? Helper components
// ? =================

type AvatarProps = {
  avatarUrl?: string;
  discriminator?: string;
  user?: User;
  className?: string;
  circle?: boolean;
  size?: number;
} & Partial<React.HTMLAttributes<HTMLElement>>;

const Avatar: React.FC<AvatarProps> = ({
  avatarUrl,
  discriminator,
  user,
  className,
  circle,
  size = avatarSize,
  ...rest
}) => {
  let effectiveAvatarUrl: string;
  if (isDefined(avatarUrl)) effectiveAvatarUrl = avatarUrl;
  else if (isDefined(user) && isDefined(user.avatar)) {
    effectiveAvatarUrl = constructAvatarUrl({
      clientId: user.id,
      size,
      hash: user.avatar
    });
  } else {
    let resolvedDiscriminator = "0";
    if (isDefined(discriminator)) resolvedDiscriminator = discriminator;
    else if (isDefined(user)) resolvedDiscriminator = user.discriminator;
    effectiveAvatarUrl = constructAvatarUrl({
      discriminator: resolvedDiscriminator
    });
  }

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

export default attach(UserDisplay, { Avatar });
