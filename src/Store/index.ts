import { configureStore } from "@reduxjs/toolkit";
import { isHot } from "Utility/types";
import rootReducer from "./slices/index";

const store = configureStore({
  reducer: rootReducer
});

// Enable hot module reloading for the store
if (process.env.NODE_ENV === "development" && isHot(module)) {
  module.hot.accept("./slices/index", () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require("./slices/index").default;
    store.replaceReducer(newRootReducer);
  });
}

export type Store = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
export default store;
