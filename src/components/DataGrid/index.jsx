import React, { useRef, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  isNil,
  isDefined,
  useClientSide,
  ifClient,
  useMediaBreakpoints
} from "utility";

import Icon from "components/Icon";
import HelpTooltip from "components/HelpTooltip";
import Switch from "components/Switch";
import { Spinner } from "react-bootstrap";

import "./style.scss";
import AddRowModal from "./AddRowModal";

// Re-export all additional components
export { default as NumericFilter } from "./NumericFilter";

// Load library only on the client
let ReactDataGrid = {};
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
  onRowAdd,
  onRowUpdate,
  onRowDelete,
  isLoading,
  emptyLabel,
  transformRow,
  columnWidths,
  addRowButton,
  dialogTitle,
  canDeleteRow,
  toolbarComponents,
  ...rest
}) {
  // Escape hatch to access library methods imperatively
  const dataGrid = useRef(null);

  // Open the editor upon cell selection
  const [lastEditedPos, setLastEditedPos] = useState({ rowIdx: -1, idx: -1 });
  const onCellSelected = useCallback(
    ({ rowIdx, idx }) => {
      dataGrid.current.openCellEditor(rowIdx, idx);
      setLastEditedPos({ rowIdx, idx });
    },
    [dataGrid]
  );
  // Fix after-edit click
  const onRowClick = useCallback(
    (newRowIdx, _rowData, column) => {
      if (isNil(column)) return;
      const { idx, rowIdx } = lastEditedPos;
      if (newRowIdx === rowIdx && column.idx === idx) {
        dataGrid.current.openCellEditor(newRowIdx, column.idx);
      }
    },
    [lastEditedPos, dataGrid]
  );

  // Row sorting
  const [sortMeta, setSortMeta] = useState({
    sortColumn: 0,
    sortDirection: "NONE"
  });
  const onGridSort = useCallback((sortColumn, sortDirection) => {
    setSortMeta({ sortColumn, sortDirection });
  });
  const compareStrings = (a, b) =>
    a.toLowerCase().trim() > b.toLowerCase().trim() ? 1 : -1;
  const sortRows = (rows, sortColumn, sortDirection) => {
    const innerComp =
      isDefined(rows) &&
      rows.length >= 1 &&
      typeof rows[0][sortColumn] === "string"
        ? compareStrings
        : (a, b) => (a > b ? 1 : -1);
    const comparer = (a, b) =>
      innerComp(a[sortColumn], b[sortColumn]) *
      (sortDirection === "ASC" ? 1 : -1);
    return sortDirection === "NONE" ? rows : [...rows].sort(comparer);
  };
  // Sorted view array
  const rows = useMemo(
    () => sortRows(data, sortMeta.sortColumn, sortMeta.sortDirection),
    [sortMeta, data]
  );

  // Row deletion
  const getCellActions = useCallback(
    (column, row) =>
      column.idx === columns.length - 1 && canDeleteRow(row)
        ? [
            {
              icon: <Icon name="times-circle" size="lg" noAutoWidth />,
              callback: () => {
                onRowDelete(row);
              }
            }
          ]
        : null,
    [onRowDelete]
  );

  // Filtering
  const [filters, setFilters] = useState({});
  const filteredRows = getRows(rows, filters);

  // Empty display
  const EmptyDisplay = useCallback(
    () => (
      <div className="empty-placeholder">
        {isLoading ? (
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <span className="empty-label shadow-sm">{emptyLabel}</span>
        )}
      </div>
    ),
    [isLoading, emptyLabel]
  );

  // Row updating
  const handleRowUpdate = useCallback(
    ({ action, fromRowData, updated, cellKey, toRow }) => {
      if (action !== "CELL_UPDATE") return;
      if (fromRowData[cellKey] === updated[cellKey]) return;
      onRowUpdate({
        idx: toRow,
        key: cellKey,
        previousRow: fromRowData,
        updatedCell: updated[cellKey]
      });
    },
    [onRowUpdate]
  );

  // Responsive column widths
  function getBreakpoints(columnWidthMap) {
    return Object.keys(columnWidthMap).filter(k => k !== "base");
  }
  const breakpointArray = getBreakpoints(columnWidths);
  const activeBreakpoint = useMediaBreakpoints(breakpointArray);
  const currentColumnWidths = isNil(activeBreakpoint)
    ? columnWidths.base
    : columnWidths[activeBreakpoint];

  // Process column meta to add base info, column widths, and help text
  const columnMeta = columns.map((c, i) => {
    const withBase = { ...c, ...baseColumnMeta };
    if ("tooltip" in withBase) {
      const tooltip = withBase.tooltip;
      withBase.headerRenderer = (
        <HelpColumnWrapper
          renderer={withBase.headerRenderer}
          name={withBase.name}
          tooltip={tooltip}
        />
      );
    }
    return isDefined(currentColumnWidths[i])
      ? { ...withBase, width: currentColumnWidths[i] }
      : withBase;
  });

  // Add row dialog callback
  const [showAddRowDialog, setShowAddRowDialog] = useState(false);
  const hideAddRowDialog = useCallback(() => setShowAddRowDialog(false));
  const onAddRow = useCallback(() => {
    setShowAddRowDialog(true);
  });
  const onAdd = useCallback(
    (...args) => {
      setShowAddRowDialog(false);
      onRowAdd(...args);
    },
    [onRowAdd]
  );

  return useClientSide(() => (
    <>
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
          toolbar={
            <ToolbarComponent
              onAddRow={onAddRow}
              addRowButton={addRowButton}
              slot={toolbarComponents}
            />
          }
          onAddFilter={filter => setFilters(handleFilterChange(filter))}
          onClearFilters={() => setFilters({})}
          rowHeight={45}
          headerFiltersHeight={55}
          rowRenderer={RowRenderer}
          getCellActions={getCellActions}
          enableRowSelect={null}
          emptyRowsView={EmptyDisplay}
          {...rest}
        />
      </div>
      <AddRowModal
        show={showAddRowDialog}
        onHide={hideAddRowDialog}
        onAdd={onAdd}
        title={dialogTitle}
        columns={columnMeta}
        data={filteredRows}
      />
    </>
  ));
}

export default DataGrid;

DataGrid.propTypes = {
  onRowAdd: PropTypes.func,
  onRowUpdate: PropTypes.func,
  onRowDelete: PropTypes.func,
  data: PropTypes.array.isRequired,
  transformRow: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.object),
  columnWidths: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)),
  baseColumnMeta: PropTypes.object,
  isLoading: PropTypes.bool,
  emptyLabel: PropTypes.string,
  addRowButton: PropTypes.bool,
  dialogTitle: PropTypes.string,
  canDeleteRow: PropTypes.func,
  toolbarComponents: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

DataGrid.defaultProps = {
  onRowAdd() {},
  onRowUpdate() {},
  onRowDelete() {},
  canDeleteRow: r => true,
  transformRow: r => r,
  columns: [],
  baseColumnMeta: {},
  isLoading: false,
  emptyLabel: "No items to display",
  addRowButton: true
};

// ? ==============
// ? Sub components
// ? ==============

function ToolbarComponent({ addRowButton, onAddRow, onToggleFilter, slot }) {
  // Filter show state
  const [show, setShow] = useState(false);
  const onChange = useCallback(() => {
    setShow(!show);
    onToggleFilter();
  }, [show, onToggleFilter]);
  return (
    <>
      <div className="react-grid-Toolbar">
        <div className="tools">
          <span className="controls">
            {slot}
            <span>
              <Switch onChange={onChange} checked={show} />
              <span className="label">Show Filters</span>
            </span>
          </span>
          {addRowButton ? (
            <button
              className={classNames("btn-primary mr-3")}
              onClick={onAddRow}
            >
              <Icon className="mr-2" name="plus" />
              Add Row
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

ToolbarComponent.propTypes = {
  onToggleFilter: PropTypes.func,
  addRowButton: PropTypes.bool,
  onAddRow: PropTypes.func,
  slot: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

function RowRenderer({ renderBaseRow, ...props }) {
  const { idx } = props;
  const className = idx % 2 ? "row-even" : "row-odd";
  return <div className={className}>{renderBaseRow(props)}</div>;
}

RowRenderer.propTypes = {
  renderBaseRow: PropTypes.func,
  idx: PropTypes.number
};

function HelpColumnWrapper({ name, renderer, tooltip }) {
  return (
    <div className="help-column-wrapper">
      <span>{isDefined(renderer) ? renderer : name}</span>
      <HelpTooltip content={tooltip} />
    </div>
  );
}

HelpColumnWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  renderer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

HelpColumnWrapper.defaultProps = {
  tooltip: undefined,
  renderer: null
};
