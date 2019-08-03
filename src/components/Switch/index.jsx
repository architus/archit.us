import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isDefined } from "utility";

import ReactSwitch from "react-switch";

import { lightColor, primaryColor } from "global.json";
import "./style.scss";

function Switch({ label, className, ...rest }) {
  return (
    <span className={classNames("switch", className)}>
      <ReactSwitch
        className="react-switch"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        offHandleColor={lightColor}
        onHandleColor={lightColor}
        onColor={primaryColor}
        uncheckedIcon={false}
        checkedIcon={false}
        aria-label={label}
        height={24}
        width={48}
        {...rest}
      />
      {isDefined(label) ? <span className="label" children={label} /> : null}
    </span>
  );
}

export default Switch;

Switch.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string
};

Switch.defaultProps = {
  label: null
};
