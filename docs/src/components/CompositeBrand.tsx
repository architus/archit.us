import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { styled } from "linaria/react";

import { TooltipProps } from "@design/components/Tooltip";
import BuildTag from "@design/components/BuildTag";
import Logo from "@design/components/Logo";
import { gap } from "@design/theme/spacing";
import { down, BreakpointKey, maxWidth, breakpoint } from "@design/theme/media";
import { useBuildMetadata } from "@docs/build/build-metadata-hook";
import { isDefined } from "@lib/utility";
import { useMedia } from "@lib/hooks";

const Styled = {
  Brand: styled.div<{ withVersion: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: ${(p): string => (p.withVersion ? "13px" : "0")};
  `,
  Logo: styled(Logo.Symbol)`
    fill: currentColor;
  `,
  SiteTitle: styled.h1`
    font-size: 1.24rem;
    margin-bottom: 0;
    margin-left: ${gap.pico};
    top: 2px;
    position: relative;
    white-space: nowrap;

    /* The font size needs to be slightly smaller on very small devices */
    ${down("vs")} {
      font-size: 1.1rem;
    }
  `,
  BuildTag: styled(BuildTag)`
    margin-left: ${gap.pico};
    vertical-align: 2px;
  `,
  Version: styled.span`
    position: absolute;
    bottom: -19px;
    left: 0;
    opacity: 0.5;
    font-size: 80%;
  `,
};

type CompositeBrandProps = {
  showVersion?: boolean;
  hideTagBreakpoint?: BreakpointKey;
  buildTooltipPlacement?: TooltipProps["placement"];
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Brand component that shows the site brand with logo/text in addition
 * to an optional version string and the build tag when built locally/in CI
 */
const CompositeBrand: React.FC<CompositeBrandProps> = ({
  showVersion = false,
  hideTagBreakpoint,
  buildTooltipPlacement,
  className,
  style,
}) => {
  const data = useStaticQuery<GatsbyTypes.SiteTitleQuery>(graphql`
    query SiteTitle {
      site {
        siteMetadata {
          headerTitle
          version
        }
      }
    }
  `);

  const buildMetadata = useBuildMetadata();

  let breakpoints: string[] = [];
  let values: boolean[] = [];
  if (isDefined(hideTagBreakpoint)) {
    breakpoints = [maxWidth(breakpoint(hideTagBreakpoint))];
    values = [false];
  }
  const showBuildTag = useMedia(breakpoints, values, true);

  return (
    <Styled.Brand className={className} style={style} withVersion={showVersion}>
      <Styled.Logo height={36} />
      <Styled.SiteTitle>
        {data?.site?.siteMetadata?.headerTitle}
        {buildMetadata.isDefined() && showBuildTag && (
          <Styled.BuildTag
            metadata={buildMetadata.get}
            tooltipPlacement={buildTooltipPlacement}
          />
        )}
        {showVersion && (
          <Styled.Version>{data?.site?.siteMetadata?.version}</Styled.Version>
        )}
      </Styled.SiteTitle>
    </Styled.Brand>
  );
};

export default CompositeBrand;
