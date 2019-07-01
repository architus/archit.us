import React from "react";
import PropTypes from "prop-types";

import { Row, Col, Container, Card } from "react-bootstrap";
import LoginButton from "components/LoginButton";
import Layout from "components/Layout";

import "./style.scss";

function Login({ fromRestricted }) {
  return (
    <Layout title="Login" noHeader={fromRestricted}>
      <Container className="login py-5">
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
    </Layout>
  );
}

export default Login;

Login.propTypes = {
  fromRestricted: PropTypes.bool
};
