import { describe, test } from "node:test";
import fc from "fast-check";
import fct from "./index.js";

const catchError = (input, e) => {
	if (e.message === "false") {
		return;
	}
	console.error(input, e);
	throw e;
};

const run = fct();
describe("Fuzz", () => {
	test("Should accept input of `string`", async () => {
		fc.assert(
			fc.asyncProperty(fc.string(), async (input) => {
				try {
					await run(input);
				} catch (e) {
					catchError(input, e);
				}
			}),
			{
				numRuns: 10, // 1_000_000
				verbose: 2,
				examples: [],
			},
		);
	});
	test("Should accept input of `boolean`", async () => {
		fc.assert(
			fc.asyncProperty(fc.boolean(), async (input) => {
				try {
					await run(input);
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
