import { css } from "linaria";
import { styled } from "linaria/react";
import { transparentize } from "polished";
import React, { useRef } from "react";
import { useRootClose } from "react-overlays";

import { attach } from "@app/utility/components";
import Tooltip, {
  TooltipProps,
  tooltipColorVar,
  tooltipArrowColorVar,
  tooltipBorderVar,
} from "@architus/facade/components/Tooltip";
import { color, dynamicColor, ColorMode } from "@architus/facade/theme/color";
import { gap } from "@architus/facade/theme/spacing";
import { parseDimension } from "@architus/lib/dimension";

const tooltipColors = `
  ${tooltipColorVar}: ${color("bg+20")};
  ${tooltipArrowColorVar}: ${color("bg+20")};
  ${tooltipBorderVar}: ${color("contrastBorder")};
`;

const tooltipArrowClass = css`
  &::before,
  &::after {
    display: none;
  }
`;

const tooltipClass = css`
  ${tooltipColors}

  border-radius: 6px;
  padding: 0;
  user-select: none;
`;

const Styled = {
  MenuList: styled.ul`
    list-style: none;
    margin: 0;
    padding: ${gap.femto} 0;
  `,
};

export type MenuProps = {
  className?: string;
  style?: React.CSSProperties;
  onClose: (e: Event) => void;
  menu: React.ReactNode;
} & Omit<TooltipProps, "tooltip">;

/**
 * Renders a clickable menu overlay trigger
 */
const Menu: React.FC<MenuProps> = ({
  className,
  style,
  onClose,
  menu,
  ...rest
}) => (
  <Tooltip
    offset={4}
    // Same as right site padding
    screenPadding={parseDimension(gap.pico)
      .map((d) => d.amount)
      .getOrElse(8)}
    tooltip={<MenuContents onClose={onClose}>{menu}</MenuContents>}
    placement="bottom-end"
    className={className}
    style={style}
    padding="zero"
    trigger="click"
    tooltipClassName={tooltipClass}
    arrowClassName={tooltipArrowClass}
    {...rest}
  />
);

type MenuContentsProps = {
  onClose: (e: Event) => void;
  children: React.ReactNode;
};

const MenuContents: React.FC<MenuContentsProps> = ({ onClose, children }) => {
  const contentRef = useRef<HTMLUListElement>(null);
  useRootClose(contentRef, onClose);
  return (
    <Styled.MenuList role="menu" ref={contentRef}>
      {children}
    </Styled.MenuList>
  );
};

const Item = styled.button`
  padding: ${gap.femto} ${gap.micro};
  cursor: pointer;
  outline: none;
  position: relative;
  background-color: transparent;
  border: none;
  display: block;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: ${transparentize(
      0.9,
      dynamicColor("primary", ColorMode.Dark)
    )};
  }

  &:active {
    background-color: ${transparentize(
      0.8,
      dynamicColor("primary", ColorMode.Dark)
    )};
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${color("text")};

  svg {
    vertical-align: middle;
  }
`;

const Text = styled.div`
  padding-left: 24px;
  color: ${color("textStrong")};
`;

export default attach(Menu, { Item, Icon, Text });
