import React from "react";
import PropTypes from "prop-types";

export default { title: "Docs|Design" };

function Color({ weight, className, primary, style }) {
  return (
    <div style={{ width: "80px" }}>
      <div
        style={{
          width: "100%",
          height: "80px",
          marginBottom: "8px",
          borderRadius: primary ? "100rem" : "0",
          ...style
        }}
        className={className}
      />
      <pre className="theme-fg">
        <code>{weight}</code>
      </pre>
    </div>
  );
}

Color.propTypes = {
  weight: PropTypes.number,
  className: PropTypes.string,
  primary: PropTypes.bool,
  style: PropTypes.object
};

function ColorsDisplay({ name, weights, primary, primaryStyle }) {
  return (
    <div className="d-flex">
      {weights.map(weight => (
        <Color
          key={weight}
          weight={weight}
          className={`${name}-${weight}`}
          primary={primary === weight}
          style={primary === weight ? primaryStyle : undefined}
        />
      ))}
    </div>
  );
}

ColorsDisplay.propTypes = {
  name: PropTypes.string,
  weights: PropTypes.arrayOf(PropTypes.number),
  primary: PropTypes.bool,
  primaryStyle: PropTypes.object
};

export const Colors = () => (
  <div style={{ padding: "1.5rem" }}>
    <h1>Colors</h1>
    <h3>Dark Theme</h3>
    <ColorsDisplay
      weights={["000", "100", "200", "300", "400", "500"]}
      name="bg-dark"
      primary="300"
      primaryStyle={{ border: "1px solid rgba(210, 210, 210, 0.2)" }}
    />
    <hr />
    <h3>Light Theme</h3>
    <ColorsDisplay
      weights={["000", "100", "200", "300", "400", "500"]}
      name="bg-light"
      primary="400"
      primaryStyle={{ border: "1px solid rgba(40, 40, 40, 0.2)" }}
    />
  </div>
);
