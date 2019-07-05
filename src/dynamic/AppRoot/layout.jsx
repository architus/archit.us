import React from "react";
import PropTypes from "prop-types";
import { colorBlend } from "utility";
import useDarkMode from "use-dark-mode";
import classNames from "classnames";

import Switch from "react-switch";
import Icon from "components/Icon";
import Layout from "components/Layout";

import "./style.scss";
import { lightColor, primaryColor } from "global.json";

function AppLayout({ children, className, ...rest }) {
  const { value, toggle } = useDarkMode(true);
  return (
    <Layout
      title="Web Dashboard"
      className="app-root"
      headerChildren={
        typeof window === "undefined" ? null : (
          <Switch
            onChange={toggle}
            checked={value}
            className="ml-3 ml-md-0 mr-md-3"
            aria-label="Dark mode switch"
            uncheckedIcon={<Icon name="sun" className="dark-mode-icon light" />}
            checkedIcon={<Icon name="moon" className="dark-mode-icon dark" />}
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            offHandleColor={lightColor}
            onHandleColor={lightColor}
            offColor={colorBlend(0.35, primaryColor)}
            onColor={colorBlend(-0.6, primaryColor)}
          />
        )
      }
    >
      <div className={classNames(className, "content-container")} {...rest}>
        {children}
      </div>
    </Layout>
  );
}

export default AppLayout;

AppLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  className: PropTypes.string
};
