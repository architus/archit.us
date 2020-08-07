import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  createImmutableStateInvariantMiddleware,
  isPlain,
} from "@reduxjs/toolkit";
import { batchDispatchMiddleware } from "redux-batched-actions";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./slices/index";
import RestMiddleware from "@app/store/api/rest/middleware";
import saga from "@app/store/saga";
import { isHot } from "@app/utility/types";
import { Option } from "@architus/lib/option";

export * from "@app/store/hooks";

const SagaMiddleware = createSagaMiddleware();

const middleware = [RestMiddleware, SagaMiddleware, batchDispatchMiddleware];

// Add debug middleware
if (process.env.NODE_ENV === "development") {
  middleware.push(createImmutableStateInvariantMiddleware());

  // Augment middleware to consider Options serializable
  const isSerializable = (value: unknown): boolean =>
    value instanceof Option || isPlain(value);

  const getEntries = (value: unknown): Array<[string, unknown]> =>
    value instanceof Option
      ? Object.entries({ inner: value.orNull() })
      : Object.entries(value as {});

  middleware.push(
    createSerializableStateInvariantMiddleware({
      isSerializable,
      getEntries,
    })
  );
}

const store = configureStore({
  reducer: rootReducer,
  middleware,
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
