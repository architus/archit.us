import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { store as reducer, initialState } from "./store/reducers";
import { getUrlParameter } from "./util";

import App from "./App";
import { Provider } from "react-redux";

import "./scss/main.scss";

const authToken = tryLoadAuthToken();
const initialStoreState =
  authToken !== null
    ? Object.assign({}, initialState, { authToken })
    : initialState;
const store = createStore(reducer, initialStoreState);
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

function tryLoadAuthToken() {
  // Load auth token:
  let authToken = null;
  // 1. from URL param
  const urlCode = getUrlParameter("code");
  if (urlCode !== "") {
    authToken = urlCode;
    window.localStorage.setItem("authToken", urlCode);
    window.history.replaceState(
      {},
      window.document.title,
      `${window.location.protocol}//${window.location.host}${window.location.pathname}`
    );
  }
  // 2. from local storage
  else {
    const fromStorage = window.localStorage.getItem("authToken");
    if (fromStorage !== null) {
      authToken = fromStorage;
    }
  }
  return authToken;
}
