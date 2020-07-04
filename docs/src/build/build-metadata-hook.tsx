import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { FaGithub } from "react-icons/fa";
import { FiGitCommit, FiGitPullRequest } from "react-icons/fi";

import { Option, Some, None } from "@lib/option";
import { BuildMetadata } from "@design/components/BuildTag";
import { BuildContext } from "@design/components/BuildDetails";
import { isDefined } from "@lib/utility";
import { StoredBuildMetadata } from "@docs/build/build-metadata";

/**
 * Gets the build metadata for the site, constructed at build time and stored
 * in the Gatsby node store
 */
export function useBuildMetadata(): Option<BuildMetadata> {
  type BuildMetadataQueryResult = {
    buildMetadata: null | StoredBuildMetadata;
  };

  // const data = { buildMetadata: null } as BuildMetadataQueryResult;
  const data = useStaticQuery<BuildMetadataQueryResult>(graphql`
    query BuildMetadataQuery {
      buildMetadata {
        label
        icon
        context {
          label
          message
          icon
        }
        details {
          type
          label
          href
          text
          content
        }
      }
    }
  `);

  const { buildMetadata } = data;
  if (isDefined(buildMetadata)) {
    const baseContext = buildMetadata.context;
    const context: BuildContext = {
      label: baseContext.label,
      message: baseContext.message,
      icon: baseContext.icon === "github" ? <FaGithub /> : null,
    };

    let icon: React.ReactNode = null;
    switch (buildMetadata.icon) {
      case "commit":
        icon = <FiGitCommit />;
        break;
      case "pr":
        icon = <FiGitPullRequest />;
        break;
    }

    return Some({
      label: buildMetadata.label,
      icon,
      context,
      details: buildMetadata.details,
    });
  }

  return None;
}
