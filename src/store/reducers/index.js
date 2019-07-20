import { combineReducers } from "redux";
import * as session from "./session";
import * as loading from "./loading";
import * as socket from "./socket";
import * as interpret from "./interpret";
import * as guilds from "./guilds";
import * as responses from "./responses";
import * as logs from "./logs";

const reducers = { session, loading, socket, interpret, guilds, responses, logs };

export const initialState = Object.assign(
  {},
  ...Object.keys(reducers).map(r => ({ [r]: reducers[r].initial }))
);

export const store = combineReducers(
  Object.assign(
    {},
    ...Object.keys(reducers).map(r => ({ [r]: reducers[r].reducer }))
  )
);
