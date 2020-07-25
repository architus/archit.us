import { styled } from "linaria/react";
import { transparentize, darken, lighten } from "polished";
import React from "react";
import { Button } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import { shallowEqual } from "react-redux";

import { withBasePath } from "@app/api";
import {
  messageSets,
  allowedCommands,
  customEmotes,
} from "@app/assets/demo.json";
import LogsSvg from "@app/assets/images/logs.svg";
import MusicSvg from "@app/assets/images/music.svg";
import StatisticsSvg from "@app/assets/images/statistics.svg";
import UserControlSvg from "@app/assets/images/user_control.svg";
import {
  Card as GlassCard,
  Window,
  Layout,
  DiscordMock,
  ErrorBoundary,
} from "@app/components";
import { CustomEmojiExtension } from "@app/components/DiscordMock/CustomEmojiExtension";
import { Extension } from "@app/components/DiscordMock/util";
import Footers from "@app/components/Footers";
import LoginButton, { useOauthUrl } from "@app/components/LoginButton";
import { Link } from "@app/components/Router";
import { useBotStats } from "@app/data/bot-stats";
import { Container } from "@app/layout";
import { useSessionStatus } from "@app/store/actions";
import { useSelector, useDispatch } from "@app/store/hooks";
import { guildCount as guildCountRoute } from "@app/store/routes";
import { useEffectOnce, useCallbackOnce } from "@app/utility";
import { DiscordMockContext, DiscordMockCommands } from "@app/utility/types";
import Badge from "@architus/facade/components/Badge";
import Card from "@architus/facade/components/Card";
import Gap from "@architus/facade/components/Gap";
import Logo from "@architus/facade/components/Logo";
import {
  color,
  mode,
  ColorMode,
  staticColor,
  dynamicColor,
} from "@architus/facade/theme/color";
import { down, up, BreakpointKey } from "@architus/facade/theme/media";
import { pattern } from "@architus/facade/theme/patterns";
import { shadow } from "@architus/facade/theme/shadow";
import { gap } from "@architus/facade/theme/spacing";
import { Option } from "@architus/lib/option";

const Content = styled.article`
  & :not(pre) > code,
  :not(pre) > code {
    color: ${color("primary")};
    display: inline-block;
    background-color: ${color("bg+10")};
    border-radius: 4px;
    border: 1px solid ${color("contrastBorder")};
    padding: 0.1em 0.35em 0.05em;
    font-size: 87.5%;
  }
`;

const Styled = {
  Footers: styled(Footers)`
    footer:nth-of-type(2n + 1) {
      box-shadow: none;

      ${mode(ColorMode.Dark)} {
        background-color: ${darken(0.02, dynamicColor("bg", ColorMode.Dark))};

        ${Card} {
          background-color: ${lighten(
            0.02,
            dynamicColor("bg", ColorMode.Dark)
          )};
        }
      }
    }

    footer:nth-of-type(2n + 2) {
      ${mode(ColorMode.Dark)} {
        background-color: ${color("bg-10")};
      }
    }
  `,
};

const IndexPage: React.FC = () => {
  // Get the cached guild/user counts from the route data (cached upon site build)
  const botStatsOption = useBotStats();

  // Get the live guild/user counts from the store
  const {
    guildCount: storeGuildCount,
    userCount: storeUserCount,
  } = useSelector((state) => {
    return state.guildCount;
  }, shallowEqual);

  // Load the guild/user counts upon page load to get the live values
  const dispatch = useDispatch();
  useEffectOnce(() => {
    dispatch(guildCountRoute());
  });

  const derivedGuildCount = Option.from(storeGuildCount)
    .orElse(() => botStatsOption.map((stats) => stats.guildCount))
    .getOrElse(0);
  const derivedUserCount = Option.from(storeUserCount)
    .orElse(() => botStatsOption.map((stats) => stats.userCount))
    .getOrElse(0);

  return (
    <Layout title="Home">
      <article>
        <Lead guildCount={derivedGuildCount} userCount={derivedUserCount} />
        <Features />
        <MinorFeatures />
        <BottomCta />
        <Styled.Footers />
      </article>
    </Layout>
  );
};

export default IndexPage;

// ? ==============
// ? Lead component
// ? ==============

const LeadStyled = {
  // Cube background outer div
  Outer: styled.div`
    position: relative;
    background-color: ${color("bg-10")};
    background-repeat: repeat;
    background-position: center;

    ${mode(ColorMode.Dark)} {
      background-image: ${pattern("cube")(
        transparentize(0.95, staticColor("light"))
      )};
    }

    ${mode(ColorMode.Light)} {
      background-image: ${pattern("cube")(
        transparentize(0.94, staticColor("dark"))
      )};
    }

    ${down("md")} {
      padding: ${gap.centi} 0;
    }

    ${up("md")} {
      padding: ${gap.kilo} 0;
    }

    /* Add inner shadow to the bottom */
    box-shadow: inset 0 -14px 15px -14px ${color("shadowMedium")};
  `,
  Layout: styled(Container)`
    display: grid;
    grid-gap: ${gap.centi};
    grid: auto-flow / 1fr;

    ${down("lg")} {
      grid-gap: ${gap.milli};
    }

    ${up("lg")} {
      grid-template-columns: 2fr 1fr;
      & > *:nth-child(2n + 1) {
        grid-column: 1 / 3;
      }

      & > *:nth-child(2n + 2) {
        grid-column: 3;
      }
    }
  `,
  Block: styled(Content)`
    color: ${color("textStrong")};
    font-size: 1.1em;

    em {
      font-style: normal;
      font-weight: 600;
    }

    & > p {
      margin-bottom: 0;
    }
  `,
  Logo: styled(Logo.Logotype)`
    fill: ${color("textStrong")};
    width: auto;
    height: 55px;
  `,
  CtaWrapper: styled.div`
    /* Centers elements vertically */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  `,
  CtaTitle: styled.h4`
    font-size: 1.2em;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.9;
  `,
  LoginButton: styled(LoginButton)`
    & p {
      margin-bottom: ${gap.micro};
    }
  `,
};

type LeadProps = {
  guildCount: number;
  userCount: number;
};

/**
 * First section on the home page, used as an above-the-fold
 * lead section with a Bootstrap-like jumbotron
 * and a call-to-action.
 *
 * Additionally, shows formatted guild/user counts
 */
const Lead: React.FC<LeadProps> = ({ guildCount, userCount }) => (
  <LeadStyled.Outer>
    <LeadStyled.Layout>
      <LeadStyled.Block>
        <LeadStyled.Logo />
        <Gap amount="milli" />
        <p>
          General purpose Discord bot supporting{" "}
          <em>advanced role management</em>,{" "}
          <em>custom emotes for non-nitro users</em>,{" "}
          <em>configurable response commands</em>, and more.
        </p>
        <Gap amount="nano" />
        <p>
          Use the web dashboard to add architus to your servers, manage server
          settings such as <em>emotes and responses</em>, and view extensive{" "}
          <em>audit logs</em>.
        </p>
        <Gap amount="micro" />
        <p>
          architus is currently serving <code>{guildCount} servers</code> and{" "}
          <code>{userCount} users</code>
        </p>
      </LeadStyled.Block>
      <LeadStyled.CtaWrapper>
        <GlassCard>
          <LeadStyled.CtaTitle>Getting Started</LeadStyled.CtaTitle>
          <Gap amount="micro" />
          <LeadStyled.LoginButton />
        </GlassCard>
      </LeadStyled.CtaWrapper>
    </LeadStyled.Layout>
  </LeadStyled.Outer>
);

// ? ==================
// ? Features component
// ? ==================

const FeaturesStyled = {
  Outer: styled.div`
    color: text;
    background-color: ${color("bg")};
    border-top: 1px solid ${color("contrastBorder")};
    position: relative;
    overflow: hidden;

    /* Add inner shadow to the bottom */
    box-shadow: inset 0 -14px 15px -14px ${color("shadowMedium")};

    ${down("md")} {
      padding: ${gap.centi} 0;
    }

    ${up("md")} {
      padding: ${gap.kilo} 0;
    }
  `,
  Heading: styled.h2`
    font-size: 2.5rem;
    font-weight: 300;
    text-align: center;

    ${down("md")} {
      margin-bottom: ${gap.milli};
    }

    ${up("md")} {
      margin-bottom: ${gap.centi};
    }
  `,
  Underline: styled.span`
    border-bottom: 2px dashed;

    ${mode(ColorMode.Dark)} {
      border-bottom-color: ${transparentize(
        0.2,
        dynamicColor("primary", ColorMode.Dark)
      )};
    }

    ${mode(ColorMode.Light)} {
      border-bottom-color: ${transparentize(
        0.2,
        dynamicColor("primary", ColorMode.Light)
      )};
    }
  `,
  RaisedWindow: styled(Window)`
    box-shadow: ${shadow("z3")};
    ${mode(ColorMode.Dark)} {
      box-shadow: ${shadow("z2")};
    }
  `,
};

type FeaturesProps = {};

/**
 * Second section on the home page, used to contain interactive
 * Discord mock demos of Architus' features
 */
const Features: React.FC<FeaturesProps> = () => (
  <FeaturesStyled.Outer>
    <Container>
      <FeaturesStyled.Heading>
        <FeaturesStyled.Underline>Features</FeaturesStyled.Underline>
      </FeaturesStyled.Heading>
      <Feature
        side="left"
        lead="Have architus listen for predefined phrases"
        header="Automatic Responses"
        content={
          <>
            <p>
              Users can configure architus to listen for and respond to message
              patterns using an extensive syntax. Response pattern fragments
              include:
            </p>
            <ul>
              <li>random nouns and adjectives</li>
              <li>a mention of the responded-to user</li>
              <li>an incrementing count</li>
              <li>randomly selected phrases</li>
              <li>the option to add reactions to the original message</li>
            </ul>
            <TryCta side="left" />
          </>
        }
      >
        <FeaturesStyled.RaisedWindow variant="discord">
          <ErrorBoundary fallback={<div style={{ height: 400 }} />}>
            <DiscordMock
              height={400}
              channelName="auto-response-demo"
              messageSets={messageSets.autoResponse}
              allowedCommands={allowedCommands.autoResponse}
              loop
            />
          </ErrorBoundary>
        </FeaturesStyled.RaisedWindow>
      </Feature>
      <Gap amount="kilo" />
      <Feature
        side="right"
        lead="Let non-nitro members use unlimited custom emoji"
        header="Custom Emoji"
        content={
          <>
            <p>
              The custom emoji module allows for effectively unlimited custom
              emoji to be used on a server, working by replacing a user&rsquo;s
              message with another that has the hot-loaded emotes included. Both
              standard and animated emotes are supported, and the syntax is the
              same as normal Discord emotes (<code>:shortcode:</code>). Use the
              <code>!emotes</code> command to view a list of all available
              emotes.
            </p>
            <TryCta side="right" />
          </>
        }
      >
        <FeaturesStyled.RaisedWindow variant="discord">
          <ErrorBoundary fallback={<div style={{ height: 400 }} />}>
            <DiscordMock
              height={400}
              channelName="custom-emoji-demo"
              messageSets={messageSets.customEmoji}
              allowedCommands={allowedCommands.customEmoji}
              offline
              loop
              // Inject custom emotes into custom emoji extension
              extensionCreator={useCallbackOnce(
                (
                  context: DiscordMockContext,
                  commands: DiscordMockCommands
                ): Extension =>
                  new CustomEmojiExtension(customEmotes, context, commands)
              )}
            />
          </ErrorBoundary>
        </FeaturesStyled.RaisedWindow>
      </Feature>
      <Gap amount="kilo" />
      <Feature
        side="left"
        lead="Conduct votes or schedule events"
        header="Polls & Schedules"
        content={
          <>
            <p>
              With the <code>!poll</code> command, users can conduct
              reaction-based votes that include up to 10 custom options per
              poll. Similarly, <code>!schedule</code> lets users create
              scheduled events that other users can react to, giving a
              convenient way to gauge future attendance.
            </p>
            <TryCta side="left" />
          </>
        }
      >
        <FeaturesStyled.RaisedWindow variant="discord">
          <ErrorBoundary fallback={<div style={{ height: 400 }} />}>
            <DiscordMock
              height={400}
              channelName="polls-schedules-demo"
              messageSets={messageSets.pollsSchedules}
              allowedCommands={allowedCommands.pollsSchedules}
              loop
            />
          </ErrorBoundary>
        </FeaturesStyled.RaisedWindow>
      </Feature>
    </Container>
  </FeaturesStyled.Outer>
);

// ? ================
// ? TryCta component
// ? ================

const TryCtaStyled = {
  Outer: styled.div<{ side: "left" | "right" }>`
    color: ${color("textStrong")};
    font-weight: 500;
    font-style: italic;
    margin-top: ${gap.micro};
    text-align: ${(props): string => props.side};

    & svg {
      margin-left: ${(props): string =>
        props.side === "left" ? "0" : gap.nano};
      margin-right: ${(props): string =>
        props.side === "left" ? gap.nano : "0"};
      transform: ${(props): string =>
        props.side === "left" ? "rotate(180deg)" : "none"};

      ${down("lg")} {
        transform: rotate(90deg);
      }
    }
  `,
};

type TryCtaProps = { side: "left" | "right" };

/**
 * Displays the "Try it out" call-to-action used at the bottom of feature descriptions
 * that reside next to Discord Mocks
 */
const TryCta: React.FC<TryCtaProps> = ({ side }) => (
  <TryCtaStyled.Outer side={side}>
    {side === "left" && <FaChevronRight />}
    Try it out
    {side === "right" && <FaChevronRight />}
  </TryCtaStyled.Outer>
);

// ? =================
// ? Feature component
// ? =================

const FeatureStyled = {
  Layout: styled.section`
    display: grid;
    grid: auto-flow / 1fr;
    grid-gap: ${gap.milli};
    grid-template-areas:
      "text"
      "demo";

    & > *:nth-child(2n + 1) {
      grid-area: text;
    }

    & > *:nth-child(2n + 2) {
      grid-area: demo;
    }

    ${up("lg")} {
      grid-template-columns: 1fr 1fr;
      grid-template-areas: "demo text";
      grid-gap: ${gap.centi};

      &[data-side="right"] {
        & > *:nth-child(2n + 1) {
          grid-area: demo;
        }

        & > *:nth-child(2n + 2) {
          grid-area: text;
        }
      }
    }
  `,
  Content: styled(Content)`
    /* Center contents vertically */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    position: relative;

    & p,
    & ul,
    & ol {
      color: ${color("textFade")};
      margin-bottom: ${gap.nano};
    }

    & h3 {
      color: ${color("textStrong")};
      margin-bottom: ${gap.micro};
    }
  `,
  Subheading: styled.h4`
    font-size: 0.9em;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.9;
    color: ${color("textFade")};
    margin-bottom: ${gap.femto};
  `,
  Dots: styled.div`
    &::before,
    &::after {
      z-index: -1;
      position: absolute;
      content: "";
      opacity: 0.22;
      pointer-events: none;

      ${mode(ColorMode.Light)} {
        background: ${pattern("dotGrid")(
          transparentize(0.6, staticColor("dark"))
        )};
      }

      ${mode(ColorMode.Dark)} {
        background: ${pattern("dotGrid")(
          transparentize(0.65, staticColor("light"))
        )};
      }
    }

    &::before {
      top: 45px;
      bottom: -32px;
      width: 130%;
      height: 100%;
    }

    &::after {
      top: 100px;
      width: 20%;
      height: 75%;
    }

    &[data-side="left"] {
      &::before {
        left: 0;
        margin-left: -65%;
      }

      &::after {
        right: 0;
        margin-right: 5%;
      }
    }

    &[data-side="right"] {
      &::before {
        right: 0;
        margin-right: -65%;
      }

      &::after {
        left: 0;
        margin-left: 5%;
      }
    }
  `,
};

type FeatureProps = {
  side?: "left" | "right";
  children: React.ReactNode;
  lead: React.ReactNode;
  header: React.ReactNode;
  content: React.ReactNode;
};

/**
 * Used to display a major feature, usually paired with a Discord mock
 */
const Feature: React.FC<FeatureProps> = ({
  side = "left",
  children,
  lead,
  header,
  content,
}) => (
  <FeatureStyled.Layout data-side={side}>
    <FeatureStyled.Content>
      <FeatureStyled.Dots data-side={side}>
        <FeatureStyled.Subheading>{lead}</FeatureStyled.Subheading>
        <h3>{header}</h3>
        <div>{content}</div>
      </FeatureStyled.Dots>
    </FeatureStyled.Content>
    <div>{children}</div>
  </FeatureStyled.Layout>
);

// ? =======================
// ? MinorFeatures component
// ? =======================

const bottomCtaOverlapBreakpoint: BreakpointKey = "lg";
const bottomCtaOverlayOffset = gap.kilo;

const MinorFeaturesStyled = {
  Outer: styled.div`
    background-color: ${color("bg+10")};
    border-top: 1px solid ${color("contrastBorder")};
    border-bottom: 1px solid ${color("contrastBorder")};

    --offset: 0px;
    --base-padding: ${gap.centi};

    ${up(bottomCtaOverlapBreakpoint)} {
      --offset: ${bottomCtaOverlayOffset};
      --base-padding: ${gap.kilo};
    }

    padding-top: var(--base-padding);
    padding-bottom: calc(var(--base-padding) + var(--offset));
  `,
  Layout: styled.div`
    display: grid;
    grid-gap: ${gap.centi};
    grid: auto-flow / 1fr;

    ${down("lg")} {
      grid-gap: ${gap.milli};
    }

    ${up("lg")} {
      grid-template-columns: 1fr 1fr;
      & > *:nth-child(2n + 1) {
        grid-column: 1;
      }

      & > *:nth-child(2n + 2) {
        grid-column: 2;
      }
    }
  `,
};

type MinorFeatures = {};

const MinorFeatures: React.FC<MinorFeatures> = () => (
  <MinorFeaturesStyled.Outer>
    <Container>
      <MinorFeaturesStyled.Layout>
        <MinorFeature
          header="Message history statistics/analytics"
          icon={StatisticsSvg}
          text={
            <p>
              Let users learn who sends the most messages or misspells the most
              words with message history analytics that search the
              server&rsquo;s message records.
            </p>
          }
        />
        <MinorFeature
          header={
            <span>
              Extensive server and internal logs{" "}
              <Badge variant="primary">Coming soon</Badge>
            </span>
          }
          icon={LogsSvg}
          text={
            <p>
              View, search, and export server audit logs from within the web
              dashboard, including information about message sends/deletes, user
              joins, and internal architus logs.
            </p>
          }
        />
        <MinorFeature
          header="Voice chat-enabled music playback"
          icon={MusicSvg}
          text={
            <p>
              Play music from Spotify and Youtube directly in voice chat using{" "}
              <code>!play</code>, or defer to other music playing bots if
              available.
            </p>
          }
        />
        <MinorFeature
          header="Per-server role management"
          icon={UserControlSvg}
          text={
            <p>
              Control which users have permissions to configure architus
              settings on a per server basis, and let users automatically assign
              themselves roles using <code>!role</code>.
            </p>
          }
        />
      </MinorFeaturesStyled.Layout>
    </Container>
  </MinorFeaturesStyled.Outer>
);

// ? ======================
// ? MinorFeature component
// ? ======================

const MinorFeatureStyled = {
  Outer: styled(Content)`
    text-align: center;

    ${up("lg")} {
      & > * {
        max-width: 80%;
        margin-left: auto;
        margin-right: auto;
      }
    }

    /* Inline code blocks need an even lighter background */
    & :not(pre) > code,
    :not(pre) > code {
      background-color: ${color("bg+20")};
    }
  `,
  Header: styled.h3`
    color: ${color("textStrong")};
    font-size: 20px;
    font-weight: 400;
    margin-bottom: ${gap.femto};
  `,
  Text: styled.div`
    color: ${color("textFade")};
  `,
  Icon: styled.div`
    --size: 80px;
    width: var(--size);
    height: var(--size);
    margin: 0 auto ${gap.nano};
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    color: ${color("primary")};

    ${down("md")} {
      --size: 60px;
    }

    /* Lighten/desaturate the icon in dark mode to make it appear correctly */
    ${mode(ColorMode.Dark)} {
      color: ${color("light")};
      opacity: 0.7;
    }
  `,
};

type MinorFeatureProps = {
  header: React.ReactNode;
  text: React.ReactNode;
  icon: React.ComponentType<React.SVGAttributes<SVGElement>>;
};

/**
 * Used to display additional features that include a small SVG icon and descriptive text
 */
const MinorFeature: React.FC<MinorFeatureProps> = ({
  header,
  text,
  icon: FeatureIcon,
}) => (
  <MinorFeatureStyled.Outer>
    <MinorFeatureStyled.Icon>
      <FeatureIcon />
    </MinorFeatureStyled.Icon>
    <MinorFeatureStyled.Header>{header}</MinorFeatureStyled.Header>
    <MinorFeatureStyled.Text>{text}</MinorFeatureStyled.Text>
  </MinorFeatureStyled.Outer>
);

// ? ===================
// ? BottomCta component
// ? ===================

const BottomCtaStyled = {
  Outer: styled.div`
    position: relative;
    background-color: ${color("bg-10")};
    background-repeat: repeat;
    background-position: center;

    ${mode(ColorMode.Dark)} {
      background-image: ${pattern("cube")(
        transparentize(0.95, staticColor("light"))
      )};
    }

    ${mode(ColorMode.Light)} {
      background-image: ${pattern("cube")(
        transparentize(0.94, staticColor("dark"))
      )};
    }

    /* Add inner shadows to the top and bottom */
    box-shadow: inset 0 14px 15px -14px ${color("shadowMedium")},
      inset 0 -14px 15px -14px ${color("shadowMedium")};

    padding-bottom: centi;

    /* Add padding to the top and sides on small screen sizes */
    ${down("lg")} {
      padding-left: ${gap.micro};
      padding-right: ${gap.micro};
      padding-top: ${gap.centi};
    }
  `,
  Divider: styled.hr`
    max-width: 300px;
    margin-right: auto;
    border-style: dashed;
    margin-top: 0;
    margin-bottom: 0;

    /* Move hr on large screen sizes so it aligns with the shift on the card above */
    ${up("lg")} {
      margin-top: -${gap.milli};
    }
  `,
  Card: styled(GlassCard)`
    position: relative;
    box-shadow: 2;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;

    & p {
      color: ${color("textFade")};
    }

    ${up(bottomCtaOverlapBreakpoint)} {
      /* Perform a shift on large screen sizes so that it overlaps the previous section */
      top: -${bottomCtaOverlayOffset};
      /* Add additional padding on large screen sizes */
      padding: ${gap.centi} !important;

      /* Make intensity of frosted glass effect slightly less on large screen sizes */
      &::before {
        opacity: 0.7 !important;
      }

      box-shadow: ${shadow("z3")} !important;
    }

    /* Add margins on the bottom on small screen sizes */
    ${down("lg")} {
      margin-bottom: ${gap.centi};
    }
  `,
  Header: styled.h4`
    font-size: 2.2em;
    font-weight: 300;

    em {
      font-weight: 400;
      font-style: normal;
    }
  `,
  Button: styled(Button)`
    svg {
      margin-left: 0;
      width: 0 !important;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    &:hover {
      svg {
        margin-left: 1rem;
        width: 12.5px !important;
        opacity: 1;
      }
    }
  `,
};

type BottomCtaProps = {};

/**
 * Bottom section of the home page,
 * used to display a card with a button that acts as a call to action.
 * On large screens, the card floats above the layout
 */
const BottomCta: React.FC<BottomCtaProps> = () => {
  const { isSignedIn } = useSessionStatus();
  const oauthUrl = useOauthUrl();
  const buttonProps = isSignedIn
    ? { as: Link, to: withBasePath("/app") }
    : { href: oauthUrl };

  return (
    <BottomCtaStyled.Outer>
      <Container>
        <BottomCtaStyled.Card>
          <BottomCtaStyled.Header>
            See what <em>architus</em> can do for you
          </BottomCtaStyled.Header>
          <Gap amount="micro" />
          <p>
            Connect with Discord to get a link that adds architus to your
            server.
          </p>
          <Gap amount="milli" />
          <BottomCtaStyled.Button
            variant="primary"
            size="lg"
            {...(buttonProps as React.ComponentProps<
              typeof BottomCtaStyled.Button
            >)}
          >
            Get Started
            <FaChevronRight />
          </BottomCtaStyled.Button>
        </BottomCtaStyled.Card>
        <BottomCtaStyled.Divider />
      </Container>
    </BottomCtaStyled.Outer>
  );
};
