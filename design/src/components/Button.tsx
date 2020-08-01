import { css, cx } from "linaria";
import { styled } from "linaria/react";
import { transparentize, darken, readableColor } from "polished";
import React from "react";

import { useColorMode } from "../hooks";
import {
  Variant,
  hybridColor,
  staticColor,
  ColorMode,
  mode,
} from "../theme/color";
import { transition } from "../theme/motion";
import { gap } from "../theme/spacing";
import { isDefined } from "@architus/lib/utility";

// Used to manage keyboard-only focus
// See https://www.kizu.ru/keyboard-only-focus/
const ButtonContent = styled.div`
  position: relative;
  padding: var(--button-padding);
  border-radius: 4px;

  ${transition(["box-shadow"])}
  box-shadow: none;
`;

const buttonClass = css`
  display: inline-block;
  cursor: pointer;
  appearance: none;
  border-radius: 4px;
  font-size: 1rem;
  text-decoration: none;

  &:focus > ${ButtonContent} {
    box-shadow: 0 0 0 0.2rem var(--button-glow-color);
  }

  &:not(:-moz-focusring):focus > ${ButtonContent} {
    box-shadow: none;
  }

  &:focus,
  & > ${ButtonContent}:focus {
    outline: none;
  }

  /* Sub-classes need to add transition to box-shadow */
  box-shadow: none;
  &:active {
    box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.125);
  }
`;

const Styled = {
  ButtonContent,
  Combined: styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  CombinedIcon: styled.div`
    position: relative;
    flex-grow: 0;
    margin-right: var(--button-padding);
    transform: scale(1.25);
    top: 2px;
  `,
  Content: styled.div`
    flex-grow: 1;
  `,
  Icon: styled.div`
    transform: scale(1.4);
  `,
};

const typeClasses = {
  solid: css`
    color: var(--button-foreground);
    border: none;

    ${transition(["background-color", "box-shadow"])}
    background-color: var(--button-color);

    &:hover {
      background-color: var(--button-hover-color);
    }

    &:active {
      background-color: var(--button-active-color);
    }
  `,
  outline: css`
    border: 2px solid var(--button-color);

    ${transition(["background-color", "box-shadow"])}
    color: inherit;
    background-color: transparent;

    &:hover {
      color: var(--button-foreground);
      background-color: var(--button-hover-color);
    }

    &:active {
      color: var(--button-foreground);
      background-color: var(--button-active-color);
    }
  `,
  ghost: css`
    color: inherit;
    border: none;

    ${transition(["background-color"])}
    background-color: transparent;

    --overlay-hover: ${transparentize(0.9, staticColor("dark"))};
    --overlay-active: ${transparentize(0.8, staticColor("dark"))};
    ${mode(ColorMode.Dark)} {
      --overlay-hover: ${transparentize(0.9, staticColor("light"))};
      --overlay-active: ${transparentize(0.8, staticColor("light"))};
    }

    &:hover {
      background-color: var(--overlay-hover);
    }

    &:active {
      background-color: var(--overlay-active);
    }
  `,
} as const;

const sizeClasses = {
  compact: css`
    --button-padding: ${gap.pico};
  `,
  normal: css`
    --button-padding: ${gap.nano};
  `,
  large: css`
    --button-padding: ${gap.micro};
  `,
} as const;

export type ButtonSize = "compact" | "normal" | "large";
export type ButtonType = "solid" | "outline" | "ghost";

type BaseProps<As> = {
  as?: As;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: Variant;
  color?: string;
  type?: "solid" | "outline" | "ghost";
  size?: ButtonSize;
  className?: string;
  style?: string;
};

export type ButtonProps<
  As extends React.ElementType = React.ElementType
> = Omit<React.ComponentProps<As>, keyof Required<BaseProps<As>>> &
  BaseProps<As>;

/**
 * Shows a standard Bootstrap-style button component,
 * which can either be text-only, icon-only, or hybrid.
 *
 * If a custom component is used, it must pass through `className` and `style`
 */
function Button<As extends React.ElementType = "button">(
  props: ButtonProps<As>
): JSX.Element {
  const {
    as: Component = "button",
    children,
    icon,
    size = "normal",
    type = "solid",
    variant = "primary",
    color,
    className,
    style = {},
    ...rest
  } = props as BaseProps<As>;

  const styles: React.CSSProperties = { ...style };
  const colorMode = useColorMode();
  if (type !== "ghost") {
    const buttonColor = color ?? hybridColor(variant, colorMode);
    Object.assign(styles, makeColors(buttonColor));
  }

  // Remove all other properties and pass props down to component
  const correctedRest = { ...rest };
  delete (correctedRest as Record<string, unknown>).color;
  delete (correctedRest as Record<string, unknown>).variant;

  let content: React.ReactNode;
  if (isDefined(children) && isDefined(icon)) {
    content = (
      <Styled.Combined>
        <Styled.CombinedIcon>{icon}</Styled.CombinedIcon>
        <Styled.Content>{children}</Styled.Content>
      </Styled.Combined>
    );
  } else content = children ?? <Styled.Icon>{icon}</Styled.Icon>;

  return (
    <Component
      {...correctedRest}
      className={cx(
        buttonClass,
        className,
        typeClasses[type],
        sizeClasses[size]
      )}
      style={styles}
      tabIndex={0}
    >
      <Styled.ButtonContent tabIndex={-1}>{content}</Styled.ButtonContent>
    </Component>
  );
}

export default Button;

/**
 * Creates a button component that can be wrapped via `styled`.
 */
export function StylableButton<As extends React.ElementType>(): React.FC<
  ButtonProps<As>
> {
  return (props): JSX.Element => <Button<As> {...props} />;
}

// ? ================
// ? Helper functions
// ? ================

type ColorSet = {
  "--button-color": string;
  "--button-foreground": string;
  "--button-glow-color": string;
  "--button-hover-color": string;
  "--button-active-color": string;
};

const memoSets: Map<string, ColorSet> = new Map();

/**
 * Memoizes making the color variants used for a button
 * @param base - Base literal CSS color expression (non-variable)
 */
function makeColors(base: string): ColorSet {
  const prev = memoSets.get(base);
  if (isDefined(prev)) return prev;
  const set = {
    "--button-color": base,
    "--button-foreground": readableColor(
      base,
      staticColor("light"),
      staticColor("dark")
    ),
    "--button-glow-color": transparentize(0.5, base),
    "--button-hover-color": darken(0.04, base),
    "--button-active-color": darken(0.08, base),
  };
  memoSets.set(base, set);
  return set;
}
