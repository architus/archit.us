import React from "react";
import { styled } from "linaria/react";
import { Link } from "gatsby";

import { Nil } from "@lib/types";
import { isNil } from "@lib/utility";
import Card from "@design/components/Card";
import Article from "@design/components/Article";
import NavLabel from "@docs/components/NavLabel";

const Styled = {
  SequenceLinks: styled.div``,
  Title: styled.h4``,
};

export type SequenceLinkData = {
  title: string;
  badge: string | null;
  path: string;
  lead: string | null;
};

type SequenceLinksProps = {
  next: SequenceLinkData | Nil;
  previous: SequenceLinkData | Nil;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Previous/next cards at the bottom of each docs page
 */
const SequenceLinks: React.FC<SequenceLinksProps> = ({
  next,
  previous,
  className,
  style,
}) => (
  <Styled.SequenceLinks className={className} style={style}>
    <SequenceLink data={previous} />
    <SequenceLink data={next} />
  </Styled.SequenceLinks>
);

export default SequenceLinks;

// ? =================
// ? Helper components
// ? =================

type SequenceLinkProps = {
  data: SequenceLinkData | Nil;
};

const SequenceLink: React.FC<SequenceLinkProps> = ({ data }) => {
  if (isNil(data)) return <div />;
  const { title, badge, path, lead } = data;
  return (
    <Link to={path}>
      <Card>
        <Styled.Title>
          <NavLabel text={title} badge={badge} />
        </Styled.Title>
        <Article>{lead}</Article>
      </Card>
    </Link>
  );
};
