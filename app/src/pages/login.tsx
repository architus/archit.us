import { styled } from "linaria/react";
import React from "react";

import { Card, LoginButton, Layout } from "@app/components";
import { Container } from "@app/layout";
import { color } from "@architus/facade/theme/color";
import { down } from "@architus/facade/theme/media";

const Styled = {
  Layout: styled.div`
    background-color: ${color("bg")};
    color: ${color("text")};
  `,
  Header: styled.h1`
    font-size: 3.6rem;
    font-weight: 200;
    color: ${color("text")};

    ${down("md")} {
      font-size: 2.5rem;
    }
  `,
  Content: styled.div`
    color: ${color("textFade")};
  `,
};

export type LoginPageProps = {
  fromRestricted: boolean;
};

const LoginPage: React.FC<LoginPageProps> = ({ fromRestricted }) => (
  <Layout title="Login" noHeader={fromRestricted}>
    <Styled.Layout>
      <Container>
        <Card maxWidth="500px" mt="centi">
          <Styled.Content>
            <Styled.Header>Login</Styled.Header>
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

export default LoginPage;
