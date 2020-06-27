import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "@docs/components/Header";

const Layout: React.FC = ({ children }) => {
  type HeaderQueryResult = {
    site: {
      siteMetadata: {
        headerTitle: string;
      };
    };
  };

  const data = useStaticQuery<HeaderQueryResult>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          headerTitle
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.headerTitle} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  );
};

export default Layout;
