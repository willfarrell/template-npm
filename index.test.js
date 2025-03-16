import { describe, test } from "node:test";
import { ok, equal, deepEqual, throws } from "node:assert/strict";
import foo from "./index.js";

test("Should return `true`", async (t) => {
  const bar = foo(true);
  equal(bar, true);
  ok(bar);
});

describe("Unit", () => {
  test("Should throw Error", async (t) => {
    throws(
      () => {
        foo(false);
      },
      undefined,
      "false",
    );
  });
});
