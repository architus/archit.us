import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isInPath, useLocation, useInitialRender } from "utility";

import Tooltip from "components/Tooltip";

import "./style.scss";

function SideNavbar({ tabs, onClickTab }) {
  // Ensure that the initial render after hydration renders the same until
  // after the first render
  const initialRender = useInitialRender();
  const { location } = useLocation();
  const activeTab = initialRender
    ? -1
    : tabs.findIndex(({ path }) =>
        isInPath({
          path: location.pathname,
          fragment: path,
          position: 2
        })
      );
  return (
    <div className="side-navbar">
      {tabs.map((data, i) => (
        <NavbarIcon
          key={data.path}
          onClickTab={onClickTab}
          {...data}
          isActive={i === activeTab}
        />
      ))}
    </div>
  );
}

export default SideNavbar;

SideNavbar.propTypes = {
  onClickTab: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.string
    })
  )
};

SideNavbar.defaultProps = {
  onClickTab() {},
  tabs: []
};

// ? ==============
// ? Sub-components
// ? ==============

function NavbarIcon({ name, path, icon, onClickTab, isActive }) {
  return (
    <Outer name={name} isActive={isActive}>
      <button
        className={classNames("side-navbar--button", { active: isActive })}
        onClick={() => onClickTab(path)}
      >
        <span className="side-navbar--top-corner" />
        <div
          className="side-navbar--icon"
          dangerouslySetInnerHTML={{ __html: icon }}
        />
        <p>{name}</p>
        <span className="side-navbar--bottom-corner" />
      </button>
    </Outer>
  );
}

NavbarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClickTab: PropTypes.func.isRequired,
  isActive: PropTypes.bool
};

NavbarIcon.defaultProps = {
  isActive: false
};

function Outer({ children, isActive, name }) {
  return <Tooltip children={children} text={name} hide={isActive} />;
}

Outer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  isActive: PropTypes.bool,
  name: PropTypes.string
};
