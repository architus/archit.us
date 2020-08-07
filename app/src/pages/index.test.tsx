import { describe, it, expect } from "@jest/globals";
import React from "react";
import renderer from "react-test-renderer";

import "@app/test/watch-media";
import IndexPage from "./index";
import Root from "@app/components/Root";
import { getHistoryWrapper } from "@app/test/router";

jest.mock("@app/data/bot-stats");
jest.mock("@app/data/build-metadata");
jest.mock("@app/data/path-prefix");
jest.mock("@app/data/seo-data");

describe("<IndexPage />", () => {
  it("renders correctly", () => {
    const { HistoryWrapper } = getHistoryWrapper();
    const tree = renderer
      .create(
        <HistoryWrapper>
          <Root>
            <IndexPage />
          </Root>
        </HistoryWrapper>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
