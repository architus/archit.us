import React, { useContext, useMemo, MutableRefObject } from "react";
import styled, { css, up, Box } from "@xstyled/emotion";
import DataGrid, { Column } from "react-data-grid";
import AutoSizer from "react-virtualized-auto-sizer";
import { ContextMenu, MenuItem, connectMenu } from "react-contextmenu";
import { createPortal } from "react-dom";
import { AppPageProps } from "Dynamic/AppRoot/types";
import {
  generateName,
  randomNumericString,
  randomInt,
  useMemoOnce,
  intersection,
} from "Utility";
import { User, Snowflake, HoarFrost } from "Utility/types";
import { useCurrentUser } from "Store/actions";
import { Option, None } from "Utility/option";
import { ScrollContext } from "Dynamic/AppRoot/context";
import { Tooltip, Icon, Switch, HelpTooltip } from "Components";
import { AnyIconName } from "Components/Icon/loader";
import { getAvatarUrl } from "Components/UserDisplay";
import { opacity } from "Theme/getters";
import {
  TriggerFormatter,
  ResponseFormatter,
  AuthorFormatter,
  CountFormatter,
  SelectionHeader,
  SelectionFormatter,
  RowRenderer,
} from "./formatters";
import { AutoResponse, TransformedAutoResponse, AuthorData } from "./types";
import "react-data-grid/dist/react-data-grid.css";

type ViewMode = keyof typeof viewModes;
const viewModeOrder: ViewMode[] = ["Sparse", "Comfy", "Compact"];
const viewModes = {
  Compact: { icon: "compact" as AnyIconName, label: "Compact", height: 24 },
  Comfy: { icon: "comfy" as AnyIconName, label: "Comfy", height: 32 },
  Sparse: { icon: "sparse" as AnyIconName, label: "Sparse", height: 40 },
};

type AutoResponsesProps = {
  commands: TransformedAutoResponse[];
  authors: Map<Snowflake, User>;
  authenticated: boolean;
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
  columns: Column<TransformedAutoResponse, {}>[];
};

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

    border-top: 1px solid border;
    box-shadow: 1;
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
            background-color: dark_overlay;
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
            background-color: light_overlay;
            box-shadow: none;

            &:not(:hover):not(:active) {
              box-shadow: 0;
            }

            &:hover {
              background-color: dark_overlay_slight;
            }
            &:active {
              background-color: dark_overlay;
            }
          `}
  `,
  DataGridWrapper: styled.div`
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    flex-grow: 1;

    & .rdg-cell-mask {
      display: none !important;
    }
  `,
  ContextMenu: styled(ContextMenu)`
    &.react-contextmenu {
      background-color: b_600;
      border-radius: 8px;
      border: 1px solid;
      border-color: contrast_border;
      box-shadow: 1;
      color: text;
      padding: pico 0;
      user-select: none;
    }

    & .react-contextmenu-item {
      padding: 2px nano;
      cursor: pointer;
      outline: none;

      &:hover {
        background-color: ${opacity("primary", 0.2)};
      }

      &:active {
        background-color: ${opacity("primary", 0.4)};
      }
    }
  `,
};

class AutoResponses extends React.Component<
  AutoResponsesProps,
  AutoResponsesState
> {
  state: AutoResponsesState = {
    filterSelfAuthored: false,
    viewMode: "Comfy",
    showFilters: false,
    addNewRowEnable: true,
    selectedRows: new Set<HoarFrost>(),
    columns: [],
  };

  selfAuthored: Set<HoarFrost> = new Set<HoarFrost>();

  allRowsSelectedRef: MutableRefObject<boolean> = { current: false };

  constructor(props: AutoResponsesProps) {
    super(props);
    this.updateSelfAuthored();
  }

  setViewMode = (newMode: ViewMode): void => {
    this.setState({ viewMode: newMode });
  };

  onChangeShowFilters = (newShow: boolean): void => {
    this.setState({ showFilters: newShow });
  };

  onChangeFilterSelfAuthored = (newFilter: boolean): void => {
    this.setState({ filterSelfAuthored: newFilter });
  };

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

  setSelectedRows = (newSet: Set<HoarFrost>): void => {
    const { isArchitusAdmin } = this.props;
    let newSelectedRows: Set<HoarFrost>;
    let maxRowCount: number;
    if (isArchitusAdmin) {
      newSelectedRows = newSet;
      maxRowCount = this.props.commands.length;
    } else {
      newSelectedRows = intersection(newSet, this.selfAuthored);
      maxRowCount = this.selfAuthored.size;
    }
    // We use a ref here to pass internal changes to our all row selection logic
    // to the header renderer without recreating the component function. The header
    // will get re-rendered anyways when the row selection changes, causing it
    // to read the most up-to-date value from the ref.
    this.allRowsSelectedRef.current = newSelectedRows.size === maxRowCount;
    this.setState({ selectedRows: newSelectedRows });
  };

  updateSelfAuthored = (): void => {
    const { commands, currentUser } = this.props;
    this.selfAuthored = new Set<HoarFrost>(
      commands
        .filter((command) => command.authorId === currentUser.id)
        .map((command) => command.id)
    );
  };

  componentDidUpdate(prevProps: AutoResponsesProps): void {
    if (prevProps.commands !== this.props.commands) {
      this.updateSelfAuthored();
    }
  }

  render(): React.ReactNode {
    const { isArchitusAdmin, commands, currentUser } = this.props;
    const {
      viewMode,
      showFilters,
      filterSelfAuthored,
      selectedRows,
      addNewRowEnable,
    } = this.state;

    const columns: Column<TransformedAutoResponse, {}>[] = [
      {
        key: "selection",
        name: "",
        width: 35,
        maxWidth: 35,
        frozen: true,
        headerRenderer: SelectionHeader(this.allRowsSelectedRef),
        formatter: SelectionFormatter(currentUser, isArchitusAdmin),
      },
      {
        name: "Trigger",
        key: "trigger",
        resizable: true,
        formatter: TriggerFormatter,
      },
      {
        name: "Response",
        key: "response",
        resizable: true,
        formatter: ResponseFormatter,
      },
      {
        name: "Count",
        key: "count",
        resizable: true,
        formatter: CountFormatter,
      },
      {
        name: "Author",
        key: "author",
        resizable: true,
        formatter: AuthorFormatter,
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
                    rows={commands}
                    height={height}
                    width={width}
                    headerRowHeight={36}
                    headerFiltersHeight={36}
                    columns={columns}
                    rowKey="id"
                    rowHeight={viewModes[viewMode].height}
                    selectedRows={selectedRows}
                    onSelectedRowsChange={this.setSelectedRows}
                    rowRenderer={RowRenderer(currentUser, isArchitusAdmin)}
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
  authors: Map<Snowflake, User>
): AuthorData {
  const id = autoResponse.authorId;
  const userOption = Option.from(authors.get(id));
  if (userOption.isDefined()) {
    const { username, discriminator } = userOption.get;
    return {
      author: `${username}#${discriminator}|${id}`,
      avatarUrl: getAvatarUrl({ user: userOption.get }),
      username,
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

function mockAuthors(
  currentUser: Option<User>,
  count: number
): Map<Snowflake, User> {
  const authors = new Map<Snowflake, User>();
  for (let i = 0; i < count; ++i) {
    const id = i.toString() as Snowflake;
    authors.set(id, {
      id,
      username: generateName(),
      discriminator: randomNumericString(4),
      avatar: None,
      bot: None,
      system: None,
      // eslint-disable-next-line @typescript-eslint/camelcase
      mfa_enabled: None,
      locale: None,
      verified: None,
      email: None,
      flags: None,
      // eslint-disable-next-line @typescript-eslint/camelcase
      premium_type: None,
    });
  }
  if (currentUser.isDefined()) {
    authors.set(currentUser.get.id, currentUser.get);
  }
  return authors;
}

const baseCommands: [string, string][] = [
  ["hello*", "[:JUST:]"],
  ["YEP", ":thumbsup:"],
  ["*night", "[:night:]"],
  ["*get on", ":Pepega: :mega: [capture] get on"],
  ["no", "[:JUST:"],
];

function mockData(
  authors: Map<Snowflake, User>,
  count: number
): AutoResponse[] {
  const responses: AutoResponse[] = [];
  const authorArray = Array.from(authors.keys());
  // Add unknown user
  authorArray.push("-1" as Snowflake);
  for (let i = 0; i < count; ++i) {
    const authorIndex = randomInt(authorArray.length);
    const commandIndex = randomInt(baseCommands.length);
    const authorId = authorArray[authorIndex];
    responses.push({
      id: i.toString() as HoarFrost,
      authorId,
      trigger: baseCommands[commandIndex][0],
      response: baseCommands[commandIndex][1],
      count: randomInt(1000000),
    });
  }
  return responses;
}

const AutoResponsesProvider: React.FC<AppPageProps> = (pageProps) => {
  const currentUser: Option<User> = useCurrentUser();
  const authors = useMemoOnce(() => mockAuthors(currentUser, 5));
  const commands = useMemoOnce(() => mockData(authors, 100));
  const { scrollHandler } = useContext(ScrollContext);
  const formattedCommands = useMemo(
    () =>
      commands.map((c) => ({ ...c, authorData: foldAuthorData(c, authors) })),
    [commands, authors]
  );
  if (currentUser.isDefined())
    return (
      <AutoResponses
        authors={authors}
        commands={formattedCommands}
        hasLoaded={false}
        currentUser={currentUser.get}
        authenticated={true}
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
            content="When selected, only show auto responses you have authored"
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
        Delete all
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
