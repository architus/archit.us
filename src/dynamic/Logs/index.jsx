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
  var options = { year: 'numeric', month: 'short', day: 'numeric', hour: "numeric", minute: "numeric" };


  return (
    <Container className="py-5 logs">
      <h2>Logs</h2>
      <p>
      View edits and deletes in the server
      </p>
      <div className="table-outer">
        <ReactTable
          data={logs}
          noDataText="No logs found :("
          columns={[
            {
              Header: "Type",
              id: 'type',
              accessor: d => (d.type == 'msg_del' ? "Delete" : "Edit"),
              maxWidth: 60
            },
            {
              Header: "Content",
              columns: [
                {
                  Header: "Before",
                  id: 'before',
                  accessor: d => d.type == 'msg_edit' ? JSON.parse(d.content).before : JSON.parse(d.content).content,
                  style: { 'whiteSpace': 'unset' }
                },
                {
                  Header: "After",
                  id: 'after',
                  accessor: d => JSON.parse(d.content).after,
                  style: { 'whiteSpace': 'unset' }
                }
              ]
            },
            {
              Header: "User",
              accessor: "user_id",
              maxWidth: 175
            },
            {
              Header: "Timestamp",
              id: "timestamp",
              accessor: d => (new Date(d.timestamp)).toLocaleString("en-US", options),
              sortMethod: (a, b) => {
                return (new Date(a.timestamp)) - (new Date(b.timestamp));
              },
              maxWidth: 200
            }
          ]}
          defaultSorted={[
            {
              id: "timestamp",
            }
          ]}
          defaultPageSize={20}
          className="-striped -highlight"
        />
      </div>
    </Container>
  );
}

export default Logs;

Logs.propTypes = {
  guildId: PropTypes.string
};
