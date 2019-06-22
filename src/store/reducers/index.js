import { combineReducers } from "redux";
import * as session from "./session";
import * as loading from "./loading";

export const initialState = {
  session: session.initial,
  loading: loading.initial
};

export const store = combineReducers({
  session: session.reducer,
  loading: loading.reducer
});
