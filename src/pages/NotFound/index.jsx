import React from "react";
import PropTypes from "prop-types";

import Layout from "components/Layout";

function NotFound({ fromApp = false }) {
  return (
    <Layout title="Not Found" noHeader={fromApp}>
      <p>Page not found</p>
    </Layout>
  );
}

export default NotFound;

NotFound.propTypes = {
  fromApp: PropTypes.bool
};
