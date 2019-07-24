import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { shallowEqual, useSelector } from "react-redux";
import { getResponses } from "store/actions";
import { useAuthDispatch, isNil } from "utility";

import { Container } from "react-bootstrap";
import ReactDataGrid from "react-data-grid";

import "./style.scss";

const baseColumnProps = {
  sortable: true,
  filterable: true
};
const columns = [
  { key: "trigger", name: "Trigger", editable: true },
  { key: "response", name: "Response", editable: true },
  { key: "author_id", name: "Author" }
].map(c => ({ ...c, ...baseColumnProps }));

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

  // Escape hatch to access library methods imperatively
  const dataGrid = useRef(null);

  // Handle edits by propagating them to the store
  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    // console.log({ fromRow, toRow, updated });
  };
  // Open the editor upon cell selection
  const [lastEditedPos, setLastEditedPos] = useState({ rowIdx: -1, idx: -1 });
  const onCellSelected = ({ rowIdx, idx }) => {
    dataGrid.current.openCellEditor(rowIdx, idx);
    setLastEditedPos({ rowIdx, idx });
  };
  // Fix after-edit click
  const onRowClick = (newRowIdx, _rowData, column) => {
    if (isNil(column)) return;
    const { idx, rowIdx } = lastEditedPos;
    if (newRowIdx === rowIdx && column.idx === idx) {
      dataGrid.current.openCellEditor(newRowIdx, column.idx);
    }
  };

  // Row sorting
  const [sortMeta, setSortMeta] = useState({
    sortColumn: 0,
    sortDirection: "NONE"
  });
  const onGridSort = (sortColumn, sortDirection) => {
    setSortMeta({ sortColumn, sortDirection });
  };
  const sortRows = (rows, sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === "ASC") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else if (sortDirection === "DESC") {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };
    return sortDirection === "NONE" ? rows : [...rows].sort(comparer);
  };
  // Sorted view array
  const rows = useMemo(
    () => sortRows(commands, sortMeta.sortColumn, sortMeta.sortDirection),
    [sortMeta, commands]
  );

  // Filtering
  class AutoFilterToolbar extends React.Component {
    componentDidMount() {
      // eslint-disable-next-line react/prop-types
      this.props.onToggleFilter();
    }

    render() {
      // eslint-disable-next-line react/prop-types
      return <div>{this.props.children}</div>;
    }
  }
  // TODO make filtering functional

  return (
    <Container className="py-5 auto-responses">
      <h2>Automatic Responses</h2>
      <p>
        Manage the triggers and automatic responses for all entries on the
        current server.
      </p>
      <div className="table-outer">
        <ReactDataGrid
          ref={dataGrid}
          columns={columns}
          rowGetter={i => rows[i]}
          rowsCount={commands.length}
          onGridRowsUpdated={onGridRowsUpdated}
          onCellSelected={onCellSelected}
          onRowClick={onRowClick}
          enableCellSelect={true}
          enableCellAutoFocus={false}
          onGridSort={onGridSort}
          toolbar={<AutoFilterToolbar />}
        />
      </div>
    </Container>
  );
}

export default AutoResponses;

AutoResponses.propTypes = {
  guildId: PropTypes.string
};
