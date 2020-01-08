import { combineReducers } from "@reduxjs/toolkit";

import Session from "Store/slices/session";
import GuildCount from "Store/slices/guildCount";
import Interpret from "Store/slices/interpret";
import Loading from "Store/slices/loading";
import Notifications from "Store/slices/notifications";
import Gateway from "Store/slices/gateway";

const rootReducer = combineReducers({
  session: Session,
  guildCount: GuildCount,
  notifications: Notifications,
  loading: Loading,
  interpret: Interpret,
  gateway: Gateway
});

export default rootReducer;
