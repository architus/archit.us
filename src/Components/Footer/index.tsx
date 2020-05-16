import React from "react";
import classNames from "classnames";
import { Row, Col, Card } from "react-bootstrap";
import Header from "Components/Header";
import Icon from "Components/Icon";
import "./style.scss";

const Footer: React.FC = () => (
  <div className="footer">
    <div className="footer--inner">
      <Row>
        <Col sm={12} lg={6} className="mb-4 mb-lg-0">
          <FooterPanel header="About" className="about">
            <p>
              Architus is a multipurpose Discord bot empowering both admins and
              server members with the tools to have a more streamlined and
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
            <a href="https://forms.gle/MRnXUa5VAAXezitc8">Data Removal Request Form</a>
          </FooterPanel>
        </Col>
        <Col sm={6} lg={4} xl={3}>
          <Card className="border-card">
            <Header.Brand style={{ pointerEvents: "none" }} top />
          </Card>
        </Col>
      </Row>
    </div>
  </div>
);

// ? ==============
// ? Sub-components
// ? ==============

type FooterPanel = {
  children: React.ReactNode;
  header: React.ReactNode;
  className?: string;
};

const FooterPanel: React.FC<FooterPanel> = ({
  children,
  header,
  className,
}) => (
  <div className={classNames("footer--panel", className)}>
    <h3>{header}</h3>
    <hr />
    <div>{children}</div>
  </div>
);

export default Footer;
