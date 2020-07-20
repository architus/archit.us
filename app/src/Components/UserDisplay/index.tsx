import classNames from "classnames";
import React from "react";

import Skeleton from "@app/components/Skeleton";
import { constructAvatarUrl, attach, isDefined } from "@app/utility";
import { Option } from "@app/utility/option";
import { UserLike, normalizeUserLike } from "@app/utility/types";
import "./style.scss";

const avatarSize = 40;

type UserDisplayProps = {
  className?: string;
  avatarUrl?: string;
  username?: string;
  user?: UserLike;
  discriminator?: string;
  avatar?: boolean;
} & Partial<React.HTMLAttributes<HTMLElement>>;

const UserDisplay: React.FC<UserDisplayProps> = ({
  className,
  avatarUrl,
  user,
  username,
  discriminator,
  avatar = false,
  ...rest
}) => (
  <div className={classNames("user-display", className)} {...rest}>
    <Avatar avatarUrl={avatarUrl} user={user} />
    {!avatar && (
      <div>
        <Skeleton.Text
          text={
            isDefined(user) ? normalizeUserLike(user).username : username ?? ""
          }
          className="username"
          width={90}
          size="0.95em"
          light
        />
        <Skeleton.Text
          text={Option.from(user?.discriminator || discriminator)
            .map((d) => `#${d}`)
            .getOrElse("")}
          className="discriminator"
          size="0.75em"
          width={40}
          light
        />
      </div>
    )}
  </div>
);

// ? ==============
// ? Sub components
// ? ==============

type AvatarProps = {
  avatarUrl?: string;
  discriminator?: string;
  user?: UserLike;
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
    size,
  });
  return (
    <Skeleton.Custom
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
          height: `${size}px`,
        }}
        {...rest}
      />
    </Skeleton.Custom>
  );
};

export default attach(UserDisplay, { Avatar });

// ? ================
// ? Helper functions
// ? ================

/**
 * Constructs an avatar URL for a user from either a pre-made avatar URL,
 * @param options - User specified by avatar URL, user, or default discriminator.
 * Additionally, includes CDN image size
 */
export function getAvatarUrl({
  avatarUrl,
  user,
  discriminator,
  size,
}: {
  avatarUrl?: string;
  user?: UserLike;
  discriminator?: string;
  size?: number;
}): string {
  // Use specified avatar url
  if (isDefined(avatarUrl)) return avatarUrl;

  // Construct new avatar url
  if (isDefined(user) && user.avatar.isDefined()) {
    return constructAvatarUrl({
      clientId: user.id,
      size,
      hash: user.avatar.get,
    });
  }

  // Use default avatar url
  let resolvedDiscriminator = "0";
  if (isDefined(discriminator)) resolvedDiscriminator = discriminator;
  else if (isDefined(user)) resolvedDiscriminator = user.discriminator;
  return constructAvatarUrl({
    discriminator: resolvedDiscriminator,
    size,
  });
}
