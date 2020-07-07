import React, { useMemo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { FaGithub } from "react-icons/fa";
import { FiGitCommit, FiGitPullRequest } from "react-icons/fi";

import { Option, Some, None } from "@lib/option";
import { BuildMetadata } from "@design/components/BuildTag";
import {
  BuildContext,
  BuildMetadataEntry,
} from "@design/components/BuildDetails";
import { isDefined } from "@lib/utility";

/**
 * Gets the build metadata for the site, constructed at build time and stored
 * in the Gatsby node store
 */
export function useBuildMetadata(): Option<BuildMetadata> {
  const data = useStaticQuery<GatsbyTypes.BuildMetadataQuery>(graphql`
    query BuildMetadata {
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
  return useMemo(() => {
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
        case "pull-request":
          icon = <FiGitPullRequest />;
          break;
      }

      // Transform entries
      const details: BuildMetadataEntry[] = [];
      buildMetadata.details.forEach(({ type, label, href, text, content }) => {
        switch (type) {
          case "optionLink":
            details.push({
              type: "optionLink",
              label,
              href,
              text,
            });
            break;
          case "content":
            details.push({
              type: "content",
              label,
              content: content ?? "",
            });
            break;
        }
      });

      return Some({
        label: buildMetadata.label,
        icon,
        context,
        details,
      });
    }

    return None;
  }, [buildMetadata]);
}