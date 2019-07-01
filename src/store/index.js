import { createStore, applyMiddleware, compose } from "redux";
import { store as reducer, initialState } from "store/reducers";
import { tryLoadSession } from "store/reducers/session";
import createSagaMiddleware from "redux-saga";
import reduxWebsocket from "@giantmachines/redux-websocket";
// import { createLogger } from "redux-logger";

import saga from "store/saga";
import ApiMiddleware from "store/api";

const SagaMiddleware = createSagaMiddleware();
const WebsocketMiddleware = reduxWebsocket();

// const logger = createLogger({});

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
