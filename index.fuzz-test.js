import { describe, test } from "node:test";
import fc from "fast-check";
import foo from "./index.js";

const catchError = (input, e) => {
  if (e.message === "false") {
    return;
  }
  console.error(input, e);
  throw e;
};

describe("Fuzz", () => {
  test("Should accept input of `string`", async () => {
    fc.assert(
      fc.asyncProperty(fc.string(), async (input) => {
        try {
          await foo(input);
        } catch (e) {
          catchError(input, e);
        }
      }),
      {
        numRuns: 100_000,
        verbose: 2,
        examples: [],
      },
    );
  });
  test("Should accept input of `boolean`", async () => {
    fc.assert(
      fc.asyncProperty(fc.boolean(), async (input) => {
        try {
          await foo(input);
        } catch (e) {
          catchError(input, e);
        }
      }),
      {
        numRuns: 10,
        verbose: 2,
        examples: [],
      },
    );
  });
});
