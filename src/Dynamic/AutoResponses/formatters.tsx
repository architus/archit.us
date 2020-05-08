import React, { MutableRefObject } from "react";
import styled, { Box } from "@xstyled/emotion";
import { ContextMenuTrigger } from "react-contextmenu";
import {
  FormatterProps,
  HeaderRendererProps,
  SelectCellFormatter,
  RowRendererProps,
  Row as GridRow,
} from "react-data-grid";
import { UserDisplay } from "Components";
import { isEmptyOrNil } from "Utility";
import { User } from "Utility/types";
import { TransformedAutoResponse } from "./types";

const Styled = {
  Name: styled.span`
    margin-left: pico;
    color: text;
    font-weight: 600;
  `,
  Discriminator: styled.span`
    margin-left: 1px;
    color: text_fade;
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
  >> = ({ allRowsSelected, onAllRowsSelectionChange }) => (
    <SelectCellFormatter
      value={allRowsSelected || allRowsSelectedRef.current}
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
  if (canDeleteAny || selfAuthor.id === row.authorId) {
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
      canDelete: canDeleteAny || selfAuthor.id === props.row.authorId,
    })}
  >
    <GridRow {...props} />
  </ContextMenuTrigger>
);

// ? ==============
// ? Row formatters
// ? ==============

export const TriggerFormatter: React.FC<FormatterProps<
  TransformedAutoResponse,
  {}
>> = ({ row }) => <>{row.trigger}</>;

export const ResponseFormatter: React.FC<FormatterProps<
  TransformedAutoResponse,
  {}
>> = ({ row }) => <>{row.response}</>;

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

export const CountFormatter: React.FC<FormatterProps<
  TransformedAutoResponse,
  {}
>> = ({ row }) => <Box textAlign="right">{row.count.toLocaleString()}</Box>;
