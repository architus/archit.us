import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { shallowEqual, useSelector } from "react-redux";
import { getResponses } from "store/actions";
import { useAuthDispatch } from "utility";

import DataGrid from "components/DataGrid";
import { Container } from "react-bootstrap";

import "./style.scss";

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
      <DataGrid
        data={commands}
        columns={[
          { key: "trigger", name: "Trigger", editable: true, width: 240 },
          { key: "response", name: "Response", editable: true },
          { key: "author_id", name: "Author", width: 200 }
        ]}
        baseColumnMeta={{
          sortable: true,
          filterable: true
        }}
        onGridRowsUpdated={(...args) => console.log(args)}
      />
    </Container>
  );
}

export default AutoResponses;

AutoResponses.propTypes = {
  guildId: PropTypes.string
};
