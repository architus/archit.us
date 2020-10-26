import { styled } from "linaria/react";
import React, { MutableRefObject, useMemo } from "react";
import {
  FormatterProps,
  HeaderRendererProps,
  SelectCellFormatter,
  RowRendererProps,
  Row as GridRow,
} from "react-data-grid";

import { TransformedAutoResponse } from "./types";
import Menu from "@app/components/Menu";
import UserDisplay from "@app/components/UserDisplay";
import {
  isEmptyOrNil,
  makeTransformer,
  escapeHtml,
  convertUnicodeEmoji,
} from "@app/utility";
import { User, AutoResponseTriggerMode } from "@app/utility/types";
import Tooltip from "@architus/facade/components/Tooltip";
import { color } from "@architus/facade/theme/color";
import { gap } from "@architus/facade/theme/spacing";
import { font } from "@architus/facade/theme/typography";

const EmojiContainer = styled.div`
  & .emoji {
    width: 24px;
    height: auto;
    margin: 0 0.05em 0 0.1em;
    position: relative;
    top: -1px;
    vertical-align: middle;
  }
`;

const Styled = {
  Name: styled.span`
    margin-left: ${gap.femto};
    color: text;
    font-weight: 600;
  `,
  Discriminator: styled.span`
    margin-left: 1px;
    color: ${color("textFade")};
  `,
  EmojiContainer,
  RegexEmojiContainer: styled(EmojiContainer)`
    font-family: ${font("monospace")};
  `,
  AuthorWrapper: styled.div`
    display: flex;
    align-items: center;
    height: 100%;
  `,
  Count: styled.span`
    display: block;
    text-align: right;
  `,
  TooltipContent: styled.div`
    text-align: left;
  `,
  Avatar: styled(UserDisplay.Avatar)`
    flex-shrink: 0;
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
  <Menu.Trigger
    source={(): { rowIdx: number; canDelete: boolean } => ({
      rowIdx: props.rowIdx,
      canDelete:
        canDeleteAny ||
        (props.row.authorId.isDefined() &&
          selfAuthor.id === props.row.authorId.get),
    })}
  >
    <GridRow {...props} />
  </Menu.Trigger>
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
  <Styled.RegexEmojiContainer
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
      delayHide={0}
      delayShow={500}
      placement="bottom-start"
      maxWidth="peta"
      tooltip={<Styled.TooltipContent>{content}</Styled.TooltipContent>}
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
      delayHide={0}
      delayShow={500}
      placement="bottom-start"
      maxWidth="peta"
      tooltip={<Styled.TooltipContent>{content}</Styled.TooltipContent>}
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
  <Styled.AuthorWrapper>
    <Styled.Avatar avatarUrl={row.authorData.avatarUrl} circle size={28} />
    <Styled.Name>{row.authorData.username}</Styled.Name>
    {isEmptyOrNil(row.authorData.discriminator) ? null : (
      <Styled.Discriminator>{`#${row.authorData.discriminator}`}</Styled.Discriminator>
    )}
  </Styled.AuthorWrapper>
);

/**
 * Formats count column values
 */
export const CountFormatter: React.FC<FormatterProps<
  TransformedAutoResponse,
  {}
>> = ({ row }) => <Styled.Count>{row.count.toLocaleString()}</Styled.Count>;
