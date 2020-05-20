import React from "react";
import { Navbar } from "react-bootstrap";
import styled, { Box, useDown } from "@xstyled/emotion";
import Links from "Components/Header/Links";
import preval from "preval.macro";
import SessionControl from "Components/Header/SessionControl";
import Link from "Components/AutoLink";
import Tooltip from "Components/Tooltip";
import Icon from "Components/Icon";
import { LinkProps } from "Components/Router";
import { AnyIconName } from "Components/Icon/loader";
import Logo from "Components/Logo";
import { attach, isEmptyOrNil, isNil } from "Utility";
import { Option, Some } from "Utility/option";
import { WithBoxProps } from "Utility/types";
import { Breakpoint, opacity } from "Theme";
import "./style.scss";

// TODO file requires full migration to @xstyled/emotion
const Styled = {
  TooltipDivider: styled.hr`
    border-top: 2px solid;
    border-top-color: ${opacity("light", 0.4)};
    margin: pico 0;
  `,
  VersionPill: styled.divBox`
    margin-top: atto;
    margin-left: atto;
    padding: atto pico;
    border-radius: 4px;
    border: 2px solid;
    border-color: secondary;
    color: light;
    background-color: ${opacity("secondary", 0.2)};
    cursor: pointer;

    font-weight: 500;
    font-size: 13px;
    letter-spacing: 1px;
  `,
  VersionIcon: styled(Icon)`
    margin-right: nano;
  `,
  BuildInfoList: styled.ul`
    margin-bottom: 0;
    padding-left: 1rem;
  `,
};

type HeaderProps = {
  children?: React.ReactNode;
  noContainer?: boolean;
  noLinks?: boolean;
  sticky?: boolean;
} & Omit<Partial<React.ComponentProps<typeof Navbar>>, "sticky">;

/**
 * Primary header component, including links and the session control dropdown. Additional
 * children can be passed in via the `children` prop.
 */
const Header: React.FC<HeaderProps> = ({
  children,
  noContainer = false,
  noLinks = false,
  sticky = true,
  ...rest
}) => (
  <Navbar
    expand="md"
    variant="dark"
    collapseOnSelect
    sticky={sticky ? "top" : undefined}
    {...rest}
  >
    <div className={noContainer ? "container-fluid" : "container"}>
      <Brand />
      {noLinks ? null : <Links className="mr-auto" />}
      <div className="header-children">
        {children}
        <SessionControl />
      </div>
    </div>
  </Navbar>
);

// ? ==============
// ? Sub-components
// ? ==============

type BrandProps = Partial<LinkProps> & BuildMarkerPropsBase;

/**
 * Shows a clickable architus logo that goes to the home page, as well as a build tag
 * used for displaying the CI/local build status (hidden on production)
 */
const Brand: React.FC<BrandProps> = ({ top, className, style, ...props }) => (
  <Box
    display="flex"
    alignItems="center"
    mr="micro"
    // Pass style props to the outer component
    className={className}
    style={style}
  >
    <Link {...props} className="nav-link brand" to="/">
      {/* Use just the logotype on very small screen sizes */}
      {useDown(Breakpoint.VS) ? <Logo.Symbol /> : <Logo.Combined />}
    </Link>
    {/* Hide the build marker in the header on small screen sizes */}
    <BuildMarker top={top} display={{ xs: "none", lg: "inline-block" }} />
  </Box>
);

type BuildMarkerPropsBase = { top?: boolean };
type BuildMarkerProps = WithBoxProps<BuildMarkerPropsBase>;

/**
 * Build marker to use in non-production environments to display the CI/local build status
 *
 * **Note**: implementation is specific on *Netlify*, and will need to be changed if we
 * ever migrate CI providers
 */
const BuildMarker: React.FC<BuildMarkerProps> = ({
  top = false,
  ...boxProps
}) => {
  // See https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
  const isLocal = process.env.BUILD_LOCATION !== "remote";
  const isProduction = process.env.BUILD_TAG === "prod";
  const isBranch = process.env.CONTEXT === "branch-deploy";
  const isDevelop = isBranch && process.env.BRANCH === "develop";
  const isPullRequest = process.env.PULL_REQUEST === "true";
  if (isProduction) return null;

  let text: React.ReactNode | null = null;
  let tooltip: React.ReactNode | null = null;
  let icon: AnyIconName | null = null;
  if (isLocal) {
    text = "LOCAL";
    tooltip = (
      <BuildTooltip>
        To hide the local tag, set the environment variable
        &lsquo;BUILD_LOCATION&rsquo; to &lsquo;remote&rsquo;
      </BuildTooltip>
    );
  } else if (isDevelop) {
    text = "CANARY";
    tooltip = (
      <BuildTooltip>
        Test out the upcoming features for archit.us. Builds directly from the
        &lsquo;develop&rsquo; branch on GitHub
      </BuildTooltip>
    );
  } else if (isPullRequest) {
    const prId = process.env.REVIEW_ID;
    icon = "pull-request";
    text = `#${prId}`;
    tooltip = <BuildTooltip>Built automatically from PR #{prId}</BuildTooltip>;
  } else if (isBranch) {
    const branch = process.env.BRANCH;
    icon = "branch";
    text = branch;
    tooltip = (
      <BuildTooltip>
        Built automatically from branch &lsquo;{branch}&rsquo;
      </BuildTooltip>
    );
  } else {
    // Must be a commit
    const commitRef = process.env.COMMIT_REF;
    icon = "commit";
    text = commitRef?.substring(0, 7);
    tooltip = <BuildTooltip>{null}</BuildTooltip>;
  }

  if (text === null) return null;
  const inner = (
    <Styled.VersionPill {...boxProps}>
      {icon && <Styled.VersionIcon name={icon} />}
      {text}
    </Styled.VersionPill>
  );
  if (tooltip === null) return inner;
  return (
    <Tooltip
      id="site-version-tooltip"
      text={tooltip}
      bottom={!top}
      top={top}
      padding="pico"
      maxWidth="tera"
      toggle="click"
    >
      {inner}
    </Tooltip>
  );
};

type BuildTooltipProps = { children: React.ReactNode };

/**
 * Clickable tooltip that displays additional detailed build information as well as
 * clickable links to relevant commits/PRs/deployment URLs
 *
 * **Note**: implementation is specific on *Netlify*, and will need to be changed if we
 * ever migrate CI providers
 */
const BuildTooltip: React.FC<BuildTooltipProps> = ({ children }) => {
  const buildTimeString: string = preval`module.exports = (new Date()).toISOString()`;
  const buildTime = new Date(buildTimeString);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let values: Record<string, React.ReactNode | undefined> = {
    "Build time": `${buildTime.toLocaleDateString(
      undefined,
      dateOptions
    )} at ${buildTime.toLocaleTimeString()}`,
  };
  if (process.env.NETLIFY === "true") {
    values = {
      ...values,
      "Build id": process.env.BUILD_ID,
      Context: process.env.CONTEXT,
      "GitHub repository": (
        <OptionLink>{Option.from(process.env.REPOSITORY_URL)}</OptionLink>
      ),
      "Commit SHA": process.env.COMMIT_REF,
      "Commit URL": (
        <OptionLink>
          {Some(
            `${process.env.REPOSITORY_URL}/commit/${process.env.COMMIT_REF}`
          )}
        </OptionLink>
      ),
      Branch: process.env.BRANCH,
      Head: process.env.HEAD,
      "Deploy URL": (
        <OptionLink>{Option.from(process.env.DEPLOY_PRIME_URL)}</OptionLink>
      ),
      "Deploy Id": process.env.DEPLOY_ID,
    };
  }
  if (process.env.PULL_REQUEST === "true") {
    const prId = process.env.REVIEW_ID;
    values = {
      ...values,
      "Pull request": `#${prId}`,
      "Pull request URL": (
        <OptionLink>
          {Some(`${process.env.REPOSITORY_URL}/pull/${prId}`)}
        </OptionLink>
      ),
    };
  }

  return (
    <Box textAlign="left">
      {children}
      {children != null && <Styled.TooltipDivider />}
      <Styled.BuildInfoList>
        {Object.entries(values).map(([label, value]) => (
          <li key={label}>
            <strong>{label}:</strong>{" "}
            {isNil(value) || (typeof value === "string" && isEmptyOrNil(value))
              ? "~"
              : value}
          </li>
        ))}
      </Styled.BuildInfoList>
    </Box>
  );
};

type OptionLink = {
  children: Option<string>;
};

/**
 * External link that wraps an effective `Option<string>`, displaying only `"~"` if the
 * given option is undefined. Uses the same URL for the link text
 */
const OptionLink: React.FC<OptionLink> = ({ children }) =>
  children
    .map((link) => (
      // eslint-disable-next-line react/jsx-key
      <Link to={link} space="atto" target="_blank" rel="noopener" external>
        {link}
      </Link>
    ))
    .getOrElse(<>~</>);

export default attach(Header, { Brand });
