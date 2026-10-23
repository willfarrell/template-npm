// node:bench reporter — collects `bench:complete` results from *.bench.js
// and yields one JSON document in github-action-benchmark's customBiggerIsBetter shape.
//
// TODO(future): extract to a published npm package (working name:
//   `node-bench-action-benchmark-reporter`) so the workflow can use
//   `--bench-reporter=<pkg>` instead of this local path.
export default async function* perfReporter(source) {
	const results = [];
	for await (const { type, data } of source) {
		if (type !== "bench:complete" || data.error) continue;
		const { mean, confidenceInterval } = data.summary;
		const rme = ((confidenceInterval.upper - mean) / mean) * 100;
		results.push({
			name: data.name,
			unit: "ops/sec",
			value: mean,
			range: `±${rme.toFixed(2)}%`,
			extra: `${data.samples.length} samples`,
		});
	}
	yield JSON.stringify(results, null, 2);
}
