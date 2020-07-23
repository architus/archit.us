import { describe, it, expect } from "@jest/globals";
import React from "react";
import renderer from "react-test-renderer";

import "@app/test/watch-media";
import NotFoundPage from "./404";
import Root from "@app/components/Root";

describe("<NotFoundPage />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Root>
          <NotFoundPage />
        </Root>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
