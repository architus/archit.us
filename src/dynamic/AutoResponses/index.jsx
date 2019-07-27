import React, { useEffect, useMemo, useRef } from "react";
import { useMedia } from "react-use";
import PropTypes from "prop-types";
import { shallowEqual, useSelector } from "react-redux";
import { getResponses } from "store/actions";
import { useAuthDispatch, isDefined, isNil } from "utility";

import DataGrid from "components/DataGrid";
import { Container } from "react-bootstrap";
import {
  createResponseCellFormatter,
  createTriggerCellFormatter,
  createCountCellFormatter,
  AuthorCellFormatter
} from "./formatters";

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

  // Max count
  const maxCountRef = useRef(0);
  maxCountRef.current = useMemo(() => {
    if (commands.length === 0) return 0;
    else {
      let maxCount = 0;
      for (let i = 0; i < commands.length; ++i) {
        if (commands[i].count > maxCount) maxCount = commands[i].count;
      }
      return maxCount;
    }
  }, [commands]);

  // Mentions context
  const contextRef = useRef({ users: {} });
  contextRef.current = useMemo(() => {
    let map = {};
    for (var id in authors) {
      if (isDefined(authors[id])) {
        map[id] = { username: authors[id].name };
      }
    }
    return Object.freeze({ users: map });
  }, [authors]);

  // Column definitions
  let columns = [
    {
      key: "trigger",
      name: "Trigger",
      editable: true,
      formatter: createTriggerCellFormatter(contextRef)
    },
    {
      key: "response",
      name: "Response",
      editable: true,
      formatter: createResponseCellFormatter(contextRef)
    },
    {
      key: "count",
      name: "Count",
      sortDescendingFirst: true,
      formatter: createCountCellFormatter(maxCountRef)
    },
    {
      key: "author",
      name: "Author",
      formatter: AuthorCellFormatter
    }
  ];
  const baseColumnMeta = {
    sortable: true,
    filterable: true,
    resizable: true
  };
  let columnWidths = {
    base: [150, 300, 90, 200],
    "768": [200, null, 90, 200],
    "992": [270, null, 200, 240]
  };

  // Remove count column on mobile
  const isMobile = useMedia("(max-width: 767.9px)");
  if (isMobile) {
    const countColumnIndex = 2;
    const removeCountColumn = arr =>
      arr.filter((_c, i) => i !== countColumnIndex);
    columns = removeCountColumn(columns);
    for (var breakpoint in columnWidths) {
      if (columnWidths.hasOwnProperty(breakpoint)) {
        columnWidths[breakpoint] = removeCountColumn(columnWidths[breakpoint]);
      }
    }
  }

  return (
    <Container className="auto-responses" fluid>
      <h2>Automatic Responses</h2>
      <p>
        Manage the triggers and automatic responses for all entries on the
        current server.
      </p>
      <DataGrid
        data={transformedData}
        columns={columns}
        columnWidths={columnWidths}
        sortColumn="count"
        baseColumnMeta={baseColumnMeta}
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
