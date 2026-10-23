import { bench, suite } from "node:bench";
import fct from "./index.js";

const run = fct();
const ops = 10_000;
const options = { warmup: 10, samples: 30 };

suite("index", () => {
	bench("bool", options, (b) => {
		b.start();
		for (let i = 0; i < ops; i++) run(true);
		b.end(ops);
	});
	bench("int", options, (b) => {
		b.start();
		for (let i = 0; i < ops; i++) run(1);
		b.end(ops);
	});
	bench("string", options, (b) => {
		b.start();
		for (let i = 0; i < ops; i++) run("true");
		b.end(ops);
	});
});
