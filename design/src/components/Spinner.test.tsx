import { describe, it, expect } from "@jest/globals";
import React from "react";
import renderer from "react-test-renderer";

import Spinner from "./Spinner";

describe("<Spinner />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Spinner
          variant="primary"
          size="64px"
          className="additional-class"
          style={{ backgroundColor: "blue" }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
