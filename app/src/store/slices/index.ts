import { combineReducers } from "@reduxjs/toolkit";

import Gateway from "@app/store/slices/gateway";
import GuildCount from "@app/store/slices/guildCount";
import Interpret from "@app/store/slices/interpret";
import Loading from "@app/store/slices/loading";
import Notifications from "@app/store/slices/notifications";
import Pools from "@app/store/slices/pools";
import Session from "@app/store/slices/session";

const rootReducer = combineReducers({
  session: Session,
  guildCount: GuildCount,
  notifications: Notifications,
  loading: Loading,
  interpret: Interpret,
  gateway: Gateway,
  pools: Pools,
});

export default rootReducer;
