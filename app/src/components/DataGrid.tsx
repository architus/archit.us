import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";
import ReactDataGrid, { DataGridProps } from "react-data-grid";
import AutoSizer from "react-virtualized-auto-sizer";

import { color, dynamicColor, ColorMode } from "@architus/facade/theme/color";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Wrapper: styled(AutoSizer)`
    .rdg-cell {
      display: inline-block;
      position: absolute;
      height: inherit;
      padding: 0 8px;
      background-color: inherit;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .rdg-cell-frozen {
      position: -webkit-sticky;
      position: sticky;
      z-index: 1;

      &::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 1px;
        top: 0;
        left: -6px;
        z-index: -1;
        box-shadow: 0px 0px 7px 8px ${color("shadowHeavy")};
      }
    }

    .rdg-cell-frozen-last + .rdg-cell {
      padding-left: ${gap.pico};
    }

    .rdg-cell-mask {
      display: none;
    }

    .rdg-checkbox-label {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .rdg-checkbox-label-disabled {
      cursor: default;
    }

    .rdg-checkbox-label-disabled .rdg-checkbox {
      border-color: ${color("contrastBorder")};
      background-color: ${color("bg")};
    }

    .rdg-checkbox-input {
      all: unset;
      width: 0;
      margin: 0;
    }

    .rdg-checkbox {
      content: "";
      width: 20px;
      height: 20px;
      border: 2px solid ${color("border")};
      background-color: ${color("bg+20")};
      margin-top: 7px;
      margin-left: 7px;
    }

    .rdg-checkbox-input:checked + .rdg-checkbox {
      background-color: primary;
      box-shadow: inset 0 0 0 3px ${color("bg+10")};
    }

    .rdg-checkbox-input:focus + .rdg-checkbox {
      border-color: ${color("secondary")};
      border-width: 3px;
    }

    .rdg {
      position: relative;
      z-index: 0;
      box-sizing: border-box;
      overflow-x: auto;
      overflow-y: scroll;
      -webkit-user-select: none;
      user-select: none;
      background-color: ${color("bg")};
      font-size: 14px;
    }

    .rdg *,
    .rdg ::after,
    .rdg ::before {
      box-sizing: inherit;
    }

    .rdg-editor-container {
      position: absolute;
    }

    .rdg-select-editor,
    .rdg-text-editor {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      box-sizing: border-box;
      width: calc(100% + 1px);
      height: calc(100% + 1px);
      padding: 1px 7px 0;
      margin: -1px 0 0 -1px;
      border: 2px solid #ccc;
      background-color: #fff;
      font-size: 14px;
      line-height: 1.2;
    }

    .rdg-select-editor::placeholder,
    .rdg-text-editor::placeholder {
      color: #999;
      opacity: 1;
    }

    .rdg-select-editor:focus,
    .rdg-text-editor:focus {
      border-color: #66afe9;
    }

    .rdg-filter-row,
    .rdg-header-row {
      width: var(--row-width);
      position: -webkit-sticky;
      position: sticky;
      background-color: ${color("bg+10")};
      font-weight: 700;
      -webkit-user-select: none;
      user-select: none;
      z-index: 3;
      box-shadow: 1;
    }

    .rdg-header-row {
      height: var(--header-row-height);
      line-height: var(--header-row-height);
      top: 0;
    }

    .rdg-filter-container {
      display: flex;
      flex-direction: row;
      align-items: stretch;

      input {
        flex-grow: 1;
        outline: none;
        padding: 6px 6px 6px 10px;
        border: 1px solid;
        border-radius: 8px;
        transition: box-shadow 0.25s ease;
        box-shadow: none;
        background-color: ${color("bg+10")};
        color: text;
        border-color: ${color("contrastBorder")};
        width: 100%;

        &::placeholder {
          color: ${color("textFade")};
        }

        &:focus {
          border-color: ${color("inputFocusBorder")};
          box-shadow: 0 0 0 0.2rem
            ${transparentize(0.7, dynamicColor("primary", ColorMode.Dark))};
        }
      }
    }

    .rdg-filter-row {
      height: var(--filter-row-height);
      top: var(--header-row-height);

      .rdg-cell {
        overflow: visible;
      }
    }

    .rdg-header-cell-resizer {
      cursor: col-resize;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 10px;
    }

    .rdg-cell .Select {
      max-height: 30px;
      font-size: 12px;
      font-weight: 400;
    }

    .rdg-header-sort-cell {
      cursor: pointer;
      display: flex;

      & > span:nth-of-type(2) {
        opacity: 0.5;
        margin-right: ${gap.atto};
      }

      &::after {
        --sort-header-indicator-height: 3px;
        width: 100%;
        top: 0;
        height: var(--sort-header-indicator-height);
        content: "";
        position: absolute;
        background-color: ${color("primary")};
        left: 0;
        transform: translateY(calc(var(--sort-header-indicator-height) * -1));
        border-bottom-left-radius: 1000em;
        border-bottom-right-radius: 1000em;
        transition: 0.1s linear transform;
      }

      &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
      }

      &:hover {
        &::before {
          background-color: ${color("contrastOverlay")};
        }

        &::after {
          top: 0;
          transform: none;
        }
      }
    }

    .rdg-header-sort-name {
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .rdg-selected {
      border: 2px solid #66afe9;
    }

    .rdg-selected .drag-handle {
      pointer-events: auto;
      position: absolute;
      bottom: -5px;
      right: -4px;
      background: #66afe9;
      width: 8px;
      height: 8px;
      border: 1px solid #fff;
      border-right: 0;
      border-bottom: 0;
      cursor: crosshair;
      cursor: -moz-grab;
      cursor: -webkit-grab;
      cursor: grab;
    }

    .rdg-selected:hover .drag-handle {
      bottom: -8px;
      right: -7px;
      background: #fff;
      width: 16px;
      height: 16px;
      border: 1px solid #66afe9;
    }

    .react-grid-cell-dragged-over-down,
    .react-grid-cell-dragged-over-up {
      border: 1px dashed #000;
      background: rgba(0, 0, 255, 0.2) !important;
    }

    .react-grid-cell-dragged-over-up {
      border-bottom-width: 0;
    }

    .react-grid-cell-dragged-over-down {
      border-top-width: 0;
    }

    .rdg-cell-copied {
      background: rgba(0, 0, 255, 0.2) !important;
    }

    .rdg-row {
      width: var(--row-width);
      height: var(--row-height);
      line-height: var(--row-height);

      &:hover {
        background: ${transparentize(
          0.925,
          dynamicColor("primary", ColorMode.Dark)
        )};
      }

      &.rdg-row-even {
        & .rdg-cell {
          background-color: contrast_overlay;
        }
      }

      &.rdg-row-selected {
        & .rdg-cell {
          background-color: ${transparentize(
            0.75,
            dynamicColor("primary", ColorMode.Dark)
          )} !important;
        }
      }
    }

    .rdg-summary-row {
      position: -webkit-sticky;
      position: sticky;
      z-index: 3;
    }

    .rdg-summary-row > .rdg-cell {
      border-top: 2px solid #aaa;
    }
  `,
};

export type { DataGridProps };

/**
 * Renders styled data grid component, as a wrapper for `react-data-grid`,
 * including an auto-sizer component
 */
function DataGrid<R, K extends keyof R, SR = unknown>(
  props: DataGridProps<R, K, SR>
): JSX.Element {
  return (
    <Styled.Wrapper>
      {({
        height,
        width,
      }: {
        height: number;
        width: number;
      }): React.ReactNode => (
        <>
          <ReactDataGrid<R, K, SR> height={height} width={width} {...props} />
        </>
      )}
    </Styled.Wrapper>
  );
}

export default DataGrid;
