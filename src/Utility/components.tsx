import React from "react";
import { isRemote } from "./document";

/**
 * Higher order component that wraps a component and returns it if and only if the
 * current execution context is the browser.
 * @param component - The React component to wrap
 */
export function withClientSide<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  const WithClientSide: React.FunctionComponent<P> = (props: P) => {
    return isRemote ? null : <Component {...props} />;
  };
  return WithClientSide;
}
