import { css, cx } from "linaria";
import { styled } from "linaria/react";
import { transparentize } from "polished";
import React, { useCallback, useState } from "react";
import { FaChevronRight } from "react-icons/fa";

import {
  color,
  mode,
  ColorMode,
  dynamicColor,
} from "@architus/facade/theme/color";
import { blankButton } from "@architus/facade/theme/mixins";
import { transition } from "@architus/facade/theme/motion";
import { gap } from "@architus/facade/theme/spacing";
import { font } from "@architus/facade/theme/typography";
import { NavigationTreeNode } from "@docs/build/nav";
import NavLabel from "@docs/components/NavLabel";
import { Link } from "@docs/components/Router";
import { useLocationMatch } from "@docs/hooks";
import { sitePadding } from "@docs/layout";

const buttonPadding = gap.nano;
const paddingIncrement = gap.nano;
const fullBookmarkWidth = "200px";

const ItemRow = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: stretch;
  flex-grow: 1;
`;

const ItemLink = styled(Link)`
  flex-grow: 1;
  text-decoration: none;
  display: flex;
  align-items: center;

  --item-padding: calc(${gap.pico} + 3px);
  padding-top: var(--item-padding);
  padding-bottom: var(--item-padding);
  padding-right: calc(2 * ${buttonPadding} + 1rem);

  &::before,
  &::after {
    content: " ";
    top: 1.24em;
    height: 8px;
    position: absolute;
    width: 8px;
    ${transition(["all"])};
  }

  &::before {
    transform: scale(0.1);
    border-radius: 100%;
    left: calc(var(--base-left-padding) - ${gap.micro});
  }

  &::after {
    background-color: var(--primary-emph);
    opacity: 0;
    left: ${gap.pico};
    transform: translateX(
      calc(${fullBookmarkWidth} * -1 + var(--base-left-padding) - ${gap.micro})
    );
    width: 0px;
    border-radius: 4px;
  }

  color: ${color("text")};
  background-color: transparent;
  ${transition(["color", "background-color"])}

  &:hover {
    color: var(--primary-strong);
    background-color: var(--hover-overlay);

    &::before {
      background-color: var(--primary-emph);
      transform: scale(1);
    }
  }
`;

const ItemButton = styled.button<{ open: boolean }>`
  flex-grow: 0;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  font-size: 0.8rem;
  padding-left: ${buttonPadding};
  padding-right: ${buttonPadding};

  color: ${color("textFade")};
  ${blankButton()};

  background-color: transparent;
  ${transition(["background-color"])}
  &:hover {
    background-color: var(--hover-overlay);
  }

  & svg {
    ${transition(["transform"])}
    transform: ${(props): string => (props.open ? "rotate(90deg)" : "none")}
  }
`;

type StyledItemProps = { active: boolean; partial: boolean; isRoot: boolean };
const StyledItem = styled.li<StyledItemProps>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 2rem;

  background-color: transparent;
  ${transition(["background-color"])}

  /* Increase the padding on each level using red/black recursive variables
     https://stackoverflow.com/a/49977591 */
  --left-padding: calc(var(--base-left-padding) + ${paddingIncrement});

  ${ItemLink} {
    padding-left: var(--base-left-padding);

    &::after {
      opacity: ${(props): string => (props.active ? "1" : "0")};
      width: ${(props): string => (props.active ? fullBookmarkWidth : "0")};
    }

    color: ${(props): string =>
      props.partial ? "var(--primary-strong)" : color("text")};
    font-weight: ${(props): string => (props.partial ? "500" : "400")};
  }
`;

const StyledCollapsibleItem = styled(StyledItem)`
  background-color: ${(props): string =>
    props.partial && props.isRoot ? "var(--hover-overlay)" : "transparent"};
`;

const CollapseIcon = styled(FaChevronRight)``;

const rootClass = css`
  --left-padding: ${sitePadding};
  --border-color: ${color("textOverlay")};
  ${mode(ColorMode.Dark)} {
    --primary-emph: ${color("primary+10")};
    --primary-strong: ${color("primary+10")};
    --hover-overlay: ${transparentize(
      0.9,
      dynamicColor("primary", ColorMode.Dark)
    )};
  }

  ${mode(ColorMode.Light)} {
    --primary-emph: ${color("primary-10")};
    --primary-strong: ${color("primary-10")};
    --hover-overlay: ${transparentize(
      0.9,
      dynamicColor("primary", ColorMode.Light)
    )};
  }

  & > ${StyledCollapsibleItem} {
    border-top: 1px solid var(--border-color);

    & > ${ItemRow} {
      font-size: 90%;
      font-family: ${font("headings")};
      text-transform: uppercase;
      letter-spacing: 0.5px;

      ${CollapseIcon} {
        vertical-align: -2px;
      }
    }
  }
`;

const Styled = {
  Item: StyledItem,
  CollapsibleItem: StyledCollapsibleItem,
  List: styled.ul`
    list-style: none;
    padding-left: 0;
    --base-left-padding: var(--left-padding);
  `,
  ItemRow,
  ItemLink,
  ItemButton,
  CollapseIcon,
};

export type SideNavTreeProps = {
  isRoot?: boolean;
  items: NavigationTreeNode[];
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Tree of side nav items displayed in the SideNav component.
 * Includes logic to auto-scroll to the active item where relevant.
 */
const SideNavTree: React.FC<SideNavTreeProps> = ({
  items,
  isRoot = true,
  className,
  style,
}) => {
  return (
    <Styled.List className={cx(className, isRoot && rootClass)} style={style}>
      {items.map((item) =>
        item.children.length > 0 ? (
          <CollapsibleItem {...item} isRoot={isRoot} key={item.path} />
        ) : (
          <Item {...item} isRoot={isRoot} key={item.path} />
        )
      )}
    </Styled.List>
  );
};

export default React.memo(SideNavTree);

// ? =================
// ? Helper components
// ? =================

const Item: React.FC<
  Omit<NavigationTreeNode, "children"> & { isRoot: boolean }
> = ({ label, path, badge, isRoot }) => {
  const [fullMatch, partialMatch] = useLocationMatch(path);
  return (
    <Styled.Item active={fullMatch} partial={partialMatch} isRoot={isRoot}>
      <Styled.ItemRow>
        <Styled.ItemLink to={path}>
          <NavLabel text={label} badge={badge} />
        </Styled.ItemLink>
      </Styled.ItemRow>
    </Styled.Item>
  );
};

const CollapsibleItem: React.FC<NavigationTreeNode & { isRoot: boolean }> = ({
  children,
  label,
  path,
  badge,
  isRoot,
}) => {
  const [fullMatch, partialMatch] = useLocationMatch(path);
  const [open, setOpen] = useState(() => partialMatch);
  const onClick = useCallback((): void => setOpen(!open), [open]);
  return (
    <Styled.CollapsibleItem
      active={fullMatch}
      partial={partialMatch}
      isRoot={isRoot}
    >
      <Styled.ItemRow>
        <Styled.ItemLink to={path}>
          <NavLabel text={label} badge={badge} />
        </Styled.ItemLink>
        <Styled.ItemButton
          onClick={onClick}
          open={open}
          aria-label={open ? "Collapse" : "Expand"}
        >
          <Styled.CollapseIcon />
        </Styled.ItemButton>
      </Styled.ItemRow>
      {open && <SideNavTree items={children} isRoot={false} />}
    </Styled.CollapsibleItem>
  );
};
