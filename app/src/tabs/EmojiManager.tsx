import { styled } from "linaria/react";
import React from "react";

import { appVerticalPadding, appHorizontalPadding } from "@app/layout";
import { TabProps } from "@app/tabs/types";
import Badge from "@architus/facade/components/Badge";
import { color } from "@architus/facade/theme/color";

const Styled = {
  Layout: styled.div`
    padding: ${appVerticalPadding} ${appHorizontalPadding};
  `,
  Title: styled.h2`
    color: ${color("textStrong")};
    font-size: 1.9rem;
    font-weight: 300;
  `,
};

const EmojiManager: React.FC<TabProps> = () => (
  <Styled.Layout>
    <Styled.Title>
      Emoji Manager <Badge variant="primary">Coming Soon</Badge>
    </Styled.Title>
  </Styled.Layout>
);

export default EmojiManager;
