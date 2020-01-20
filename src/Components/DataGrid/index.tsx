import React, { Suspense, lazy } from "react";
import classNames from "classnames";
import { withClientSide, error } from "Utility";
import { StyleObject } from "Utility/types";
import { Spinner } from "react-bootstrap";
import ErrorBoundary from "Components/ErrorBoundary";
import { DataGridProps } from "./DataGrid";
import "./style.scss";

// Re-export filter
export { default as NumericFilter } from "./NumericFilter";

// Lazy-loading tree contains:
// - DataGrid
// - AddRowModal
// - react-data-grid
// - react-data-grid-addons

const DataGridLoader = <
  R extends Record<string, unknown>,
  T extends Record<string, unknown> = R
>(
  props: DataGridProps<R, T> & { className?: string; style?: StyleObject }
): React.ReactNode => (
  <div className={classNames("data-grid", props.className)} style={props.style}>
    <ErrorBoundary onError={(e: Error): void => error(e)}>
      <Suspense fallback={<LoadingFallback />}>
        <LazyLoadingWrapper {...props} />
      </Suspense>
    </ErrorBoundary>
  </div>
);

DataGridLoader.displayName = "DataGridLoader";

// ? =================
// ? Helper components
// ? =================

// Split bundle
/* eslint-disable @typescript-eslint/no-explicit-any */
const DataGrid = lazy(() => import("Components/DataGrid/DataGrid") as any);
const lazyLoadingInner: React.FC<DataGridProps<any>> = p => <DataGrid {...p} />;
/* eslint-enable @typescript-eslint/no-explicit-any */
const LazyLoadingWrapper = withClientSide(lazyLoadingInner);
LazyLoadingWrapper.displayName = "LazyLoadingWrapper";

const LoadingFallback: React.FC = () => (
  <div className="loading">
    <Spinner animation="border" variant="primary" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

LoadingFallback.displayName = "LoadingFallback";

export default DataGridLoader;
