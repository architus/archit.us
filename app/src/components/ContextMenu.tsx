import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";
import {
  ContextMenu as ReactContextMenu,
  MenuItem,
  connectMenu,
} from "react-contextmenu";

import { color, ColorMode, dynamicColor } from "@architus/facade/theme/color";
import { shadow } from "@architus/facade/theme/shadow";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  ContextMenu: styled(ReactContextMenu)`
    &.react-contextmenu {
      background-color: ${color("bg+20")};
      border-radius: 8px;
      border: 1px solid;
      border-color: ${color("contrastBorder")};
      box-shadow: ${shadow("z2")};
      color: text;
      padding: ${gap.femto} 0;
      user-select: none;
      z-index: 1091;
    }

    & .react-contextmenu-item {
      padding: ${gap.femto} ${gap.micro};
      cursor: pointer;
      outline: none;

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
    }
  `,
};

export type ContextMenuProps = React.ComponentProps<typeof ReactContextMenu> & {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Acts as a wrapper around the ContextMenu component from `react-contextmenu`,
 * styling it to match the design system
 */
const ContextMenu: React.FC<ContextMenuProps> = ({
  className,
  style,
  ...rest
}) => <Styled.ContextMenu className={className} style={style} {...rest} />;

export default ContextMenu;
export { MenuItem, connectMenu };
