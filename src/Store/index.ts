import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { isHot } from "Utility/types";
import createSagaMiddleware from "redux-saga";
import { batchDispatchMiddleware } from "redux-batched-actions";

import saga from "Store/saga";
import RestMiddleware from "Store/api/rest/middleware";
import rootReducer from "./slices/index";

const SagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    RestMiddleware,
    SagaMiddleware,
    batchDispatchMiddleware,
    ...getDefaultMiddleware().slice(1) // Remove redux-thunk
  ]
});

// Enable hot module reloading for the store
if (process.env.NODE_ENV === "development" && isHot(module)) {
  module.hot.accept("./slices/index", () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require("./slices/index").default;
    store.replaceReducer(newRootReducer);
  });
}

// Run the saga
SagaMiddleware.run(saga);

export type Store = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
export default store;
