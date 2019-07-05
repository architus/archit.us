import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isInPath } from "utility";

import { Location } from "@reach/router";

import "./style.scss";

function SideNavbar({ tabs, onClickTab }) {
  return (
    <div className="side-navbar">
      {tabs.map(({ name, path, icon }) => (
        <Location
          key={path}
          children={NavbarIcon(name, path, icon, onClickTab)}
        />
      ))}
    </div>
  );
}

SideNavbar.propTypes = {
  onClickTab: PropTypes.func,
  tabs: PropTypes.array
};

export default SideNavbar;

function NavbarIcon(name, path, icon, onClickTab) {
  // eslint-disable-next-line react/prop-types
  return ({ location }) => (
    <button
      className={classNames("side-navbar--icon-outer", {
        active: isInPath({
          // eslint-disable-next-line react/prop-types
          path: location.pathname,
          fragment: path,
          position: 2
        })
      })}
      onClick={() => onClickTab(path)}
    >
      <div
        className="side-navbar--icon"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <p>{name}</p>
    </button>
  );
}
