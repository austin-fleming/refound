import type { Nothing } from "@utils/types/nothing";

export type Result<T, E = Error> = { ok: T; error: Nothing } | { ok: Nothing; error: E };
