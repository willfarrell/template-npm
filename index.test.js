import { describe, test } from "node:test";
import { ok, equal, throws } from "node:assert/strict";
import fct from "./index.js";

test("Should return `true`", async (t) => {
  const run = fct();
  const bar = run(true);
  equal(bar, true);
  ok(bar);
});

describe("Unit", () => {
  test("Should throw Error", async (t) => {
    const run = fct();
    throws(
      () => {
        run(false);
      },
      undefined,
      "false",
    );
  });
});
