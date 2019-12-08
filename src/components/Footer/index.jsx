import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { Row, Col, Card } from "react-bootstrap";
import Header from "components/Header";
import Icon from "components/Icon";

import "./style.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer--inner">
        <Row>
          <Col sm={12} lg={6} className="mb-4 mb-lg-0">
            <FooterPanel header="About" className="about">
              <p>
                Architus is a multipurpose Discord bot empowering both admins
                and server members with the tools to have a more streamlined and
                enjoyable experience.
              </p>
            </FooterPanel>
          </Col>
          <Col sm={6} lg={2} xl={3}>
            <FooterPanel header="Links">
              <a href="https://github.com/architus">
                <Icon name="github" className="icon" />
                Github
              </a>
              <a href="https://status.archit.us/">Status</a>
              <a href="https://docs.archit.us/">Docs</a>
              <a href="https://discord.gg/svrRrSe">Discord Server</a>
            </FooterPanel>
          </Col>
          <Col sm={6} lg={4} xl={3}>
            <Card className="border-card">
              <Header.Brand disabled />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;

const FooterPanel = ({ children, header, className }) => (
  <div className={classNames("footer--panel", className)}>
    <h3>{header}</h3>
    <hr />
    <div>{children}</div>
  </div>
);

FooterPanel.propTypes = {
  header: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string
};
