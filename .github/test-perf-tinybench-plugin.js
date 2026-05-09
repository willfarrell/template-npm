// Wraps a tinybench Bench so each task's result is emitted as a `bench:<json>`
// diagnostic on the supplied node:test TestContext when the run completes.
// Pairs with .github/test-perf-reporter.js.
//
// TODO(future): publish as an npm package so any repo can opt in via
// `import { withBenchDiagnostics } from "<pkg>"` instead of the local file.
export function withBenchDiagnostics(bench, t) {
	bench.addEventListener("complete", () => {
		for (const task of bench.tasks) {
			const tp = task.result?.throughput;
			if (!tp) continue;
			t.diagnostic(
				`bench:${JSON.stringify({
					name: task.name,
					unit: "ops/sec",
					value: tp.mean,
					range: `±${tp.rme.toFixed(2)}%`,
					extra: `${tp.samplesCount} samples`,
				})}`,
			);
		}
	});
	return bench;
}
