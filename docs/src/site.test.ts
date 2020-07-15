import { describe, it, expect } from "@jest/globals";

import { withPathPrefix, normalizePath, locationMatches } from "./site";

describe("withPathPrefix", () => {
  it("should leave the path unchanged when the path prefix is nil", () => {
    expect(withPathPrefix(null, "/path")).toEqual("/path");
    expect(withPathPrefix(null, "path")).toEqual("path");
    expect(withPathPrefix(null, "/path/")).toEqual("/path/");
    expect(withPathPrefix(null, "path/")).toEqual("path/");

    expect(withPathPrefix(undefined, "/path")).toEqual("/path");
    expect(withPathPrefix(undefined, "path")).toEqual("path");
    expect(withPathPrefix(undefined, "/path/")).toEqual("/path/");
    expect(withPathPrefix(undefined, "path/")).toEqual("path/");
  });

  it("should add a path prefix to the path if an actual prefix is given", () => {
    expect(withPathPrefix("/staging", "/path")).toEqual("/staging/path");
    expect(withPathPrefix("/staging", "path")).toEqual("/staging/path");
    expect(withPathPrefix("/staging", "/path/")).toEqual("/staging/path/");
    expect(withPathPrefix("/staging", "path/")).toEqual("/staging/path/");
  });

  it("shouldn't break when given a root prefix", () => {
    expect(withPathPrefix("/", "/path")).toEqual("/path");
    expect(withPathPrefix("/", "path")).toEqual("/path");
    expect(withPathPrefix("/", "/path/")).toEqual("/path/");
    expect(withPathPrefix("/", "path/")).toEqual("/path/");
  });
});

describe("normalizePath", () => {
  it("should normalize a path no matter the combination of slashes", () => {
    expect(normalizePath("/path")).toEqual("/path");
    expect(normalizePath("path")).toEqual("/path");
    expect(normalizePath("/path/")).toEqual("/path");
    expect(normalizePath("path/")).toEqual("/path");
  });
});

describe("locationMatches", () => {
  it("should match partial & exact paths with no prefix", () => {
    expect(
      locationMatches({ path: "/path/bar", location: "/path/bar/50" })
    ).toEqual(false);
    expect(
      locationMatches({
        path: "/path/bar",
        location: "/path/bar/50",
        partial: true,
      })
    ).toEqual(true);
  });

  it("should match partial & exact paths with a root prefix", () => {
    expect(
      locationMatches({
        path: "/path/bar",
        location: "/path/bar/50",
        pathPrefix: "/",
      })
    ).toEqual(false);
    expect(
      locationMatches({
        path: "/path/bar",
        location: "/path/bar/50",
        pathPrefix: "/",
        partial: true,
      })
    ).toEqual(true);
  });

  it("should match partial & exact paths with an actual prefix", () => {
    expect(
      locationMatches({
        path: "/path/bar",
        location: "/docs/path/bar/50",
        pathPrefix: "/docs",
      })
    ).toEqual(false);
    expect(
      locationMatches({
        path: "/path/bar",
        location: "/docs/path/bar/50",
        pathPrefix: "/docs",
        partial: true,
      })
    ).toEqual(true);

    // without prefix: shouldn't match any
    expect(
      locationMatches({
        path: "/path/bar",
        location: "/path/bar/50",
        pathPrefix: "/docs",
      })
    ).toEqual(false);
    expect(
      locationMatches({
        path: "/path/bar",
        location: "/path/bar/50",
        pathPrefix: "/docs",
        partial: true,
      })
    ).toEqual(false);
  });
});
