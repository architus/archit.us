import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";

import Footers from "@app/components/Footers";
import Layout from "@app/components/Layout";
import AutoLink from "@architus/facade/components/AutoLink";
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
    text-align: left;
  `,
  Content: styled.div`
    max-width: 660px;
    position: relative;
    z-index: 1;
    padding: ${gap.centi} ${gap.nano} ${gap.centi};

    ${up("md")} {
      padding-top: ${gap.kilo};
      padding-bottom: ${gap.kilo};
    }

    /* Add dot background "hangers" on content div */
    &::before,
    &::after {
      position: absolute;
      content: "";
      opacity: 0.25;
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
    font-size: 5rem;
    font-weight: 200;
    margin-bottom: ${gap.pico};
    line-height: 1;

    ${down("md")} {
      font-size: 4.5rem;
    }
  `,
  Subtitle: styled.h3`
    font-size: 1.5rem;
    margin: ${gap.micro} 0 ${gap.nano} 0;
  `,
  Paragraph: styled.p`
    color: ${color("textFade")};
    margin-bottom: ${gap.pico};
  `,
};

export type PrivacyPageProps = {
  fromApp?: boolean;
};


const PrivacyPage: React.FC<PrivacyPageProps> = ({ fromApp = false }) => (
  <Layout seo={{ title: "Privacy Policy" }} noHeader={fromApp}>
    <Styled.Layout>
      <Styled.Content>
        <Styled.PageTitle>Privacy Policy</Styled.PageTitle>
        <Styled.Paragraph>
          Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website, <AutoLink href="https://archit.us">archit.us</AutoLink>, and other sites we own and operate along with any services we offer.
        </Styled.Paragraph>
        <Styled.Subtitle>Stored Data</Styled.Subtitle>
        <Styled.Paragraph>
          Certain interactions with the bot may result in some of the following information being collected about you:
          <ul>
            <li>Username</li>
            <li>User ID</li>
            <li>Avatar</li>
            <li>Discriminator</li>
            <li>Server emoji</li>
            <li>Aggregate message data</li>
          </ul>
          <br/>

          You may opt out of aggregate message statistics by running <AutoLink href="https://docs.archit.us/commands/statistics/#optout">this command</AutoLink> in any server with architus. <br/><br/>
          
          Please fill out <AutoLink href="https://forms.gle/bLAsdkUxaq2btB6V7">this form</AutoLink> or contact us <AutoLink href="https://discord.gg/svrRrSe">in discord</AutoLink> to have your data removed from architus servers.
        </Styled.Paragraph>
        <Styled.Subtitle>Cookies</Styled.Subtitle>
        <Styled.Paragraph>
          Architus uses cookies to store authentication information.
        </Styled.Paragraph>
        <Styled.Subtitle>Analytics</Styled.Subtitle>
        <Styled.Paragraph>
          Architus uses an open source self-hosted analytics solution called <AutoLink href="https://umami.is/">umami</AutoLink> to keep your browsing data private.
        </Styled.Paragraph>
        <Styled.Subtitle>Changes to this Privacy Statement</Styled.Subtitle>
        <Styled.Paragraph>
          The contents of this statement may be altered at any time, at our discretion.
        </Styled.Paragraph>

      </Styled.Content>
    </Styled.Layout>
    <Footers />
  </Layout>
);

export default PrivacyPage;
