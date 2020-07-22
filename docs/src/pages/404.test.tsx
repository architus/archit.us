import { jest, describe, it, expect } from "@jest/globals";
import React from "react";
import renderer from "react-test-renderer";

import "@app/test/watch-media";
import NotFoundPage from "./404";

jest.mock("@docs/data/build-metadata");
jest.mock("@docs/data/navigation-tree");
jest.mock("@docs/data/seo-data");
jest.mock("@docs/data/site-title");
jest.mock("@docs/data/socials");
jest.mock("@docs/data/path-prefix");
jest.mock("@docs/data/footer-data");

describe("<404 />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<NotFoundPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
