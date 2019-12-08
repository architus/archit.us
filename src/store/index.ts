import { createStore, applyMiddleware, compose } from "redux";
import { isClient } from "Utility";
import { reducer, initial } from "Store/slices";
import createSagaMiddleware from "redux-saga";

import saga from "store/saga";
import ApiMiddleware from "Store/api/rest/middleware";
import { batchDispatchMiddleware } from "redux-batched-actions";
import reduxWebsocket from "@giantmachines/redux-websocket";

const SagaMiddleware = createSagaMiddleware();
const WebsocketMiddleware = reduxWebsocket();

const composeEnhancers = isClient
  ? (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

export default createStore(
  reducer,
  initial,
  composeEnhancers(
    applyMiddleware(
      ApiMiddleware,
      SagaMiddleware,
      WebsocketMiddleware,
      batchDispatchMiddleware
    )
  )
);

SagaMiddleware.run(saga);
