import React from "react";
import styled, { Box, BoxProps, down, css } from "@xstyled/emotion";
import { Container } from "react-bootstrap";
import Header from "Components/Header";
import Icon from "Components/Icon";
import Card from "Components/Card";
import { Space, ColorMode, Breakpoint, mode } from "Theme";
import { WithBoxProps } from "Utility/types";
import { version } from "meta.json";

const Styled = {
  Footer: styled.asideBox`
    background-color: footer;
    color: light;
    padding-top: centi;
    padding-bottom: centi;

    & p {
      margin-bottom: 0;
    }

    // Center align the footer elements on small screen sizes
    ${down(
      Breakpoint.LG,
      css`
        text-align: center;

        & hr {
          margin-left: auto !important;
        }
      `
    )}
  `,
  Container: styled(Container)`
    padding-left: 0;
    padding-right: 0;
  `,
  Card: styled(Card)`
    // Eliminate the contrast border normally applied against light surfaces
    border: none;

    // Reduce the opacity of the light overlay on light theme
    ${mode(
      ColorMode.Light,
      css`
        &::before {
          opacity: 0.1;
        }
      `
    )}
  `,
  Brand: styled(Header.Brand)`
    opacity: 0.75;
    margin: 0;
    display: inline-block;
    line-height: initial;

    & a {
      pointer-events: none !important;
      color: light;
    }
  `,
  FooterPanel: styled.sectionBox`
    & a {
      color: light;
      font-weight: 400;
      position: relative;
      margin-bottom: femto;
      display: block;

      &:hover,
      &:active {
        text-decoration: underline;
      }

      .icon {
        position: relative;
        margin-right: nano;

        // Specific nudge to align links with other non-icon links
        margin-left: -28px;
      }
    }

    & p {
      color: light;
      opacity: 0.8;
    }

    & h3 {
      font-weight: 500;
      font-size: 1.2rem;
      color: light;
      opacity: 0.9;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    & hr {
      width: 75px;
      border: none;
      border-top: 2px solid $-primary;
      margin: {
        bottom: 1rem;
        left: 0;
        top: 0.6rem;
      }
    }
  `,
  BrandColumn: styled.sectionBox`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-around;
  `,
  // Align version string with brand icon
  VersionString: styled.div`
    position: relative;
    margin-left: 46px;
    margin-top: -5px;
    opacity: 0.5;
    text-align: left;
    color: light;
  `,
};

/**
 * Primary footer component used at the bottom of content (non-dashboard) pages
 *
 * TODO: Examine de-duplicating logic/styles in this and `docs.archit.us`
 */
const Footer: React.FC<BoxProps> = (boxProps) => (
  <Styled.Footer {...boxProps}>
    <Styled.Container>
      {/* Use the padding/-margin/padding pattern to add gutters to the columns */}
      <Box px={{ xs: "zero", lg: "milli" }}>
        <Box row mx={{ xs: "zero", lg: "-milli" as Space }}>
          <FooterPanel
            col={{ xs: 1, lg: 1 / 3, xl: 1 / 2 }}
            mb={{ xs: "milli", lg: "zero" }}
            px="micro"
            header="About"
          >
            <p>
              Architus is a multipurpose Discord bot empowering both admins and
              server members with the tools to have a more streamlined and
              enjoyable experience.
            </p>
          </FooterPanel>
          <FooterPanel
            col={{ xs: 1, lg: 1 / 6, xl: 1 / 6 }}
            mb={{ xs: "milli", lg: "zero" }}
            header="Links"
            // Shift the content to the right on large screen sizes to correct for the
            // icons' nudge
            pl={{ xs: "micro", lg: "milli" }}
            pr={{ xs: "micro", lg: "nano" }}
          >
            <a href="https://github.com/architus">
              <Icon name="github" />
              Github
            </a>
            <a href="https://status.archit.us/">Status</a>
            <a href="https://docs.archit.us/">Docs</a>
            <a href="https://discord.gg/svrRrSe">Discord Server</a>
          </FooterPanel>
          <Styled.BrandColumn col={{ xs: 1, lg: 1 / 2, xl: 2 / 6 }} px="micro">
            <Styled.Card
              display="flex"
              justifyContent="space-around"
              // Make sure the build tag doesn't cause the page to expand
              overflow="hidden"
            >
              <div>
                <Styled.Brand top />
                <Styled.VersionString>{version}</Styled.VersionString>
              </div>
            </Styled.Card>
          </Styled.BrandColumn>
        </Box>
      </Box>
    </Styled.Container>
  </Styled.Footer>
);

export default Footer;

// ? ==============
// ? Sub-components
// ? ==============

type FooterPanel = WithBoxProps<{
  children: React.ReactNode;
  header: React.ReactNode;
}>;

/**
 * Footer helper component to display a header/divider and a some sort of body
 */
const FooterPanel: React.FC<FooterPanel> = ({
  children,
  header,
  ...boxProps
}) => (
  <Styled.FooterPanel {...boxProps}>
    <h3>{header}</h3>
    <hr />
    <div>{children}</div>
  </Styled.FooterPanel>
);
