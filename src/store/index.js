import { createStore, applyMiddleware, compose } from "redux";
import { store as reducer, initialState } from "store/reducers";
import { tryLoadSession } from "store/reducers/session";
import createSagaMiddleware from "redux-saga";
import reduxWebsocket from "@giantmachines/redux-websocket";
import { batchDispatchMiddleware } from "redux-batched-actions";

import saga from "store/saga";
import ApiMiddleware from "store/api";

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
    applyMiddleware(
      ApiMiddleware,
      SagaMiddleware,
      WebsocketMiddleware,
      batchDispatchMiddleware
    )
  )
);
export default store;

SagaMiddleware.run(saga);
