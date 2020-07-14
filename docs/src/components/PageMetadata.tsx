import { useStaticQuery, graphql } from "gatsby";
import { styled } from "linaria/react";
import React from "react";
import { GoPencil } from "react-icons/go";
import ago from "s-ago";

import AutoLink from "@design/components/AutoLink";
import Tooltip from "@design/components/Tooltip";
import { color } from "@design/theme/color";
import { down } from "@design/theme/media";
import { gap } from "@design/theme/spacing";
import { History, GithubUser } from "@docs/build/github-types";
import {
  addMissingUnit,
  multiplyDimension,
  formatDimension,
} from "@lib/dimension";
import { Nil } from "@lib/types";
import { withoutLeading, withoutTrailing, isNil } from "@lib/utility";

const authorsMixin = `
  width: 32px;
  height: 32px;
  margin: 0;
  display: flex;
  padding: 0;
  z-index: 0;
  position: relative;
  border-radius: 128px;
  border-bottom: none !important;
  box-shadow: 0 0 0 2px ${color("bg")};

  div {
    width: 32px;
    height: 32px;
    margin: 0;
    display: flex;
    padding: 0;
    overflow: hidden;
    position: relative;
    mask-image: radial-gradient(white, black);
    align-items: center;
    border-radius: 128px;
    justify-content: center;
  }
`;

const Styled = {
  PageMetadata: styled.div`
    font-size: 85%;

    ${down("sm")} {
      display: flex;
      flex-direction: column;

      & > :not(:first-child) {
        align-self: flex-start;
        margin-top: ${gap.nano};
      }
    }
  `,
  ModifiedLabel: styled.span`
    display: inline-block;
    padding: ${gap.femto} 0;
    color: ${color("textFade")};
    cursor: pointer;
    margin-right: ${gap.micro};
  `,
  Authors: styled.div`
    display: inline-flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-start;
    margin-right: 0.8rem;
    vertical-align: bottom;
  `,
  AuthorsIcon: styled.a`
    ${authorsMixin}
    border-bottom: none !important;
    transition-property: none !important;

    img {
      width: 100%;
      height: 100%;
      max-width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-color: ${color("bg+10")};
    }

    &:not(:first-child) {
      margin-right: -8px;
    }
  `,
  AuthorsMore: styled.div`
    ${authorsMixin}
    background-color: ${color("bg+10")};
    align-items: center;
    justify-content: center;
    color: ${color("textFade")};
    border-bottom: none !important;
  `,
};

export type PageMetadataProps = {
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
  const result = useStaticQuery<GatsbyTypes.GitHubMetadataQuery>(graphql`
    query GitHubMetadata {
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

  const github = result.site?.siteMetadata?.github;
  if (isNil(github)) return null;

  const { owner, name, docsRoot, branch } = github;
  if (isNil(owner) || isNil(name) || isNil(branch)) return null;
  const root = withoutLeading(withoutTrailing(docsRoot ?? ""));
  const filePath = withoutLeading(originalPath ?? "");
  const rootSegment = root === "" ? "" : `/${root}`;
  const editLink = `https://github.com/${owner}/${name}/blob/${branch}${rootSegment}/${filePath}`;
  return (
    <Styled.PageMetadata className={className} style={style}>
      {history && <HistoryDisplay history={history} />}
      <AutoLink href={editLink} noIcon>
        <GoPencil /> Edit this page on GitHub
      </AutoLink>
    </Styled.PageMetadata>
  );
};

export default PageMetadata;

// ? ==============
// ? Sub-components
// ? ==============

const HistoryDisplay: React.FC<{ history: History }> = React.memo(
  ({ history }) => {
    const { lastModified, authors } = history;
    // Pretty print modified Unix timestamp
    const modifiedDate = new Date(parseInt(lastModified, 10));
    const lang =
      typeof window === "undefined" ? "en-US" : navigator.languages[0];
    const dateString = modifiedDate.toLocaleDateString(lang, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeString = modifiedDate.toLocaleTimeString(lang, {});
    return (
      <span>
        {authors.length > 0 && <Authors authors={authors} />}
        <Tooltip tooltip={`${dateString} at ${timeString}`} placement="top">
          <Styled.ModifiedLabel>
            Last modified {ago(modifiedDate)}
          </Styled.ModifiedLabel>
        </Tooltip>
      </span>
    );
  }
);

const Authors: React.FC<{ authors: readonly GithubUser[] }> = ({ authors }) => {
  const first = authors.slice(0, Math.min(authors.length, 3));
  const hasMore = authors.length > 3;
  const additional = authors.length - 3;
  return (
    <Styled.Authors>
      {hasMore && (
        <Styled.AuthorsMore>
          <Tooltip tooltip={`And ${additional} more`} placement="top">
            <div>
              <More amount={additional} fontSize="1rem" />
            </div>
          </Tooltip>
        </Styled.AuthorsMore>
      )}
      {first.map(({ name, avatarUrl, login, url }) => (
        <AutoLink noIcon noUnderline href={url} key={login}>
          <Styled.AuthorsIcon>
            <Tooltip tooltip={name ?? login} placement="top">
              <div>
                <img src={avatarUrl} alt={`${name ?? login} profile`} />
              </div>
            </Tooltip>
          </Styled.AuthorsIcon>
        </AutoLink>
      ))}
    </Styled.Authors>
  );
};

const More: React.FC<{ amount: number; fontSize: string | number }> = ({
  amount,
  fontSize: baseFontSize,
}) => {
  const text = `${amount}`;
  let fontSize = addMissingUnit(baseFontSize);
  if (text.length === 3) fontSize = multiplyDimension(fontSize, 0.9);
  else if (text.length >= 4) fontSize = multiplyDimension(fontSize, 0.75);
  return <span style={{ fontSize: formatDimension(fontSize) }}>{text}</span>;
};
