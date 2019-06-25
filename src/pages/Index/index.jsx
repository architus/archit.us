import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Jumbotron, Container, Row, Card, Col } from "react-bootstrap";
import LoginButton from "../../components/LoginButton";
import DiscordMock from "../../components/DiscordMock";
import Window from "../../components/Window";
import WebSocketConnection from "../../components/functional/WebSocketConnection";

import "./style.scss";
import MessageSets from "./messageSets.json";

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
              messageSet={MessageSets.autoResponse}
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
              messageSet={MessageSets.customEmoji}
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
              messageSet={MessageSets.pollsSchedules}
              loop
            />
          </Window>
        </Feature>
      </Container>
    </article>
  );
}

export default Index;

const Feature = ({ left, right, children, lead, header, content }) => {
  return (
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
};

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
