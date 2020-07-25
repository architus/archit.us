import { styled } from "linaria/react";
import React from "react";

import Footers from "@app/components/Footers";
import GlassCard from "@app/components/GlassCard";
import Layout from "@app/components/Layout";
import LoginPrompt from "@app/components/LoginPrompt";
import { Container } from "@app/layout";
import { color } from "@architus/facade/theme/color";
import { down } from "@architus/facade/theme/media";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Layout: styled.div`
    background-color: ${color("bg")};
    color: ${color("text")};
  `,
  Card: styled(GlassCard)`
    max-width: 500px;
    margin: ${gap.centi} auto ${gap.centi} 0;
  `,
  Header: styled.h1`
    font-size: 3.6rem;
    font-weight: 200;
    margin-bottom: ${gap.nano};
    color: ${color("text")};

    ${down("md")} {
      font-size: 2.5rem;
    }
  `,
  Content: styled.div`
    color: ${color("textFade")};
    margin-bottom: ${gap.pico};
  `,
};

export type LoginPageProps = {
  fromRestricted: boolean;
};

const LoginPage: React.FC<LoginPageProps> = ({ fromRestricted }) => (
  <Layout seo={{ title: "Login" }} noHeader={fromRestricted}>
    <Styled.Layout>
      <Container>
        <Styled.Card>
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
          <LoginPrompt showLabel={false} />
        </Styled.Card>
      </Container>
    </Styled.Layout>
    <Footers />
  </Layout>
);

export default LoginPage;
