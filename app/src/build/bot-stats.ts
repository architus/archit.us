import { SourceNodesArgs } from "gatsby";
import fetch from "node-fetch";

import { API_BASE } from "@app/api";
import { Option } from "@architus/lib/option";

export const botStatsType = `
  type BotStats implements Node @dontInfer {
    guildCount: Int!
    userCount: Int!
  }
`;

/**
 * Creates the bot stats node by loading the data from the Architus API
 * @param args - Original args from `sourceNodes`
 */
export async function createBotStatsNode(args: SourceNodesArgs): Promise<void> {
  const { actions, reporter, createNodeId, createContentDigest } = args;

  try {
    const response = await fetch(`${API_BASE}/guild-count`);
    const json = await response.json();
    const guildCountOption = Option.from(json?.guildCount);
    const userCountOption = Option.from(json?.userCount);
    Option.merge(guildCountOption, userCountOption).forEach(
      ([guildCount, userCount]) => {
        const nodeContent = { guildCount, userCount };
        const id = createNodeId(`bot-stats--0`);
        actions.createNode({
          id,
          children: [],
          internal: {
            type: `BotStats`,
            content: JSON.stringify(nodeContent),
            contentDigest: createContentDigest(nodeContent),
          },
          ...nodeContent,
        });
      }
    );
  } catch (e) {
    reporter.warn("An error ocurred while fetching usage count");
    reporter.warn(e.toString());
  }
}
