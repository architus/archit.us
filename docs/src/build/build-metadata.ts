import { SourceNodesArgs } from "gatsby";

import { Option, Some, None } from "@lib/option";
import { BuildMetadataEntry } from "@design/components/BuildDetails";
import { NodeInput } from "@docs/build/types";

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

function makeBuildTimeEntry(): BuildMetadataEntry {
  const buildTime = new Date();
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return {
    type: "content",
    label: "Build time",
    content: `${buildTime.toLocaleDateString(
      undefined,
      dateOptions
    )} at ${buildTime.toLocaleTimeString()}`,
  };
}

function flatten(
  source: BuildMetadataEntry[]
): GatsbyTypes.BuildMetadata["details"] {
  return source.map((obj) => ({
    content: undefined,
    href: undefined,
    text: undefined,
    ...obj,
  }));
}

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

  return None;
}
