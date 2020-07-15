import { cx } from "linaria";
import { styled } from "linaria/react";
import Prism, { Grammar } from "prismjs";
import React, { useState, useMemo, useEffect } from "react";

import Spinner from "@design/components/Spinner";
import CodeBlock from "@docs/components/CodeBlock";
import { Option, Some } from "@lib/option";
import { isDefined } from "@lib/utility";
import "@docs/languages";

const Styled = {
  Placeholder: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  `,
};

export type ExternalSnippetProps = {
  src: string;
  grammar?: Grammar;
  language?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Lazy-loaded and syntax-highlighted snippet that takes its content
 * from the result of a direct HTTP GET, resolved as soon as the component is mounted.
 * **Note**: languages must be added to `@docs/languages` for them to work here.
 */
const ExternalSnippet: React.FC<ExternalSnippetProps> = ({
  src,
  language = "snippet",
  grammar,
  className,
  style,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState("");
  const grammarOption = isDefined(grammar)
    ? Some(grammar)
    : Option.from(Prism.languages[language]);

  useEffect(() => {
    fetch(src)
      .then((response) => response.text())
      .then((text) => {
        if (text.trim().length > 0) {
          setIsLoaded(true);
          setContent(text);
        } else {
          throw new Error(`empty response ${text}`);
        }
      })
      .catch((error) => {
        setContent(`An error ocurred loading ${src}:\n${error}`);
      });
  }, [src]);

  const textOption = useMemo(
    () =>
      grammarOption.match({
        None: () =>
          Some(
            `No loaded Prism grammar ${grammar}.\n` +
              `Make sure to add an import to @docs/languages if using a new language`
          ),
        Some: (resolvedGrammar) =>
          Option.if(isLoaded).map(() => highlight(content, resolvedGrammar)),
      }),
    [content, grammar, grammarOption, isLoaded]
  );

  return (
    <div className={cx("gatsby-highlight", className)} style={style}>
      {textOption.match({
        None: () => (
          <Styled.Placeholder>
            <Spinner variant="primary" />
          </Styled.Placeholder>
        ),
        Some: (text) => (
          <CodeBlock className={`language-${language}`}>
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </CodeBlock>
        ),
      })}
    </div>
  );
};

export default ExternalSnippet;

// ? =================
// ? Utility functions
// ? =================

function highlight(code: string, grammar?: Grammar, language?: string): string {
  return isDefined(grammar)
    ? Prism.highlight(code, grammar, language ?? "snippet")
    : code;
}
