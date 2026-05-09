// node:test reporter — collects `bench:<json>` diagnostics emitted by *.perf.js
// and yields one JSON document in github-action-benchmark's customBiggerIsBetter shape.
//
// TODO(future): extract to a published npm package (working name:
//   `node-test-action-benchmark-reporter`) so the workflow can use
//   `--test-reporter=<pkg>` instead of this local path. Bench-tool agnostic —
//   any producer that emits `bench:<json>` diagnostics works.
export default async function* perfReporter(source) {
	const results = [];
	for await (const event of source) {
		if (
			event.type === "test:diagnostic" &&
			event.data.message.startsWith("bench:")
		) {
			results.push(JSON.parse(event.data.message.slice("bench:".length)));
		}
	}
	yield JSON.stringify(results, null, 2);
}
