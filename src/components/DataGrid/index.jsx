import React, { Suspense, lazy } from "react";
import { clientSide } from "utility";

import { Spinner } from "react-bootstrap";
import ErrorBoundary from "components/ErrorBoundary";

import "./style.scss";

// Re-export filter
export { default as NumericFilter } from "./NumericFilter";

// Lazy-loading tree contains:
// - DataGrid
// - AddRowModal
// - react-data-grid
// - react-data-grid-addons

function DataGridLoader(props) {
  return (
    <div className="data-grid">
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <LazyLoadingWrapper {...props} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default DataGridLoader;

DataGridLoader.displayName = "DataGridLoader";

// ? =================
// ? Helper components
// ? =================

// Split bundle
const DataGrid = lazy(() => import("components/DataGrid/DataGrid"));
const LazyLoadingWrapper = clientSide(props => <DataGrid {...props} />);
LazyLoadingWrapper.displayName = "LazyLoadingWrapper";

function LoadingFallback() {
  return (
    <div
      className="loading"
      children={
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
    />
  );
}

LoadingFallback.displayName = "LoadingFallback";
