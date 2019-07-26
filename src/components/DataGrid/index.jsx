import React, { useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { isNil, useClientSide, colorBlend, ifClient } from "utility";

import Icon from "components/Icon";
import Switch from "react-switch";

import "./style.scss";
import { lightColor, primaryColor } from "global.json";
import { Spinner } from "react-bootstrap";

let ReactDataGrid = () => null;
let Data = { Selectors: null };
ifClient(() => {
  ReactDataGrid = require("react-data-grid");
  Data = require("react-data-grid-addons").Data;
});

const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

const selectors = Data.Selectors;
function getRows(rows, filters) {
  return selectors.getRows({ rows, filters });
}

function DataGrid({
  data,
  columns,
  baseColumnMeta,
  onRowUpdate,
  onRowDelete,
  isLoading,
  emptyLabel,
  transformRow
}) {
  const columnMeta = columns.map(c => ({ ...c, ...baseColumnMeta }));

  // Escape hatch to access library methods imperatively
  const dataGrid = useRef(null);

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
      return (
        (a[sortColumn].toLowerCase().trim() > b[sortColumn].toLowerCase().trim()
          ? 1
          : -1) * (sortDirection === "ASC" ? 1 : -1)
      );
    };
    return sortDirection === "NONE" ? rows : [...rows].sort(comparer);
  };
  // Sorted view array
  const rows = useMemo(
    () => sortRows(data, sortMeta.sortColumn, sortMeta.sortDirection),
    [sortMeta, data]
  );

  // Row deletion
  function getCellActions(column, row) {
    return column.idx === columns.length - 1
      ? [
          {
            icon: <Icon name="times-circle" size="lg" noAutoWidth />,
            callback: () => {
              onRowDelete(row);
            }
          }
        ]
      : null;
  }

  // Filtering
  const [filters, setFilters] = useState({});
  const filteredRows = getRows(rows, filters);

  // Empty display
  function EmptyDisplay() {
    return (
      <div className="empty-placeholder">
        {isLoading ? (
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <span className="empty-label shadow-sm">{emptyLabel}</span>
        )}
      </div>
    );
  }

  // Row updating
  const handleRowUpdate = ({
    action,
    fromRowData,
    updated,
    cellKey,
    toRow
  }) => {
    if (action !== "CELL_UPDATE") return;
    if (fromRowData[cellKey] === updated[cellKey]) return;
    onRowUpdate({
      idx: toRow,
      key: cellKey,
      previousRow: fromRowData,
      updatedCell: updated[cellKey]
    });
  };

  return useClientSide(() => (
    <div className="table-outer">
      <ReactDataGrid
        ref={dataGrid}
        columns={columnMeta}
        rowGetter={i => transformRow(filteredRows[i])}
        rowsCount={filteredRows.length}
        onGridRowsUpdated={handleRowUpdate}
        onCellSelected={onCellSelected}
        onRowClick={onRowClick}
        enableCellSelect={true}
        enableCellAutoFocus={false}
        onGridSort={onGridSort}
        toolbar={<ToolbarComponent />}
        onAddFilter={filter => setFilters(handleFilterChange(filter))}
        onClearFilters={() => setFilters({})}
        rowHeight={45}
        headerFiltersHeight={55}
        rowRenderer={RowRenderer}
        getCellActions={getCellActions}
        enableRowSelect={null}
        emptyRowsView={EmptyDisplay}
      />
    </div>
  ));
}

export default DataGrid;

DataGrid.propTypes = {
  onRowUpdate: PropTypes.func,
  onRowDelete: PropTypes.func,
  data: PropTypes.array.isRequired,
  transformRow: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.object),
  baseColumnMeta: PropTypes.object,
  isLoading: PropTypes.bool,
  emptyLabel: PropTypes.string
};

DataGrid.defaultProps = {
  onRowUpdate: () => null,
  onRowDelete: () => null,
  transformRow: r => r,
  columns: [],
  baseColumnMeta: {},
  isLoading: false,
  emptyLabel: "No items to display"
};

// ? ==============
// ? Sub components
// ? ==============

function ToolbarComponent({ onToggleFilter }) {
  const [show, setShow] = useState(false);
  return (
    <div className="react-grid-Toolbar">
      <div className="tools">
        <Switch
          onChange={() => {
            setShow(!show);
            onToggleFilter();
          }}
          checked={show}
          className="mr-3"
          aria-label="Toggle filter"
          uncheckedIcon={
            <Icon name="filter" className="dark-mode-icon light" />
          }
          checkedIcon={
            <Icon
              name="clear-filter"
              className="dark-mode-icon dark"
              style={{ left: "8px" }}
            />
          }
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          offHandleColor={lightColor}
          onHandleColor={lightColor}
          offColor={colorBlend(0.35, primaryColor)}
          onColor={primaryColor}
        />
      </div>
    </div>
  );
}

ToolbarComponent.propTypes = {
  onToggleFilter: PropTypes.func
};

const RowRenderer = ({ renderBaseRow, ...props }) => {
  const { idx } = props;
  const className = idx % 2 ? "row-even" : "row-odd";
  return <div className={className}>{renderBaseRow(props)}</div>;
};

RowRenderer.propTypes = {
  renderBaseRow: PropTypes.func,
  idx: PropTypes.number
};
