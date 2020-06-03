import React, { useContext, useMemo, MutableRefObject } from "react";
import styled, { css, up, Box } from "@xstyled/emotion";
import DataGrid, { Column, SortDirection } from "react-data-grid";
import AutoSizer from "react-virtualized-auto-sizer";
import { ContextMenu, MenuItem, connectMenu } from "react-contextmenu";
import { createPortal } from "react-dom";
import { AppPageProps } from "Dynamic/AppRoot/types";
import { intersection, memoize } from "Utility";
import {
  User,
  Member,
  Snowflake,
  HoarFrost,
  AutoResponse,
} from "Utility/types";
import { useCurrentUser } from "Store/actions";
import { Option, None, Some, Unwrap } from "Utility/option";
import { ScrollContext } from "Dynamic/AppRoot/context";
import { Tooltip, Icon, Switch, HelpTooltip } from "Components";
import { AnyIconName } from "Components/Icon/loader";
import { getAvatarUrl } from "Components/UserDisplay";
import { usePool, usePoolEntities } from "Store/slices/pools";
import { opacity, color } from "Theme";
import {
  TriggerFormatter,
  ResponseFormatter,
  AuthorFormatter,
  CountFormatter,
  SelectionHeader,
  SelectionFormatter,
  RowRenderer,
} from "./formatters";
import { StringFilter } from "./StringFilter";
import {
  NumericFilterValue,
  applyNumericFilter,
  NumericFilter,
} from "./NumericFilter";
import { TransformedAutoResponse, AuthorData } from "./types";

// TODO minify CSS to save on byte size
const Styled = {
  PageOuter: styled.div`
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;
    height: 100%;

    padding-top: milli;
  `,
  Header: styled.div`
    padding: 0 milli;
  `,
  GridWrapper: styled.div`
    position: relative;
    flex-grow: 1;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;

    background-color: b_300;

    ${up(
      "md",
      css`
        margin-left: milli;
        border-top-left-radius: 1rem;
      `
    )}
  `,
  GridHeader: styled.div`
    display: flex;
    height: centi;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    z-index: 4;

    box-shadow: 0;
    background-color: b_500;

    ${up(
      "md",
      css`
        border-top-left-radius: 1rem;
      `
    )}
  `,
  ViewModeButtonGroup: styled.div`
    margin: 0 0.5rem;
    padding: 0 0.25rem;
    border-radius: 0.5rem;
    margin-left: auto;

    ${up(
      "lg",
      css`
        margin-right: 0.75rem;
      `
    )}
  `,
  ViewModeButton: styled.button<{ active: boolean }>`
    outline: none;
    border: none;
    background-color: transparent;
    padding: 0.5rem 0.6rem;
    color: foreground_fade;

    ${(props): string =>
      props.active
        ? css`
            background-color: dark_adjust;
            color: text;
          `
        : ""}

    &:first-of-type {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5em;
    }

    &:last-of-type {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5em;
    }
  `,
  FilterSwitch: styled(Switch)`
    padding: 0 1rem;
  `,
  FilterSelfSwitch: styled(Switch)`
    padding: 0 1rem;
  `,
  GridHeaderButton: styled.button`
    outline: none;
    background-color: transparent;
    margin-left: nano;
    padding: 0.5rem nano;
    transition-duration: 0.15s;
    transition-easing-function: linear;
    transition-property: opacity, background-color;
    color: text;
    border-radius: 0.5rem;
    border: 1.5px solid transparent;
    border-color: contrast_border;

    ${(props): string =>
      props.disabled
        ? css`
            opacity: 0;
          `
        : css`
            opacity: 1;
            background-color: light_adjust;
            box-shadow: none;

            &:not(:hover):not(:active) {
              box-shadow: 0;
            }

            &:hover {
              background-color: dark_adjust_slight;
            }
            &:active {
              background-color: dark_adjust;
            }
          `}
  `,
  DataGridWrapper: styled.div`
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    flex-grow: 1;

    .rdg-cell {
      display: inline-block;
      position: absolute;
      height: inherit;
      padding: 0 8px;
      background-color: inherit;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .rdg-cell-frozen {
      position: -webkit-sticky;
      position: sticky;
      z-index: 1;

      &::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 1px;
        top: 0;
        left: -6px;
        z-index: -1;
        box-shadow: 0px 0px 7px 8px ${color("shadow_heavy")};
      }
    }

    .rdg-cell-frozen-last + .rdg-cell {
      padding-left: pico;
    }

    .rdg-cell-mask {
      display: none;
    }

    .rdg-checkbox-label {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .rdg-checkbox-label-disabled {
      cursor: default;
    }

    .rdg-checkbox-label-disabled .rdg-checkbox {
      border-color: contrast_border;
      background-color: b_300;
    }

    .rdg-checkbox-input {
      all: unset;
      width: 0;
      margin: 0;
    }

    .rdg-checkbox {
      content: "";
      width: 20px;
      height: 20px;
      border: 2px solid ${color("border")};
      background-color: b_600;
      margin-top: 7px;
      margin-left: 7px;
    }

    .rdg-checkbox-input:checked + .rdg-checkbox {
      background-color: primary;
      box-shadow: inset 0 0 0 3px ${color("b_400")};
    }

    .rdg-checkbox-input:focus + .rdg-checkbox {
      border-color: secondary;
      border-width: 3px;
    }

    .rdg {
      position: relative;
      z-index: 0;
      box-sizing: border-box;
      overflow-x: auto;
      overflow-y: scroll;
      -webkit-user-select: none;
      user-select: none;
      background-color: b_300;
      font-size: 14px;
    }

    .rdg *,
    .rdg ::after,
    .rdg ::before {
      box-sizing: inherit;
    }

    .rdg-editor-container {
      position: absolute;
    }

    .rdg-select-editor,
    .rdg-text-editor {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      box-sizing: border-box;
      width: calc(100% + 1px);
      height: calc(100% + 1px);
      padding: 1px 7px 0;
      margin: -1px 0 0 -1px;
      border: 2px solid #ccc;
      background-color: #fff;
      font-size: 14px;
      line-height: 1.2;
    }

    .rdg-select-editor::placeholder,
    .rdg-text-editor::placeholder {
      color: #999;
      opacity: 1;
    }

    .rdg-select-editor:focus,
    .rdg-text-editor:focus {
      border-color: #66afe9;
    }

    .rdg-filter-row,
    .rdg-header-row {
      width: var(--row-width);
      position: -webkit-sticky;
      position: sticky;
      background-color: b_400;
      font-weight: 700;
      -webkit-user-select: none;
      user-select: none;
      z-index: 3;
      box-shadow: 1;
    }

    .rdg-header-row {
      height: var(--header-row-height);
      line-height: var(--header-row-height);
      top: 0;
    }

    .rdg-filter-container {
      display: flex;
      flex-direction: row;
      align-items: stretch;

      input {
        flex-grow: 1;
        outline: none;
        padding: 6px 6px 6px 10px;
        border: 1px solid;
        border-radius: 8px;
        transition: box-shadow 0.25s ease;
        box-shadow: none;
        background-color: b_500;
        color: text;
        border-color: contrast_border;
        width: 100%;

        &::placeholder {
          color: text_fade;
        }

        &:focus {
          border-color: input_focus_border;
          box-shadow: 0 0 0 0.2rem ${opacity("primary", 0.3)};
        }
      }
    }

    .rdg-filter-row {
      height: var(--filter-row-height);
      top: var(--header-row-height);

      .rdg-cell {
        overflow: visible;
      }
    }

    .rdg-header-cell-resizer {
      cursor: col-resize;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 10px;
    }

    .rdg-cell .Select {
      max-height: 30px;
      font-size: 12px;
      font-weight: 400;
    }

    .rdg-header-sort-cell {
      cursor: pointer;
      display: flex;

      & > span:nth-of-type(2) {
        opacity: 0.5;
        margin-right: atto;
      }

      &::after {
        --sort-header-indicator-height: 3px;
        width: 100%;
        top: 0;
        height: var(--sort-header-indicator-height);
        content: "";
        position: absolute;
        background-color: primary;
        left: 0;
        transform: translateY(calc(var(--sort-header-indicator-height) * -1));
        border-bottom-left-radius: 1000em;
        border-bottom-right-radius: 1000em;
        transition: 0.1s linear transform;
      }

      &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
      }

      &:hover {
        &::before {
          background-color: contrast_overlay;
        }

        &::after {
          top: 0;
          transform: none;
        }
      }
    }

    .rdg-header-sort-name {
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .rdg-selected {
      border: 2px solid #66afe9;
    }

    .rdg-selected .drag-handle {
      pointer-events: auto;
      position: absolute;
      bottom: -5px;
      right: -4px;
      background: #66afe9;
      width: 8px;
      height: 8px;
      border: 1px solid #fff;
      border-right: 0;
      border-bottom: 0;
      cursor: crosshair;
      cursor: -moz-grab;
      cursor: -webkit-grab;
      cursor: grab;
    }

    .rdg-selected:hover .drag-handle {
      bottom: -8px;
      right: -7px;
      background: #fff;
      width: 16px;
      height: 16px;
      border: 1px solid #66afe9;
    }

    .react-grid-cell-dragged-over-down,
    .react-grid-cell-dragged-over-up {
      border: 1px dashed #000;
      background: rgba(0, 0, 255, 0.2) !important;
    }

    .react-grid-cell-dragged-over-up {
      border-bottom-width: 0;
    }

    .react-grid-cell-dragged-over-down {
      border-top-width: 0;
    }

    .rdg-cell-copied {
      background: rgba(0, 0, 255, 0.2) !important;
    }

    .rdg-row {
      width: var(--row-width);
      height: var(--row-height);
      line-height: var(--row-height);

      &:hover {
        background-color: ${opacity("primary", 0.075)};
      }

      &.rdg-row-even {
        & .rdg-cell {
          background-color: contrast_overlay;
        }
      }

      &.rdg-row-selected {
        & .rdg-cell {
          background-color: ${opacity("primary", 0.25)} !important;
        }
      }
    }

    .rdg-summary-row {
      position: -webkit-sticky;
      position: sticky;
      z-index: 3;
    }

    .rdg-summary-row > .rdg-cell {
      border-top: 2px solid #aaa;
    }
  `,
  ContextMenu: styled(ContextMenu)`
    &.react-contextmenu {
      background-color: b_500;
      border-radius: 8px;
      border: 1px solid;
      border-color: contrast_border;
      box-shadow: 2;
      color: text;
      padding: femto 0;
      user-select: none;
    }

    & .react-contextmenu-item {
      padding: femto micro;
      cursor: pointer;
      outline: none;

      &:hover {
        background-color: ${opacity("primary", 0.1)};
      }

      &:active {
        background-color: ${opacity("primary", 0.2)};
      }
    }
  `,
};

type ViewMode = keyof typeof viewModes;
const viewModeOrder: ViewMode[] = ["Sparse", "Comfy", "Compact"];
const viewModes = {
  Compact: { icon: "compact" as AnyIconName, label: "Compact", height: 28 },
  Comfy: { icon: "comfy" as AnyIconName, label: "Comfy", height: 36 },
  Sparse: { icon: "sparse" as AnyIconName, label: "Sparse", height: 44 },
};

type Author = Member;

type AutoResponsesProps = {
  commands: TransformedAutoResponse[];
  authors: Map<Snowflake, Author>;
  hasLoaded: boolean;
  isArchitusAdmin: boolean;
  currentUser: User;
  scrollHandler: () => void;
} & AppPageProps;

type AutoResponsesState = {
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

export class AutoResponses extends React.Component<
  AutoResponsesProps,
  AutoResponsesState
> {
  state: AutoResponsesState = {
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
    e: React.MouseEvent<HTMLDivElement>,
    { rowIdx }: { rowIdx: number }
  ): void => {
    // TODO implement
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
        frozen: true,
        headerRenderer: SelectionHeader(this.allRowsSelectedRef),
        formatter: SelectionFormatter(currentUser, isArchitusAdmin),
      },
      {
        name: "Trigger",
        key: "trigger",
        resizable: true,
        sortable: true,
        formatter: TriggerFormatter,
        filterRenderer: StringFilter,
      },
      {
        name: "Response",
        key: "response",
        resizable: true,
        sortable: true,
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
        width: 150,
      },
      {
        name: "Author",
        key: "author",
        resizable: true,
        sortable: true,
        formatter: AuthorFormatter,
        filterRenderer: StringFilter,
      },
    ];

    const CommandMenu = connectMenu("auto-response-grid-context-menu")(
      ({ trigger }: { trigger: { canDelete: boolean } | null }) => {
        return (
          <Styled.ContextMenu id="auto-response-grid-context-menu">
            <MenuItem onClick={this.onCopy}>
              <Icon name="copy" marginRight="nano" />
              Copy to clipboard
            </MenuItem>
            {trigger && trigger.canDelete ? (
              <>
                <MenuItem onClick={this.onDelete}>
                  <Icon name="trash" marginRight="nano" />
                  Delete
                </MenuItem>
              </>
            ) : (
              <></>
            )}
          </Styled.ContextMenu>
        );
      }
    );

    return (
      <Styled.PageOuter>
        <Styled.Header>
          <h2>Automatic Responses</h2>
          <p className="hide-mobile">
            Manage the triggers and automatic responses for{" "}
            {isArchitusAdmin ? "all entries" : "self-authored entries"} on the
            current server.
          </p>
        </Styled.Header>
        <Styled.GridWrapper>
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
            <AutoSizer>
              {({
                height,
                width,
              }: {
                height: number;
                width: number;
              }): React.ReactNode => (
                <>
                  <DataGrid<TransformedAutoResponse, "id", {}>
                    rows={this.getRows()}
                    height={height}
                    width={width}
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
                </>
              )}
            </AutoSizer>
            {createPortal(<CommandMenu />, document.body)}
          </Styled.DataGridWrapper>
        </Styled.GridWrapper>
      </Styled.PageOuter>
    );
  }
}

/**
 * Performs the row transformation operation, resolving auto responses to the necessary
 * fields for display
 * @param autoResponse - Current row auto response object
 * @param authors - Map of IDs to User objects to use for fast lookup
 */
function foldAuthorData(
  autoResponse: AutoResponse,
  authors: Map<Snowflake, Author>
): AuthorData {
  const id = autoResponse.authorId;
  const authorOption = id.flatMapNil((i) => authors.get(i));
  if (authorOption.isDefined()) {
    const { name, discriminator } = authorOption.get;
    return {
      author: `${name}#${discriminator}|${id}`,
      avatarUrl: getAvatarUrl({ user: authorOption.get }),
      username: name,
      discriminator,
    };
  }

  return {
    author: "unknown",
    username: "unknown",
    discriminator: "0000",
    avatarUrl: "/img/unknown.png",
  };
}

const AutoResponsesProvider: React.FC<AppPageProps> = (pageProps) => {
  const { guild } = pageProps;
  const currentUser: Option<User> = useCurrentUser();
  const { all: commands } = usePool({
    type: "autoResponse",
    guildId: guild.id,
  });

  // Load the authors from the commands (call the pool in a staggered manner)
  const allAuthorIds = useMemo(() => {
    const ids: Set<Snowflake> = new Set();
    for (const command of commands) {
      if (command.authorId.isDefined()) {
        ids.add(command.authorId.get);
      }
    }
    return Array.from(ids);
  }, [commands]);
  const authorEntries = usePoolEntities({
    type: "member",
    guildId: guild.id,
    ids: allAuthorIds,
  });
  const authorsMap = useMemo(() => {
    const authors: Map<Snowflake, Author> = new Map();
    for (const authorEntry of authorEntries) {
      if (authorEntry.isLoaded && authorEntry.entity.isDefined()) {
        authors.set(authorEntry.entity.get.id, authorEntry.entity.get);
      }
    }
    return authors;
  }, [authorEntries]);

  // Transform the commands to include the authors
  const { scrollHandler } = useContext(ScrollContext);
  const formattedCommands = useMemo(
    () =>
      commands.map((c) => ({
        ...c,
        authorData: foldAuthorData(c, authorsMap),
      })),
    [commands, authorsMap]
  );

  if (currentUser.isDefined())
    return (
      <AutoResponses
        authors={authorsMap}
        commands={formattedCommands}
        hasLoaded={false}
        currentUser={currentUser.get}
        isArchitusAdmin={false}
        scrollHandler={scrollHandler}
        {...pageProps}
      />
    );

  return null;
};

export default AutoResponsesProvider;

// ? ==============
// ? Sub-components
// ? ==============

type GridHeaderProps = {
  viewMode: ViewMode;
  setViewMode: (newMode: ViewMode) => void;
  showFilters: boolean;
  onChangeShowFilters: (newShow: boolean) => void;
  filterSelfAuthored: boolean;
  onChangeFilterSelfAuthored: (newShow: boolean) => void;
  deleteSelectedEnable: boolean;
  onDeleteSelected: () => void;
  addNewRowEnable: boolean;
  onAddNewRow: () => void;
};

const GridHeader: React.FC<GridHeaderProps> = ({
  viewMode,
  setViewMode,
  showFilters,
  onChangeShowFilters,
  filterSelfAuthored,
  onChangeFilterSelfAuthored,
  deleteSelectedEnable,
  onDeleteSelected,
  addNewRowEnable,
  onAddNewRow,
}) => (
  <Styled.GridHeader>
    <Styled.FilterSwitch
      label="Show filters"
      checked={showFilters}
      onChange={onChangeShowFilters}
    />
    <Styled.FilterSelfSwitch
      checked={filterSelfAuthored}
      onChange={onChangeFilterSelfAuthored}
      label={
        <>
          <Box mr="nano" display="inline">
            Filter by self-authored
          </Box>
          <HelpTooltip
            top
            id="self-authored-auto-response-help"
            text="When selected, only show auto responses you have authored"
          ></HelpTooltip>
        </>
      }
    />
    <Styled.GridHeaderButton disabled={!addNewRowEnable} onClick={onAddNewRow}>
      <Icon name="plus" />
      <Box ml="nano" display="inline">
        New
      </Box>
    </Styled.GridHeaderButton>
    <Styled.GridHeaderButton
      disabled={!deleteSelectedEnable}
      onClick={onDeleteSelected}
    >
      <Icon name="trash" />
      <Box ml="nano" display="inline">
        Delete selected
      </Box>
    </Styled.GridHeaderButton>
    <Styled.ViewModeButtonGroup>
      {viewModeOrder.map((key) => (
        <Tooltip
          top
          text={viewModes[key].label}
          key={key}
          id={`data-grid-view-mode-${key}`}
        >
          <Styled.ViewModeButton
            onClick={(): void => setViewMode(key as ViewMode)}
            active={viewMode === key}
          >
            <Icon name={viewModes[key].icon} />
          </Styled.ViewModeButton>
        </Tooltip>
      ))}
    </Styled.ViewModeButtonGroup>
  </Styled.GridHeader>
);
