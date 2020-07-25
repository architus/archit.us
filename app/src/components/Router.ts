import {
  LinkProps as RouterLinkProps,
  RouteComponentProps,
  useLocation,
} from "@reach/router";
import React from "react";

// Convenience export from reach/router (used for abstraction)
export { Link } from "gatsby";
export { Router, Redirect } from "@reach/router";
export type LinkProps = React.PropsWithoutRef<RouterLinkProps<unknown>>;
export type PageProps = RouteComponentProps;
export { useLocation };
