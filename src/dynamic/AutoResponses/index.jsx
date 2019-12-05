import React, {
  useEffect,
  useMemo,
  useRef,
  useContext,
  useCallback,
  useState
} from "react";
import { useMedia } from "react-use";
import PropTypes from "prop-types";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  getResponses,
  addResponse,
  editResponse,
  deleteResponse,
  localAddResponse,
  localEditResponse,
  localDeleteResponse
} from "store/actions";
import { useAuthDispatch, isDefined, isNil, useCallbackOnce } from "Utility";
import { AppScrollContext } from "dynamic/AppRoot";

import DataGrid, { NumericFilter } from "components/DataGrid";
import Switch from "components/Switch";
import {
  createResponseCellFormatter,
  createTriggerCellFormatter,
  createCountCellFormatter,
  AuthorCellFormatter
} from "./formatters";

import "./style.scss";

function AutoResponses({ guildId }) {
  // Connect to store
  const dispatch = useDispatch();
  const addRow = useAuthDispatch(addResponse);
  const editRow = useAuthDispatch(editResponse);
  const deleteRow = useAuthDispatch(deleteResponse);
  const {
    commands,
    authors,
    authenticated,
    hasLoaded,
    isArchitusAdmin,
    session
  } = useSelector(state => {
    const id = guildId.toString();
    const hasLoaded = state.responses.commands.hasOwnProperty(id);
    const hasGuildListLoaded = state.guilds.hasLoaded;
    return {
      commands: hasLoaded ? state.responses.commands[id] : [],
      authors: hasLoaded ? state.responses.authors[id] : [],
      authenticated: state.session.authenticated,
      hasLoaded,
      isArchitusAdmin: hasGuildListLoaded
        ? state.guilds.guildList.find(guild => guild.id === id).architus_admin
        : false,
      session: {
        id: state.session.id,
        username: state.session.username,
        discriminator: state.session.discriminator,
        avatar: state.session.avatar
      }
    };
  }, shallowEqual);
  const user_id = session.id;

  // API fetch upon guildId/authentication updates
  const fetchResponses = useAuthDispatch(getResponses);
  useEffect(() => {
    if (authenticated) fetchResponses(guildId);
  }, [authenticated, guildId, fetchResponses]);

  // Elevation status
  const userRef = useRef(user_id);
  userRef.current = user_id;
  const compareRowAuthor = useCallbackOnce(
    ({ author_id }) => author_id === userRef.current
  );
  const trueCallback = useCallbackOnce(() => true);
  const canChangeRow = isArchitusAdmin ? trueCallback : compareRowAuthor;
  const canEditRow = isArchitusAdmin ? true : compareRowAuthor;

  // Row adding
  const onRowAdd = useCallback(
    row => {
      if (isDefined(row)) {
        addRow(guildId, row);
        dispatch(localAddResponse(guildId, row, session));
      }
    },
    [addRow, dispatch, guildId, session]
  );

  // Row updating
  const onRowUpdate = useCallback(
    ({ previousRow: row, key, updatedCell }) => {
      if (isDefined(row) && canChangeRow(row)) {
        editRow(guildId, row.trigger, { ...row, [key]: updatedCell });
        dispatch(localEditResponse(guildId, row, key, updatedCell));
      }
    },
    [canChangeRow, dispatch, guildId, editRow]
  );

  // Row deletion
  const onRowDelete = useCallback(
    row => {
      if (isDefined(row) && canChangeRow(row)) {
        deleteRow(guildId, row);
        dispatch(localDeleteResponse(guildId, row));
      }
    },
    [canChangeRow, deleteRow, dispatch, guildId]
  );

  // Transform author data
  const transformedData = useMemo(() => commands.map(transformRow(authors)), [
    commands,
    authors
  ]);

  // Self-authored filter
  const [filterSelfAuthored, setFilterSelfAuthored] = useState(false);
  const onToggleSelfAuthored = useCallback(
    () => setFilterSelfAuthored(!filterSelfAuthored),
    [filterSelfAuthored]
  );
  const filteredData = useMemo(
    () =>
      filterSelfAuthored
        ? transformedData.filter(compareRowAuthor)
        : transformedData,
    [transformedData, filterSelfAuthored, compareRowAuthor]
  );

  // Max count
  const maxCountRef = useRef(0);
  maxCountRef.current = useMemo(() => {
    if (isNil(commands) || commands.length === 0) return 0;
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
      editable: canEditRow,
      formatter: useMemo(() => createTriggerCellFormatter(contextRef), [
        contextRef
      ]),
      unique: true,
      tooltip: (
        <span>
          Include <strong>*</strong> as a wildcard, and use a corresponding{" "}
          <strong>[capture]</strong> in the response to use the matched string.
        </span>
      ),
      hasAddField: true,
      required: true,
      info: (
        <span>
          Include <strong>*</strong> as a wildcard, and use a corresponding{" "}
          <strong>[capture]</strong> in the response to use the matched string.
        </span>
      ),
      validator: value => {
        if (value.trim().length < 2) {
          return {
            result: false,
            message: "Trigger must be 2 characters or longer"
          };
        } else {
          return true;
        }
      },
      processValue: value => value.replace(/[_*\W]+/g, "")
    },
    {
      key: "response",
      name: "Response",
      editable: canEditRow,
      formatter: useMemo(() => createResponseCellFormatter(contextRef), [
        contextRef
      ]),
      tooltip: (
        <span>
          <h6>Syntax</h6>
          [noun], [adj], [adv], [member], [owl], [:reaction:], [count],
          [capture], [author], [@author], [comma,separated,choices]
        </span>
      ),
      hasAddField: true,
      required: true,
      info: (
        <span>
          <strong>Allowed Syntax:</strong> [noun], [adj], [adv], [member],
          [owl], [:reaction:], [count], [capture], [author], [@author],
          [comma,separated,choices]
        </span>
      ),
      validator: value => {
        if (value.trim() === "list") {
          return {
            result: false,
            message: "Response cannot be a special command like list"
          };
        }

        if (value.trim() === "author") {
          return {
            result: false,
            message: "Response cannot be a special command like author"
          };
        }

        return true;
      }
    },
    {
      key: "count",
      name: "Count",
      sortDescendingFirst: true,
      formatter: useMemo(() => createCountCellFormatter(maxCountRef), [
        maxCountRef
      ]),
      filterRenderer: NumericFilter
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
    "768": [200, 300, 100, 200],
    "992": [200, null, 90, 200],
    "1200": [270, null, 200, 240]
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

  const scrollEvent = useContext(AppScrollContext);
  const handleScroll = scrollEvent;

  return (
    <div className="auto-responses">
      <div className="hide-mobile-landscape">
        <h2>Automatic Responses</h2>
        <p className="hide-mobile">
          Manage the triggers and automatic responses for{" "}
          {isArchitusAdmin ? "all entries" : "self-authored entries"} on the
          current server.
        </p>
      </div>
      <DataGrid
        data={filteredData}
        columns={columns}
        columnWidths={columnWidths}
        sortColumn="count"
        baseColumnMeta={baseColumnMeta}
        onRowAdd={onRowAdd}
        onRowUpdate={onRowUpdate}
        onRowDelete={onRowDelete}
        canDeleteRow={canChangeRow}
        isLoading={!hasLoaded}
        emptyLabel="No responses to display"
        onScroll={handleScroll}
        dialogTitle="Add new auto response"
        toolbarComponents={
          <Switch
            onChange={onToggleSelfAuthored}
            checked={filterSelfAuthored}
            label="Show self-authored"
            className="mr-sm-4"
          />
        }
      />
    </div>
  );
}

export default AutoResponses;

AutoResponses.propTypes = {
  guildId: PropTypes.string
};

AutoResponses.displayName = "AutoResponses";

// ? =====================
// ? Utility functions
// ? =====================

function authorData({ author_id }, authors) {
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
}

function transformRow(authors) {
  return row =>
    isDefined(row) ? { ...row, ...authorData(row, authors) } : row;
}
