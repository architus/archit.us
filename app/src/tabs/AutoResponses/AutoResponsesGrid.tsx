import copy from "copy-to-clipboard";
import { styled } from "linaria/react";
import React, { MutableRefObject } from "react";
import { Column, SortDirection } from "react-data-grid";
import { createPortal } from "react-dom";
import { FaTrash, FaCopy } from "react-icons/fa";

import {
  TriggerFormatter,
  ResponseFormatter,
  AuthorFormatter,
  CountFormatter,
  SelectionHeader,
  SelectionFormatter,
  RowRenderer,
} from "./formatters";
import GridHeader, { ViewMode, viewModes } from "./GridHeader";
import {
  NumericFilterValue,
  applyNumericFilter,
  NumericFilter,
} from "./NumericFilter";
import { StringFilter } from "./StringFilter";
import { TransformedAutoResponse, Author } from "./types";
import ContextMenu, {
  MenuItem,
  connectMenu,
} from "@app/components/ContextMenu";
import DataGrid from "@app/components/DataGrid";
import { Dispatch } from "@app/store";
import { showToast } from "@app/store/actions";
import { TabProps } from "@app/tabs/types";
import { intersection, memoize } from "@app/utility";
import { User, Snowflake, HoarFrost } from "@app/utility/types";
import { gap } from "@architus/facade/theme/spacing";
import { Option, None, Some, Unwrap } from "@architus/lib/option";

const Styled = {
  DataGridWrapper: styled.div`
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    flex-grow: 1;
  `,
  CopyIcon: styled(FaCopy)`
    margin-right: ${gap.nano};
  `,
  TrashIcon: styled(FaTrash)`
    margin-right: ${gap.nano};
  `,
};

type AutoResponsesGridProps = {
  commands: TransformedAutoResponse[];
  authors: Map<Snowflake, Author>;
  hasLoaded: boolean;
  isArchitusAdmin: boolean;
  currentUser: User;
  dispatch: Dispatch;
} & TabProps;

type AutoResponsesGridState = {
  filterSelfAuthored: boolean;
  viewMode: ViewMode;
  showFilters: boolean;
  addNewRowEnable: boolean;
  selectedRows: Set<HoarFrost>;
  sort: Option<Sort>;
  filters: Filters;
};

interface Sort {
  column: ColumnKey;
  direction: SortDirection;
}
type ColumnKey = "trigger" | "response" | "count" | "author" | "selection";
interface Filters {
  trigger: Option<string>;
  response: Option<string>;
  author: Option<string>;
  count: NumericFilterValue;
}

function filterAuthors(
  commands: TransformedAutoResponse[],
  filter: Filters["author"],
  filterSelfAuthored: boolean,
  currentUser: User
): TransformedAutoResponse[] {
  const selfAuthorFilter = filterSelfAuthored
    ? (c: TransformedAutoResponse): boolean =>
        c.authorId.map((id) => id === currentUser.id).getOrElse(false)
    : (): boolean => true;
  const includeFilter = filter.isDefined()
    ? (c: TransformedAutoResponse): boolean =>
        c.authorData.author.includes(filter.get)
    : (): boolean => true;
  return commands.filter((c) => selfAuthorFilter(c) && includeFilter(c));
}

function applyFilter(
  commands: TransformedAutoResponse[],
  column: keyof Filters,
  filter: Unwrap<Filters[keyof Filters]>
): TransformedAutoResponse[] {
  switch (column) {
    case "trigger":
    case "response": {
      const filterBase = (filter as string).toLowerCase();
      return commands.filter((c) =>
        c[column as "trigger" | "response"].toLowerCase().includes(filterBase)
      );
    }
    case "count":
      return commands.filter((c) =>
        applyNumericFilter(c.count, filter as Unwrap<NumericFilterValue>)
      );
    default:
      return commands;
  }
}

const defaultFilters: Filters = {
  trigger: None,
  response: None,
  count: None,
  author: None,
};

/**
 * Handles the core filtering/sorting logic behind the Auto Responses
 * DataGrid component (uses a class component to simplify logic)
 */
export class AutoResponsesGrid extends React.Component<
  AutoResponsesGridProps,
  AutoResponsesGridState
> {
  state: AutoResponsesGridState = {
    filterSelfAuthored: false,
    viewMode: "Comfy",
    showFilters: true,
    addNewRowEnable: true,
    selectedRows: new Set<HoarFrost>(),
    sort: None,
    filters: defaultFilters,
  };

  selfAuthored: Set<HoarFrost> = new Set<HoarFrost>();

  allRowsSelectedRef: MutableRefObject<boolean> = { current: false };

  setViewMode = (newMode: ViewMode): void => {
    this.setState({ viewMode: newMode });
  };

  onChangeShowFilters = (newShow: boolean): void => {
    this.setState({ showFilters: newShow });
  };

  onChangeFilterSelfAuthored = (newFilter: boolean): void => {
    this.setState({ filterSelfAuthored: newFilter });
  };

  onSort = (column: string, direction: SortDirection): void =>
    this.setState({
      sort:
        direction !== "NONE"
          ? Some({ column: column as ColumnKey, direction })
          : None,
    });

  onDeleteSelected = (): void => {
    // TODO implement
  };

  onDelete = (
    e: React.MouseEvent<HTMLDivElement>,
    { rowIdx }: { rowIdx: number }
  ): void => {
    // TODO implement
  };

  onCopy = (
    _: React.MouseEvent<HTMLDivElement>,
    { rowIdx }: { rowIdx: number }
  ): void => {
    const { dispatch } = this.props;
    const row = this.getRows()[rowIdx];
    const copyCommand = `${row.trigger}::${row.response}`;
    copy(copyCommand);
    dispatch(
      showToast({
        message: "Copied to clipboard",
        variant: "success",
      })
    );
  };

  onAddNewRow = (): void => {
    // TODO implement
  };

  getSortedRows = memoize<
    [TransformedAutoResponse[], Option<Sort>],
    TransformedAutoResponse[]
  >(([commands, sort]) => {
    if (sort.isDefined() && sort.get.direction !== "NONE") {
      let sortedRows: TransformedAutoResponse[] = [...commands];
      const { column } = sort.get;
      switch (column) {
        case "response":
        case "trigger":
          sortedRows = sortedRows.sort((a, b) =>
            a[column].localeCompare(b[column])
          );
          break;
        case "author":
          sortedRows = sortedRows.sort((a, b) =>
            a.authorData.author.localeCompare(b.authorData.author)
          );
          break;
        case "count":
          sortedRows = sortedRows.sort((a, b) => a[column] - b[column]);
          break;
        default:
      }
      return sort.get.direction === "DESC" ? sortedRows.reverse() : sortedRows;
    }
    return commands;
  });

  getFilteredRows = memoize<
    [TransformedAutoResponse[], Filters, boolean],
    TransformedAutoResponse[]
  >(([commands, filters, filterSelfAuthored]) => {
    const { currentUser } = this.props;
    let filtered = commands;
    for (const [filterKey, untypedFilter] of Object.entries(filters)) {
      const filterOption = untypedFilter as Filters[keyof Filters];
      if (filterKey === "author") {
        // Use special filtering rules for authors to prevent second traversal to perform
        // self-authored filter
        filtered = filterAuthors(
          filtered,
          filterOption as Option<string>,
          filterSelfAuthored,
          currentUser
        );
      } else if (filterOption.isDefined()) {
        const filter = filterOption.get;
        filtered = applyFilter(filtered, filterKey as keyof Filters, filter);
      }
    }
    return filtered;
  });

  findSelfAuthored = memoize<[TransformedAutoResponse[], User], Set<HoarFrost>>(
    ([commands, currentUser]) => {
      const ids: Set<HoarFrost> = new Set();
      for (const command of commands) {
        if (
          command.authorId.isDefined() &&
          command.authorId.get === currentUser.id
        ) {
          ids.add(command.id);
        }
      }
      return ids;
    }
  );

  getVisibleIds = memoize<TransformedAutoResponse[], Set<HoarFrost>>(
    (commands) => {
      return new Set<HoarFrost>(commands.map((command) => command.id));
    }
  );

  onFiltersChange = (newFilters: Record<string, unknown>): void => {
    const { isArchitusAdmin, currentUser } = this.props;
    const { selectedRows } = this.state;
    let newSelectedRows = selectedRows;
    const typedFilters = (newFilters as unknown) as Filters;
    if (selectedRows.size > 0) {
      // Cull now-invisible selected rows on filter change, and update the
      // inner mutable ref for allSelected
      const rows = this.getRows(typedFilters);
      const visibleRows = this.getVisibleIds(rows);
      let maxRowCount: number;
      if (isArchitusAdmin) {
        maxRowCount = visibleRows.size;
      } else {
        const selfAuthored = this.findSelfAuthored([rows, currentUser]);
        const visibleSelfAuthored = intersection(visibleRows, selfAuthored);
        maxRowCount = visibleSelfAuthored.size;
      }
      newSelectedRows = intersection(selectedRows, visibleRows);
      this.allRowsSelectedRef.current =
        newSelectedRows.size > 0 && newSelectedRows.size >= maxRowCount;
    }
    this.setState({ filters: typedFilters, selectedRows: newSelectedRows });
  };

  setSelectedRows = (newSet: Set<HoarFrost>): void => {
    const { isArchitusAdmin, currentUser } = this.props;
    const rows = this.getRows();
    const visibleRows = this.getVisibleIds(rows);

    let newSelectedRows: Set<HoarFrost>;
    let maxRowCount: number;
    if (isArchitusAdmin) {
      newSelectedRows = intersection(newSet, visibleRows);
      maxRowCount = visibleRows.size;
    } else {
      const selfAuthored = this.findSelfAuthored([rows, currentUser]);
      const visibleSelfAuthored = intersection(visibleRows, selfAuthored);
      newSelectedRows = intersection(newSet, visibleSelfAuthored);
      maxRowCount = visibleSelfAuthored.size;
    }

    // We use a ref here to pass internal changes to our all row selection logic
    // to the header renderer without recreating the component function. The header
    // will get re-rendered anyways when the row selection changes, causing it
    // to read the most up-to-date value from the ref.
    this.allRowsSelectedRef.current =
      newSelectedRows.size > 0 && newSelectedRows.size >= maxRowCount;
    this.setState({ selectedRows: newSelectedRows });
  };

  getRows = (
    filterOverride: Filters | undefined = undefined
  ): TransformedAutoResponse[] => {
    const { commands } = this.props;
    const { showFilters, filterSelfAuthored, sort, filters } = this.state;
    // Skip filter application if filter row is hidden
    const filtered = showFilters
      ? this.getFilteredRows([
          commands,
          filterOverride || filters,
          filterSelfAuthored,
        ])
      : this.getFilteredRows([commands, defaultFilters, filterSelfAuthored]);
    const sorted = this.getSortedRows([filtered, sort]);
    return sorted;
  };

  render(): React.ReactNode {
    const { isArchitusAdmin, currentUser } = this.props;
    const {
      viewMode,
      showFilters,
      filterSelfAuthored,
      selectedRows,
      addNewRowEnable,
      sort,
      filters,
    } = this.state;

    const columns: Column<TransformedAutoResponse, {}>[] &
      { key: ColumnKey; [key: string]: unknown }[] = [
      {
        key: "selection",
        name: "",
        width: 42,
        maxWidth: 42,
        headerRenderer: SelectionHeader(this.allRowsSelectedRef),
        formatter: SelectionFormatter(currentUser, isArchitusAdmin),
      },
      {
        name: "Trigger",
        key: "trigger",
        resizable: true,
        sortable: true,
        minWidth: 200,
        width: "auto",
        formatter: TriggerFormatter,
        filterRenderer: StringFilter,
      },
      {
        name: "Response",
        key: "response",
        resizable: true,
        sortable: true,
        minWidth: 200,
        width: "auto",
        formatter: ResponseFormatter,
        filterRenderer: StringFilter,
      },
      {
        name: "Count",
        key: "count",
        resizable: true,
        sortable: true,
        formatter: CountFormatter,
        filterRenderer: NumericFilter,
        minWidth: 130,
        width: 160,
      },
      {
        name: "Author",
        key: "author",
        resizable: true,
        sortable: true,
        minWidth: 160,
        width: "auto",
        formatter: AuthorFormatter,
        filterRenderer: StringFilter,
      },
    ];

    const CommandMenu = connectMenu("auto-response-grid-context-menu")(
      ({ trigger }: { trigger: { canDelete: boolean } | null }) => {
        return (
          <ContextMenu id="auto-response-grid-context-menu">
            <MenuItem onClick={this.onCopy}>
              <Styled.CopyIcon />
              Copy to clipboard
            </MenuItem>
            {/* {trigger && trigger.canDelete ? (
              <>
                <MenuItem onClick={this.onDelete}>
                  <Styled.TrashIcon />
                  Delete
                </MenuItem>
              </>
            ) : (
              <></>
            )} */}
          </ContextMenu>
        );
      }
    );

    return (
      <>
        <GridHeader
          viewMode={viewMode}
          setViewMode={this.setViewMode}
          showFilters={showFilters}
          onChangeShowFilters={this.onChangeShowFilters}
          filterSelfAuthored={filterSelfAuthored}
          onChangeFilterSelfAuthored={this.onChangeFilterSelfAuthored}
          deleteSelectedEnable={selectedRows.size > 0}
          onDeleteSelected={this.onDeleteSelected}
          addNewRowEnable={addNewRowEnable}
          onAddNewRow={this.onAddNewRow}
        />
        <Styled.DataGridWrapper>
          <DataGrid<TransformedAutoResponse, "id", {}>
            rows={this.getRows()}
            headerRowHeight={44}
            headerFiltersHeight={48}
            columns={columns}
            rowKey="id"
            rowHeight={viewModes[viewMode].height}
            selectedRows={selectedRows}
            onSelectedRowsChange={this.setSelectedRows}
            sortColumn={sort.getOrElse(undefined)?.column}
            sortDirection={sort.getOrElse(undefined)?.direction}
            onSort={this.onSort}
            rowRenderer={RowRenderer(currentUser, isArchitusAdmin)}
            enableFilters={showFilters}
            filters={filters}
            onFiltersChange={this.onFiltersChange}
          />
          {createPortal(<CommandMenu />, document.body)}
        </Styled.DataGridWrapper>
      </>
    );
  }
}

export default AutoResponsesGrid;
