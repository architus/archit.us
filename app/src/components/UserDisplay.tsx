import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";

import { constructAvatarUrl, attach, isDefined } from "@app/utility";
import { UserLike, normalizeUserLike, Nil } from "@app/utility/types";
import Skeleton from "@architus/facade/components/Skeleton";
import { staticColor } from "@architus/facade/theme/color";
import { Option } from "@architus/lib/option";

const avatarSize = 40;
const AvatarImage = styled.div<{ size: string }>`
  --size: ${(props): string => props.size};
  width: var(--size);
  height: var(--size);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${transparentize(0.85, staticColor("light"))};

  &[data-circle="true"] {
    border-radius: 50%;
  }
`;
const Styled = {
  UserDisplay: styled.div`
    display: inline-block;

    & > * {
      vertical-align: middle;
      display: inline-block;
    }

    ${AvatarImage} {
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
      border: 1.2px solid rgba(255, 255, 255, 0.2);
    }
  `,
  NameWrapper: styled.div`
    margin-left: 0.6rem;
  `,
  Username: styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    line-height: 1;
    line-height: 1.3;
    margin-bottom: 0.15rem;
  `,
  Discriminator: styled.div`
    opacity: 0.9;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    line-height: 1;
    font-size: 0.75rem;
  `,
  AvatarImage,
};

export type UserDisplayProps = {
  avatarUrl?: string;
  username?: string;
  user?: UserLike;
  discriminator?: string;
  avatar?: boolean;
  className?: string;
  style?: React.CSSProperties;
} & Partial<React.HTMLAttributes<HTMLElement>>;

/**
 * Renders a Discord user, including their avatar, username, and discriminator
 */
const UserDisplay: React.FC<UserDisplayProps> = ({
  avatarUrl,
  user,
  username,
  discriminator,
  avatar = false,
  className,
  style,
  ...rest
}) => {
  const derivedUsername = isDefined(user)
    ? normalizeUserLike(user).username
    : username;
  const derivedDiscriminator = Option.fromString(
    user?.discriminator ?? discriminator
  )
    .map((d) => `#${d}`)
    .orUndefined();
  return (
    <Styled.UserDisplay className={className} style={style} {...rest}>
      <Avatar avatarUrl={avatarUrl} user={user} />
      {!avatar && (
        <Styled.NameWrapper>
          <Styled.Username>
            {derivedUsername ?? (
              <Skeleton.Text placeholder="username" variant="light" />
            )}
          </Styled.Username>
          <Styled.Discriminator>
            {derivedDiscriminator ?? (
              <Skeleton.Text placeholder="#0000" variant="light" />
            )}
          </Styled.Discriminator>
        </Styled.NameWrapper>
      )}
    </Styled.UserDisplay>
  );
};

// ? ==============
// ? Sub components
// ? ==============

export type AvatarProps = {
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
  return Option.fromString(
    getAvatarUrl({ avatarUrl, discriminator, user, size })
  ).match({
    None: () => (
      <Skeleton.Box
        circle={circle}
        width={size}
        height={size}
        variant="light"
      />
    ),
    Some: (url) => (
      <Styled.AvatarImage
        data-circle={circle ? "true" : undefined}
        size={`${size}px`}
        style={{
          backgroundImage: `url(${url})`,
        }}
        {...rest}
      />
    ),
  });
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
}): string | Nil {
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
  let resolvedDiscriminator = null;
  if (isDefined(discriminator)) resolvedDiscriminator = discriminator;
  else if (isDefined(user)) resolvedDiscriminator = user.discriminator;

  if (isDefined(resolvedDiscriminator)) {
    return constructAvatarUrl({
      discriminator: resolvedDiscriminator,
      size,
    });
  }

  return null;
}
