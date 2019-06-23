import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MessageClump from "../MessageClump";
import { DynamicSizeList as List } from "react-window";

import "./style.scss";

class MessageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listHeight: 100, listWidth: 100 };
  }

  componentDidMount() {
    this.setState({
      listHeight: this.outerRef.clientHeight,
      listWidth: this.outerRef.clientWidth
    });
  }

  render() {
    const { clumps, className, ...rest } = this.props;
    const { listHeight, listWidth } = this.state;

    // eslint-disable-next-line react/prop-types
    const RefForwardedRow = React.forwardRef(({ style, data, index }, ref) => (
      <MessageClump style={style} {...data[index]} forwardedRef={ref} />
    ));

    return (
      <article {...rest} ref={element => (this.outerRef = element)}>
        <List
          itemData={clumps}
          itemCount={clumps.length}
          height={listHeight}
          width={listWidth}
          className={classNames(className, "discord-messages")}
        >
          {RefForwardedRow}
        </List>
      </article>
    );
  }
}
export default MessageView;

MessageView.propTypes = {
  clumps: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
};
