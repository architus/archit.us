import { describe, it, expect } from "@jest/globals";
import React from "react";
import renderer from "react-test-renderer";

import "@app/test/watch-media";
import IndexPage from "./index";
import Root from "@app/components/Root";

jest.mock("@app/data/bot-stats");

describe("<IndexPage />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Root>
          <IndexPage />
        </Root>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
