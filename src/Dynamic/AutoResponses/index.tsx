import React, { useContext, useMemo } from "react";
import styled, { css, up, Box } from "@xstyled/emotion";
import DataGrid from "react-data-grid";
import { AppPageProps } from "Dynamic/AppRoot/types";
import { User, Snowflake, HoarFrost } from "Utility/types";
import { useCurrentUser } from "Store/actions";
import { Option, None } from "Utility/option";
import { ScrollContext } from "Dynamic/AppRoot/context";
import { Tooltip, Icon, Switch, HelpTooltip } from "Components";
import { AutoSizer } from "react-virtualized";
import { AnyIconName } from "Components/Icon/loader";
import "react-data-grid/dist/react-data-grid.css";

type AutoResponse = {
  id: HoarFrost;
  author_id: Snowflake;
  trigger: string;
  response: string;
  count: number;
};

type TransformedAutoResponse = {
  id: HoarFrost;
  author_id: Snowflake;
  trigger: string;
  response: string;
  count: number;
  authorData: AuthorData;
};

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
  deleteSelectedEnable: boolean;
  addNewRowEnable: boolean;
};

type AuthorData = {
  author: string;
  username: string;
  avatar?: string;
  discriminator: string;
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
};

class AutoResponses extends React.Component<
  AutoResponsesProps,
  AutoResponsesState
> {
  state: AutoResponsesState = {
    filterSelfAuthored: false,
    viewMode: "Comfy",
    showFilters: false,
    deleteSelectedEnable: false,
    addNewRowEnable: true,
  };

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

  onAddNewRow = (): void => {
    // TODO implement
  };

  render(): React.ReactNode {
    const { isArchitusAdmin, commands } = this.props;
    const {
      viewMode,
      showFilters,
      filterSelfAuthored,
      // deleteSelectedEnable,
      addNewRowEnable,
    } = this.state;

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
            deleteSelectedEnable={filterSelfAuthored}
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
                  <DataGrid
                    rows={commands}
                    height={height}
                    width={width}
                    columns={[
                      {
                        name: "Trigger",
                        key: "trigger",
                        formatter: ({ row }): React.ReactElement => (
                          <>{row.trigger}</>
                        ),
                      },
                      {
                        name: "Response",
                        key: "response",
                        formatter: ({ row }): React.ReactElement => (
                          <>{row.response}</>
                        ),
                      },
                      {
                        name: "Author",
                        key: "authorData.author",
                        formatter: ({ row }): React.ReactElement => (
                          <>{row.authorData.author}</>
                        ),
                      },
                      {
                        name: "Count",
                        key: "count",
                        formatter: ({ row }): React.ReactElement => (
                          <>{row.count}</>
                        ),
                      },
                    ]}
                    rowKey="id"
                    rowHeight={viewModes[viewMode].height}
                  />
                </>
              )}
            </AutoSizer>
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
  const id = autoResponse.author_id;
  const userOption = Option.from(authors.get(id));
  if (userOption.isDefined()) {
    const { username, avatar, discriminator } = userOption.get;
    return {
      author: `${username}#${discriminator}|${id}`,
      avatar: avatar.orUndefined(),
      username,
      discriminator,
    };
  }

  return {
    author: "Unknown",
    username: "Unknown",
    discriminator: "0000",
  };
}

const AutoResponsesProvider: React.FC<AppPageProps> = (pageProps) => {
  // TODO hook up to state
  // TODO add test data
  const fakeUser: User = {
    id: "2" as Snowflake,
    username: "user",
    discriminator: "1881",
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
  };
  const authors: Map<Snowflake, User> = new Map([[fakeUser.id, fakeUser]]);
  const commandsBase: AutoResponse[] = [
    {
      id: "3" as HoarFrost,
      // eslint-disable-next-line @typescript-eslint/camelcase
      author_id: fakeUser.id,
      trigger: "hello*",
      response: "[:JUST:]",
      count: 2352,
    },
    {
      id: "4" as HoarFrost,
      // eslint-disable-next-line @typescript-eslint/camelcase
      author_id: fakeUser.id,
      trigger: "YEP",
      response: "COCK",
      count: 12,
    },
    {
      id: "5" as HoarFrost,
      // eslint-disable-next-line @typescript-eslint/camelcase
      author_id: fakeUser.id,
      trigger: "*night",
      response: "[:night:]",
      count: 3456,
    },
    {
      id: "6" as HoarFrost,
      // eslint-disable-next-line @typescript-eslint/camelcase
      author_id: fakeUser.id,
      trigger: "*get on",
      response: ":Pepega: [capture] get on",
      count: 654,
    },
    {
      id: "7" as HoarFrost,
      // eslint-disable-next-line @typescript-eslint/camelcase
      author_id: fakeUser.id,
      trigger: "no",
      response: "[:JUST:]",
      count: 2,
    },
  ];
  const commands = [
    ...commandsBase,
    ...commandsBase.map((c) => ({ ...c, id: `${c.id}_` as HoarFrost })),
    ...commandsBase.map((c) => ({ ...c, id: `${c.id}1` as HoarFrost })),
    ...commandsBase.map((c) => ({ ...c, id: `${c.id}2` as HoarFrost })),
    ...commandsBase.map((c) => ({ ...c, id: `${c.id}3` as HoarFrost })),
    ...commandsBase.map((c) => ({ ...c, id: `${c.id}4` as HoarFrost })),
    ...commandsBase.map((c) => ({ ...c, id: `${c.id}5` as HoarFrost })),
    ...commandsBase.map((c) => ({ ...c, id: `${c.id}6` as HoarFrost })),
    ...commandsBase.map((c) => ({ ...c, id: `${c.id}7` as HoarFrost })),
    ...commandsBase.map((c) => ({ ...c, id: `${c.id}8` as HoarFrost })),
    ...commandsBase.map((c) => ({ ...c, id: `${c.id}9` as HoarFrost })),
    ...commandsBase.map((c) => ({ ...c, id: `${c.id}1_` as HoarFrost })),
    ...commandsBase.map((c) => ({ ...c, id: `${c.id}2_` as HoarFrost })),
    ...commandsBase.map((c) => ({ ...c, id: `${c.id}3_` as HoarFrost })),
  ];
  const currentUser: Option<User> = useCurrentUser();
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
        New auto response
      </Box>
    </Styled.GridHeaderButton>
    <Styled.GridHeaderButton
      disabled={!deleteSelectedEnable}
      onClick={onDeleteSelected}
    >
      <Icon name="trash" />
      <Box ml="nano" display="inline">
        Delete Selected
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
