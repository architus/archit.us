import React from "react";
import { styled } from "linaria/react";
import { color } from "@architus/facade/theme/color";


type TimelineProps = {
  className?: string;
  style?: React.CSSProperties;
  innerProps?: Partial<React.HTMLAttributes<HTMLSpanElement>>;
};

type TimelineItemProps = {
  date: Date;
  className?: string;
  style?: React.CSSProperties;
  innerProps?: Partial<React.HTMLAttributes<HTMLSpanElement>>;
}

const Styled = {
  Timeline: styled.div`
    position: relative;
    max-width: 100%;
    margin: 0 auto;

    &::after {
      content: '';
      position: absolute;
      width: 2px;
      background-color: ${color("textLight")};
      top: 0;
      bottom: 0;
      left: 5%;
      margin-left: -3px;
  `,
  Container: styled.div`
    padding: 10px 40px;
    position: relative;
    background-color: inherit;
    //width: 50%;

    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      right: 93.5%;
      background-color: ${color("textLight")};
      //border: 4px solid #FF9F55;
      top: 27px;
      border-radius: 50%;
      z-index: 1;
    }

    left: 0;
  `,
  Content: styled.div`
    max-width: fit-content;
    padding: 10px 5px;
    //background-color: white;
    position: relative;
    //border-radius: 6px;
  `,
}

export const Timeline: React.FC<TimelineProps> = ({
  style,
  className,
  children,
  innerProps = {},
}) => {
  return (
  <Styled.Timeline className={className} style={style} {...innerProps}>
    {children}
  </Styled.Timeline>);
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  style,
  className,
  children,
  innerProps = {},
}) => {
  return (
    <Styled.Container>
      <Styled.Content className={className} style={style} {...innerProps}>
        <h4>
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
          }).format(date)}
        </h4>
        {children}
      </Styled.Content>
    </Styled.Container>);
}
