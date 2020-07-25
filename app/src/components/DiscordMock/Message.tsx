import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";

import { transformerClasses } from "@app/components/DiscordMock/style";
import ReactionList from "@app/components/DiscordMock/ReactionList";
import Skeleton from "@app/components/Skeleton";
import { OtherColors } from "@app/theme/color";
import { MockReaction } from "@app/utility/types";

const Styled = {
  Message: styled.div`
    line-height: 1.35;
    margin-bottom: 0.25rem;

    /* Use child selector */
    .skeleton:last-child {
      margin-bottom: 0.5rem !important;
    }

    &[data-mentions-user="true"] {
      background-color: ${transparentize(0.9, OtherColors.DiscordMention)};
      position: relative;
      padding: 0.125rem 0.7rem 0.25rem;
      margin-left: -6px;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;

      &::before {
        position: absolute;
        top: 0;
        left: -2px;
        bottom: 0;
        content: " ";
        width: 2px;
        background: ${transparentize(0.8, OtherColors.DiscordMention)};
        border-left: 4px solid ${OtherColors.DiscordMention};
        border-radius: 3px 0 0 3px;
      }

      .${transformerClasses.mention} {
        color: ${OtherColors.Discord} !important;
        background-color: transparent !important;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  `,
  Content: styled.div`
    .${transformerClasses.mention} {
      color: $discord;
      background-color: ${transparentize(0.85, OtherColors.Discord)};

      &:hover {
        color: white;
        background-color: ${transparentize(0.25, OtherColors.Discord)};
      }
    }

    .${transformerClasses.emoji} {
      width: 24px;
      height: auto;
      margin: 0 0.05em 0 0.1em;
      position: relative;
      top: -1px;
      vertical-align: middle;
    }

    p {
      white-space: pre-wrap;
      &:last-child {
        margin-bottom: 0;
      }
    }

    a {
      color: ${OtherColors.DiscordLinkFg} !important;
      &:hover {
        text-decoration: underline;
      }
    }

    & :not(pre) > code {
      color: ${transparentize(0.1, OtherColors.DiscordFg)};
      background-color: ${OtherColors.DiscordEmbedBg};
      font-size: 1.1rem;
      word-break: break-word;
      display: inline-block;
      padding: 0.1rem 0.2rem;
      margin-top: -0.1rem;
      margin-bottom: -0.1rem;
      margin-left: 2px;
      border-radius: 4px;
      border: none;

      &${transformerClasses.firstCode} {
        margin-left: -0.2rem;
      }
    }

    pre {
      white-space: pre-wrap;
      font-size: 1.05rem;
      overflow: hidden;
      margin: 0.25rem 0;
      padding: 0.5rem 0.5rem 0.5rem 1rem;
      color: ${OtherColors.DiscordCodeFg};
      background-color: ${OtherColors.DiscordCodeBg};
      border: solid 2px ${OtherColors.DiscordCodeBorder};
      border-radius: 6px;
      position: relative;
      z-index: 1;

      code {
        word-break: break-word;
      }

      &::after {
        position: absolute;
        top: 0;
        left: -2px;
        bottom: 0;
        content: " ";
        width: 6px;
        z-index: 10000;
        border-left: 6px solid ${OtherColors.Discord};
        border-radius: 3px 0 0 3px;
      }

      &:nth-of-type(5n + 1)::after {
        border-left-color: ${OtherColors.DiscordEmbedColors[0]};
      }

      &:nth-of-type(5n + 2)::after {
        border-left-color: ${OtherColors.DiscordEmbedColors[1]};
      }

      &:nth-of-type(5n + 3)::after {
        border-left-color: ${OtherColors.DiscordEmbedColors[2]};
      }

      &:nth-of-type(5n + 4)::after {
        border-left-color: ${OtherColors.DiscordEmbedColors[3]};
      }

      &:nth-of-type(5n + 5)::after {
        border-left-color: ${OtherColors.DiscordEmbedColors[4]};
      }
    }
  `,
  EditedMarker: styled.span`
    color: ${transparentize(0.7, OtherColors.DiscordFg)};
    font-size: 0.67rem;
    margin-left: 0.35rem;
  `,
};

export type MessageProps = {
  onReact: (r: MockReaction) => void;
  onUnreact: (r: MockReaction) => void;
  html: string;
  edited: boolean;
  reactions: MockReaction[];
  mentionsUser: boolean;
  skeletonAmount?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Raw Discord mock message/reaction render, including additional display
 * utilities, such as self-mention highlighting and editing markers
 */
const Message: React.FC<MessageProps> = ({
  html,
  edited,
  reactions,
  mentionsUser,
  onReact,
  onUnreact,
  skeletonAmount = 80,
  style,
  className,
}) => (
  <div className={className} style={style}>
    <Styled.Message data-mentions-user={mentionsUser ? true : undefined}>
      <Skeleton.Multiline
        text={html}
        displayBlank={true}
        amount={skeletonAmount}
        size="0.9em"
        light
      >
        <Styled.Content dangerouslySetInnerHTML={{ __html: html }} />
        {edited && <Styled.EditedMarker>(edited)</Styled.EditedMarker>}
      </Skeleton.Multiline>
    </Styled.Message>
    <ReactionList
      reactions={reactions}
      onReact={onReact}
      onUnreact={onUnreact}
    />
  </div>
);

export default Message;
