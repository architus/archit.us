import {
  jest,
  describe,
  beforeEach,
  afterEach,
  it,
  expect,
} from "@jest/globals";

import { formatDate } from "./date";

// Set up window Mocks
let windowSpy: jest.SpyInstance<(Window & typeof globalThis) | undefined, []>;
beforeEach(() => {
  windowSpy = jest.spyOn(global, "window", "get");
});
afterEach(() => windowSpy.mockRestore());

describe("formatDate", () => {
  it("should format US dates correctly in Node with no navigator", () => {
    windowSpy.mockImplementation(() => undefined);

    const mockDate = new Date(Date.parse("04 Dec 1995 00:12:00 GMT"));
    expect(formatDate(mockDate)).toBe(
      "Monday, December 4, 1995 at 12:12:00 AM"
    );

    expect(formatDate(mockDate, "@")).toBe(
      "Monday, December 4, 1995 @ 12:12:00 AM"
    );
  });

  it("pulls the locale from the window object", () => {
    // Note, to get language definitions for "de" (German),
    // we need to import `full-icu` by specifying it during startup
    // This is passed in as an argument to `yarn run test`
    // (See package.json)
    windowSpy.mockImplementation(
      () =>
        (({
          navigator: {
            languages: ["de"],
          },
        } as unknown) as Window & typeof globalThis)
    );

    const mockDate = new Date(Date.parse("04 Dec 1995 00:12:00 GMT"));
    expect(formatDate(mockDate)).toBe("Montag, 4. Dezember 1995 at 00:12:00");

    expect(formatDate(mockDate, "um")).toBe(
      "Montag, 4. Dezember 1995 um 00:12:00"
    );
  });
});
