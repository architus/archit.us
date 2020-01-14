import React from "react";
import classNames from "classnames";
import { shallowEqual } from "react-redux";
import LoginButton, { useOauthUrl } from "Components/LoginButton";
import { useRouteData } from "react-static";
import { useEffectOnce, isDefined, useCallbackOnce } from "Utility";
import { useSelector, useDispatch } from "Store/hooks";
import { Nil, DiscordMockContext, DiscordMockCommands } from "Utility/types";
import { useSessionStatus } from "Store/actions";
import { guildCount } from "Store/routes";
import {
  Jumbotron,
  Container,
  Row,
  Card,
  Col,
  Button,
  Badge
} from "react-bootstrap";
import { Layout, Icon, Window, Footer, DiscordMock } from "Components";
import { Link } from "Components/Router";
import { CustomEmojiExtension } from "Components/DiscordMock/CustomEmojiExtension";
import { Extension } from "Components/DiscordMock/util";
import "./style.scss";
import LogoTextSvg from "Assets/logo-text.inline.svg";
import LogsSvg from "./svg/logs.svg";
import MusicSvg from "./svg/music.svg";
import StatisticsSvg from "./svg/statistics.svg";
import UserControlSvg from "./svg/user_control.svg";
import { messageSets, allowedCommands, customEmotes } from "./data.json";

function takeGreater(cached: number | Nil, live: number | Nil): number {
  if (isDefined(cached) && isDefined(live)) {
    return Math.max(cached, live, 0);
  }

  if (isDefined(cached)) return cached;
  if (isDefined(live)) return live;
  return 0;
}

const Index: React.FC<{}> = () => {
  const {
    guildCount: cachedGuildCount,
    userCount: cachedUserCount
  } = useRouteData();
  const {
    guildCount: storeGuildCount,
    userCount: storeUserCount
  } = useSelector(state => {
    return state.guildCount;
  }, shallowEqual);

  const dispatch = useDispatch();
  useEffectOnce(() => {
    dispatch(guildCount());
  });

  // Take the maximum of the hot-loaded and statically cached numbers
  const derivedGuildCount = takeGreater(cachedGuildCount, storeGuildCount);
  const derivedUserCount = takeGreater(cachedUserCount, storeUserCount);

  return (
    <Layout title="Home">
      <article>
        <Jumbotron fluid>
          <Container>
            <Row as="section" className="head">
              <Col sm={6} lg={8}>
                <div
                  className="text-brand"
                  dangerouslySetInnerHTML={{ __html: LogoTextSvg }}
                />
                <p>
                  General purpose Discord bot supporting{" "}
                  <em>advanced role management</em>,{" "}
                  <em>custom emotes for non-nitro users</em>,{" "}
                  <em>configurable response commands</em>, and more. Use the web
                  dashboard to add architus to your servers, manage server
                  settings such as <em>emotes and responses</em>, and view
                  extensive <em>audit logs</em>.
                </p>

                <p className="guild-counter">
                  architus is currently serving{" "}
                  <code>{derivedGuildCount} servers</code> and{" "}
                  <code>{derivedUserCount} users</code>
                </p>
              </Col>
              <Col sm={6} lg={4}>
                <Card as="aside" className="border-card">
                  <h2>Getting Started</h2>
                  <LoginButton />
                </Card>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container className="features">
          <h2>
            <span>Features</span>
          </h2>
          <Feature
            left
            lead="Have architus listen for predefined phrases"
            header="Automatic Responses"
            content={
              <div>
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
                <TryCTA left />
              </div>
            }
          >
            <Window variant="discord">
              <DiscordMock
                height={400}
                channelName="auto-response-demo"
                messageSets={messageSets.autoResponse}
                allowedCommands={allowedCommands.autoResponse}
                loop
              />
            </Window>
          </Feature>
          <Feature
            right
            lead="Let non-nitro members use unlimited custom emoji"
            header="Custom Emoji"
            content={
              <p>
                The custom emoji module allows for effectively unlimited custom
                emoji to be used on a server, working by replacing a
                user&rsquo;s message with another that has the hot-loaded emotes
                included. Both standard and animated emotes are supported, and
                the syntax is the same as normal Discord emotes (
                <code>:shortcode:</code>). Use the
                <code>!emotes</code> command to view a list of all available
                emotes.
                <TryCTA />
              </p>
            }
          >
            <Window variant="discord">
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
            </Window>
          </Feature>
          <Feature
            left
            lead="Conduct votes or schedule events"
            header="Polls & Schedules"
            content={
              <p>
                With the <code>!poll</code> command, users can conduct
                reaction-based votes that include up to 10 custom options per
                poll. Similarly, <code>!schedule</code> lets users create
                scheduled events that other users can react to, giving a
                convenient way to gauge future attendance.
                <TryCTA left />
              </p>
            }
          >
            <Window variant="discord">
              <DiscordMock
                height={400}
                channelName="polls-schedules-demo"
                messageSets={messageSets.pollsSchedules}
                allowedCommands={allowedCommands.pollsSchedules}
                loop
              />
            </Window>
          </Feature>
        </Container>
        <div className="additional">
          <Container as="section">
            <Row>
              <MinorFeature
                header="Message history statistics/analytics"
                icon={StatisticsSvg}
                text={
                  <p>
                    Let users learn who sends the most messages or misspells the
                    most words with message history analytics that search the
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
                    View, search, and export server audit logs from within the
                    web dashboard, including information about message
                    sends/deletes, user joins, and internal architus logs.
                  </p>
                }
              />
              <MinorFeature
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
                header="Per-server role management"
                icon={UserControlSvg}
                text={
                  <p>
                    Control which users have permissions to configure architus
                    settings on a per server basis, and let users automatically
                    assign themselves roles using <code>!role</code>.
                  </p>
                }
              />
            </Row>
          </Container>
        </div>
        <div className="bottom-cta-outer">
          <Container>
            <Card as="section" className="border-card">
              <h4>
                See what <em>architus</em> can do for you
              </h4>
              <p>
                Connect with Discord to get a link that adds architus to your
                server.
              </p>
              <CallToAction />
            </Card>
            <hr className="hr-short" />
          </Container>
        </div>
        <Footer />
      </article>
    </Layout>
  );
};

export default Index;

Index.displayName = "IndexPage";

// ? ==============
// ? Sub-components
// ? ==============

type FeatureProps = {
  left?: boolean;
  right?: boolean;
  children: React.ReactNode;
  lead: React.ReactNode;
  header: React.ReactNode;
  content: React.ReactNode;
};

const Feature: React.FC<FeatureProps> = ({
  left,
  right,
  children,
  lead,
  header,
  content
}) => (
  <Row as="section" className="align-items-center">
    <Col
      lg={6}
      className={classNames("mt-2 mt-lg-0 order-2", {
        "order-lg-1": left,
        "order-lg-2": right
      })}
    >
      {children}
    </Col>
    <Col
      lg={6}
      className={classNames("order-1", {
        "order-lg-2": left,
        "order-lg-1": right
      })}
    >
      <h4>{lead}</h4>
      <h3>{header}</h3>
      <div className="feature-content">{content}</div>
    </Col>
  </Row>
);

Feature.displayName = "Feature";

type MinorFeatureProps = {
  header: React.ReactNode;
  text: React.ReactNode;
  icon: string;
};

const MinorFeature: React.FC<MinorFeatureProps> = ({ header, text, icon }) => (
  <Col md={6} className="minor-feature">
    <div className="minor-feature--inner">
      <span
        className="minor-feature--icon"
        style={icon ? { backgroundImage: `url("${icon}")` } : {}}
      />
      <h3>{header}</h3>
      <div>{text}</div>
    </div>
  </Col>
);

MinorFeature.displayName = "MinorFeature";

const CallToAction: React.FC = () => {
  const { isSignedIn } = useSessionStatus();
  const oauthUrl = useOauthUrl();
  const additionalProps = isSignedIn
    ? { as: Link, to: "/app" }
    : { href: oauthUrl };
  return (
    <Button className="cta" variant="primary" size="lg" {...additionalProps}>
      Get Started
      <Icon name="chevron-right" />
    </Button>
  );
};

CallToAction.displayName = "CallToAction";

type TryCTAProps = { left?: boolean };

const TryCTA: React.FC<TryCTAProps> = ({ left }) => (
  <em className={classNames("try", { "text-right": !left })}>
    {left && <Icon name="chevron-left" className="mr-2" />}
    Try it out
    {!left && <Icon name="chevron-right" className="ml-2" />}
  </em>
);

TryCTA.displayName = "TryCTA";
