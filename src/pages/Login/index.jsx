import React from "react";

import { Row, Col, Container, Card } from "react-bootstrap";
import LoginButton from "../../components/LoginButton";

import "./style.scss";

function Login({ fromRestricted }) {
  return (
    <div className="login py-5">
      <Container>
        <Row>
          <Col md={6}>
            <Card>
              <div className="header mb-4">
                <h1>Login</h1>
                {fromRestricted ? (
                  <h2>Authentication required to view this page</h2>
                ) : null}
              </div>
              <LoginButton />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
