import React from "react";
import { styled } from "linaria/react";
import { color, mode, ColorMode } from "@architus/facade/theme/color";
import { formatDate } from "@architus/lib/utility";


type TimelineProps = {
  className?: string;
  style?: React.CSSProperties;
  innerProps?: Partial<React.HTMLAttributes<HTMLSpanElement>>;
};

type TimelineItemProps = {
  date: Date;
  dateFormatter?: (date: Date) => string;
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
      ${mode(ColorMode.Light)} {
        background-color: #676767;
      }

      ${mode(ColorMode.Dark)} {
        background-color: #767e87;
      }
      top: 30px;
      bottom: 20px;
      left: 3.75%;
      margin-left: -3px;
  `,
  Container: styled.div`
    padding: 10px 35px;
    position: relative;
    background-color: inherit;
    //width: 50%;

    &::after {
      content: '';
      position: absolute;
      width: 18px;
      height: 18px;
      right: 93.5%;
      ${mode(ColorMode.Light)} {
        background-color: #676767;
        border: 3px solid #ffffff;
      }
      ${mode(ColorMode.Dark)} {
        background-color: #767e87;
        border: 3px solid #31363f;
      }
      top: 27px;
      border-radius: 50%;
      z-index: 1;
    }

    left: 0;
  `,
  Content: styled.div`
    max-width: fit-content;
    //padding: 10px 5px;
    //background-color: white;
    position: relative;
    //border-radius: 6px;
    font-size: 0.875rem;
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
/*
{new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "numeric",
  day: "2-digit",
  hour: "2-digit",
}).format(date)} */

export const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  style,
  dateFormatter = formatDate,
  className,
  children,
  innerProps = {},
}) => {
  return (
    <Styled.Container>
      <Styled.Content className={className} style={style} {...innerProps}>
        <h4>
          {dateFormatter(date)}
        </h4>
        {children}
      </Styled.Content>
    </Styled.Container>);
}
