import { styled } from "linaria/react";
import React from "react";

import { useBuildMetadata } from "@app/data/build-metadata";
import { useVersion } from "@app/data/version";
import BuildTag from "@architus/facade/components/BuildTag";
import Logo from "@architus/facade/components/Logo";
import { TooltipProps } from "@architus/facade/components/Tooltip";
import {
  down,
  BreakpointKey,
  maxWidth,
  breakpoint,
} from "@architus/facade/theme/media";
import { gap } from "@architus/facade/theme/spacing";
import { useMedia } from "@architus/lib/hooks";
import { isDefined } from "@architus/lib/utility";

const Styled = {
  Brand: styled.div<{ withVersion: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: ${(p): string => (p.withVersion ? "13px" : "0")};
  `,
  Logo: styled(Logo.Combined)`
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

export type CompositeBrandProps = {
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
  const version = useVersion();
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
        {buildMetadata.isDefined() && showBuildTag && (
          <Styled.BuildTag
            metadata={buildMetadata.get}
            tooltipPlacement={buildTooltipPlacement}
          />
        )}
        {showVersion && version.isDefined() && (
          <Styled.Version>{version.get}</Styled.Version>
        )}
      </Styled.SiteTitle>
    </Styled.Brand>
  );
};

export default CompositeBrand;
