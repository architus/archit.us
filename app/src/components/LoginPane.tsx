import { styled } from "linaria/react";
import React from "react";

import GlassCard from "@app/components/GlassCard";
import LoginPrompt from "@app/components/LoginPrompt";
import { color } from "@architus/facade/theme/color";
import { down } from "@architus/facade/theme/media";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Card: styled(GlassCard)`
    max-width: 500px;
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

type LoginPaneProps = {
  message: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Displays a card directing the user to log in to the dashboard
 */
const LoginPane: React.FC<LoginPaneProps> = ({ message, className, style }) => (
  <Styled.Card className={className} style={style}>
    <Styled.Content>
      <Styled.Header>Login</Styled.Header>
      <p>{message}</p>
    </Styled.Content>
    <LoginPrompt showLabel={false} />
  </Styled.Card>
);

export default LoginPane;
