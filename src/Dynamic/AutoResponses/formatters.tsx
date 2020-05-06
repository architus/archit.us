import React from "react";
import styled, { Box } from "@xstyled/emotion";
import { FormatterProps } from "react-data-grid";
import { UserDisplay } from "Components";
import { isEmptyOrNil } from "Utility";
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
