import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { shallowEqual, useSelector } from "react-redux";
import { getLogs } from "store/actions";
import { useAuthDispatch, isNil } from "utility";

import ReactTable from "react-table";
import "./style.scss";
import "react-table/react-table.css";

function Logs({ guildId }) {
  // Connect to store
  const { logs, authenticated, hasLoaded } = useSelector(state => {
    const id = guildId.toString();
    const hasLoaded = state.logs.logs.hasOwnProperty(id);
    return {
      logs: hasLoaded ? state.logs.logs[id] : [],
      authenticated: state.session.authenticated,
      hasLoaded
    };
  }, shallowEqual);

  // API fetch upon guildId/authentication updates
  const fetchLogs = useAuthDispatch(getLogs);
  useEffect(() => {
    if (authenticated) fetchLogs(guildId);
  }, [authenticated, guildId]);

  return (
    <Container className="py-5">
      <h2>Logs</h2>
      <p>
      View edits and deletes in the server
      </p>
      <div className="table-outer">
        <ReactTable
          data={logs}
          columns={[
            {
              Header: "Type",
              accessor: "type",
              maxWidth: 100
            },
            {
              Header: "Content",
              accessor: "content",
              style: { 'white-space': 'unset' }
            },
            {
              Header: "User",
              accessor: "user_id",
              maxWidth: 175
            },
            {
              Header: "Timestamp",
              accessor: "timestamp",
              maxWidth: 250
            },
          ]}
          defaultPageSize={100}
        />
      </div>
    </Container>
  );
}

export default Logs;

Logs.propTypes = {
  guildId: PropTypes.string
};
