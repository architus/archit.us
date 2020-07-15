import { styled } from "linaria/react";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

import AutoLink from "@design/components/AutoLink";
import { color } from "@design/theme/color";
import { primaryLink } from "@design/theme/mixins";
import { gap } from "@design/theme/spacing";
import { BreadcrumbSegment } from "@docs/templates/Docs/frontmatter";
import { isDefined } from "@lib/utility";

const Styled = {
  Link: styled(AutoLink)`
    ${primaryLink}
  `,
  BreadcrumbIcon: styled(FaChevronRight)`
    color: ${color("textFade")};
    font-size: 70%;
    margin: 0 ${gap.pico};
  `,
};

export type BreadcrumbProps = {
  segments: readonly BreadcrumbSegment[];
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Ordered list of links displaying the path segments for the current page,
 * displayed at the top above the title
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({
  segments,
  className,
  style,
}) => (
  <div className={className} style={style}>
    {segments.map(({ path, text }, index) => (
      <React.Fragment key={path ?? text}>
        <BreadcrumbEntry path={path} text={text} />
        {index !== segments.length - 1 ? <Styled.BreadcrumbIcon /> : null}
      </React.Fragment>
    ))}
  </div>
);

export default Breadcrumb;

// ? =================
// ? Helper components
// ? =================

const BreadcrumbEntry: React.FC<BreadcrumbSegment> = ({ text, path }) =>
  isDefined(path) ? (
    <Styled.Link href={path}>{text}</Styled.Link>
  ) : (
    <span>{text}</span>
  );
