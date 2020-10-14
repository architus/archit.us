import React from "react";
import { styled } from "linaria/react";
import Tooltip from "@architus/facade/components/Tooltip";
import { Member } from "@app/utility/types";
import { getAvatarUrl } from "@app/components/UserDisplay";
import { gap } from "@architus/facade/theme/spacing";
import { OtherColors } from "@app/theme/color";
import { transparentize } from "polished";
import ago from "s-ago";


const Styled = {
  Tooltip: styled(Tooltip)`

    `,
    TooltipName: styled.strong`
      display: block;
    `,
    TooltipElevated: styled.div`
      opacity: 0.7;
      font-size: 80%;
    `,
    Avatar: styled.img`
      border-radius: 50%;
      max-width: 30%;
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
    NameContainer: styled.div`
      border: 1px solid ${props => (props.color)};
      border-radius: 10px;
      width: fit-content;
      padding: 0 ${gap.femto} 0 ${gap.nano};
      margin-bottom: ${gap.femto};
    `,
    ColoredCircle: styled.div`
      height: 10px;
      width: 10px;
      background-color: ${props => (props.color)};
      border-radius: 50%;
      display: inline-block;
      margin: 0 ${gap.femto} 0 -${gap.pico};
  `,
    Mention: styled.div`
      max-width: fit-content;
      color: ${OtherColors.Discord};
      background-color: ${transparentize(0.85, OtherColors.Discord)};

      &:hover {
        color: white;
        background-color: ${transparentize(0.25, OtherColors.Discord)};
      }
    `,
  };

type MentionProps = {
    member: Member;
};
export const Mention = (props: MentionProps) => {
  let color = props.member.color.isDefined() ? props.member.color.get : "white";
  if (color === "#000000") {
    // TODO: figure out why color is black when it should be undefined
    color = "white";
  }
  return (
    <Styled.Tooltip
    tooltip={(
        <Styled.OuterContainer>
            <Styled.Avatar src={getAvatarUrl({ user: props.member, size: 64}) ?? undefined} />
            <Styled.InnerContainer>
              <Styled.NameContainer color={color}>
                <Styled.ColoredCircle color={color}/>
                {props.member.name}#{props.member.discriminator}
              </Styled.NameContainer>
              Joined {ago(new Date(props.member.joined_at))}
            </Styled.InnerContainer>
        </Styled.OuterContainer>
    )}
  >
    <Styled.Mention>@{props.member.nick.isDefined() ? props.member.nick.get : props.member.name}</Styled.Mention>
  </Styled.Tooltip>
)}
