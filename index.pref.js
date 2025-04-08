import { Bench } from "tinybench";
import fct from "./index.js";

const suite = new Bench();

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

suite.addEventListener("complete", () => {
	console.table(suite.table());
});

suite.run();
