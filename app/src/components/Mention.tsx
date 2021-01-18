import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";
import ago from "s-ago";

import { getAvatarUrl } from "@app/components/UserDisplay";
import { OtherColors } from "@app/theme/color";
import { Member } from "@app/utility/types";
import Tooltip from "@architus/facade/components/Tooltip";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Tooltip: styled(Tooltip)``,
  TooltipName: styled.strong`
    display: block;
  `,
  TooltipElevated: styled.div`
    opacity: 0.7;
    font-size: 80%;
  `,
  Avatar: styled.img`
    border-radius: 50%;
    max-width: 70px;
    height: auto;
    margin: ${gap.pico} ${gap.nano} ${gap.pico} 0;
  `,
  OuterContainer: styled.div`
    display: flex;
  `,
  InnerContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    white-space: nowrap;
    text-align: left;
  `,
  NameContainer: styled.div<{ color: string }>`
    border: 1px solid ${(props): string => props.color};
    border-radius: 10px;
    width: fit-content;
    padding: 0 ${gap.femto} 0 ${gap.nano};
    margin-bottom: ${gap.femto};
  `,
  ColoredCircle: styled.div<{ color: string }>`
    height: 10px;
    width: 10px;
    background-color: ${(props): string => props.color};
    border-radius: 50%;
    display: inline-block;
    margin: 0 ${gap.femto} 0 -${gap.pico};
  `,
  Mention: styled.div`
    max-width: 100%;
    color: ${OtherColors.Discord};
    background-color: ${transparentize(0.85, OtherColors.Discord)};

    & > p {
      max-width: 100%;
    }

    &:hover {
      color: white;
      background-color: ${transparentize(0.25, OtherColors.Discord)};
    }
  `,
};

type MentionProps = {
  member: Member;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Render a Member object in the style of a discord mention in light or dark mode.
 * Also wraps in a tooltip showing avatar, username, and join date.
 */
export const Mention: React.FC<MentionProps> = ({
  member,
  style,
  className,
}) => {
  let color = member.color.isDefined() ? member.color.get : "white";
  if (color === "#000000") {
    // because discord uses black instead of 'undefined'
    color = "white";
  }
  return (
    <Styled.Tooltip
      maxWidth={"auto"}
      tooltip={
        <Styled.OuterContainer>
          <Styled.Avatar
            src={getAvatarUrl({ user: member, size: 64 }) ?? undefined}
          />
          <Styled.InnerContainer>
            <Styled.NameContainer color={color}>
              <Styled.ColoredCircle color={color} />
              {member.name}#{member.discriminator}
            </Styled.NameContainer>
            Joined {ago(new Date(member.joined_at))}
          </Styled.InnerContainer>
        </Styled.OuterContainer>
      }
    >
      <Styled.Mention>
        <p className={className} style={style}>
          @{member.nick.isDefined() ? member.nick.get : member.name}
        </p>
      </Styled.Mention>
    </Styled.Tooltip>
  );
};
