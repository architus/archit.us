import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MessageClump from "../MessageClump";
import { DynamicSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import "./style.scss";

function MessageView({ clumps, className, ...rest }) {
  const itemCount = clumps.length;

  // eslint-disable-next-line react/prop-types
  const RefForwardedRow = React.forwardRef(({ style, data, index }, ref) => (
    <MessageClump
      style={style}
      {...data[index]}
      forwardedRef={ref}
      last={index === itemCount - 1}
      first={index === 0}
    />
  ));

  return (
    <article {...rest}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            itemData={clumps}
            itemCount={itemCount}
            className={classNames(className, "discord-messages")}
            height={height}
            width={width}
          >
            {RefForwardedRow}
          </List>
        )}
      </AutoSizer>
    </article>
  );
}

export default MessageView;

MessageView.propTypes = {
  clumps: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string
};
