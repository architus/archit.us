import React from "react";
import classNames from "classnames";
import { constructAvatarUrl, attach, isDefined } from "Utility";
import { User } from "Utility/types";
import { Option } from "Utility/option";
import Placeholder from "Components/Placeholder";
import "./style.scss";

/**
 * Constructs an avatar URL for a user from either a pre-made avatar URL,
 * @param options User specified by avatar URL, user, or default discriminator.
 * Additionally, includes CDN image size
 */
export function getAvatarUrl({
  avatarUrl,
  user,
  discriminator,
  size
}: {
  avatarUrl?: string;
  user?: User;
  discriminator?: string;
  size?: number;
}): string {
  // Use specified avatar url
  if (isDefined(avatarUrl)) return avatarUrl;

  // Construct new avatar url
  if (isDefined(user) && isDefined(user.avatar)) {
    return constructAvatarUrl({
      clientId: user.id,
      size,
      hash: user.avatar
    });
  }

  // Use default avatar url
  let resolvedDiscriminator = "0";
  if (isDefined(discriminator)) resolvedDiscriminator = discriminator;
  else if (isDefined(user)) resolvedDiscriminator = user.discriminator;
  return constructAvatarUrl({
    discriminator: resolvedDiscriminator,
    size
  });
}

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
  const effectiveAvatarUrl = getAvatarUrl({
    avatarUrl,
    discriminator,
    user,
    size
  });
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
