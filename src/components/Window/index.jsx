import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./style.scss";

function Window({
  children,
  variant,
  className,
  noPadding = false,
  noChrome = false,
  ...rest
}) {
  return (
    <figure
      className={classNames("window", `window-${variant}`, className, {
        "pb-0": noPadding
      })}
      {...rest}
    >
      {!noChrome ? (
        <figcaption className="chrome">
          <span className="chrome--button chrome--close" />
          <span className="chrome--button chrome--minimize" />
          <span className="chrome--button chrome--fullscreen" />
        </figcaption>
      ) : null}
      {children}
    </figure>
  );
}

export default Window;

Window.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  variant: PropTypes.string,
  className: PropTypes.string,
  noPadding: PropTypes.bool,
  noChrome: PropTypes.bool
};
