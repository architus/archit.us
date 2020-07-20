import styled, { css, down } from "@xstyled/emotion";
import React from "react";
import { Container } from "react-bootstrap";

import { Card, LoginButton, Layout } from "@app/components";
import { Breakpoint } from "@app/theme";

const Styled = {
  Layout: styled.div`
    background-color: b_400;
    color: text;
  `,
  Content: styled.div`
    & h1 {
      font-size: 3.6rem;
      font-weight: 200;

      ${down(
        Breakpoint.MD,
        css`
          font-size: 2.5rem;
        `
      )}
    }

    & p {
      color: text_fade;
    }
  `,
};

type LoginProps = {
  fromRestricted: boolean;
};

const Login: React.FC<LoginProps> = ({ fromRestricted }) => (
  <Layout title="Login" noHeader={fromRestricted}>
    <Styled.Layout>
      <Container>
        <Card maxWidth="500px" mt="centi">
          <Styled.Content>
            <h1>Login</h1>
            {fromRestricted ? (
              <p>Authentication required to view this page</p>
            ) : (
              <p>
                Connect with your Discord account to gain access to the Architus
                web dashboard
              </p>
            )}
          </Styled.Content>
          <LoginButton showLabel={false} />
        </Card>
      </Container>
    </Styled.Layout>
  </Layout>
);

export default Login;
