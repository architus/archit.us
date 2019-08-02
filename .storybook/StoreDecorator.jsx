import React from "react";
import { Provider } from "react-redux";

import store from "store";

const StoreDecorator = storyFunc => (
  <Provider store={store}>{storyFunc()}</Provider>
);

export default StoreDecorator;
