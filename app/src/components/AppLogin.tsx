import { styled } from "linaria/react";
import React from "react";

import LoginPane from "@app/components/LoginPane";
import { appVerticalPadding, appHorizontalPadding } from "@app/layout";

const Styled = {
  Layout: styled.div`
    padding: ${appVerticalPadding} ${appHorizontalPadding};
  `,
};

type AppLoginProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Displays a card directing the user to log in to the dashboard to view
 * restricted routes
 */
const AppLogin: React.FC<AppLoginProps> = ({ className, style }) => (
  <Styled.Layout className={className} style={style}>
    <LoginPane message="Authentication required to view this page" />
  </Styled.Layout>
);

export default AppLogin;
