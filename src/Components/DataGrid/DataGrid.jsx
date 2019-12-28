import React, { useRef, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  isNil,
  isDefined,
  useClientSide,
  useMediaBreakpoints,
  useCallbackOnce
} from "Utility";

import Icon from "Components/Icon";
import Tooltip from "Components/Tooltip";
import HelpTooltip from "Components/HelpTooltip";
import Switch from "Components/Switch";
import Placeholder from "Components/Placeholder";
import ReactDataGrid from "react-data-grid";
import { Data } from "react-data-grid-addons";
import AddRowModal from "Components/AddRowModal";

import "./style.scss";

function DataGrid({
  data,
  columns,
  baseColumnMeta,
  onRowAdd,
  onRowUpdate,
  onRowDelete,
  isLoading,
  loadingRowCount,
  emptyLabel,
  transformRow,
  columnWidths,
  addRowButton,
  dialogTitle,
  canDeleteRow,
  toolbarComponents,
  viewModeButton,
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
  const onGridSort = useCallbackOnce((sortColumn, sortDirection) => {
    setSortMeta({ sortColumn, sortDirection });
  });
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
    [onRowDelete, canDeleteRow, columns.length]
  );

  // Filtering
  const [filters, setFilters] = useState({});
  const filteredRows = getRows(rows, filters);

  // Empty display
  const EmptyDisplay = useCallback(
    () => (
      <div className="empty-placeholder">
        <span className="empty-label shadow-sm">{emptyLabel}</span>
      </div>
    ),
    [emptyLabel]
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
  const hideAddRowDialog = useCallbackOnce(() => setShowAddRowDialog(false));
  const onAddRow = useCallbackOnce(() => {
    setShowAddRowDialog(true);
  });
  const onAdd = useCallback(
    (...args) => {
      setShowAddRowDialog(false);
      onRowAdd(...args);
    },
    [onRowAdd]
  );

  // Direct callbacks
  const rowGetter = useCallback(
    i =>
      isLoading
        ? generateFakeRow(columns, i * (columns.length + 1))
        : transformRow(filteredRows[i]),
    [transformRow, filteredRows, isLoading, columns]
  );
  const onAddFilter = useCallbackOnce(filter =>
    setFilters(handleFilterChange(filter))
  );
  const onClearFilters = useCallbackOnce(() => setFilters({}));

  // Column formatters
  // Use Ref to bypass incorrect formatter generation usage
  const isLoadingRef = useRef(isLoading);
  isLoadingRef.current = isLoading;
  const derivedColumns = useMemo(
    () =>
      columnMeta.map(c => ({
        ...c,
        formatter: props => {
          return (isLoadingRef.current
            ? isDefined(c.placeholderFormatter)
              ? c.placeholderFormatter
              : PlaceholderFormatter
            : c.formatter)(props);
        },
        editable: !isLoading && c.editable
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, columnMeta]
  );

  // View mode (compact/comfy/sparse)
  const [viewMode, setViewMode] = useState(1);
  const updateViewMode = i => {
    setViewMode(i);
    setTimeout(() => {
      dataGrid.current.base.viewport.metricsUpdated();
      dataGrid.current.base.viewport.onScroll(
        dataGrid.current.base.viewport.canvas._scroll
      );
    });
  };

  return useClientSide(
    () => (
      <>
        <div className="table-outer">
          <ReactDataGrid
            ref={dataGrid}
            columns={derivedColumns}
            rowGetter={rowGetter}
            rowsCount={isLoading ? loadingRowCount : filteredRows.length}
            onGridRowsUpdated={handleRowUpdate}
            onCellSelected={onCellSelected}
            onRowClick={onRowClick}
            enableCellSelect={true}
            enableCellAutoFocus={false}
            onGridSort={onGridSort}
            onAddFilter={onAddFilter}
            onClearFilters={onClearFilters}
            rowHeight={[60, 45, 35][viewMode]}
            headerFiltersHeight={55}
            headerRowHeight={45}
            rowRenderer={RowRenderer}
            getCellActions={getCellActions}
            enableRowSelect={null}
            emptyRowsView={EmptyDisplay}
            toolbar={
              <ToolbarComponent
                onAddRow={onAddRow}
                addRowButton={addRowButton}
                slot={toolbarComponents}
                viewModeButton={viewModeButton}
                setViewMode={updateViewMode}
                viewMode={viewMode}
              />
            }
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
    ),
    null
  );
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
  loadingRowCount: PropTypes.number,
  viewModeButton: PropTypes.bool,
  toolbarComponents: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

DataGrid.defaultProps = {
  onRowAdd() {},
  onRowUpdate() {},
  onRowDelete() {},
  canDeleteRow: () => true,
  transformRow: r => r,
  columns: [],
  baseColumnMeta: {},
  isLoading: false,
  emptyLabel: "No items to display",
  addRowButton: true,
  loadingRowCount: 5,
  viewModeButton: true
};

DataGrid.displayName = "DataGrid";

// ? ==============
// ? Sub components
// ? ==============

const viewModes = [
  {
    icon: "sparse",
    name: "Sparse"
  },
  {
    icon: "comfy",
    name: "Comfy"
  },
  {
    icon: "compact",
    name: "Compact"
  }
];

function ToolbarComponent({
  addRowButton,
  onAddRow,
  onToggleFilter,
  slot,
  viewModeButton,
  setViewMode,
  viewMode
}) {
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
            <Switch
              onChange={onChange}
              checked={show}
              label="Show Filters"
              className="mr-sm-3"
            />
          </span>
          {addRowButton && (
            <button
              className={classNames("btn-primary mr-3")}
              onClick={onAddRow}
            >
              <Icon className="mr-2" name="plus" />
              Add Row
            </button>
          )}
          {viewModeButton && (
            <div className="view-mode-toolbar">
              {viewModes.map(({ icon, name }, i) => (
                <button
                  className={classNames("view-mode-toolbar--button", {
                    active: viewMode === i
                  })}
                  key={icon}
                  onClick={() => setViewMode(i)}
                >
                  <Tooltip top text={name}>
                    <Icon name={icon} />
                  </Tooltip>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

ToolbarComponent.propTypes = {
  onToggleFilter: PropTypes.func,
  addRowButton: PropTypes.bool,
  onAddRow: PropTypes.func,
  viewModeButton: PropTypes.bool,
  setViewMode: PropTypes.func,
  viewMode: PropTypes.number,
  slot: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

ToolbarComponent.displayName = "ToolbarComponent";

function RowRenderer({ renderBaseRow, ...props }) {
  const { idx } = props;
  const className = idx % 2 ? "row-even" : "row-odd";
  return <div className={className}>{renderBaseRow(props)}</div>;
}

RowRenderer.propTypes = {
  renderBaseRow: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired
};

RowRenderer.displayName = "RowRenderer";

const p = 137;
const q = 11;
const min = 4;
function PlaceholderFormatter({ value }) {
  const length = ((value * p) % q) + min;
  const percentage = (length / (min + q)) * 100;
  return (
    <Placeholder.Auto block width={`${percentage.toFixed(3)}%`} height={20} />
  );
}

PlaceholderFormatter.propTypes = {
  value: PropTypes.any
};

PlaceholderFormatter.displayName = "PlaceholderFormatter";

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

HelpColumnWrapper.displayName = "HelpColumnWrapper";

// ? =================
// ? Utility functions
// ? =================

function handleFilterChange(newFilter) {
  return state => {
    const newState = { ...state };
    if (newFilter.filterTerm) {
      newState[newFilter.column.key] = newFilter;
    } else {
      delete newState[newFilter.column.key];
    }
    return newState;
  };
}

function generateFakeRow(columns, row_idx) {
  let row = {};
  for (let i = 0; i < columns.length; ++i) {
    row[columns[i].key] = row_idx + i;
  }
  return row;
}

function getRows(rows, filters) {
  return Data.Selectors.getRows({ rows, filters });
}

function compareStrings(a, b) {
  return a.toLowerCase().trim() > b.toLowerCase().trim() ? 1 : -1;
}

function sortRows(rows, sortColumn, sortDirection) {
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
}
