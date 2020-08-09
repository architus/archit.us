import { styled } from "linaria/react";
import React from "react";

import Footers from "@app/components/Footers";
import Layout from "@app/components/Layout";
import LoginPane from "@app/components/LoginPane";
import { PageProps } from "@app/components/Router";
import { Container } from "@app/layout";
import { useSessionStatus } from "@app/store/actions";
import { color } from "@architus/facade/theme/color";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Layout: styled.div`
    background-color: ${color("bg")};
    color: ${color("text")};
  `,
  LoginPane: styled(LoginPane)`
    margin: ${gap.centi} auto ${gap.centi} 0;
  `,
};

const LoginPage: React.FC<PageProps> = () => {
  const { isSigningIn } = useSessionStatus();
  return (
    <Layout seo={{ title: "Login" }}>
      <Styled.Layout>
        <Container>
          <Styled.LoginPane
            message={
              isSigningIn
                ? "Continue to the Architus web dashboard to manage your servers"
                : "Connect with your Discord account to gain access to the " +
                  "Architus web dashboard"
            }
          />
        </Container>
      </Styled.Layout>
      <Footers />
    </Layout>
  );
};

export default LoginPage;
