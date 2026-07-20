import { describe, expect, expectTypeOf, test } from "bun:test";
import {
  assertNever,
  err,
  isErr,
  isOk,
  isRecord,
  mapOk,
  ok,
  unwrapOr,
  type Err,
  type Ok,
  type Result,
} from "./index";

describe("Result", () => {
  test("keeps success and failure paths explicit", () => {
    const success: Result<number, string> = ok(42);
    const failure: Result<number, string> = err("boom");

    expectTypeOf(ok(42)).toEqualTypeOf<Ok<number>>();
    expectTypeOf(err("boom")).toEqualTypeOf<Err<string>>();

    expect(isOk(success)).toBe(true);
    expect(isErr(failure)).toBe(true);
    expect(unwrapOr(failure, 7)).toBe(7);
    expect(unwrapOr(success, 7)).toBe(42);

    if (isOk(success)) expectTypeOf(success).toEqualTypeOf<Ok<number>>();
    if (isErr(failure)) expectTypeOf(failure).toEqualTypeOf<Err<string>>();
  });

  test("maps only successful values", () => {
    expect(mapOk(ok(2), (value) => value * 3)).toEqual(ok(6));
    let calls = 0;
    expect(mapOk(err("stop"), (value: number) => {
      calls += 1;
      return value * 3;
    })).toEqual(err("stop"));
    expect(calls).toBe(0);
  });

  test("recognizes non-array objects without narrowing primitives or functions", () => {
    class Example {}
    expect(isRecord({ value: 1 })).toBe(true);
    expect(isRecord(Object.create(null))).toBe(true);
    expect(isRecord(new Date())).toBe(true);
    expect(isRecord(new Example())).toBe(true);
    expect(isRecord([])).toBe(false);
    expect(isRecord(null)).toBe(false);
    expect(isRecord("value")).toBe(false);
    expect(isRecord(() => undefined)).toBe(false);
  });

  test("the exhaustiveness backstop reports values that JSON cannot encode", () => {
    expect(() => assertNever(1n as never)).toThrow("Unreachable: unhandled variant 1");

    const cyclic: { self?: unknown } = {};
    cyclic.self = cyclic;
    expect(() => assertNever(cyclic as never)).toThrow("Unreachable: unhandled variant [object Object]");
  });
});
