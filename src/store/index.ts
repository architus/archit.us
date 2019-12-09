import { createStore, applyMiddleware, compose } from "redux";
import { isClient } from "Utility";
import { reducer, initial } from "Store/slices";
import createSagaMiddleware from "redux-saga";

import RestMiddleware from "Store/api/rest/middleware";
import GatewayMiddleware from "Store/api/gateway/middleware";
import saga from "store/saga";
import { batchDispatchMiddleware } from "redux-batched-actions";

const SagaMiddleware = createSagaMiddleware();

const composeEnhancers = isClient
  ? (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

export default createStore(
  reducer,
  initial,
  composeEnhancers(
    applyMiddleware(
      RestMiddleware,
      GatewayMiddleware,
      SagaMiddleware,
      batchDispatchMiddleware
    )
  )
);

SagaMiddleware.run(saga);
