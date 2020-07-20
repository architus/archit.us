import React from "react";

import { isRemote } from "./document";

/**
 * Higher order component that wraps a component and returns it if and only if the
 * current execution context is the browser.
 * @param component - The React component to wrap
 */
export function withClientSide<P = {}>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  const WithClientSide: React.FC<P> = (props: P) => {
    return isRemote ? null : <Component {...props} />;
  };
  return WithClientSide;
}

/**
 * Attaches base children to a parent component to be dot-accessible from
 * @param base - Base component to attach children to
 * @param children - Children components that will be dot-accessible on the parent
 */
export function attach<P, L>(
  base: React.ComponentType<P>,
  children: L
): React.ComponentType<P> & { [k in keyof L]: L[k] } {
  const toAttach = (base as unknown) as L;
  Object.keys(children).forEach((k) => {
    const key = (k as unknown) as keyof L;
    toAttach[key] = children[key];
  });
  return toAttach as React.ComponentType<P> & L;
}
