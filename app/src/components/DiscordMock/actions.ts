import { createAction, AnyAction } from "@reduxjs/toolkit";
import React from "react";

import { MockReactionContext } from "@app/utility/types";

export type DiscordMockDispatch = React.Dispatch<AnyAction>;

export const sendMessage = createAction<string>("discordMock/send");
export const sendInvisibleMessage = createAction<string>(
  "discordMock/sendInvisible"
);
export const react = createAction<MockReactionContext>("discordMock/react");
export const unreact = createAction<MockReactionContext>("discordMock/unreact");
export const clearMessages = createAction("discordMock/clear");

export type DiscordMockDispatchContext = { dispatch: DiscordMockDispatch };
export const DiscordMockDispatchContext = React.createContext<
  DiscordMockDispatchContext
>({
  dispatch: () => undefined,
});
