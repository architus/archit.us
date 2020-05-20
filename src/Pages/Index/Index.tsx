import React from "react";
import { shallowEqual } from "react-redux";
import LoginButton, { useOauthUrl } from "Components/LoginButton";
import { useRouteData } from "react-static";
import { useEffectOnce, isDefined, useCallbackOnce } from "Utility";
import { useSelector, useDispatch } from "Store/hooks";
import {
  Nil,
  DiscordMockContext,
  DiscordMockCommands,
  WithBoxProps,
} from "Utility/types";
import { useSessionStatus } from "Store/actions";
import { guildCount } from "Store/routes";
import { Container, Button, Badge } from "react-bootstrap";
import {
  Icon,
  Logo,
  Card,
  Window,
  Footer,
  Layout,
  DiscordMock,
  CubeBackground,
} from "Components";
import { Link } from "Components/Router";
import styled, { Box, down, css, up, BoxProps } from "@xstyled/emotion";
import { CustomEmojiExtension } from "Components/DiscordMock/CustomEmojiExtension";
import { Extension } from "Components/DiscordMock/util";
import { Space, ColorMode, mode, color, opacity } from "Theme";
import LogsSvg from "./svg/logs.svg";
import MusicSvg from "./svg/music.svg";
import StatisticsSvg from "./svg/statistics.svg";
import UserControlSvg from "./svg/user_control.svg";
import { messageSets, allowedCommands, customEmotes } from "./data.json";

const Content = styled.divBox`
  & :not(pre) > code,
  :not(pre) > code {
    color: primary;
    display: inline-block;
    background-color: b_500;
    border-radius: 4px;
    border: 1px solid ${color("contrast_border")};

    // Specific values to match font
    padding: 0.1em 0.35em 0.05em;
    font-size: 87.5%;
  }
`;

const Styled = {
  Lead: styled(CubeBackground)`
    // Add inner shadow to the bottom
    box-shadow: inset 0 -14px 15px -14px ${color("shadow_heavy")};
  `,
  CtaWrapper: styled.divBox`
    // Center contents vertically
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  `,
  Card,
  LeadText: styled(Content.withComponent("p"))`
    color: text;
    font-size: 1.1em;

    em {
      font-style: normal;
      font-weight: 600;
    }
  `,
  Container: styled(Container)`
    padding-left: zero;
    padding-right: zero;
  `,
  Features: styled.divBox`
    color: text;
    background-color: b_400;
    border-top: 1px solid ${color("contrast_border")};

    // Add inner shadow to the bottom
    box-shadow: inset 0 -14px 15px -14px ${color("shadow_heavy")};
  `,
  Underline: styled.span`
    border-bottom: 2px dashed ${opacity("primary", 0.8)};
  `,
  SmallCaps: styled.h4Box`
    font-size: 1.2em;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.9;
  `,
  Heading: styled.h2Box`
    font-size: 2.5rem;
    font-weight: 300;
  `,
  FeatureContent: styled(Content)`
    // Center contents vertically
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;

    & p,
    & ul,
    & ol {
      color: text_fade;
    }

    & h3 {
      color: text_strong;
    }
  `,
  RaisedWindow: styled(Window)`
    box-shadow: 3;
    ${mode(
      ColorMode.Dark,
      css`
        box-shadow: 2;
      `
    )};
  `,
  TryCta: styled.pBox`
    color: text_strong;
    font-weight: 500;
    font-style: italic;
    margin-top: milli;
    margin-bottom: zero;

    // Hide the call to action text on small screen sizes (where the feature columns
    // collapse and the arrows no longer make sense)
    ${down(
      "lg",
      css`
        display: none;
      `
    )}
  `,
  MinorFeatures: styled.divBox`
    background-color: b_500;
    border-top: 1px solid ${color("contrast_border")};
    border-bottom: 1px solid ${color("contrast_border")};
  `,
  MinorFeature: styled(Content)`
    text-align: center;

    ${up(
      "lg",
      css`
        & > * {
          max-width: 80%;
          margin-left: auto;
          margin-right: auto;
        }
      `
    )}

    & h3 {
      color: text_strong;
      font-size: 20px;
      font-weight: 400;
      margin-bottom: femto;
    }

    & p {
      color: text_fade;
    }

    // Inline code blocks need an even lighter background
    & :not(pre) > code,
    :not(pre) > code {
      background-color: b_600;
    }
  `,
  MinorFeatureIcon: styled.div`
    width: 80px;
    height: 80px;
    margin: 0 auto nano;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    // Lighten/desaturate the icon in dark mode to make it appear correctly
    ${mode(
      ColorMode.Dark,
      css`
        filter: brightness(2) saturate(0%);
        opacity: 0.7;
      `
    )};
  `,
  BottomCta: styled(CubeBackground)`
    // Add inner shadows to the top and bottom
    box-shadow: inset 0 14px 15px -14px ${color("shadow_heavy")},
      inset 0 -14px 15px -14px ${color("shadow_heavy")};

    padding-bottom: centi;

    // Add padding to the top and sides on small screen sizes
    ${down(
      "lg",
      css`
        padding-left: micro;
        padding-right: micro;
        padding-top: centi;
      `
    )}

    & hr {
      border-top-style: dashed;
      margin-top: 0;
      margin-bottom: 0;

      // Move hr on large screen sizes so it aligns with the shift on the card above
      ${(props): string[] =>
        up(
          "lg",
          css`
            margin-top: -${props.theme.space.milli};
          `
        )(props)}
    }
  `,
  BottomCtaCard: styled(Card)`
    position: relative;
    box-shadow: 2;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;

    & h4 {
      font-size: 2.2em;
      font-weight: 300;

      em {
        font-weight: 400;
        font-style: normal;
      }
    }

    & p {
      color: text_fade;
    }

    ${(props): string[] =>
      up(
        "lg",
        css`
          // Perform a shift on large screen sizes so that it overlaps the previous section
          top: -${props.theme.space.kilo};
          // Add additional padding on large screen sizes
          padding: centi;

          // Make intensity of frosted glass effect slightly less on large screen sizes
          &::before {
            opacity: 0.8;
          }
        `
      )(props)}

    // Add margins on the bottom on small screen sizes
    ${down(
      "lg",
      css`
        margin-bottom: centi;
      `
    )}
  `,
  BottomCtaButton: styled(Button)`
    span {
      margin-left: 0;
      width: 0 !important;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    &:hover {
      span {
        margin-left: 1rem;
        width: 12.5px !important;
        opacity: 1;
      }
    }
  `,
};

const SectionBox = Box.withComponent("section");

const Index: React.FC<{}> = () => {
  // Get the cached guild/user counts from the route data (cached upon site build)
  const {
    guildCount: cachedGuildCount,
    userCount: cachedUserCount,
  } = useRouteData();

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
    dispatch(guildCount());
  });

  const derivedGuildCount = takeLive(cachedGuildCount, storeGuildCount, 0);
  const derivedUserCount = takeLive(cachedUserCount, storeUserCount, 0);

  return (
    <Layout title="Home">
      <article>
        <Styled.Lead py={{ xs: "centi", md: "kilo" }}>
          <Styled.Container>
            {/* Use the padding/-margin/padding pattern to add gutters to the columns */}
            <Box px={{ xs: "zero", lg: "milli" }}>
              <Box row mx={{ xs: "zero", lg: "-milli" as Space }}>
                <Box
                  col={{ xs: 1, lg: 2 / 3 }}
                  px="micro"
                  // Make the column have a bottom margin when it appears above the Cta
                  // card
                  mb={{ xs: "milli", lg: "zero" }}
                >
                  <Logo.Logotype
                    height={{ xs: "milli", lg: "centi" }}
                    mb={{ xs: "micro", lg: "milli" }}
                    color="text"
                  />
                  <Styled.LeadText mb="nano">
                    General purpose Discord bot supporting{" "}
                    <em>advanced role management</em>,{" "}
                    <em>custom emotes for non-nitro users</em>,{" "}
                    <em>configurable response commands</em>, and more.
                  </Styled.LeadText>
                  <Styled.LeadText mb="micro">
                    Use the web dashboard to add architus to your servers,
                    manage server settings such as <em>emotes and responses</em>
                    , and view extensive <em>audit logs</em>.
                  </Styled.LeadText>
                  <Styled.LeadText mb="zero">
                    architus is currently serving{" "}
                    <code>{derivedGuildCount} servers</code> and{" "}
                    <code>{derivedUserCount} users</code>
                  </Styled.LeadText>
                </Box>
                <Styled.CtaWrapper col={{ xs: 1, lg: 1 / 3 }} px="micro">
                  <Styled.Card>
                    <Styled.SmallCaps>Getting Started</Styled.SmallCaps>
                    <LoginButton />
                  </Styled.Card>
                </Styled.CtaWrapper>
              </Box>
            </Box>
          </Styled.Container>
        </Styled.Lead>
        <Styled.Features py={{ xs: "centi", md: "kilo" }}>
          <Styled.Container>
            <Styled.Heading
              textAlign="center"
              mb={{ xs: "milli", md: "centi" }}
            >
              <Styled.Underline>Features</Styled.Underline>
            </Styled.Heading>
            <Feature
              left
              mb="kilo"
              lead="Have architus listen for predefined phrases"
              header="Automatic Responses"
              content={
                <>
                  <p>
                    Users can configure architus to listen for and respond to
                    message patterns using an extensive syntax. Response pattern
                    fragments include:
                  </p>
                  <ul>
                    <li>random nouns and adjectives</li>
                    <li>a mention of the responded-to user</li>
                    <li>an incrementing count</li>
                    <li>randomly selected phrases</li>
                    <li>the option to add reactions to the original message</li>
                  </ul>
                  <TryCta left />
                </>
              }
            >
              <Styled.RaisedWindow variant="discord">
                <DiscordMock
                  height={400}
                  channelName="auto-response-demo"
                  messageSets={messageSets.autoResponse}
                  allowedCommands={allowedCommands.autoResponse}
                  loop
                />
              </Styled.RaisedWindow>
            </Feature>
            <Feature
              right
              mb="kilo"
              lead="Let non-nitro members use unlimited custom emoji"
              header="Custom Emoji"
              content={
                <>
                  <p>
                    The custom emoji module allows for effectively unlimited
                    custom emoji to be used on a server, working by replacing a
                    user&rsquo;s message with another that has the hot-loaded
                    emotes included. Both standard and animated emotes are
                    supported, and the syntax is the same as normal Discord
                    emotes (<code>:shortcode:</code>). Use the
                    <code>!emotes</code> command to view a list of all available
                    emotes.
                  </p>
                  <TryCta />
                </>
              }
            >
              <Styled.RaisedWindow variant="discord">
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
              </Styled.RaisedWindow>
            </Feature>
            <Feature
              left
              lead="Conduct votes or schedule events"
              header="Polls & Schedules"
              content={
                <>
                  <p>
                    With the <code>!poll</code> command, users can conduct
                    reaction-based votes that include up to 10 custom options
                    per poll. Similarly, <code>!schedule</code> lets users
                    create scheduled events that other users can react to,
                    giving a convenient way to gauge future attendance.
                  </p>
                  <TryCta left />
                </>
              }
            >
              <Styled.RaisedWindow variant="discord">
                <DiscordMock
                  height={400}
                  channelName="polls-schedules-demo"
                  messageSets={messageSets.pollsSchedules}
                  allowedCommands={allowedCommands.pollsSchedules}
                  loop
                />
              </Styled.RaisedWindow>
            </Feature>
          </Styled.Container>
        </Styled.Features>
        <Styled.MinorFeatures pt="centi" pb={{ xs: "centi", xl: "mega" }}>
          <Styled.Container>
            <Box px={{ xs: "zero", md: "milli" }}>
              <Box row mx={{ xs: "zero", md: "-milli" as Space }}>
                <MinorFeature
                  col={{ xs: 1, md: 1 / 2 }}
                  header="Message history statistics/analytics"
                  icon={StatisticsSvg}
                  text={
                    <p>
                      Let users learn who sends the most messages or misspells
                      the most words with message history analytics that search
                      the server&rsquo;s message records.
                    </p>
                  }
                />
                <MinorFeature
                  col={{ xs: 1, md: 1 / 2 }}
                  header={
                    <span>
                      Extensive server and internal logs{" "}
                      <Badge variant="primary">Coming soon</Badge>
                    </span>
                  }
                  icon={LogsSvg}
                  text={
                    <p>
                      View, search, and export server audit logs from within the
                      web dashboard, including information about message
                      sends/deletes, user joins, and internal architus logs.
                    </p>
                  }
                />
                <MinorFeature
                  col={{ xs: 1, md: 1 / 2 }}
                  header="Voice chat-enabled music playback"
                  icon={MusicSvg}
                  text={
                    <p>
                      Play music from Spotify and Youtube directly in voice chat
                      using <code>!play</code>, or defer to other music playing
                      bots if available.
                    </p>
                  }
                />
                <MinorFeature
                  col={{ xs: 1, md: 1 / 2 }}
                  header="Per-server role management"
                  icon={UserControlSvg}
                  text={
                    <p>
                      Control which users have permissions to configure architus
                      settings on a per server basis, and let users
                      automatically assign themselves roles using{" "}
                      <code>!role</code>.
                    </p>
                  }
                />
              </Box>
            </Box>
          </Styled.Container>
        </Styled.MinorFeatures>
        <Styled.BottomCta>
          <Styled.Container>
            <Styled.BottomCtaCard>
              <h4>
                See what <em>architus</em> can do for you
              </h4>
              <p>
                Connect with Discord to get a link that adds architus to your
                server.
              </p>
              <Box height="micro" />
              <CallToAction />
            </Styled.BottomCtaCard>
            <hr className="hr-short" />
          </Styled.Container>
        </Styled.BottomCta>
        <Footer />
      </article>
    </Layout>
  );
};

export default Index;

// ? ================
// ? Helper functions
// ? ================

/**
 * Extracts the correct value for the possibly cached statistic
 * @param cached - The cached version of the given statistic
 * @param live - The live version
 * @param defaultValue - The default value for the statistic
 */
function takeLive<T>(cached: T | Nil, live: T | Nil, defaultValue: T): T {
  if (isDefined(live)) {
    return live;
  }

  if (isDefined(cached)) {
    return cached;
  }

  return defaultValue;
}

// ? ==============
// ? Sub-components
// ? ==============

type FeatureProps = WithBoxProps<{
  left?: boolean;
  right?: boolean;
  children: React.ReactNode;
  lead: React.ReactNode;
  header: React.ReactNode;
  content: React.ReactNode;
}>;

/**
 * Used to display a major feature, usually paired with a Discord mock
 */
const Feature: React.FC<FeatureProps> = ({
  left,
  right,
  children,
  lead,
  header,
  content,
  ...boxProps
}) => (
  <>
    {/* Use the -margin/padding pattern to add gutters to the columns */}
    <SectionBox {...boxProps} px={{ xs: "zero", lg: "milli" }}>
      <Box
        row
        mx={{ xs: "zero", lg: "-milli" as Space }}
        flexDirection={right ? "row-reverse" : "row"}
      >
        <Box
          px={{ xs: "micro", lg: "micro" }}
          col={{ xs: 1, lg: 1 / 2 }}
          // Add bottom margin on small screen sizes to add spaces between collapsed
          // columns
          mb={{ xs: "micro", lg: "zero" }}
        >
          {children}
        </Box>
        <Styled.FeatureContent
          px={{ xs: "micro", lg: "micro" }}
          col={{ xs: 1, lg: 1 / 2 }}
        >
          <Styled.SmallCaps fontSize="0.9rem" color="text_fade" mb="femto">
            {lead}
          </Styled.SmallCaps>
          <h3>{header}</h3>
          <div>{content}</div>
        </Styled.FeatureContent>
      </Box>
    </SectionBox>
  </>
);

type MinorFeatureProps = WithBoxProps<{
  header: React.ReactNode;
  text: React.ReactNode;
  icon: string;
}>;

/**
 * Used to display additional features that include a small SVG icon and descriptive text
 */
const MinorFeature: React.FC<MinorFeatureProps> = ({
  header,
  text,
  icon,
  ...boxProps
}) => (
  <Styled.MinorFeature {...boxProps} px="micro" mt="milli" mb="micro">
    {icon && (
      <Styled.MinorFeatureIcon
        style={{
          backgroundImage: `url("${icon}")`,
        }}
      />
    )}
    <h3>{header}</h3>
    <div>{text}</div>
  </Styled.MinorFeature>
);

/**
 * Bottom call-to-action button placed inside of a card
 */
const CallToAction: React.FC<Omit<BoxProps, "ref">> = (boxProps) => {
  const { isSignedIn } = useSessionStatus();
  const oauthUrl = useOauthUrl();
  const additionalProps = isSignedIn
    ? { as: Link, to: "/app" }
    : { href: oauthUrl };
  return (
    <Styled.BottomCtaButton
      variant="primary"
      size="lg"
      {...additionalProps}
      {...boxProps}
    >
      Get Started
      <Icon name="chevron-right" />
    </Styled.BottomCtaButton>
  );
};

type TryCtaProps = { left?: boolean };

/**
 * Displays the "Try it out" call-to-action used at the bottom of feature descriptions
 * that reside next to Discord Mocks
 */
const TryCta: React.FC<TryCtaProps> = ({ left }) => (
  <Styled.TryCta textAlign={left ? "left" : "right"}>
    {left && <Icon name="chevron-left" mr="nano" />}
    Try it out
    {!left && <Icon name="chevron-right" ml="nano" />}
  </Styled.TryCta>
);
