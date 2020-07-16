import { Node as GatsbyGraphqlNode, CreateResolversArgs } from "gatsby";
import { prune } from "underscore.string";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Node } from "unist";
import visit from "unist-util-visit";

import { Nil } from "@architus/lib/types";
import { isDefined, isNil } from "@architus/lib/utility";

// ! Internal `gatsby-plugin-mdx` API
const mdxDefaultOptions = require("gatsby-plugin-mdx/utils/default-options");
const genMdx = require("gatsby-plugin-mdx/utils/gen-mdx");

/**
 * Custom resolver function that extracts the lead for a docs page
 * by using the internal API of `gatsby-plugin-mdx`
 * @param args - Original arguments from `createResolvers`
 * @param maxLength - Max length for the lead
 */
export async function getLead(
  args: CreateResolversArgs,
  mdxNode: GatsbyGraphqlNode,
  maxLength: number | Nil
): Promise<string | null> {
  // Calls the internal method on `gatsby-plugin-mdx`
  const { mdast: ast } = await genMdx({
    node: mdxNode,
    options: mdxDefaultOptions({}),
    ...args,
  });

  // Find first paragraph
  let firstParagraph: Node | null = null as Node | null;
  visit(ast, "paragraph", (node) => {
    if (isNil(firstParagraph)) firstParagraph = node;
  });

  if (isDefined(firstParagraph)) {
    const textFragments: string[] = [];
    visit(firstParagraph, (node) => {
      if (node.type === `text` || node.type === `inlineCode`) {
        textFragments.push(String(node.value));
      }
    });

    const content = textFragments.join("");
    if (isDefined(maxLength)) {
      return prune(content, maxLength, "...");
    }

    return content;
  }
  return null;
}
