import { css } from "linaria";
import { styled } from "linaria/react";
import React, { useContext } from "react";
import { BsMoon } from "react-icons/bs";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

import {
  color,
  ColorMode,
  ColorModeContext,
} from "@architus/facade/theme/color";
import { transition } from "@architus/facade/theme/motion";
import { gap } from "@architus/facade/theme/spacing";
import { Option } from "@architus/lib/option";
import { useSocials } from "@docs/data/socials";

export const actionBarSpacing = gap.pico;

// Share styles between anchor and button elements
const buttonClass = css`
  padding: ${actionBarSpacing} ${actionBarSpacing};
  color: ${color("light")};
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > svg {
    position: relative;
    /* top: -2px; */
  }

  ${transition(["opacity"])}
  opacity: 0.7;

  &:hover,
  &:focus {
    opacity: 0.9;
  }

  &:active {
    opacity: 1;
  }
`;

const Styled = {
  Separator: styled.span`
    border-left: 2px solid ${color("light")};
    margin: ${gap.nano} ${gap.pico};
    opacity: 0.3;
  `,
};

/**
 * Bar of buttons placed at the top of the page in the header
 * (for example, the dark mode button)
 */
const HeaderActionBar: React.FC = () => {
  const socials = useSocials();
  const hasSocial =
    Object.values(socials).findIndex((option: Option<unknown>) =>
      option.isDefined()
    ) !== -1;

  return (
    <>
      {hasSocial && (
        <>
          {socials.discord.isDefined() && (
            <SocialButton to={socials.discord.get} title="Discord server">
              <FaDiscord />
            </SocialButton>
          )}
          {socials.github.isDefined() && (
            <SocialButton to={socials.github.get} title="GitHub">
              <FaGithub />
            </SocialButton>
          )}
          <Styled.Separator />
        </>
      )}
      <ColorModeToggle />
    </>
  );
};

export default HeaderActionBar;

// ? ==============
// ? Sub-components
// ? ==============

const SocialButton: React.FC<{ to: string; title: string }> = ({
  to,
  title,
  children,
}) => (
  <a
    rel="noreferrer"
    target="_blank"
    href={to}
    className={buttonClass}
    title={title}
  >
    {children}
  </a>
);

const ColorModeToggle: React.FC = () => {
  const { mode, setMode } = useContext(ColorModeContext);

  // Don't render anything at compile time. Deferring rendering until we
  // know which theme to use on the client avoids incorrect initial
  // state being displayed.
  if (typeof window === "undefined") return null;

  const isDark = mode === ColorMode.Dark;
  return (
    <button
      className={buttonClass}
      onClick={(): void => setMode(isDark ? ColorMode.Light : ColorMode.Dark)}
      title="Switch color mode"
    >
      {isDark ? <BsMoon /> : <IoMdSunny />}
    </button>
  );
};
