/** An explicit success-or-failure value whose failure path stays visible. */
export type Result<T, E = Error> = Ok<T> | Err<E>;

/** The successful variant of a Result. */
export type Ok<T> = { readonly ok: true; readonly value: T };

/** The failed variant of a Result. */
export type Err<E> = { readonly ok: false; readonly error: E };

/** Plain absence, without conflating it with a domain failure. */
export type Option<T> = T | null;

export function ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}

export function err<E>(error: E): Err<E> {
  return { ok: false, error };
}

export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.ok;
}

export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return !result.ok;
}

export function unwrapOr<T, E>(result: Result<T, E>, fallback: T): T {
  return result.ok ? result.value : fallback;
}

export function mapOk<T, U, E>(result: Result<T, E>, transform: (value: T) => U): Result<U, E> {
  return result.ok ? ok(transform(result.value)) : result;
}

/** Narrow foreign input before reading named fields from it. */
export function isRecord(value: unknown): value is Record<PropertyKey, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Compile-time exhaustiveness guard with a runtime backstop. */
export function assertNever(value: never): never {
  let description: string | undefined;
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
