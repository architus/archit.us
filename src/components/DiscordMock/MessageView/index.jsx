import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MessageClump from "../MessageClump";
import { DynamicSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import "./style.scss";

class MessageView extends React.Component {
  constructor(props) {
    super(props);
    this.listView = React.createRef();
  }

  scrollToBottom() {
    const { clumps } = this.props;
    this.listView.current.scrollToItem(clumps.length - 1, "bottom");
  }

  render() {
    const { clumps, className, ...rest } = this.props;
    const itemCount = clumps.length;

    // eslint-disable-next-line react/prop-types
    const RefForwardedRow = React.forwardRef(({ style, data, index }, ref) =>
      index === itemCount ? (
        <MessageClump style={style} forwardedRef={ref} ghost />
      ) : (
        <MessageClump
          style={style}
          {...data[index]}
          forwardedRef={ref}
          first={index === 0}
          last={index === itemCount - 1}
        />
      )
    );

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
              ref={this.listView}
            >
              {RefForwardedRow}
            </List>
          )}
        </AutoSizer>
      </article>
    );
  }
}

export default MessageView;

MessageView.propTypes = {
  clumps: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string
};
