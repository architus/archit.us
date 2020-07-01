import React, { useContext } from "react";
import { styled } from "linaria/react";

import { gap } from "@design/theme";
import AutoLink from "./AutoLink";
import NavLabel from "./NavLabel";
import { createHeading } from "./Heading";

type OverviewEntry = {
  title: string;
  badge: string | null;
  path: string;
};
export type OverviewContext = OverviewEntry[];
export const OverviewContext = React.createContext<OverviewContext>([]);

const Styled = {
  Overview: styled.div`
    & > *:not(:last-child) {
      margin-bottom: ${gap.flow};
    }
  `,
};

type OverviewProps = {
  className?: string;
  style?: React.CSSProperties;
};

const Header = createHeading({ component: "h2" });

/**
 * "In this section" element that can be included in MDX
 * (and is automatically added for Orphan pages)
 */
const Overview: React.FC<OverviewProps> = ({ className, style }) => {
  const children = useContext(OverviewContext);
  return (
    <Styled.Overview className={className} style={style}>
      <Header id="in-this-section">In this section</Header>
      <ul>
        {children.map(({ title, path, badge }) => (
          <li key={title}>
            <AutoLink href={path}>
              <NavLabel text={title} badge={badge} />
            </AutoLink>
          </li>
        ))}
      </ul>
    </Styled.Overview>
  );
};

export default Overview;
