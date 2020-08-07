import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

import { Option } from "@architus/lib/option";

export interface BotStats {
  guildCount: number;
  userCount: number;
}

/**
 * Hook to get the guild/user counts shown on the home page,
 * which are stored from the Architus API at build time
 */
export function useBotStats(): Option<BotStats> {
  const data = useStaticQuery<GatsbyTypes.BotStatsQueryQuery>(graphql`
    query BotStatsQuery {
      botStats {
        userCount
        guildCount
      }
    }
  `);

  return useMemo(
    () =>
      Option.merge(
        Option.from(data?.botStats?.guildCount),
        Option.from(data?.botStats?.userCount)
      ).map(([guildCount, userCount]) => ({ guildCount, userCount })),
    [data]
  );
}
