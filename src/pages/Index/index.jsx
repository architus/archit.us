import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { curry } from "lodash";
import { CustomEmojiExtension } from "components/DiscordMock/CustomEmojiExtension";
import { connect } from "react-redux";
import { useOauthUrl } from "components/LoginButton";
import { mapStateToLoggedIn } from "../../store/reducers/session";

import {
  Jumbotron,
  Container,
  Row,
  Card,
  Col,
  Button,
  Badge
} from "react-bootstrap";
import LoginButton from "components/LoginButton";
import DiscordMock from "components/DiscordMock";
import Footer from "components/Footer";
import Window from "components/Window";
import WebSocketConnection from "functional/WebSocketConnection";
import Icon from "components/Icon";
import Layout from "components/Layout";
import { Link as RouterLink } from "components/Router";

import "./style.scss";
import { messageSets, customEmotes } from "./data.json";
import LogsSvg from "./svg/logs.svg";
import MusicSvg from "./svg/music.svg";
import StatisticsSvg from "./svg/statistics.svg";
import UserControlSvg from "./svg/user_control.svg";

function Index() {
  return (
    <Layout title="Home">
      <article>
        <WebSocketConnection />
        <Jumbotron fluid>
          <Container>
            <Row as="section" className="head">
              <Col sm={6} lg={8}>
                <h1>aut-bot</h1>
                <p>
                  General purpose Discord bot supporting{" "}
                  <em>advanced role management</em>,{" "}
                  <em>custom emotes for non-nitro users</em>,{" "}
                  <em>configurable response commands</em>, and more. Use the web
                  dashboard to add aut-bot to your servers, manage server
                  settings such as <em>emotes and responses</em>, and view
                  extensive <em>audit logs</em>.
                </p>
              </Col>
              <Col sm={6} lg={4}>
                <Card as="aside">
                  <h2>Getting Started</h2>
                  <p className="mb-4">Sign in to add aut-bot to a server</p>
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
            lead="Have aut-bot listen for predefined phrases"
            header="Automatic Responses"
            content={
              <div>
                <p>
                  Users can configure aut-bot to listen for and respond to
                  message patterns using a extensive syntax. Response pattern
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
                index={0}
                messageSet={messageSets.autoResponse}
                allowedCommands={["set", "remove"]}
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
                emoji to be used on a server, working by replacing a user's
                message with another that has the hot-loaded emotes included.
                Both standard and animated emotes are supported, and the syntax
                is the same as normal Discord emotes (<code>:shortcode:</code>).
                Use the
                <code>!emotes</code> command to view a list of all available
                emotes.
                <TryCTA right />
              </p>
            }
          >
            <Window variant="discord">
              <DiscordMock
                height={400}
                channelName="custom-emoji-demo"
                index={1}
                messageSet={messageSets.customEmoji}
                allowedCommands={["emotes"]}
                extension={curry(CustomEmojiExtension)(customEmotes)}
                offline
                loop
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
                index={2}
                messageSet={messageSets.pollsSchedules}
                allowedCommands={["poll", "schedule"]}
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
                    server's message records.
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
                    sends/deletes, user joins, and internal aut-bot logs.
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
                    Control which users have permissions to configure aut-bot
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
            <Card as="section">
              <h4>
                See what <em>aut-bot</em> can do for you
              </h4>
              <p>
                Connect with Discord to get a link that adds aut-bot to your
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
}

export default Index;

const Feature = ({ left, right, children, lead, header, content }) => (
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

Feature.propTypes = {
  left: PropTypes.bool,
  right: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  lead: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]),
  header: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]),
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};

const MinorFeature = ({ header, text, icon }) => (
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

MinorFeature.propTypes = {
  header: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]),
  text: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]),
  icon: PropTypes.string
};

const CallToAction = connect(mapStateToLoggedIn)(({ loggedIn }) => {
  const oauthUrl = useOauthUrl();
  const additionalProps = loggedIn
    ? {
        as: RouterLink,
        to: "/app"
      }
    : {
        href: oauthUrl
      };
  return (
    <Button className="cta" variant="primary" size="lg" {...additionalProps}>
      Get Started
      <Icon name="chevron-right" />
    </Button>
  );
});

const TryCTA = ({ left }) => (
  <em className="try">
    <Icon name={`chevron-${left ? "left" : "right"}`} className="mr-2" />
    Try it out
  </em>
);

TryCTA.propTypes = {
  left: PropTypes.bool,
  right: PropTypes.bool
};
