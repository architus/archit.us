import { styled } from "linaria/react";
import React from "react";
import { FaDotCircle } from "react-icons/fa";
import { IconType } from "react-icons/lib";

import Tooltip from "@architus/facade/components/Tooltip";
import { mode, ColorMode } from "@architus/facade/theme/color";
import { formatDate, formatDateExtraShort } from "@architus/lib/utility";

type TimelineProps = {
  className?: string;
  style?: React.CSSProperties;
  innerProps?: Partial<React.HTMLAttributes<HTMLSpanElement>>;
};

type TimelineItemProps = {
  date: Date;
  icon?: IconType;
  dateFormatter?: (date: Date) => string;
  className?: string;
  style?: React.CSSProperties;
  innerProps?: Partial<React.HTMLAttributes<HTMLSpanElement>>;
};

const Styled = {
  Timeline: styled.div`
    max-width: 100%;
    display: flex;
    height: 100%;
    padding: 20px 0;
  `,
  Line: styled.div`
    width: 2px;
    margin: 15px 10px 36px 10px;
  `,
  List: styled.div`
    //position: relative;
    //margin: 0 auto;
    flex: 1 1 auto;
    display: flex;
    justify-content: space-between;
    height: 100%;
    flex-direction: column;
  `,
  Container: styled.div`
    padding: 10px 10px;
    //position: relative;
    //background-color: inherit;
    display: flex;
    //width: 50%;

    //left: 0;

    &:first-child::after {
      position: absolute;
      left: 43px;
      content: "";
      display: block;
      height: 170px;
      width: 2px;
      ${mode(ColorMode.Light)} {
        background-color: #676767;
      }
      ${mode(ColorMode.Dark)} {
        background-color: #767e87;
      }
    }
    &:last-child::after {
      position: absolute;
      left: 43px;
      transform: translateY(-160px);
      content: "";
      display: block;
      height: 170px;
      width: 2px;
      ${mode(ColorMode.Light)} {
        background-color: #676767;
      }
      ${mode(ColorMode.Dark)} {
        background-color: #767e87;
      }
    }
  `,
  Dot: styled.div`
    content: '';
    flex 0 0 auto;
    position: absolute;
    width: 18px;
    height: 18px;
    left: 36px;
    ${mode(ColorMode.Light)} {
      background-color: #676767;
      border: 3px solid #ffffff;
    }
    ${mode(ColorMode.Dark)} {
      background-color: #767e87;
      border: 3px solid #31363f;
    }
    //top: 27px;
    border-radius: 50%;
    z-index: 1;
  `,
  IconContainer: styled.div`
    & > * {
      z-index: 1;
      //content: '';
      //flex 0 0 auto;
      position: absolute;
      //width: 12px;
      //height: 12px;
      left: 36px;
      ${mode(ColorMode.Light)} {
        background-color: #ffffff;
        outline: 4px solid #ffffff;
      }
      ${mode(ColorMode.Dark)} {
        background-color: #31363f;
        outline: 4px solid #31363f;
        //outline-offset: 3px;
      }
    }
  `,
  Content: styled.div`
    max-width: fit-content;
    //padding: 10px 5px;
    //background-color: white;
    //position: relative;
    //border-radius: 6px;
    font-size: 0.875rem;
  `,
};

export const Timeline: React.FC<TimelineProps> = ({
  style,
  className,
  children,
  innerProps = {},
}) => {
  return (
    <Styled.Timeline className={className} style={style} {...innerProps}>
      <Styled.Line />
      <Styled.List>{children}</Styled.List>
    </Styled.Timeline>
  );
};
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
  icon = FaDotCircle,
  dateFormatter = formatDateExtraShort,
  className,
  children,
  innerProps = {},
}) => {
  const iconElem = React.createElement(icon, {});
  return (
    <Styled.Container>
      <Styled.IconContainer>{iconElem}</Styled.IconContainer>
      <Styled.Content className={className} style={style} {...innerProps}>
        <Tooltip maxWidth={"auto"} tooltip={<p>{formatDate(date)}</p>}>
          <h4>{dateFormatter(date)}</h4>
          {children}
        </Tooltip>
      </Styled.Content>
    </Styled.Container>
  );
};
