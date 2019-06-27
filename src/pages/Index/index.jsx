import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { curry } from "lodash";
import { CustomEmojiExtension } from "../../components/DiscordMock/CustomEmojiExtension";
import { connect } from "react-redux";
import { redirectUrl } from "../../components/LoginButton";
import { NavLink as RouterLink } from "react-router-dom";

import {
  Jumbotron,
  Container,
  Row,
  Card,
  Col,
  Button,
  Badge
} from "react-bootstrap";
import LoginButton from "../../components/LoginButton";
import DiscordMock from "../../components/DiscordMock";
import Window from "../../components/Window";
import WebSocketConnection from "../../components/functional/WebSocketConnection";
import Icon from "../../components/Icon";

import "./style.scss";
import { messageSets, customEmotes } from "./data.json";

function Index() {
  return (
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
                dashboard to add aut-bot to your servers, manage server settings
                such as <em>emotes and responses</em>, and view extensive{" "}
                <em>audit logs</em>.
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id
              augue et ligula tincidunt condimentum. Donec quis arcu tempor,
              cursus est at, posuere tellus. Vestibulum ut urna rhoncus nisl
              dictum aliquam. Sed fermentum, enim eget congue efficitur, tortor
              odio eleifend metus, eget maximus magna quam ut felis. Maecenas ex
              erat, tristique sit amet mauris ac, fermentum pretium arcu.
              Maecenas consectetur porttitor est.
            </p>
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
          lead="Let non-nitro members use custom emoji"
          header="Custom Emoji"
          content={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id
              augue et ligula tincidunt condimentum. Donec quis arcu tempor,
              cursus est at, posuere tellus. Vestibulum ut urna rhoncus nisl
              dictum aliquam. Sed fermentum, enim eget congue efficitur, tortor
              odio eleifend metus, eget maximus magna quam ut felis. Maecenas ex
              erat, tristique sit amet mauris ac, fermentum pretium arcu.
              Maecenas consectetur porttitor est.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id
              augue et ligula tincidunt condimentum. Donec quis arcu tempor,
              cursus est at, posuere tellus. Vestibulum ut urna rhoncus nisl
              dictum aliquam. Sed fermentum, enim eget congue efficitur, tortor
              odio eleifend metus, eget maximus magna quam ut felis. Maecenas ex
              erat, tristique sit amet mauris ac, fermentum pretium arcu.
              Maecenas consectetur porttitor est.
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
              icon="/img/statistics.svg"
              text={
                <p>
                  Morbi vitae velit sit amet nisi aliquet mollis. Fusce purus
                  elit, convallis vel pellentesque ac, maximus at ex. Maecenas
                  porta ullamcorper eros, id pulvinar ante viverra et.
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
              icon="/img/logs.svg"
              text={
                <p>
                  Aenean mollis cursus rutrum. Proin ornare sem eros, hendrerit
                  finibus elit venenatis ut. Suspendisse nec mi turpis.
                </p>
              }
            />
            <MinorFeature
              header="Voice chat-enabled music playback"
              icon="/img/music.svg"
              text={
                <p>
                  Sed in ex id diam condimentum pellentesque. Integer congue
                  ultricies nisi eget egestas. Maecenas mattis eros eu varius
                  pretium.
                </p>
              }
            />
            <MinorFeature
              header="Per-server role management"
              icon="/img/user_control.svg"
              text={
                <p>
                  Nunc aliquam metus scelerisque ante aliquet tincidunt.
                  Praesent a blandit ligula. Maecenas faucibus ornare lorem, ut
                  maximus arcu efficitur eget
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
              See what <em>aut bot</em> can do for you
            </h4>
            <p>
              Connect with Discord to get a link that adds aut bot to your
              server.
            </p>
            <CallToAction />
          </Card>
          <hr className="hr-short" />
        </Container>
      </div>
    </article>
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
      ></span>
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

const CallToAction = connect(state => ({
  loggedIn: state.session.connectedToDiscord
}))(({ loggedIn }) => {
  const additionalProps = loggedIn
    ? {
        as: RouterLink,
        to: "/home"
      }
    : {
        href: redirectUrl
      };
  return (
    <Button className="cta" variant="primary" size="lg" {...additionalProps}>
      Get Started
      <Icon name="chevron-right" />
    </Button>
  );
});
