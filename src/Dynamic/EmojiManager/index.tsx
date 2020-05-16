import React, { useEffect } from "react";
//import { Container, Badge } from "react-bootstrap";
import { AppPageProps } from "Dynamic/AppRoot/types";
import ReactDataGrid from "react-data-grid";
import styled from "@xstyled/emotion";
import "react-data-grid/dist/react-data-grid.css";
import { useDispatch, useSelector } from "Store";
import { emojis } from "Store/routes";
import { Emoji } from "Utility/types";
import { color } from "Theme/tokens";
import { opacity } from "Theme/getters";
import AutoSizer from "react-virtualized-auto-sizer";




const Styled = {
  PageOuter: styled.div`
  position: relative;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-direction: column;
  height: 100%;
`,

  DataGridWrapper: styled.div`
position: relative;
display: flex;
align-items: stretch;
justify-content: stretch;
flex-grow: 1;
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
    box-shadow: 0px 0px 7px 8px ${color("shadow_heavy")};
  }
}
.rdg-cell-frozen-last + .rdg-cell {
  padding-left: nano;
}
.rdg-row {
  .rdg-cell-frozen {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: b_400;
      z-index: -1;
      opacity: 0.65;
      border-bottom: 1px solid;
      border-bottom-color: border;
    }
  }
  .rdg-cell-frozen-last + .rdg-cell {
    padding-left: nano;
    &::after {
      content: "";
      position: absolute;
      height: 100%;
      width: 1px;
      top: 0;
      left: -2px;
      z-index: -1;
      box-shadow: 0px 0px 10px 1px ${color("shadow_extraheavy")};
    }
  }
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
  border-color: contrast_border;
  background-color: b_300;
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
  background-color: b_600;
  margin-top: 7px;
  margin-left: 3px;
}
.rdg-checkbox-input:checked + .rdg-checkbox {
  background-color: primary;
  box-shadow: inset 0 0 0 3px ${color("b_400")};
}
.rdg-checkbox-input:focus + .rdg-checkbox {
  border-color: secondary;
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
  background-color: b_300;
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
  background-color: b_400;
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
    background-color: b_500;
    color: text;
    border-color: contrast_border;
    width: 100%;
    &::placeholder {
      color: text_fade;
    }
    &:focus {
      border-color: input_focus_border;
      box-shadow: 0 0 0 0.2rem ${opacity("primary", 0.3)};
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
    margin-right: femto;
  }
  &::after {
    --sort-header-indicator-height: 3px;
    width: 100%;
    top: 0;
    height: var(--sort-header-indicator-height);
    content: "";
    position: absolute;
    background-color: primary;
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
      background-color: contrast_overlay;
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
    background-color: ${opacity("primary", 0.075)};
  }
  &.rdg-row-even {
    & .rdg-cell:not(.rdg-cell-frozen) {
      background-color: contrast_overlay;
    }
  }
  &.rdg-row-selected {
    & .rdg-cell {
      background-color: ${opacity("primary", 0.25)} !important;
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
Header: styled.div`
    padding: 6 milli;
    padding-left: 0 milli;
  `,
}

const columns = [
  { key: "id", name: "ID" },
  { key: "name", name: "EMOJI NAME" },
  {
    key: "url",
    name: "IMAGE",
    formatter: ({ row }: { row: Emoji }) => <img src={row.url} width="32" />,
  },
  {
    key: "authorId",
    name: "AUTHOR",
    formatter: ({ row }: { row: Emoji }) => (
      <>{row.authorId.getOrElse(" None ")}</>
    ),
  },
  { key: "loaded ", name: "LOADED", formatter: ({ row }: { row: Emoji }) => <> {loadedYN(row.loaded)}</> },
  { key: "numUses", name: "USES" },
];

function loadedYN(x: boolean) {
  if (x == true) {
    return "Yes"
  }
  else {
    return "false"
  }
}

const EmojiManager: React.FC<AppPageProps> = ({ guild }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emojis({ routeData: guild.id }));
  }, [guild]);

  const emojiList = useSelector((store) => {
    return store.emojis[guild.id];
  });

  return (
    <>
      <Styled.PageOuter>
      <Styled.Header>
          <h2>Emoji Manager</h2>
          <p className="hide-mobile">
            Manage the cached and loaded emojis on the server.
          </p>
        </Styled.Header>
        <Styled.DataGridWrapper>
          <AutoSizer>
            {({
              height,
              width,
            }: {
              height: number;
              width: number;
            }): React.ReactNode => (
                <>
                  <ReactDataGrid columns={columns} rows={emojiList || []} rowKey={"id"}
                    height={height} width={width}
                  />

                </>
              )}
          </AutoSizer>
        </Styled.DataGridWrapper>

      </Styled.PageOuter>

      {/* <ReactDataGrid columns={columns} rows={emojiList || []} rowKey={"id"} /> */}
    </>
  );
};
export default EmojiManager;
