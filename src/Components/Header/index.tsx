import React from "react";
import { Navbar } from "react-bootstrap";
import styled, { Box } from "@xstyled/emotion";
import Links from "Components/Header/Links";
import preval from "preval.macro";
import SessionControl from "Components/Header/SessionControl";
import Link from "Components/AutoLink";
import Tooltip from "Components/Tooltip";
import Icon from "Components/Icon";
import { LinkProps } from "Components/Router";
import { AnyIconName } from "Components/Icon/loader";
import LogoSvg from "Assets/logo.inline.svg";
import { attach, isEmptyOrNil } from "Utility";
import { opacity } from "Theme/getters";
import "./style.scss";

type HeaderProps = {
  children?: React.ReactNode;
  noContainer?: boolean;
  noLinks?: boolean;
  sticky?: boolean;
} & Omit<Partial<React.ComponentProps<typeof Navbar>>, "sticky">;

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
      <Navbar.Toggle aria-controls="collapse-links" />
      <Navbar.Collapse id="collapse-links">
        {noLinks ? null : <Links className="mr-auto" />}
        <div className="header-children">
          {children}
          <SessionControl />
        </div>
      </Navbar.Collapse>
    </div>
  </Navbar>
);

type BrandProps = Partial<LinkProps>;

const Brand: React.FC<BrandProps> = (props) => (
  <Box display="flex" alignItems="center" mr="micro">
    <Link {...props} className="nav-link brand" to="/">
      <div dangerouslySetInnerHTML={{ __html: LogoSvg }} />
    </Link>
    <BuildMarker />
  </Box>
);

const Styled = {
  TooltipDivider: styled.hr`
    border-top: 2px solid;
    border-top-color: ${opacity("light", 0.4)};
    margin: pico 0;
  `,
  VersionPill: styled.div`
    display: inline-block;
    margin-top: femto;
    margin-left: femto;
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

const BuildMarker: React.FC = () => {
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
    <Styled.VersionPill>
      {icon && <Styled.VersionIcon name={icon} />}
      {text}
    </Styled.VersionPill>
  );
  if (tooltip === null) return inner;
  return (
    <Tooltip
      id="site-version-tooltip"
      text={tooltip}
      bottom
      padding={6}
      maxWidth={320}
    >
      {inner}
    </Tooltip>
  );
};

type BuildTooltipProps = { children: React.ReactNode };

const BuildTooltip: React.FC<BuildTooltipProps> = ({ children }) => {
  const buildTimeString: string = preval`module.exports = (new Date()).toISOString()`;
  const buildTime = new Date(buildTimeString);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let values: Record<string, string | undefined> = {
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
      "GitHub repository": process.env.REPOSITORY_URL,
      "Commit SHA": process.env.COMMIT_REF,
      Branch: process.env.BRANCH,
      Head: process.env.HEAD,
      "Deploy URL": process.env.DEPLOY_PRIME_URL,
      "Deploy Id": process.env.DEPLOY_ID,
    };
  }

  return (
    <Box textAlign="left">
      {children}
      {children != null && <Styled.TooltipDivider />}
      <Styled.BuildInfoList>
        {Object.entries(values).map(([label, value]) => (
          <li key={label}>
            <strong>{label}:</strong> {isEmptyOrNil(value) ? "~" : value}
          </li>
        ))}
      </Styled.BuildInfoList>
    </Box>
  );
};

export default attach(Header, { Brand });
