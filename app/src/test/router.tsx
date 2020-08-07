import {
  History,
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import React from "react";

export type HistoryWrapperProps = { children?: React.ReactNode };
export type GetHistoryWrapper = {
  HistoryWrapper: React.FC<HistoryWrapperProps>;
  history: History;
};

export function getHistoryWrapper({
  route = "/",
  history = createHistory(createMemorySource(route)),
} = {}): GetHistoryWrapper {
  return {
    HistoryWrapper: ({ children }): JSX.Element => (
      <LocationProvider history={history}>{children}</LocationProvider>
    ),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}
