import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isInPath, useLocation } from "utility";

import "./style.scss";

function SideNavbar({ tabs, onClickTab }) {
  return (
    <div className="side-navbar">
      {tabs.map(data => (
        <NavbarIcon key={data.path} onClickTab={onClickTab} {...data} />
      ))}
    </div>
  );
}

SideNavbar.propTypes = {
  onClickTab: PropTypes.func,
  tabs: PropTypes.array
};

export default SideNavbar;

function NavbarIcon({ name, path, icon, onClickTab }) {
  const { location } = useLocation();
  const isActive = isInPath({
    path: location.pathname,
    fragment: path,
    position: 2
  });
  return (
    <button
      className={classNames("side-navbar--icon-outer", {
        active: isActive
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

NavbarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClickTab: PropTypes.func.isRequired
};
