import React from "react";
import { styled } from "linaria/react";
import { transparentize } from "polished";

import { isDefined } from "@lib/utility";
import { font, color, staticColor, ColorMode, mode } from "@design/theme";
import Article from "@design/components/Article";

const Styled = {
  TableOfContents: styled.div`
    h2 {
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      font-weight: bold;
      color: ${color("textFade")};
      font-family: ${font("body")};
    }

    $spacing: 0.55rem;

    nav {
      font-size: 0.9rem;

      li {
        margin-bottom: $spacing;
      }

      ul {
        padding-top: $spacing;
      }

      & > ul {
        list-style: none;
        padding-left: 0;

        & > li > ul {
          list-style: none;
          padding-left: 1.2rem;

          & > li > ul {
            list-style: none;
            padding-left: 1.5rem;
          }
        }
      }

      a:not(:hover) {
        --toc-link-color: ${transparentize(0.25, staticColor("dark"))};
        ${mode(ColorMode.Dark)} {
          --toc-link-color: ${transparentize(0.5, staticColor("light"))};
        }

        color: var(--toc-link-color);
        border-bottom: none;
      }
    }
  `,
};

export type TableOfContentsNode = {
  url: string;
  title: string;
  items?: TableOfContentsNode[];
};

type TableOfContentsProps = {
  items: TableOfContentsNode[];
  className?: string;
  style?: React.CSSProperties;
};

/**
 * List of header links displayed at the right side of each docs page
 */
const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  className,
  style,
}) => {
  return (
    <Styled.TableOfContents className={className} style={style}>
      <h2>Table of Contents</h2>
      <Article>
        <nav>
          <ul>
            <TocItems items={items} />
          </ul>
        </nav>
      </Article>
    </Styled.TableOfContents>
  );
};

export default TableOfContents;

// ? =================
// ? Helper components
// ? =================

const TocItems: React.FC<{ items: TableOfContentsNode[] }> = ({ items }) => (
  <>
    {items.map((item, i) => (
      <li key={`${item.url}-${i}`}>
        <a href={item.url}>{item.title}</a>
        {isDefined(item.items) ? (
          <ul>
            <TocItems items={item.items} />
          </ul>
        ) : null}
      </li>
    ))}
  </>
);
