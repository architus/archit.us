import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { shallowEqual, useSelector } from "react-redux";
import { getResponses } from "store/actions";
import { useAuthDispatch, isNil } from "utility";

import { Container } from "react-bootstrap";
import ReactTable from "react-table";

import "./style.scss";
import "react-table/react-table.css";

function AutoResponses({ guildId }) {
  // Connect to store
  const { commands, authors, authenticated, hasLoaded } = useSelector(state => {
    const id = guildId.toString();
    const hasLoaded = state.responses.commands.hasOwnProperty(id);
    return {
      commands: hasLoaded ? state.responses.commands[id] : [],
      authors: hasLoaded ? state.responses.authors[id] : [],
      authenticated: state.session.authenticated,
      hasLoaded
    };
  }, shallowEqual);

  // API fetch upon guildId/authentication updates
  const fetchResponses = useAuthDispatch(getResponses);
  useEffect(() => {
    if (authenticated) fetchResponses(guildId);
  }, [authenticated, guildId]);

  return (
    <Container className="py-5 auto-responses">
      <h2>Automatic Responses</h2>
      <p>
        Manage the triggers and automatic responses for all entries on the
        current server.
      </p>
      <div className="table-outer">
        <ReactTable
          data={commands}
          columns={[
            {
              Header: "Trigger",
              accessor: "trigger",
              style: { 'whiteSpace': 'unset' }
            },
            {
              Header: "Response",
              accessor: "response",
              style: { 'whiteSpace': 'unset' }
            },
            {
              Header: "Count",
              accessor: "count",
              maxWidth: 100
            },
            {
              Header: "Author",
              id: "author",
              accessor: d => {
                const author = authors[d.author_id.toString()];
                if (!isNil(author)) return author.name + "#" + author.discriminator;
                else if (d.author_id == 0) return "Unknown";
                else return d.author_id;
              },
              maxWidth: 200
            }
          ]}
          defaultPageSize={100}
          className="-striped -highlight"
        />
      </div>
    </Container>
  );
}

export default AutoResponses;

AutoResponses.propTypes = {
  guildId: PropTypes.string
};
