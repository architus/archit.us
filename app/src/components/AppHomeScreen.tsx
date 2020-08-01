import { styled } from "linaria/react";
import { transparentize, lighten, darken } from "polished";
import React from "react";

import AppHeroSvg from "@app/assets/images/app_hero.svg";
import PageTitle from "@app/components/PageTitle";
import { BaseAppProps } from "@app/tabs/types";
import { StylableButton } from "@architus/facade/components/Button";
import {
  dynamicColor,
  ColorMode,
  color,
  mode,
} from "@architus/facade/theme/color";
import { gap } from "@architus/facade/theme/spacing";

const BaseButton = StylableButton<"button">();
const Styled = {
  Outer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    height: 100%;
    position: relative;
    padding: 1rem;
  `,
  HeroImage: styled(AppHeroSvg)`
    max-width: 640px;
    height: auto;
    margin-top: 3rem;
    margin-bottom: 0.5rem;

    /* Style sub-elements in the SVG document */
    .str {
      stroke: #000000;
      stroke-width: 0.25;
      stroke-miterlimit: 10;
    }

    .cloud {
      opacity: 0.2;
      ${mode(ColorMode.Light)} {
        opacity: 0.08;
        fill: ${dynamicColor("bg", ColorMode.Dark)};
      }
    }

    .fg {
      fill: ${darken(0.24, dynamicColor("bg", ColorMode.Light))};
      ${mode(ColorMode.Dark)} {
        fill: ${lighten(0.24, dynamicColor("bg", ColorMode.Dark))};
      }
    }

    .strong-fg {
      fill: ${darken(0.4, dynamicColor("bg", ColorMode.Light))};
      ${mode(ColorMode.Dark)} {
        fill: ${lighten(0.4, dynamicColor("bg", ColorMode.Dark))};
      }
    }

    .strongest {
      fill: ${darken(0.16, dynamicColor("bg", ColorMode.Light))};
      ${mode(ColorMode.Dark)} {
        fill: ${darken(0.02, dynamicColor("bg", ColorMode.Dark))};
      }
    }

    .stronger {
      fill: ${darken(0.08, dynamicColor("bg", ColorMode.Light))};
      ${mode(ColorMode.Dark)} {
        fill: ${lighten(0.04, dynamicColor("bg", ColorMode.Dark))};
      }
    }

    .strong {
      fill: ${darken(0.02, dynamicColor("bg", ColorMode.Light))};
      ${mode(ColorMode.Dark)} {
        fill: ${lighten(0.12, dynamicColor("bg", ColorMode.Dark))};
      }
    }

    .bg {
      fill: ${darken(0.05, dynamicColor("bg", ColorMode.Light))};
      ${mode(ColorMode.Dark)} {
        fill: ${lighten(0.2, dynamicColor("bg", ColorMode.Dark))};
      }
    }
  `,
  Heading: styled.h2`
    margin-top: ${gap.milli};
    margin-bottom: ${gap.micro};
    text-align: center;
    font-size: 2.5rem;
    font-weight: 300;
  `,
  Text: styled.p`
    margin-bottom: ${gap.milli};
    max-width: 600px;
    text-align: center;
    color: ${color("textFade")};
  `,
  GlowWrapper: styled.div`
    border-radius: 1000rem;
    box-shadow: 0 6px 16px
      ${transparentize(0.5, dynamicColor("primary", ColorMode.Dark))};
  `,
  CtaButton: styled(BaseButton)`
    border-radius: 1000rem;
    padding-left: ${gap.micro};
    padding-right: ${gap.micro};
    &:hover {
      transform: translateY(1px);
    }
  `,
};

export type AppHomeScreenProps = BaseAppProps;

/**
 * Home screen/CTA shown upon opening up the app (when no tab is selected).
 * This may not be the best UX, it's possible this should be made
 * into an actually informative screen (or maybe let you easily select a guild)
 */
const AppHomeScreen: React.FC<AppHomeScreenProps> = ({ showGuildAddModal }) => (
  <>
    <PageTitle title="Get Started" />
    <Styled.Outer>
      <Styled.HeroImage />
      <Styled.Heading>Web Dashboard</Styled.Heading>
      <Styled.Text>
        Select a server on the left or add architus to a server to begin
      </Styled.Text>
      <Styled.GlowWrapper>
        <Styled.CtaButton
          onClick={showGuildAddModal}
          variant="primary"
          type="solid"
        >
          Add <strong> architus </strong> to a server
        </Styled.CtaButton>
      </Styled.GlowWrapper>
    </Styled.Outer>
  </>
);

export default AppHomeScreen;
