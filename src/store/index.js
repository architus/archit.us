import { createStore, applyMiddleware } from "redux";
import { store as reducer, initialState } from "./reducers";
import { tryLoadSession } from "./reducers/session";
import createSagaMiddleware from "redux-saga";

import saga from "./saga";
import ApiMiddleware from "./api";

const SagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  { ...initialState, session: tryLoadSession() },
  applyMiddleware(ApiMiddleware, SagaMiddleware)
);
// TODO remove
window.store = store;
export default store;

SagaMiddleware.run(saga);
