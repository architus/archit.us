import React from "react";
import { Helmet } from "react-helmet";

import { useSEOData } from "@app/data/seo-data";

export type PageTitleProps = {
  title: string;
};

/**
 * `react-helmet`-based component that is used to change the title inside
 * of app sub-pages
 */
const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const seoData = useSEOData();
  const siteTitle = seoData.title.getOrElse("Architus");
  const derivedTitle = `${title} | ${siteTitle}`;
  return (
    <Helmet
      title={derivedTitle}
      meta={[
        {
          property: `og:title`,
          content: derivedTitle,
        },
        {
          name: `twitter:title`,
          content: derivedTitle,
        },
      ]}
    />
  );
};

export default PageTitle;
