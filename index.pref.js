import { Bench } from "tinybench";
import fct from "./index.js";

const suite = new Bench();

const run = fct();
suite
  .add("bool", function () {
    run(true);
  })
  .add("int", function () {
    run(1);
  })
  .add("string", function () {
    run("true");
  });

suite.addEventListener("complete", function () {
  console.table(suite.table());
});

suite.run();
