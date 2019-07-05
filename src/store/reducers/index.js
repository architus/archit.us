import { combineReducers } from "redux";
import * as session from "./session";
import * as loading from "./loading";
import * as socket from "./socket";
import * as interpret from "./interpret";
import * as guilds from "./guilds";

export const initialState = {
  session: session.initial,
  loading: loading.initial,
  socket: socket.initial,
  interpret: interpret.initial,
  guilds: guilds.initial
};

export const store = combineReducers({
  session: session.reducer,
  loading: loading.reducer,
  socket: socket.reducer,
  interpret: interpret.reducer,
  guilds: guilds.reducer
});
