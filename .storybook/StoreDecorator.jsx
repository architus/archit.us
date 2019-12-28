import React from "react";
import { Provider } from "react-redux";

import store from "Store";

const StoreDecorator = storyFunc => (
  <Provider store={store}>{storyFunc()}</Provider>
);

export default StoreDecorator;
