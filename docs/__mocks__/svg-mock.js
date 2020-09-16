const React = require("react");

module.exports = jest.fn().mockImplementation(
  // these props are invalid for an `a` tag
  (props) =>
    React.createElement(
      "svg",
      {
        ...props,
      },
      "__svg__"
    )
);
