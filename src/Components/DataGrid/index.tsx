import React, { Suspense, lazy } from "react";
import classNames from "classnames";
import { withClientSide, error } from "Utility";
import { StyleObject } from "Utility/types";
import { Spinner } from "react-bootstrap";
import ErrorBoundary from "Components/ErrorBoundary";
import "./style.scss";

// Re-export filter
export { default as NumericFilter } from "./NumericFilter";

// Lazy-loading tree contains:
// - DataGrid
// - AddRowModal
// - react-data-grid
// - react-data-grid-addons

// Temporarily located here until DataGrid.js is migrated to TS
type DataGridProps<
  R extends Record<string, unknown>,
  T extends Record<string, unknown> = R,
  K extends keyof T = keyof T
> = {
  data: readonly R[];
  transformRow?: (row: R) => T;
  emptyLabel?: string;
  columns: readonly Column<T>[];
  baseColumnMeta?: Partial<Column<T>>;
  getRowActions?: (row: T) => CellAction[];
  isLoading?: boolean;
  loadingRowCount?: number;
  toolbarComponents?: React.ReactNode;
  viewModeButton?: React.ReactNode;
  singleClickEdit?: boolean;
  dialogTitle?: string;
  columnWidths?: Map<string, (number | null)[]>;
  sortColumn?: K;

  onRowAdd: Function;
  onRowUpdate: Function;
  onRowDelete: Function;
  addRowButton?: Function;
  canDeleteRow: Function;
  onScroll: Function;
};

type CellAction = object;
type Column<D extends Record<string, unknown>> = object;
type DataGridType = React.ComponentType<DataGridProps<Record<string, unknown>>>;

const DataGridLoader = <
  R extends Record<string, unknown>,
  T extends Record<string, unknown> = R,
  K extends keyof T = keyof T
>(
  props: DataGridProps<R, T, K> & { className?: string; style?: StyleObject }
): JSX.Element => {
  const { style, className, ...rest } = props;
  return (
    <div className={classNames("data-grid-outer", className)} style={style}>
      <ErrorBoundary onError={(e: Error): void => error(e)}>
        <Suspense fallback={<LoadingFallback />}>
          <LazyLoadingWrapper
            {...((rest as unknown) as React.ComponentProps<
              typeof LazyLoadingWrapper
            >)}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

DataGridLoader.displayName = "DataGridLoader";

// ? =================
// ? Helper components
// ? =================

// Split bundle
const DataGrid = lazy(
  () =>
    (import("Components/DataGrid/DataGrid") as unknown) as Promise<{
      default: DataGridType;
    }>
);
const lazyLoadingInner: React.FC<DataGridProps<{}>> = p => <DataGrid {...p} />;
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
