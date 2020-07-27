import { styled } from "linaria/react";
import { transparentize, lighten } from "polished";
import React, { useCallback } from "react";

import { transformerClasses } from "@app/components/DiscordMock/style";
import { OtherColors } from "@app/theme/color";
import { MockReaction, StyleObject } from "@app/utility/types";

const Styled = {
  Reaction: styled.button`
    margin: 0.5rem 0.2rem 0.5rem 0;
    padding-bottom: 0.25rem;
    padding-left: 0.5rem;
    cursor: pointer;

    box-shadow: none;
    outline: none;
    border: none;
    border-radius: 4px;

    background-color: ${OtherColors.DiscordReactionBg};
    color: ${transparentize(0.25, OtherColors.DiscordFg)};

    &:hover,
    &:active {
      background-color: ${lighten(0.02, OtherColors.DiscordReactionBg)};
    }

    &[data-active="true"] {
      background-color: ${OtherColors.DiscordReactionActiveBg};
      color: ${OtherColors.Discord};

      &:hover,
      &:active {
        background-color: ${lighten(0.02, OtherColors.DiscordReactionActiveBg)};
      }
    }
  `,
  Emoji: styled.span`
    .${transformerClasses.emoji} {
      width: 18px;
      height: 18px;
      vertical-align: middle;
    }
  `,
  Amount: styled.span`
    margin-left: 0.375rem;
    margin-right: 0.125rem;
    position: relative;
    top: 1px;
  `,
};

export type ReactionProps = {
  onReact: () => void;
  onUnreact: () => void;
  style?: React.CSSProperties;
  className?: string;
} & MockReaction;

/**
 * Shows a single reaction button, used in a Discord Mock
 */
const Reaction: React.FC<ReactionProps> = ({
  onReact,
  onUnreact,
  emoji,
  number,
  userHasReacted,
  style,
  className,
}) => (
  <Styled.Reaction
    className={className}
    data-active={userHasReacted ? "true" : undefined}
    style={style}
    onClick={useCallback(() => {
      if (userHasReacted) onUnreact();
      else onReact();
    }, [userHasReacted, onUnreact, onReact])}
  >
    <Styled.Emoji dangerouslySetInnerHTML={{ __html: emoji }} />
    <Styled.Amount>{number}</Styled.Amount>
  </Styled.Reaction>
);

export default Reaction;
