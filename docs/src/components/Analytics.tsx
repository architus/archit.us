import React from "react";

import { useUmamiAnalytics } from "@docs/data/umami-analytics";

export type AnalyticsProps = {};

const Analytics: React.FC<AnalyticsProps> = () => {
  const umamiOption = useUmamiAnalytics();
  return umamiOption.match({
    None: () => null,
    Some: ({ websiteId, base }) => (
      <script
        async
        defer
        data-website-id={websiteId}
        src={`${base}/umami.js`}
      />
    ),
  });
};

export default Analytics;
