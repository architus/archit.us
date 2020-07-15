import { useStaticQuery, graphql } from "gatsby";
import { css } from "linaria";
import { styled } from "linaria/react";
import React, { useContext } from "react";
import { BsMoon } from "react-icons/bs";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

import { color, ColorMode } from "@design/theme/color";
import { transition } from "@design/theme/motion";
import { gap } from "@design/theme/spacing";
import { ColorModeContext } from "@docs/components/ColorModeProvider";
import { isDefined } from "@lib/utility";

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
  const data = useStaticQuery<GatsbyTypes.HeaderActionBarQuery>(graphql`
    query HeaderActionBar {
      site {
        siteMetadata {
          socials {
            github
            discord
          }
        }
      }
    }
  `);

  const socials = data?.site?.siteMetadata?.socials;
  const hasSocial = Object.values(socials ?? {}).findIndex(isDefined) !== -1;
  return (
    <>
      {isDefined(socials) && hasSocial && (
        <>
          {isDefined(socials.discord) && (
            <SocialButton to={socials.discord} title="Discord server">
              <FaDiscord />
            </SocialButton>
          )}
          {isDefined(socials.github) && (
            <SocialButton to={socials.github} title="GitHub">
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
