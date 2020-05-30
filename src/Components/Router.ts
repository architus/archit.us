import React from "react";
import {
  LinkProps as RouterLinkProps,
  RouteComponentProps,
} from "@reach/router";

// Convenience export from reach/router (used for abstraction)
export { Link, Router, Redirect } from "@reach/router";
export type LinkProps = React.PropsWithoutRef<RouterLinkProps<unknown>>;
export type PageProps = RouteComponentProps;
