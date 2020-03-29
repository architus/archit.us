import React from "react";
import Layout from "Components/Layout";

type NotFoundProps = {
  fromApp?: boolean;
};

const NotFound: React.FC<NotFoundProps> = ({ fromApp = false }) => (
  <Layout title="Not Found" noHeader={fromApp}>
    <p>Page not found</p>
  </Layout>
);

export default NotFound;
