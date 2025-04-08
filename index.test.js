import { equal, ok, throws } from "node:assert/strict";
import { describe, test } from "node:test";
import fct from "./index.js";

test("Should return `true`", async () => {
	const run = fct();
	const bar = run(true);
	equal(bar, true);
	ok(bar);
});

describe("Unit", () => {
	test("Should throw Error", async () => {
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
