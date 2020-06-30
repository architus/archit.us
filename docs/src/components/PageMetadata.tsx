import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GoPencil } from "react-icons/go";

import { Nil } from "@lib/types";
import { History } from "@docs/build/github-types";
import { withoutLeading, withoutTrailing } from "@lib/utility";
import AutoLink from "./AutoLink";

type PageMetadataProps = {
  originalPath: string | Nil;
  history: History | Nil;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Edit link, authorship list, and edit date displayed at the bottom
 * of each docs page
 */
const PageMetadata: React.FC<PageMetadataProps> = ({
  originalPath,
  history,
  className,
  style,
}) => {
  type GitHubMetadataQueryResult = {
    site: {
      siteMetadata: {
        github: {
          owner: string;
          name: string;
          docsRoot: string;
          branch: string;
        };
      };
    };
  };

  const result = useStaticQuery<GitHubMetadataQueryResult>(graphql`
    query GitHubMetadataQuery {
      site {
        siteMetadata {
          github {
            owner
            name
            docsRoot
            branch
          }
        }
      }
    }
  `);

  const { owner, name, docsRoot, branch } = result.site.siteMetadata.github;
  const root = withoutLeading(withoutTrailing(docsRoot));
  const filePath = withoutLeading(originalPath ?? "");
  const editLink = `https://github.com/${owner}/${name}/blob/${branch}/${root}/${filePath}`;
  return (
    <div className={className} style={style}>
      {history && <HistoryDisplay history={history} />}
      <AutoLink href={editLink} noIcon>
        <GoPencil /> Edit this page on GitHub
      </AutoLink>
    </div>
  );
};

export default PageMetadata;

// ? ==============
// ? Sub-components
// ? ==============

// TODO implement
const HistoryDisplay: React.FC<{ history: History }> = ({ history }) => null;
