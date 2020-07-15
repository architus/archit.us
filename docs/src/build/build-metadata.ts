import { SourceNodesArgs } from "gatsby";

import { BuildMetadataEntry } from "@design/components/BuildDetails";
import { NodeInput } from "@docs/build/types";
import { Option, Some, None } from "@lib/option";
import { Nil } from "@lib/types";
import { isNil } from "@lib/utility";

export const buildMetadataType = `
  type BuildMetadataContext {
    label: String!
    message: String
    icon: String
  }
  type BuildMetadataEntry {
    type: String!
    label: String!
    href: String
    text: String
    content: String
    timestamp: String
  }
  type BuildMetadata implements Node @dontInfer {
    label: String!
    icon: String
    context: BuildMetadataContext!
    details: [BuildMetadataEntry!]!
  }
`;

/**
 * Creates the build metadata node
 * @param args - Original args from `sourceNodes`
 */
export async function createBuildMetadataNode(
  args: SourceNodesArgs
): Promise<void> {
  const { actions, createNodeId, createContentDigest } = args;
  const metadata = loadBuildMetadata();
  if (metadata.isDefined()) {
    const nodeContent = metadata.get;
    const id = createNodeId(`build-metadata--0`);
    actions.createNode({
      id,
      children: [],
      internal: {
        type: `BuildMetadata`,
        content: JSON.stringify(nodeContent),
        contentDigest: createContentDigest(nodeContent),
      },
      ...nodeContent,
    });
  }
}

/**
 * Makes an entry for the site build time, run during site build
 */
function makeBuildTimeEntry(): BuildMetadataEntry {
  return {
    type: "date",
    label: "Build time",
    timestamp: String(new Date().getTime()),
  };
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

/**
 * Flattens an array of the discriminated union entry type to the type
 * used for storing in the Gatsby GraphQL node store
 * @param source - Source array of entries
 */
function flatten(
  source: BuildMetadataEntry[]
): GatsbyTypes.BuildMetadata["details"] {
  return source.map((obj) => ({
    content: undefined,
    href: undefined,
    text: undefined,
    timestamp: undefined,
    ...obj,
  }));
}

/**
 * Loads the build metadata node at build time from the environment
 */
function loadBuildMetadata(): Option<NodeInput<GatsbyTypes.BuildMetadata>> {
  if (process.env.BUILD_LOCATION !== "remote") {
    // Local build environment (no `BUILD_LOCATION` set)
    return Some({
      label: "LOCAL",
      icon: undefined,
      context: {
        label: "local",
        message: `To hide the local tag, set the environment variable "BUILD_LOCATION" to "remote"`,
        icon: undefined,
      },
      details: flatten([makeBuildTimeEntry()]),
    });
  }

  if (process.env.GITHUB_ACTIONS === "true") {
    // GitHub actions environment (deploys a PR or a commit)
    // https://docs.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables
    // See /.github/workflows/docs-staging.yml for the environment variable source

    const isPr = process.env.GITHUB_EVENT_NAME === "pull_request";
    const repoUrl = `https://github.com/${process.env.GITHUB_REPOSITORY}`;
    const jobIdOption = optionFromString(process.env.BUILD_JOB_ID);
    const details: BuildMetadataEntry[] = [makeBuildTimeEntry()];

    // Add base detail entries
    details.push({
      type: "optionLink",
      label: "Run ID",
      href: `${repoUrl}/actions/runs/${process.env.BUILD_RUN_ID}`,
      text: process.env.BUILD_RUN_ID,
    });
    details.push({
      type: "optionLink",
      label: "Job ID",
      href: jobIdOption
        .map((jobId) => `${repoUrl}/runs/${jobId}`)
        .orUndefined(),
      text: jobIdOption.getOrElse("~"),
    });
    details.push({
      type: "optionLink",
      label: "GitHub repository",
      href: repoUrl,
      text: process.env.GITHUB_REPOSITORY,
    });
    details.push({
      type: "content",
      label: "GitHub event",
      content: process.env.GITHUB_EVENT_NAME ?? "~",
    });
    details.push({
      type: "content",
      label: "Staging event",
      content: process.env.BUILD_PATH ?? "~",
    });
    details.push({
      type: "optionLink",
      label: "Deploy URL",
      href: optionFromString(process.env.BUILD_DEPLOY_URL).orUndefined(),
    });
    details.push({
      type: "content",
      label: "Branch",
      content: process.env.BUILD_BRANCH ?? "~",
    });
    details.push({
      type: "content",
      label: "Commit SHA",
      content: process.env.BUILD_SHA ?? "~",
    });
    details.push({
      type: "optionLink",
      label: "Commit URL",
      href: `${repoUrl}/commit/${process.env.BUILD_SHA}`,
      text: process.env.BUILD_SHA?.slice(0, 7),
    });
    details.push({
      type: "optionLink",
      label: "Commit deploy URL",
      href: optionFromString(process.env.BUILD_COMMIT_URL).orUndefined(),
    });

    if (isPr) {
      // Add PR-specific detail entries
      const prId = process.env.BUILD_PR_ID;
      details.push({
        type: "content",
        label: "Pull request",
        content: `#${prId}`,
      });
      details.push({
        type: "content",
        label: "Base branch",
        content: process.env.BUILD_BASE_BRANCH ?? "",
      });
      details.push({
        type: "optionLink",
        label: "Pull request URL",
        href: `${repoUrl}/pull/${prId}`,
      });

      return Some({
        label: `#${prId}`,
        icon: "pull-request",
        context: {
          label: "github-actions",
          message: undefined,
          icon: "github",
        },
        details: flatten(details),
      });
    }

    // Must be a commit
    return Some({
      label: process.env.BUILD_SHA?.substring(0, 7).toUpperCase() ?? "COMMIT",
      icon: "commit",
      context: {
        label: "github-actions",
        message: undefined,
        icon: "github",
      },
      details: flatten(details),
    });
  }

  return None;
}
