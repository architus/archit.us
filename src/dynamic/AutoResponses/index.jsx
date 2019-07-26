import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { shallowEqual, useSelector } from "react-redux";
import { getResponses } from "store/actions";
import { useAuthDispatch, isDefined, isNil, isEmptyOrNil } from "utility";

import DataGrid from "components/DataGrid";
import UserDisplay from "components/UserDisplay";
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

  // Row updating
  const onRowUpdate = ({ idx, key, updatedCell }) => {
    console.log(`Updating`);
    console.log({ idx, key, updatedCell });
  };

  // Row deletion
  const onRowDelete = row => {
    console.log(`Deleting`);
    console.log(row);
  };

  // Transform author data
  const authorData = ({ author_id }) => {
    if (
      author_id <= 0 ||
      !authors.hasOwnProperty(author_id) ||
      isNil(authors[author_id])
    )
      return {
        author: "Unknown",
        avatar: null,
        name: "Unknown",
        discriminator: null
      };
    else {
      const { name, avatar, discriminator } = authors[author_id];
      return {
        author: `${name}#${discriminator}|${author_id}`,
        avatar,
        name,
        discriminator
      };
    }
  };
  const transformRow = row => {
    return isDefined(row) ? { ...row, ...authorData(row) } : row;
  };
  const transformedData = useMemo(() => commands.map(transformRow), [
    commands,
    authors
  ]);

  return (
    <Container className="py-5 auto-responses">
      <h2>Automatic Responses</h2>
      <p>
        Manage the triggers and automatic responses for all entries on the
        current server.
      </p>
      <DataGrid
        data={transformedData}
        columns={[
          { key: "trigger", name: "Trigger", editable: true, width: 240 },
          { key: "response", name: "Response", editable: true },
          {
            key: "author",
            name: "Author",
            width: 200,
            formatter: AuthorCellFormatter
          }
        ]}
        baseColumnMeta={{
          sortable: true,
          filterable: true,
          resizable: true
        }}
        onRowUpdate={onRowUpdate}
        onRowDelete={onRowDelete}
        isLoading={!hasLoaded}
        emptyLabel="No responses to display"
      />
    </Container>
  );
}

export default AutoResponses;

AutoResponses.propTypes = {
  guildId: PropTypes.string
};

// ? ==============
// ? Sub components
// ? ==============

function AuthorCellFormatter({
  row: { name, discriminator, avatar, author_id }
}) {
  return (
    <div className="author-display">
      <UserDisplay.Avatar
        avatarHash={avatar}
        discriminator={discriminator}
        clientId={author_id}
        circle
        size={28}
      />
      <span className="name">{name}</span>
      {isEmptyOrNil(discriminator) ? null : (
        <span className="discriminator">{`#${discriminator}`}</span>
      )}
    </div>
  );
}

AuthorCellFormatter.propTypes = {
  row: PropTypes.object
};
