import { styled } from "linaria/react";
import React, { useContext } from "react";

import AutoLink from "@architus/facade/components/AutoLink";
import { gap } from "@architus/facade/theme/spacing";
import { Nil } from "@architus/lib/types";
import { createHeading } from "@docs/components/Heading";
import NavLabel from "@docs/components/NavLabel";

type OverviewEntry = {
  title: string;
  badge: string | Nil;
  path: string;
};
export type OverviewContext = readonly OverviewEntry[];
export const OverviewContext = React.createContext<OverviewContext>([]);

const Styled = {
  Overview: styled.div`
    & > *:not(:last-child) {
      margin-bottom: ${gap.flow};
    }
  `,
};

export type OverviewProps = {
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
