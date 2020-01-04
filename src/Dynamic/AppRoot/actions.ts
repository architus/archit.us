import { Snowflake } from "Utility/types";
import { createAction } from "@reduxjs/toolkit";
import { TabPath } from "./tabs";

export const focusGuild = createAction<Snowflake>("app/focusGuild");
export const showGuildAddModal = createAction("app/showGuildAddModal");
export const hideGuildAddModal = createAction("app/hideGuildAddModal");
export const focusTab = createAction<TabPath>("app/focusTab");
