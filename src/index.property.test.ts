import { expect, test } from "bun:test";
import { assertProperty, fc } from "./test-support";
import { err, isRecord, mapOk, ok, type Result } from "./index";

test("property: isRecord agrees with an independent JSON object predicate", () => {
  assertProperty(fc.property(fc.jsonValue(), (value) => {
    const expected = typeof value === "object" && value !== null && !Array.isArray(value);
    expect(isRecord(value)).toBe(expected);
  }));
});

test("property: mapOk preserves failures and composes over successes", () => {
  assertProperty(fc.property(fc.integer(), fc.string(), (value, error) => {
    const failure: Result<number, string> = err(error);
    expect(mapOk(failure, (number: number) => number + 1)).toEqual(failure);
    expect(mapOk(mapOk(ok(value), (number) => number + 1), (number) => number * 2)).toEqual(
      mapOk(ok(value), (number) => (number + 1) * 2),
    );
  }));
});
