import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";

import { Layout, AutoLink } from "@app/components";
import Footers from "@app/components/Footers";
import {
  color,
  mode,
  staticColor,
  ColorMode,
} from "@architus/facade/theme/color";
import { up, down } from "@architus/facade/theme/media";
import { pattern } from "@architus/facade/theme/patterns";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Layout: styled.div`
    background-color: ${color("bg")};
    color: ${color("text")};
    overflow: hidden;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    text-align: center;
  `,
  Content: styled.div`
    max-width: 360px;
    position: relative;
    z-index: 1;
    padding: ${gap.milli} ${gap.nano} ${gap.milli};

    ${up("lg")} {
      padding-top: ${gap.kilo};
      padding-bottom: ${gap.kilo};
    }

    /* Add dot background "hangers" on content div */
    &::before,
    &::after {
      position: absolute;
      content: "";
      opacity: 0.15;
      pointer-events: none;

      ${mode(ColorMode.Light)} {
        background: ${pattern("dotGrid")(
          transparentize(0.6, staticColor("dark"))
        )};
      }

      ${mode(ColorMode.Dark)} {
        background: ${pattern("dotGrid")(
          transparentize(0.6, staticColor("light"))
        )};
      }
    }

    &::before {
      top: 45px;
      bottom: -32px;
      left: 0;
      width: 130%;
      height: 100%;
      margin-left: -30%;
    }

    &::after {
      top: 100px;
      right: 0;
      width: 20%;
      height: 75%;
      margin-right: -30%;
    }
  `,
  PageTitle: styled.h2`
    color: ${color("textStrong")};
    font-size: 7rem;
    font-weight: 200;
    margin-bottom: ${gap.pico};
    line-height: 1;

    ${down("md")} {
      font-size: 4.5rem;
    }
  `,
  Subtitle: styled.h3`
    font-size: 1.5rem;
    margin-bottom: ${gap.micro};
  `,
  Paragraph: styled.p`
    color: ${color("textFade")};
    margin-bottom: ${gap.pico};
  `,
};

export type NotFoundPageProps = {
  fromApp?: boolean;
};

const NotFoundPage: React.FC<NotFoundPageProps> = ({ fromApp = false }) => (
  <Layout title="Not Found" noHeader={fromApp}>
    <Styled.Layout>
      <Styled.Content>
        <Styled.PageTitle>404</Styled.PageTitle>
        <Styled.Subtitle>Page not found</Styled.Subtitle>
        <Styled.Paragraph>
          The page you&apos;re looking for doesn&apos;t exist or was removed.
        </Styled.Paragraph>
        <Styled.Paragraph>
          If you feel this is an error, please file a new issue{" "}
          <AutoLink to="https://github.com/architus/archit.us/issues/new">
            on GitHub
          </AutoLink>
        </Styled.Paragraph>
      </Styled.Content>
    </Styled.Layout>
    <Footers />
  </Layout>
);

export default NotFoundPage;
