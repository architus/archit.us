// import classNames from "classnames";
// import {
//   isNil,
//   isDefined,
//   useMediaBreakpoints,
//   useCallbackOnce,
//   isArray
// } from "Utility";
// import {
//   Icon,
//   Tooltip,
//   HelpTooltip,
//   Switch,
//   Placeholder,
//   AddRowModal
// } from "Components";
// import ReactDataGrid, {
//   Column as DataGridColumn,
//   Filter as DataGridFilter
// } from "react-data-grid";
// import { Data } from "react-data-grid-addons";

// type SortDirection = "ASC" | "DESC" | "NONE";
// type SortMeta = { sortDirection: SortDirection; sortColumn: number };

// type Filter = DataGridFilter;

// type Filters = Record<string, Filter>;

// type CellAction = ActionButton | ActionMenu;

// canDeleteRow?: (row: T) => boolean;
// getRowActions?: (row: T) => (ActionButton | ActionMenu)[];

// TODO type onRowAdd and onRowUpdate
// onRowAdd: () => void;
// onRowUpdate: () => void;
// onRowDelete?: (row: T) => void;

// addRowButton?: boolean;
// viewModeButton?: boolean;
// dialogTitle?: string;
// toolbarComponents?: React.ReactNode;
// columnWidths?: Record<"base" | number, number[]>;

import React, { useCallback } from "react";
import Measure, { ContentRect } from "react-measure";
// import { isNil } from "Utility";
import ReactDataGrid, {
  Column as LibraryColumn,
  DataGridHandle,
  RowRendererProps,
  Row,
  Position,
  CalculatedColumn
  // RowRendererProps
} from "react-data-grid";

type Column<D> = LibraryColumn<D> & {};

type CellActionBase = {
  tooltip?: string;
};

type CustomCellAction = CellActionBase & { button: React.ReactNode };
type StandardCellAction = CellActionBase & {
  icon: React.ReactNode;
  callback: () => void;
};

export type CellAction = CustomCellAction | StandardCellAction;

export type DataGridProps<
  R extends Record<string, unknown>,
  T extends Record<string, unknown> = R,
  K extends keyof T = keyof T
> = {
  data: readonly T[];
  rowKey: K;
  columns: readonly Column<T>[];
  transformRow?: (row: R) => T;
  baseColumnMeta?: Partial<Column<T>>;
  getActions?: (row: T) => CellAction[];

  singleClickEdit?: boolean;
  isLoading?: boolean;
  loadingRowCount?: number;
  emptyLabel?: string;
};

type DataGridState = {
  height: number;
};

export type DataGridType = typeof DataGrid;

export default class DataGrid<
  R extends Record<string, unknown>,
  T extends Record<string, unknown> = R,
  K extends keyof T = keyof T
> extends React.Component<DataGridProps<R, T, K>, DataGridState> {
  static displayName = "DataGrid";

  private dataGrid = React.createRef<DataGridHandle>();

  state = { height: 0 };

  getProps(): Required<DataGridProps<R, T, K>> {
    return {
      singleClickEdit: true,
      isLoading: true,
      loadingRowCount: 5,
      emptyLabel: "No items to display",
      baseColumnMeta: {},
      transformRow: (r: R): T => r as T,
      getActions: (): CellAction[] => [],
      ...this.props
    };
  }

  onResize = (contentRect: ContentRect): void => {
    this.setState({ height: contentRect.bounds?.height || 0 });
  };

  // onRowClick = (newRowIdx: number, _: T, column: { idx: number }): void => {
  //   // if (isNil(column)) return;
  //   // const { idx, rowIdx } = this.position;
  //   // if (newRowIdx === rowIdx && column.idx === idx) {
  //   this.dataGrid.current?.openCellEditor(newRowIdx, column.idx);
  //   // }
  // };

  renderEmptyRowsView: React.FC = () => {
    const { emptyLabel } = this.getProps();
    return (
      <div className="empty-placeholder">
        <span className="empty-label shadow-sm">{emptyLabel}</span>
      </div>
    );
  };

  onRowClick = (rowIdx: number, _: T, column: CalculatedColumn<T>): void => {
    const position: Position = { rowIdx, idx: column.idx };
    this.dataGrid.current?.selectCell(position, true);
  };

  rowRenderer: React.FC<RowRendererProps<T>> = (props: RowRendererProps<T>) => {
    const onRowClick = useCallback(
      (rowIdx: number, row: T, column: CalculatedColumn<T>): void => {
        props.onRowClick?.(rowIdx, row, column);
        this.onRowClick(rowIdx, row, column);
      },
      [props.onRowClick]
    );
    const { getActions } = this.getProps();
    const actions = getActions(props.row);
    return (
      <div className="row-wrapper">
        <Row {...props} onRowClick={onRowClick} />
        <ActionBar actions={actions} />
      </div>
    );
  };

  render(): React.ReactNode {
    const { columns, baseColumnMeta, data, rowKey } = this.getProps();
    const derivedColumns: Column<T>[] = columns.map(c => ({
      ...c,
      ...baseColumnMeta
    }));
    return (
      <Measure bounds onResize={this.onResize}>
        {({ measureRef }): JSX.Element => (
          <div className="data-grid" ref={measureRef}>
            <ReactDataGrid<T, K>
              height={this.state.height}
              columns={derivedColumns}
              rows={data}
              rowKey={rowKey}
              ref={this.dataGrid}
              emptyRowsView={this.renderEmptyRowsView}
              rowRenderer={this.rowRenderer}
            />
          </div>
        )}
      </Measure>
    );
  }
}

type ActionBarProps = {
  actions: CellAction[];
};

const ActionBar: React.FC<ActionBarProps> = ({ actions }) => (
  <div className="action-bar"></div>
);

// const DataGrid = ({
//   data,
//   columns,
//   baseColumnMeta = {},
//   rowKey,
//   isLoading = true,
//   loadingRowCount = 5,
//   emptyLabel = "No items to display"
// }: // addRowButton = false,
// // viewModeButton = true,
// // dialogTitle,
// // toolbarComponents = null,
// // columnWidths,
// // transformRow,
// // canDeleteRow,
// // getRowActions,
// // onRowAdd,
// // onRowUpdate,
// // onRowDelete
// DataGridProps<R, T, K>): React.ReactNode => {
//   // Escape hatch to access library methods imperatively
//   const dataGrid = useRef<DataGridHandle>(null);

//   // Empty display
//   const EmptyDisplay: React.FC = useCallback(
//     () => (
//     ),
//     [emptyLabel]
//   );

//   // // Row sorting
//   // const [sortMeta, setSortMeta] = useState<SortMeta>({
//   //   sortColumn: 0,
//   //   sortDirection: "NONE"
//   // });
//   // const onGridSort = useCallbackOnce(
//   //   (sortColumn: number, sortDirection: SortDirection) => {
//   //     setSortMeta({ sortColumn, sortDirection });
//   //   }
//   // );
//   // // Sorted view array
//   // const rows = useMemo(
//   //   () => sortRows(data, sortMeta.sortColumn, sortMeta.sortDirection),
//   //   [sortMeta, data]
//   // );

//   // // Row deletion
//   // const getCellActions: (
//   //   column: ReactDataGrid.Column<T> & { idx: number },
//   //   row: T
//   // ) => CellAction[] = useCallback(
//   //   (column, row) => {
//   //     if (column.idx === columns.length - 1) {
//   //       let deleteRowAction: CellAction[] = [];
//   //       if (isDefined(canDeleteRow) && canDeleteRow(row)) {
//   //         deleteRowAction = [
//   //           {
//   //             icon: ((
//   //               <Icon name="times-circle" size="lg" noAutoWidth />
//   //             ) as unknown) as string,
//   //             callback: (): void => {
//   //               if (isDefined(onRowDelete)) onRowDelete(row);
//   //             }
//   //           }
//   //         ];
//   //       }
//   //       const rowActions = isDefined(getRowActions) ? getRowActions(row) : [];
//   //       return [...deleteRowAction, ...rowActions];
//   //     }

//   //     return [];
//   //   },
//   //   [onRowDelete, canDeleteRow, columns.length, getRowActions]
//   // );

//   // // Filtering
//   // const [filters, setFilters] = useState<Filters>({});
//   // const filteredRows = getRows(rows, filters);

//   // // Row updating
//   // // TODO type
//   // const handleRowUpdate = useCallback(
//   //   ({ action, fromRowData, updated, cellKey, toRow }) => {
//   //     if (action !== "CELL_UPDATE") return;
//   //     if (fromRowData[cellKey] === updated[cellKey]) return;
//   //     onRowUpdate({
//   //       idx: toRow,
//   //       key: cellKey,
//   //       previousRow: fromRowData,
//   //       updatedCell: updated[cellKey]
//   //     });
//   //   },
//   //   [onRowUpdate]
//   // );

//   // // Responsive column widths
//   // const derivedColumnWidths = isDefined(columnWidths)
//   //   ? columnWidths
//   //   : {
//   //       base: columns.map(() => null)
//   //     };
//   // function getBreakpoints(columnWidthMap) {
//   //   return Object.keys(columnWidthMap).filter(k => k !== "base");
//   // }
//   // const breakpointArray = getBreakpoints(derivedColumnWidths);
//   // const activeBreakpoint = useMediaBreakpoints(breakpointArray);
//   // const currentColumnWidths = isNil(activeBreakpoint)
//   //   ? derivedColumnWidths.base
//   //   : derivedColumnWidths[activeBreakpoint];

//   // // Process column meta to add base info, column widths, and help text
//   // const columnMeta = columns.map((c, i) => {
//   //   const withBase = { ...c, ...baseColumnMeta };
//   //   if ("tooltip" in withBase) {
//   //     const { tooltip } = withBase;
//   //     withBase.headerRenderer = (
//   //       <HelpColumnWrapper
//   //         renderer={withBase.headerRenderer}
//   //         name={withBase.name}
//   //         tooltip={tooltip}
//   //       />
//   //     );
//   //   }
//   //   return isDefined(currentColumnWidths[i])
//   //     ? { ...withBase, width: currentColumnWidths[i] }
//   //     : withBase;
//   // });

//   // // Add row dialog callback
//   // const [showAddRowDialog, setShowAddRowDialog] = useState(false);
//   // const hideAddRowDialog = useCallbackOnce(() => setShowAddRowDialog(false));
//   // const onAddRow = useCallbackOnce(() => {
//   //   setShowAddRowDialog(true);
//   // });
//   // const onAdd = useCallback(
//   //   (...args) => {
//   //     setShowAddRowDialog(false);
//   //     onRowAdd(...args);
//   //   },
//   //   [onRowAdd]
//   // );

//   // // Direct callbacks
//   // const rowGetter = useCallback(
//   //   i =>
//   //     isLoading
//   //       ? generateFakeRow(columns, i * (columns.length + 1))
//   //       : transformRow(filteredRows[i]),
//   //   [transformRow, filteredRows, isLoading, columns]
//   // );
//   // const onAddFilter = useCallbackOnce(filter =>
//   //   setFilters(handleFilterChange(filter))
//   // );
//   // const onClearFilters = useCallbackOnce(() => setFilters({}));

//   // // Column formatters
//   // // Use Ref to bypass incorrect formatter generation usage
//   // const isLoadingRef = useRef(isLoading);
//   // isLoadingRef.current = isLoading;
//   // const derivedColumns = useMemo(
//   //   () =>
//   //     columnMeta.map(c => ({
//   //       ...c,
//   //       formatter: props => {
//   //         if (isLoadingRef.current) {
//   //           if (isDefined(c.placeholderFormatter)) {
//   //             return c.placeholderFormatter(props);
//   //           }
//   //           return PlaceholderFormatter(props);
//   //         }
//   //         if (isDefined(c.formatter)) {
//   //           return c.formatter(props);
//   //         }
//   //         return isDefined(props.value) ? props.value.toString() : "";
//   //       },
//   //       editable: !isLoading && c.editable,
//   //       filterable: !isLoading && c.filterable,
//   //       sortable: !isLoading && c.sortable
//   //     })),
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   //   [isLoading, columnMeta]
//   // );

//   // // View mode (compact/comfy/sparse)
//   // const [viewMode, setViewMode] = useState(1);
//   // const updateViewMode = i => {
//   //   setViewMode(i);
//   //   setTimeout(() => {
//   //     if (
//   //       isNil(dataGrid.current) ||
//   //       isNil(dataGrid.current.base) ||
//   //       isNil(dataGrid.current.base.viewport)
//   //     )
//   //       return;
//   //     dataGrid.current.base.viewport.metricsUpdated();
//   //     dataGrid.current.base.viewport.onScroll(
//   //       dataGrid.current.base.viewport.canvas._scroll
//   //     );
//   //   });
//   // };

//   return (
//     <>
//       <div className="table-outer">
//         <ReactDataGrid<T, K>
//           ref={dataGrid}
//           columns={columns}
//           rows={data}
//           rowKey={rowKey}
//           emptyRowsView={EmptyDisplay}
//         />
//         {/* <ReactDataGrid
//           ref={dataGrid}
//           columns={derivedColumns}
//           rowGetter={rowGetter}
//           rowsCount={isLoading ? loadingRowCount : filteredRows.length}
//           onGridRowsUpdated={handleRowUpdate}
//           onCellSelected={onCellSelected}
//           onRowClick={onRowClick}
//           enableCellSelect={true}
//           enableCellAutoFocus={false}
//           onGridSort={onGridSort}
//           onAddFilter={onAddFilter}
//           onClearFilters={onClearFilters}
//           rowHeight={[60, 45, 35][viewMode]}
//           headerFiltersHeight={55}
//           headerRowHeight={45}
//           rowRenderer={RowRenderer}
//           getCellActions={getCellActions}
//           enableRowSelect={null}
//           emptyRowsView={EmptyDisplay}
//           toolbar={
//             <ToolbarComponent
//               onAddRow={onAddRow}
//               addRowButton={addRowButton}
//               slot={toolbarComponents}
//               viewModeButton={viewModeButton}
//               setViewMode={updateViewMode}
//               viewMode={viewMode}
//               isLoading={isLoading}
//             />
//           }
//         /> */}
//       </div>
//       {/* {addRowButton && (
//         <AddRowModal
//           show={showAddRowDialog}
//           onHide={hideAddRowDialog}
//           onAdd={onAdd}
//           title={dialogTitle}
//           columns={columnMeta}
//           data={filteredRows}
//         />
//       )} */}
//     </>
//   );
// };

// DataGrid.displayName = "DataGrid";

// // // ? ==============
// // // ? Sub components
// // // ? ==============

// // const viewModes = [
// //   {
// //     icon: "sparse",
// //     name: "Sparse"
// //   },
// //   {
// //     icon: "comfy",
// //     name: "Comfy"
// //   },
// //   {
// //     icon: "compact",
// //     name: "Compact"
// //   }
// // ];

// // function ToolbarComponent({
// //   addRowButton,
// //   onAddRow,
// //   onToggleFilter,
// //   slot,
// //   viewModeButton,
// //   setViewMode,
// //   viewMode,
// //   isLoading
// // }) {
// //   // Filter show state
// //   const [show, setShow] = useState(false);
// //   const onChange = useCallback(() => {
// //     setShow(!show);
// //     onToggleFilter();
// //   }, [show, onToggleFilter]);
// //   return (
// //     <>
// //       <div className="react-grid-Toolbar">
// //         <div className="tools">
// //           <span className="controls">
// //             {slot}
// //             <Switch
// //               onChange={onChange}
// //               checked={show}
// //               disabled={isLoading}
// //               label="Show Filters"
// //               className="mr-sm-3"
// //             />
// //           </span>
// //           {addRowButton && (
// //             <button
// //               className={classNames("btn-primary mr-3")}
// //               onClick={onAddRow}
// //             >
// //               <Icon className="mr-2" name="plus" />
// //               Add Row
// //             </button>
// //           )}
// //           {viewModeButton && (
// //             <div className="view-mode-toolbar">
// //               {viewModes.map(({ icon, name }, i) => (
// //                 <Tooltip top text={name} key={name}>
// //                   <button
// //                     className={classNames("view-mode-toolbar--button", {
// //                       active: viewMode === i
// //                     })}
// //                     onClick={() => setViewMode(i)}
// //                   >
// //                     <Icon name={icon} />
// //                   </button>
// //                 </Tooltip>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // ToolbarComponent.propTypes = {
// //   onToggleFilter: PropTypes.func,
// //   addRowButton: PropTypes.bool,
// //   onAddRow: PropTypes.func,
// //   viewModeButton: PropTypes.bool,
// //   setViewMode: PropTypes.func,
// //   viewMode: PropTypes.number,
// //   slot: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
// // };

// // ToolbarComponent.displayName = "ToolbarComponent";

// // function RowRenderer({ renderBaseRow, ...props }) {
// //   const { idx } = props;
// //   const className = idx % 2 ? "row-even" : "row-odd";
// //   return <div className={className}>{renderBaseRow(props)}</div>;
// // }

// // RowRenderer.propTypes = {
// //   renderBaseRow: PropTypes.func.isRequired,
// //   idx: PropTypes.number.isRequired
// // };

// // RowRenderer.displayName = "RowRenderer";

// // const p = 137;
// // const q = 11;
// // const min = 4;
// // function PlaceholderFormatter({ value }) {
// //   const length = ((value * p) % q) + min;
// //   const percentage = (length / (min + q)) * 100;
// //   return (
// //     <Placeholder.Auto block width={`${percentage.toFixed(3)}%`} height={20} />
// //   );
// // }

// // PlaceholderFormatter.propTypes = {
// //   value: PropTypes.any
// // };

// // PlaceholderFormatter.displayName = "PlaceholderFormatter";

// // function HelpColumnWrapper({ name, renderer, tooltip }) {
// //   return (
// //     <div className="help-column-wrapper">
// //       <span>{isDefined(renderer) ? renderer : name}</span>
// //       <HelpTooltip content={tooltip} />
// //     </div>
// //   );
// // }

// // HelpColumnWrapper.propTypes = {
// //   name: PropTypes.string.isRequired,
// //   tooltip: PropTypes.oneOfType([
// //     PropTypes.node,
// //     PropTypes.arrayOf(PropTypes.node)
// //   ]),
// //   renderer: PropTypes.oneOfType([
// //     PropTypes.node,
// //     PropTypes.arrayOf(PropTypes.node)
// //   ])
// // };

// // HelpColumnWrapper.defaultProps = {
// //   tooltip: undefined,
// //   renderer: null
// // };

// // HelpColumnWrapper.displayName = "HelpColumnWrapper";

// // // ? =================
// // // ? Utility functions
// // // ? =================

// // function handleFilterChange(newFilter: Filter): (prev: Filters) => Filters {
// //   return (state: Filters): Filters => {
// //     const newState: Filters = { ...state };
// //     if (newFilter.filterTerm) {
// //       newState[newFilter.columnKey] = newFilter;
// //     } else {
// //       delete newState[newFilter.columnKey];
// //     }
// //     return newState;
// //   };
// // }

// // function generateFakeRow(columns, row_idx) {
// //   const row = {};
// //   for (let i = 0; i < columns.length; ++i) {
// //     row[columns[i].key] = row_idx + i;
// //   }
// //   return row;
// // }

// // function getRows<T extends Record<string, unknown>>(
// //   rows: readonly T[],
// //   filters
// // ): readonly T[] {
// //   return Data.Selectors.getRows({ rows, filters }) as T[];
// // }

// // function compareStrings(a: string, b: string): number {
// //   return a.toLowerCase().trim() > b.toLowerCase().trim() ? 1 : -1;
// // }

// // function sortRows<T extends Record<string, unknown>>(
// //   rows: readonly T[],
// //   sortColumn: number,
// //   sortDirection: SortDirection
// // ): readonly T[] {
// //   if (sortDirection === "NONE") return rows;
// //   const sortModifier = sortDirection === "ASC" ? 1 : -1;
// //   if (rows.length >= 1 && typeof rows[0][sortColumn] === "string") {
// //     return [...rows].sort(
// //       (a: T, b: T) =>
// //         compareStrings(a[sortColumn] as string, b[sortColumn] as string) *
// //         sortModifier
// //     );
// //   }

// //   const comparator = (a: T, b: T): number =>
// //     ((a[sortColumn] as number) > (b[sortColumn] as number) ? 1 : -1) *
// //     sortModifier;
// //   return [...rows].sort(comparator);
// // }
