import { createAction } from "@reduxjs/toolkit";

import { TabPath } from "./tabs";
import { Snowflake } from "@app/utility/types";

export const focusGuild = createAction<Snowflake>("app/focusGuild");
export const showGuildAddModal = createAction("app/showGuildAddModal");
export const hideGuildAddModal = createAction("app/hideGuildAddModal");
export const focusTab = createAction<TabPath>("app/focusTab");
