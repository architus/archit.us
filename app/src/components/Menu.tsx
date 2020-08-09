import { css } from "linaria";
import { styled } from "linaria/react";
import { transparentize } from "polished";
import React, { useRef, useState, useMemo, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useRootClose } from "react-overlays";

import { attach } from "@app/utility/components";
import Tooltip, {
  TooltipProps,
  tooltipColorVar,
  tooltipArrowColorVar,
  tooltipBorderVar,
} from "@architus/facade/components/Tooltip";
import { color, dynamicColor, ColorMode } from "@architus/facade/theme/color";
import { ZIndex } from "@architus/facade/theme/order";
import { shadow } from "@architus/facade/theme/shadow";
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
  ContextMenu: styled.div`
    position: absolute;
    background-color: ${color("bg+20")};
    border: 1px solid ${color("contrastBorder")};
    border-radius: 6px;
    padding: 0;
    user-select: none;
    padding: 0;
    margin: 0;
    z-index: ${ZIndex.Tooltip};
    font-size: 0.9rem;
    box-shadow: ${shadow("z3")};
  `,
  MenuList: styled.ul`
    list-style: none;
    margin: 0;
    padding: ${gap.femto} 0;
  `,
  Item: styled.button`
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
    tooltip={
      <MenuContents onClose={onClose as () => void}>{menu}</MenuContents>
    }
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
  onClose: () => void;
  children: React.ReactNode;
};

type MenuClickContext = () => void;
const MenuClickContext = React.createContext<MenuClickContext>(() => null);

/**
 * Internal component used to handle auto-closing menu component
 */
const MenuContents: React.FC<MenuContentsProps> = ({ onClose, children }) => {
  const contentRef = useRef<HTMLUListElement>(null);
  useRootClose(contentRef, onClose);
  return (
    <Styled.MenuList role="menu" ref={contentRef}>
      <MenuClickContext.Provider value={onClose}>
        {children}
      </MenuClickContext.Provider>
    </Styled.MenuList>
  );
};

type ItemProps = {
  onClick: () => void;
  children: React.ReactNode;
} & React.ComponentProps<typeof Styled.Item>;

/**
 * Renders a single button item in a menu
 */
const Item: React.FC<ItemProps> = ({ onClick, children, ...rest }) => {
  const onMenuClick = useContext(MenuClickContext);
  return (
    <Styled.Item
      onClick={(): void => {
        onClick();
        onMenuClick();
      }}
      {...rest}
    >
      {children}
    </Styled.Item>
  );
};

/**
 * Renders the wrapper for a react-icons element
 */
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

/**
 * Renders the basic menu text
 */
const Text = styled.div`
  padding-left: 24px;
  color: ${color("textStrong")};
`;

export type MenuCreator = (data: Record<string, unknown>) => JSX.Element;
export type ContainerProps = {
  menu: JSX.Element | MenuCreator;
  children: React.ReactNode;
};

export type TriggerData = {
  x: number;
  y: number;
  data: Record<string, unknown>;
};
export type ContainerContext = {
  trigger: (args: TriggerData) => void;
};
export const ContainerContext = React.createContext<ContainerContext>({
  trigger: () => null,
});

/**
 * Renders the container of a ContextMenu pattern,
 * which acts as the context provider
 */
const Container: React.FC<ContainerProps> = ({ menu, children }) => {
  const [show, setShow] = useState(false);
  const [triggerData, setTriggerData] = useState({ x: 0, y: 0, data: {} });
  const { x, y, data } = triggerData;

  let menuNode: React.ReactNode = null;
  if (show) {
    const menuContents = typeof menu === "function" ? menu(data) : menu;
    menuNode = ReactDOM.createPortal(
      <Styled.ContextMenu style={{ left: x, top: y }}>
        <MenuContents onClose={(): void => setShow(false)}>
          {menuContents}
        </MenuContents>
      </Styled.ContextMenu>,
      document.body
    );
  }

  // Handle scroll events on the body and hide the context menu
  useEffect((): void | (() => void) => {
    const handler = (): void => {
      setShow(false);
    };
    if (show) {
      document.addEventListener("scroll", handler);
      return (): void => {
        document.removeEventListener("scroll", handler);
      };
    }
    return undefined as void;
  }, [show]);

  // Memoize the context creation
  const containerContext = useMemo(
    () => ({
      trigger: (args: TriggerData): void => {
        setTriggerData(args);
        setShow(true);
      },
    }),
    [setTriggerData]
  );

  return (
    <ContainerContext.Provider value={containerContext}>
      {children}
      {menuNode}
    </ContainerContext.Provider>
  );
};

type TriggerProps = {
  source: () => Record<string, unknown>;
  children: React.ReactNode;
};

/**
 * Renders the trigger of a ContextMenu pattern,
 * which acts as the context consumer of a parent Container
 */
const Trigger: React.FC<TriggerProps> = ({ source, children }) => {
  const { trigger } = useContext(ContainerContext);
  const onContextMenu = (event: React.MouseEvent): void => {
    event.preventDefault();
    const clickX = event.clientX;
    const clickY = event.clientY;
    trigger({ x: clickX, y: clickY, data: source() });
  };
  return <div onContextMenu={onContextMenu}>{children}</div>;
};

export default attach(Menu, { Item, Icon, Text, Container, Trigger });
