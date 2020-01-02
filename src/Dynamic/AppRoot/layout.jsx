import React from "react";
import PropTypes from "prop-types";
import useDarkMode from "use-dark-mode";
import classNames from "classnames";
import tinycolor from "tinycolor2";

import Switch from "Components/Switch";
import Icon from "Components/Icon";
import Layout from "Components/Layout";

import "./style.scss";
import { lightColor, primaryColor } from "global.json";

function AppLayout({ children, className, ...rest }) {
  const { value, toggle } = useDarkMode(true);
  return (
    <Layout
      title="Web Dashboard"
      className="app-root"
      noContainer
      noLinks
      sticky={false}
      headerChildren={
        typeof window === "undefined" ? null : (
          <Switch
            onChange={toggle}
            checked={value}
            className="ml-3 ml-md-0 mr-md-3"
            aria-label="Dark mode switch"
            uncheckedIcon={<Icon name="sun" className="switch-icon light" />}
            checkedIcon={<Icon name="moon" className="switch-icon dark" />}
            offHandleColor={lightColor}
            onHandleColor={lightColor}
            offColor={tinycolor(primaryColor)
              .lighten(35)
              .toString()}
            onColor={tinycolor(primaryColor)
              .darken(60)
              .toString()}
            height={28}
            width={56}
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
