import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { store as reducer, initialState } from "./store/reducers";
import { getUrlParameter, clearUrlQueries } from "./util";
import ApiMiddleware from "./store/api";

import App from "./App";
import { Provider } from "react-redux";

import "./scss/main.scss";

const authToken = tryLoadAccessToken();
const initialStoreState =
  authToken !== null
    ? Object.assign({}, initialState, { authToken })
    : initialState;
const store = createStore(
  reducer,
  initialStoreState,
  applyMiddleware(ApiMiddleware)
);
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

function tryLoadAccessToken() {
  // Load access token:
  let accessToken = null;
  // 1. from URL param
  const urlCode = getUrlParameter("code");
  if (urlCode !== "") {
    accessToken = urlCode;
    window.localStorage.setItem("accessToken", urlCode);
    clearUrlQueries();
  }
  // 2. from local storage
  else {
    const fromStorage = window.localStorage.getItem("accessToken");
    if (fromStorage !== null) {
      accessToken = fromStorage;
    }
  }
  return accessToken;
}
