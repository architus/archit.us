import { createStore, applyMiddleware, compose } from "redux";
import { store as reducer, initialState } from "./reducers";
import { tryLoadSession } from "./reducers/session";
import createSagaMiddleware from "redux-saga";
import reduxWebsocket from "@giantmachines/redux-websocket";

import saga from "./saga";
import ApiMiddleware from "./api";

const SagaMiddleware = createSagaMiddleware();
const WebsocketMiddleware = reduxWebsocket();

const composeEnhancers =
  typeof window !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;
const store = createStore(
  reducer,
  { ...initialState, session: tryLoadSession() },
  composeEnhancers(
    applyMiddleware(ApiMiddleware, SagaMiddleware, WebsocketMiddleware)
  )
);
export default store;

SagaMiddleware.run(saga);
