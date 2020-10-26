import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";

import { OtherColors } from "@app/theme/color";
import { staticColor } from "@architus/facade/theme/color";
import { gap } from "@architus/facade/theme/spacing";

export const windowPaddingBottom = gap.pico;
export const windowBorderRadius = "8px";

const Chrome = styled.figcaption`
  height: 37px;
  border-bottom: 1px solid rgba($-dark, 0.15);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  padding-left: 16px;
  padding-right: 16px;
`;

const Styled = {
  Window: styled.figure<{ noPadding: boolean }>`
    position: relative;
    padding-bottom: ${windowPaddingBottom};
    border-radius: ${windowBorderRadius};

    &[data-variant="discord"] {
      background-color: ${OtherColors.DiscordBg};

      ${Chrome} {
        border-bottom: none !important;
        background-color: ${OtherColors.DiscordChromeBg};
      }
    }
  `,
  Chrome,
  ChromeButton: styled.span`
    display: inline-block;
    border-radius: 50%;
    min-width: 12px;
    height: 12px;
    margin: 14px 8px 12px 0;
    background-color: ${transparentize(0.6, staticColor("light"))};
  `,
};

export type WindowProps = {
  children: React.ReactNode;
  variant: "discord";
  className?: string;
  style?: React.CSSProperties;
  noPadding?: boolean;
  noChrome?: boolean;
} & Partial<React.HTMLAttributes<HTMLElement>>;

const Window: React.FC<WindowProps> = ({
  children,
  variant = "light",
  className,
  style,
  noPadding = false,
  noChrome = false,
  ...rest
}) => (
  <Styled.Window
    noPadding={noPadding}
    className={className}
    style={style}
    data-variant={variant}
    {...rest}
  >
    {!noChrome ? (
      <Styled.Chrome>
        <Styled.ChromeButton />
        <Styled.ChromeButton />
        <Styled.ChromeButton />
      </Styled.Chrome>
    ) : null}
    {children}
  </Styled.Window>
);

Window.displayName = "Window";

export default Window;
