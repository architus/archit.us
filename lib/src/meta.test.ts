import { describe, it } from "@jest/globals";

describe("testing setup", () => {
  // Same as ./test/global-setup.ts
  // See https://stackoverflow.com/a/56482581/13192375
  it("should always use UTC as the time zone", () => {
    expect(new Date().getTimezoneOffset()).toBe(0);
  });
});
