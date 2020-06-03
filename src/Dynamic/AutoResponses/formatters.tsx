import React, { MutableRefObject, useMemo } from "react";
import styled, { Box } from "@xstyled/emotion";
import { ContextMenuTrigger } from "react-contextmenu";
import {
  FormatterProps,
  HeaderRendererProps,
  SelectCellFormatter,
  RowRendererProps,
  Row as GridRow,
} from "react-data-grid";
import { UserDisplay, Tooltip } from "Components";
import {
  isEmptyOrNil,
  makeTransformer,
  escapeHtml,
  convertUnicodeEmoji,
} from "Utility";
import { User, AutoResponseTriggerMode } from "Utility/types";
import { TransformedAutoResponse } from "./types";

const Styled = {
  Name: styled.span`
    margin-left: femto;
    color: text;
    font-weight: 600;
  `,
  Discriminator: styled.span`
    margin-left: 1px;
    color: text_fade;
  `,
  EmojiContainer: styled.divBox`
    & .emoji {
      width: 24px;
      height: auto;
      margin: 0 0.05em 0 0.1em;
      position: relative;
      top: -1px;
    }
  `,
};

// ? =========
// ? Selection
// ? =========

// Use a ref here to allow for external mutability to the internal all rows
// selected state (allowing for custom values)
export const SelectionHeader: (
  allRowsSelectedRef: MutableRefObject<boolean>
) => React.FC<HeaderRendererProps<TransformedAutoResponse, {}>> = (
  allRowsSelectedRef
) => {
  const renderer: React.FC<HeaderRendererProps<
    TransformedAutoResponse,
    {}
  >> = ({ onAllRowsSelectionChange }) => (
    <SelectCellFormatter
      value={allRowsSelectedRef.current}
      onChange={onAllRowsSelectionChange}
    />
  );
  return renderer;
};

export const SelectionFormatter: (
  selfAuthor: User,
  canDeleteAny: boolean
) => React.FC<FormatterProps<TransformedAutoResponse, {}>> = (
  selfAuthor,
  canDeleteAny
) => ({
  row,
  isRowSelected,
  onRowSelectionChange,
}): React.ReactElement | null => {
  if (
    canDeleteAny ||
    (row.authorId.isDefined() && selfAuthor.id === row.authorId.get)
  ) {
    return (
      <SelectCellFormatter
        value={isRowSelected}
        onChange={onRowSelectionChange}
      />
    );
  }
  return null;
};

// ? =========================
// ? Context menu row renderer
// ? =========================

export const RowRenderer: (
  selfAuthor: User,
  canDeleteAny: boolean
) => React.FC<RowRendererProps<TransformedAutoResponse, {}>> = (
  selfAuthor,
  canDeleteAny
) => (props): React.ReactElement | null => (
  <ContextMenuTrigger
    id="auto-response-grid-context-menu"
    collect={(): { rowIdx: number; canDelete: boolean } => ({
      rowIdx: props.rowIdx,
      canDelete:
        canDeleteAny ||
        (props.row.authorId.isDefined() &&
          selfAuthor.id === props.row.authorId.get),
    })}
  >
    <GridRow {...props} />
  </ContextMenuTrigger>
);

// ? =============
// ? Row renderers
// ? =============

type TriggerRendererProps = { content: string };
const transformTrigger = makeTransformer([escapeHtml, convertUnicodeEmoji]);

/**
 * Renders a trigger by replacing all inline Discord syntax elements with their rendered
 * counterparts
 * TODO only works for twemoji unicode characters seen inline
 */
const TriggerRenderer: React.FC<TriggerRendererProps> = ({ content }) => (
  <Styled.EmojiContainer
    dangerouslySetInnerHTML={{
      __html: useMemo(() => transformTrigger(content), [content]),
    }}
  />
);

type RegexRendererProps = { content: string };
const transformRegex = makeTransformer([escapeHtml, convertUnicodeEmoji]);

/**
 * Renders a regular expression syntax highlighted value (used for regex mode triggers)
 * TODO doesn't work at the moment
 */
const RegexRenderer: React.FC<RegexRendererProps> = ({ content }) => (
  <Styled.EmojiContainer
    fontFamily="code"
    dangerouslySetInnerHTML={{
      __html: useMemo(() => transformRegex(content), [content]),
    }}
  />
);

type ResponseRendererProps = { content: string };
const transformResponse = makeTransformer([escapeHtml, convertUnicodeEmoji]);

/**
 * Renders a response by replacing all inline Discord syntax elements with their rendered
 * counterparts
 * TODO doesn't work at the moment
 */
const ResponseRenderer: React.FC<ResponseRendererProps> = ({ content }) => (
  <Styled.EmojiContainer
    dangerouslySetInnerHTML={{
      __html: useMemo(() => transformResponse(content), [content]),
    }}
  />
);

// ? ==============
// ? Row formatters
// ? ==============

/**
 * Formats trigger column values, including a delayed tooltip to show all of the message
 * in case it's partially hidden
 */
export const TriggerFormatter: React.FC<FormatterProps<
  TransformedAutoResponse,
  {}
>> = ({ row }) => {
  const content =
    row.mode === AutoResponseTriggerMode.Regex ? (
      <RegexRenderer content={row.trigger} />
    ) : (
      <TriggerRenderer content={row.trigger} />
    );

  return (
    <Tooltip
      id={`trigger-tooltip-${row.id}`}
      boxProps={{ textAlign: "left" }}
      delay={{ show: 500, hide: 0 }}
      placement="bottom-start"
      maxWidth="peta"
      text={content}
    >
      <div>{content}</div>
    </Tooltip>
  );
};

/**
 * Formats response column values, including a delayed tooltip to show all of the message
 * in case it's partially hidden
 */
export const ResponseFormatter: React.FC<FormatterProps<
  TransformedAutoResponse,
  {}
>> = ({ row }) => {
  const content = <ResponseRenderer content={row.response} />;
  return (
    <Tooltip
      id={`response-tooltip-${row.id}`}
      boxProps={{ textAlign: "left" }}
      delay={{ show: 500, hide: 0 }}
      placement="bottom-start"
      maxWidth="peta"
      text={content}
    >
      <div>{content}</div>
    </Tooltip>
  );
};

/**
 * Formats author column values, showing the user display in a compact manner
 */
export const AuthorFormatter: React.FC<FormatterProps<
  TransformedAutoResponse,
  {}
>> = ({ row }) => (
  <Box display="flex" alignItems="center" height="100%">
    <UserDisplay.Avatar avatarUrl={row.authorData.avatarUrl} circle size={28} />
    <Styled.Name className="name">{row.authorData.username}</Styled.Name>
    {isEmptyOrNil(row.authorData.discriminator) ? null : (
      <Styled.Discriminator>{`#${row.authorData.discriminator}`}</Styled.Discriminator>
    )}
  </Box>
);

/**
 * Formats count column values
 */
export const CountFormatter: React.FC<FormatterProps<
  TransformedAutoResponse,
  {}
>> = ({ row }) => <Box textAlign="right">{row.count.toLocaleString()}</Box>;
