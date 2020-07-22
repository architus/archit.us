import { describe, it, expect } from "@jest/globals";
import React from "react";
import renderer from "react-test-renderer";

import "@app/test/watch-media";
import Homepage from "./index";

describe("<Homepage />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Homepage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
