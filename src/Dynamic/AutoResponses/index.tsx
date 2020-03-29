import React, { useContext } from "react";
import { AppPageProps } from "Dynamic/AppRoot/types";
import { User, Snowflake } from "Utility/types";
import "./style.scss";
import { useCurrentUser } from "Store/actions";
import { Option } from "Utility/option";
// import DataGrid from "Components/DataGrid";
// import { Switch } from "Components";
// import { isDefined } from "Utility";
import { ScrollContext } from "Dynamic/AppRoot/context";
// import { triggerPipeline } from "./formatters";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type AutoResponse = {
  author_id: Snowflake;
  count: number;
};

type AutoResponsesProps = {
  commands: AutoResponse[];
  authors: Map<Snowflake, User>;
  authenticated: boolean;
  hasLoaded: boolean;
  isArchitusAdmin: boolean;
  currentUser: User;
  scrollHandler: () => void;
} & AppPageProps;

type AutoResponsesState = {
  filterSelfAuthored: boolean;
};

type AuthorData = {
  author: string;
  username: string;
  avatar?: string;
  discriminator: string;
};

type Row = AuthorData & AutoResponse;

// const trueCallback = (): boolean => true;

class AutoResponses extends React.Component<
  AutoResponsesProps,
  AutoResponsesState
> {
  state: AutoResponsesState = {
    filterSelfAuthored: false
  };

  // TODO implement
  addRow = (): null => null;

  editRow = (): null => null;

  deleteRow = (): null => null;

  compareRowAuthor = (r: AutoResponse): boolean =>
    r.author_id === this.props.currentUser.id;

  transformRow(r: AutoResponse): Row {
    const { authors } = this.props;
    return { ...r, ...foldAuthorData(r, authors) };
  }

  onRowAdd = (): void => {
    // if (isDefined(row)) {
    //   this.addRow(guildId, row);
    //   dispatch(localAddResponse(guildId, row, session));
    // }
  };

  onRowUpdate = (): void => {
    // if (isDefined(row) && canChangeRow(row)) {
    //   this.editRow(guildId, row.trigger, { ...row, [key]: updatedCell });
    //   dispatch(localEditResponse(guildId, row, key, updatedCell));
    // }
  };

  onRowDelete = (): void => {
    // if (isDefined(row) && canChangeRow(row)) {
    //   this.deleteRow(guildId, row);
    //   dispatch(localDeleteResponse(guildId, row));
    // }
  };

  baseColumnMeta = {
    sortable: true,
    filterable: true,
    resizable: true
  };

  columnWidths = new Map(
    Object.entries({
      base: [150, 300, 90, 200],
      "768": [200, 300, 100, 200],
      "992": [200, null, 90, 200],
      "1200": [270, null, 200, 240]
    })
  );

  onToggleSelfAuthored = (): void => {
    this.setState(({ filterSelfAuthored }) => ({
      filterSelfAuthored: !filterSelfAuthored
    }));
  };

  // triggerCellFormatter = ({ value }: { value: string }): React.ReactNode => (
  //   <div
  //     className="response"
  //     dangerouslySetInnerHTML={{
  //       __html: triggerPipeline(value, contextRef.current)
  //     }}
  //   />
  // );

  render(): React.ReactNode {
    const { isArchitusAdmin } = this.props;
    // const { commands, isArchitusAdmin, hasLoaded, scrollHandler } = this.props;
    // const { filterSelfAuthored } = this.state;

    // const canChangeRow = isArchitusAdmin ? trueCallback : this.compareRowAuthor;
    // const canEditRow = isArchitusAdmin ? true : this.compareRowAuthor;

    // // Self-authored filter
    // let processedData = commands;

    // if (filterSelfAuthored) {
    //   processedData = processedData.filter(this.compareRowAuthor);
    // }

    // // Column definitions
    // const columns = [
    //   {
    //     key: "trigger",
    //     name: "Trigger",
    //     editable: canEditRow,
    //     formatter: useMemo(() => createTriggerCellFormatter(contextRef), []),
    //     unique: true,
    //     tooltip: (
    //       <span>
    //         Include <strong>*</strong> as a wildcard, and use a corresponding{" "}
    //         <strong>[capture]</strong> in the response to use the matched
    //         string.
    //       </span>
    //     ),
    //     hasAddField: true,
    //     required: true,
    //     info: (
    //       <span>
    //         Include <strong>*</strong> as a wildcard, and use a corresponding{" "}
    //         <strong>[capture]</strong> in the response to use the matched
    //         string.
    //       </span>
    //     ),
    //     validator: value => {
    //       if (value.trim().length < 2) {
    //         return {
    //           result: false,
    //           message: "Trigger must be 2 characters or longer"
    //         };
    //       }
    //       return true;
    //     },
    //     processValue: value => value.replace(/[_*\W]+/g, "")
    //   },
    //   {
    //     key: "response",
    //     name: "Response",
    //     editable: canEditRow,
    //     formatter: useMemo(() => createResponseCellFormatter(contextRef), []),
    //     tooltip: (
    //       <span>
    //         <h6>Syntax</h6>
    //         [noun], [adj], [adv], [member], [owl], [:reaction:], [count],
    //         [capture], [author], [@author], [comma,separated,choices]
    //       </span>
    //     ),
    //     hasAddField: true,
    //     required: true,
    //     info: (
    //       <span>
    //         <strong>Allowed Syntax:</strong> [noun], [adj], [adv], [member],
    //         [owl], [:reaction:], [count], [capture], [author], [@author],
    //         [comma,separated,choices]
    //       </span>
    //     ),
    //     validator: value => {
    //       if (value.trim() === "list") {
    //         return {
    //           result: false,
    //           message: "Response cannot be a special command like list"
    //         };
    //       }

    //       if (value.trim() === "author") {
    //         return {
    //           result: false,
    //           message: "Response cannot be a special command like author"
    //         };
    //       }

    //       return true;
    //     }
    //   },
    //   {
    //     key: "count",
    //     name: "Count",
    //     sortDescendingFirst: true,
    //     formatter: useMemo(() => createCountCellFormatter(maxCountRef), []),
    //     filterRenderer: NumericFilter
    //   },
    //   {
    //     key: "author",
    //     name: "Author",
    //     formatter: AuthorCellFormatter
    //   }
    // ];

    // // Max count
    // const maxCountRef = useRef(0);
    // maxCountRef.current = useMemo(() => {
    //   if (isNil(commands) || commands.length === 0) return 0;

    //   let maxCount = 0;
    //   for (let i = 0; i < commands.length; ++i) {
    //     if (commands[i].count > maxCount) maxCount = commands[i].count;
    //   }
    //   return maxCount;
    // }, []);

    // // Mentions context
    // const contextRef = useRef({ users: {} });
    // contextRef.current = useMemo(() => {
    //   const map = {};
    //   for (const id in authors) {
    //     if (isDefined(authors[id])) {
    //       map[id] = { username: authors[id].name };
    //     }
    //   }
    //   return Object.freeze({ users: map });
    // }, []);

    // // Remove count column on mobile
    // const isMobile = useMedia("(max-width: 767.9px)");
    // if (isMobile) {
    //   const countColumnIndex = 2;
    //   const removeCountColumn = arr =>
    //     arr.filter((_c, i) => i !== countColumnIndex);
    //   columns = removeCountColumn(columns);
    //   for (const breakpoint in columnWidths) {
    //     if (columnWidths.hasOwnProperty(breakpoint)) {
    //       columnWidths[breakpoint] = removeCountColumn(columnWidths[breakpoint]);
    //     }
    //   }
    // }

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
        {/* <DataGrid<AutoResponse, Row>
          data={processedData}
          columns={columns}
          columnWidths={this.columnWidths}
          sortColumn="count"
          baseColumnMeta={this.baseColumnMeta}
          transformRow={this.transformRow}
          onRowAdd={this.onRowAdd}
          onRowUpdate={this.onRowUpdate}
          onRowDelete={this.onRowDelete}
          canDeleteRow={canChangeRow}
          isLoading={!hasLoaded}
          emptyLabel="No responses to display"
          onScroll={scrollHandler}
          dialogTitle="Add new auto response"
          toolbarComponents={
            <Switch
              onChange={this.onToggleSelfAuthored}
              checked={filterSelfAuthored}
              label="Show self-authored"
              className="mr-sm-4"
            />
          }
        /> */}
      </div>
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
      avatar,
      username,
      discriminator
    };
  }

  return {
    author: "Unknown",
    username: "Unknown",
    discriminator: "0000"
  };
}

const AutoResponsesProvider: React.FC<AppPageProps> = pageProps => {
  // TODO implement
  const authors: Map<Snowflake, User> = new Map();
  const commands: AutoResponse[] = [];
  const currentUser: Option<User> = useCurrentUser();
  const { scrollHandler } = useContext(ScrollContext);
  if (currentUser.isDefined())
    return (
      <AutoResponses
        authors={authors}
        commands={commands}
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
