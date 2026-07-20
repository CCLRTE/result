// src/index.ts
function ok(value) {
  return { ok: true, value };
}
function err(error) {
  return { ok: false, error };
}
function isOk(result) {
  return result.ok;
}
function isErr(result) {
  return !result.ok;
}
function unwrapOr(result, fallback) {
  return result.ok ? result.value : fallback;
}
function mapOk(result, transform) {
  return result.ok ? ok(transform(result.value)) : result;
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function assertNever(value) {
  let description;
  try {
    description = JSON.stringify(value);
  } catch {
    description = undefined;
  }
  if (description === undefined) {
    try {
      description = String(value);
    } catch {
      description = "<unprintable>";
    }
  }
  throw new Error(`Unreachable: unhandled variant ${description}`);
}
export {
  unwrapOr,
  ok,
  mapOk,
  isRecord,
  isOk,
  isErr,
  err,
  assertNever
};
