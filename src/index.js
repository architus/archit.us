import React from "react";
import ReactDOM from "react-dom";
import "./scss/main.scss";
import App from "./App";
import { createStore } from "redux";
import reducer from "./store/reducers";
import { Provider } from "react-redux";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
