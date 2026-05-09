import test from "node:test";
import { Bench } from "tinybench";
import { withBenchDiagnostics } from "./.github/test-perf-tinybench-plugin.js";
import fct from "./index.js";

test("perf", async (t) => {
	const suite = withBenchDiagnostics(new Bench({ time: 100 }), t);
	const run = fct();

	suite
		.add("bool", () => {
			run(true);
		})
		.add("int", () => {
			run(1);
		})
		.add("string", () => {
			run("true");
		});

	await suite.run();

	console.table(suite.table());
});
