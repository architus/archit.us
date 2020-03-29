import React from "react";
import {
  LinkProps as RouterLinkProps,
  RouteComponentProps
} from "@reach/router";

export { Link, Router, Redirect } from "@reach/router";
export type LinkProps = React.PropsWithoutRef<RouterLinkProps<unknown>>;
export type PageProps = RouteComponentProps;
