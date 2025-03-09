import { Bench } from "tinybench";
import foo from "./index.js";

const suite = new Bench();

suite
  .add("bool", function () {
    foo(true);
  })
  .add("int", function () {
    foo(1);
  })
  .add("string", function () {
    foo("true");
  });

suite.addEventListener("complete", function () {
  console.table(suite.table());
});

suite.run();
