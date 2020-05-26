import React from "react";
import styled, { Box } from "@xstyled/emotion";
import preval from "preval.macro";
import Link from "Components/AutoLink";
import Tooltip from "Components/Tooltip";
import Icon from "Components/Icon";
import { AnyIconName } from "Components/Icon/loader";
import { isEmptyOrNil, isNil } from "Utility";
import { Option, Some, None } from "Utility/option";
import { WithBoxProps, Nil } from "Utility/types";
import { opacity, adjust } from "Theme";

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
    list-style: none;
    padding-left: 0;

    a {
      color: ${adjust("primary", (c) => c.brighten(10))};
    }

    & h5 {
      font-size: 0.95em;
      margin-top: nano;
      margin-bottom: 0;
      opacity: 0.65;
    }

    & span {
      font-size: 1em;
      margin-top: atto;
      margin-bottom: 0;
      display: block;
    }
  `,
};

export type BuildMarkerPropsBase = { top?: boolean };
export type BuildMarkerProps = WithBoxProps<BuildMarkerPropsBase>;

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
  // Escape early if in production
  if (process.env.PRODUCTION !== "true") {
    const isLocal = process.env.BUILD_LOCATION !== "remote";
    const isNetlify = process.env.NETLIFY === "true";
    const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
    // See https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
    const isBranch = process.env.CONTEXT === "branch-deploy";
    const isDevelop = isBranch && process.env.BRANCH === "develop";
    const isPullRequest = process.env.PULL_REQUEST === "true";

    let text: React.ReactNode | null = null;
    let tooltip: React.ReactNode | null = null;
    let icon: AnyIconName | null = null;
    if (isLocal) {
      // Local build environment (no `BUILD_LOCATION` set)
      text = "LOCAL";
      tooltip = (
        <BuildTooltip context="local">
          To hide the local tag, set the environment variable
          &lsquo;BUILD_LOCATION&rsquo; to &lsquo;remote&rsquo;
        </BuildTooltip>
      );
    } else if (isNetlify) {
      if (isDevelop) {
        // Building on Netlify develop
        text = "CANARY";
        tooltip = (
          <BuildTooltip context="netlify">
            Test out the upcoming features for archit.us. Builds directly from
            the &lsquo;develop&rsquo; branch on GitHub
          </BuildTooltip>
        );
      } else {
        // Use empty tooltip with only build metadata
        tooltip = <BuildTooltip context="netlify" />;

        if (isPullRequest) {
          const prId = process.env.REVIEW_ID;
          icon = "pull-request";
          text = `#${prId}`;
        } else if (isBranch) {
          const branch = process.env.BRANCH;
          icon = "branch";
          text = branch;
        } else {
          // Must be a commit
          const commitRef = process.env.COMMIT_REF;
          icon = "commit";
          text = commitRef?.substring(0, 7);
        }
      }
    } else if (isGitHubActions) {
      // GitHub actions either deploys a PR or a commit
      const prIdOption = optionFromString(process.env.BUILD_PR_ID);
      // Use empty tooltip with only build metadata
      tooltip = <BuildTooltip context="github-actions" />;

      if (prIdOption.isDefined()) {
        // Build is a PR
        icon = "pull-request";
        text = `#${prIdOption.get}`;
      } else {
        // Build is a commit
        const sha = process.env.BUILD_SHA;
        icon = "commit";
        text = sha?.substring(0, 7);
      }
    }

    // Create the main pill component to hold the version
    if (text === null) return null;
    const inner = (
      <Styled.VersionPill {...boxProps}>
        {icon && <Styled.VersionIcon name={icon} />}
        {text}
      </Styled.VersionPill>
    );

    // Add the tooltip if one was specified
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
  }

  return null;
};

export default BuildMarker;

// ? ==============
// ? Sub-components
// ? ==============

type BuildContext = "netlify" | "local" | "github-actions";
type BuildTooltipProps = { children?: React.ReactNode; context: BuildContext };

/**
 * Clickable tooltip that displays additional detailed build information as well as
 * clickable links to relevant commits/PRs/deployment URLs
 *
 * **Note**: implementation is specific on either *Netlify* or *Github Actions*, and will
 * need to be changed if we ever migrate CI providers
 */
const BuildTooltip: React.FC<BuildTooltipProps> = ({ children, context }) => {
  // Escape early if in production
  if (process.env.PRODUCTION !== "true") {
    const values = getBuildMetadata(context);
    return (
      <Box textAlign="left">
        {children}
        {children != null && <Styled.TooltipDivider />}
        <Styled.BuildInfoList>
          {Object.entries(values).map(([label, value]) => (
            <li key={label}>
              <h5>{label}</h5>
              <span>
                {isNil(value) ||
                (typeof value === "string" && isEmptyOrNil(value))
                  ? "~"
                  : value}
              </span>
            </li>
          ))}
        </Styled.BuildInfoList>
      </Box>
    );
  }

  return <>children</>;
};

type OptionLink = {
  children: Option<string>;
  text?: React.ReactNode | Nil;
};

/**
 * External link that wraps an effective `Option<string>`, displaying only `"~"` if the
 * given option is undefined. Uses the same URL for the link text unless `text` is
 * specified
 */
const OptionLink: React.FC<OptionLink> = ({ children, text }) =>
  children
    .map((link) => (
      // eslint-disable-next-line react/jsx-key
      <Link to={link} space="atto" target="_blank" rel="noopener" external>
        {text ?? link}
      </Link>
    ))
    .getOrElse(<>~</>);

// ? ================
// ? Helper functions
// ? ================

function getBuildMetadata(
  context: BuildContext
): Record<string, React.ReactNode> {
  // Always include build time even in local
  const values: Record<string, React.ReactNode | undefined> = {
    "Build time": getBuildTime(),
    "Build context": context,
  };

  // Pull in values from Netlify's environment
  // See https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
  if (context === "netlify") {
    Object.assign(values, {
      "Build ID": process.env.BUILD_ID,
      "Netlify context": process.env.CONTEXT,
      "GitHub repository": (
        <OptionLink>{optionFromString(process.env.REPOSITORY_URL)}</OptionLink>
      ),
      "Commit SHA": process.env.COMMIT_REF,
      "Commit URL": (
        <OptionLink text={process.env.COMMIT_REF?.slice(0, 7)}>
          {Some(
            `${process.env.REPOSITORY_URL}/commit/${process.env.COMMIT_REF}`
          )}
        </OptionLink>
      ),
      Branch: process.env.BRANCH,
      Head: process.env.HEAD,
      "Deploy URL": (
        <OptionLink>
          {optionFromString(process.env.DEPLOY_PRIME_URL)}
        </OptionLink>
      ),
      "Deploy ID": process.env.DEPLOY_ID,
    });

    // Add additional metadata for PRs
    if (process.env.PULL_REQUEST === "true") {
      const prId = process.env.REVIEW_ID;
      Object.assign(values, {
        "Pull request": `#${prId}`,
        "Pull request URL": (
          <OptionLink>
            {Some(`${process.env.REPOSITORY_URL}/pull/${prId}`)}
          </OptionLink>
        ),
      });
    }
  }

  // Pull in values from the environment created by our custom staging workflow
  // See /.github/workflows/staging.yml
  if (context === "github-actions") {
    const repoUrl = `https://github.com/${process.env.GITHUB_REPOSITORY}`;
    const jobIdOption = optionFromString(process.env.BUILD_JOB_ID);
    Object.assign(values, {
      "Run ID": (
        <OptionLink text={process.env.BUILD_RUN_ID}>
          {Some(`${repoUrl}/actions/runs/${process.env.BUILD_RUN_ID}`)}
        </OptionLink>
      ),
      "Job ID": (
        <OptionLink text={jobIdOption.getOrElse("~")}>
          {jobIdOption.map((jobId) => `${repoUrl}/actions/${jobId}`)}
        </OptionLink>
      ),
      "GitHub repository": (
        <OptionLink text={process.env.GITHUB_REPOSITORY}>
          {Some(repoUrl)}
        </OptionLink>
      ),
      "GitHub event": process.env.GITHUB_EVENT_NAME,
      "Staging event": process.env.BUILD_PATH,
      "Deploy URL": (
        <OptionLink>
          {optionFromString(process.env.BUILD_DEPLOY_URL)}
        </OptionLink>
      ),
      Branch: process.env.BUILD_BRANCH,
      "Commit SHA": process.env.BUILD_SHA,
      "Commit URL": (
        <OptionLink text={process.env.BUILD_SHA?.slice(0, 7)}>
          {Some(`${repoUrl}/commit/${process.env.BUILD_SHA}`)}
        </OptionLink>
      ),
      "Commit deploy URL": (
        <OptionLink>
          {optionFromString(process.env.BUILD_COMMIT_URL)}
        </OptionLink>
      ),
    });

    // Add additional metadata for PRs
    if (process.env.GITHUB_EVENT_NAME === "pull_request") {
      const prId = process.env.BUILD_PR_ID;
      Object.assign(values, {
        "Pull request": `#${prId}`,
        "Base branch": process.env.BUILD_BASE_BRANCH,
        "Pull request URL": (
          <OptionLink>{Some(`${repoUrl}/pull/${prId}`)}</OptionLink>
        ),
      });
    }
  }

  return values;
}

/**
 * Gets the original build time of the application from continouous integration/local
 * build
 */
function getBuildTime(): string {
  // Use preval macro to evaluate javascript at build time
  const buildTimeString: string = preval`module.exports = (new Date()).toISOString()`;
  const buildTime = new Date(buildTimeString);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return `${buildTime.toLocaleDateString(
    undefined,
    dateOptions
  )} at ${buildTime.toLocaleTimeString()}`;
}

/**
 * Conditionally wraps a string in an option if it contains more than whitespace
 * @param base - Base string to conditionally wrap
 */
function optionFromString(base: string | Nil): Option<string> {
  if (isNil(base)) return None;
  const trimmed = base.trim();
  if (trimmed.length > 0) return Some(trimmed);
  return None;
}
