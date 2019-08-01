import React from "react";

import ReactSwitch from "react-switch";

import { lightColor, primaryColor } from "global.json";

function Switch({ ...props }) {
  return (
    <ReactSwitch
      className="react-switch"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      offHandleColor={lightColor}
      onHandleColor={lightColor}
      onColor={primaryColor}
      {...props}
    />
  );
}

export default Switch;
