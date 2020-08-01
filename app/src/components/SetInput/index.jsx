import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { FaPlus, FaTimesCircle } from "react-icons/fa";

import { Button } from "@app/react-bootstrap";

import "./style.scss";

function SetInput({ items, addItem, removeItem, renderItem, children }) {
  return (
    <div className="set-input">
      <div className="set-input--items-pane">
        {items.map((item, i) => (
          <SetInputItem key={i} index={i} onRemove={removeItem}>
            {renderItem(item)}
          </SetInputItem>
        ))}
      </div>
      <div className="set-input--input">
        {children}
        <Button
          variant="input-control"
          className="set-input--add"
          onClick={addItem}
          onMouseDown={(e) => {
            if (e) {
              e.preventDefault();
            }
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
              addItem();
            }
          }}
        >
          <FaPlus />
        </Button>
      </div>
    </div>
  );
}

export default SetInput;

SetInput.propTypes = {
  items: PropTypes.array,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
  renderItem: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

SetInput.defaultProps = {
  items: [],
  addItem() {},
  removeItem() {},
  renderItem: (item) => <div>{String(item)}</div>,
};

SetInput.displayName = "SetInput";

// ? ==============
// ? Sub-components
// ? ==============

function SetInputItem({ index, onRemove, children }) {
  return (
    <button
      className="set-input--item"
      onClick={useCallback(() => onRemove(index), [index, onRemove])}
    >
      {children}
      <div className="set-input--remove">
        <FaTimesCircle />
      </div>
    </button>
  );
}

SetInputItem.propTypes = {
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
