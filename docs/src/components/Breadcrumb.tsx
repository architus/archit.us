import React, { Fragment } from "react";
import { css } from "linaria";
import { styled } from "linaria/react";
import { FaChevronRight } from "react-icons/fa";

import { BreadcrumbSegment } from "@docs/templates/Docs/frontmatter";
import { isDefined } from "@lib/utility";
import { color, gap, primaryLink } from "@design/theme";
import AutoLink from "@design/components/AutoLink";

const primaryLinkClassName = css`
  ${primaryLink}
`;

const Styled = {
  BreadcrumbIcon: styled(FaChevronRight)`
    color: ${color("textFade")};
    font-size: 70%;
    margin: 0 ${gap.pico};
  `,
};

type BreadcrumbProps = {
  segments: BreadcrumbSegment[];
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
      <Fragment key={path ?? text}>
        <BreadcrumbEntry path={path} text={text} />
        {index !== segments.length - 1 ? <Styled.BreadcrumbIcon /> : null}
      </Fragment>
    ))}
  </div>
);

export default Breadcrumb;

// ? =================
// ? Helper components
// ? =================

const BreadcrumbEntry: React.FC<BreadcrumbSegment> = ({ text, path }) =>
  isDefined(path) ? (
    <AutoLink className={primaryLinkClassName} href={path}>
      {text}
    </AutoLink>
  ) : (
    <span>{text}</span>
  );
