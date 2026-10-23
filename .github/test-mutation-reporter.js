// Stryker reporter plugin — pulls the final mutation-test metrics and writes one
// JSON document in github-action-benchmark's customBiggerIsBetter shape
// (higher mutation score = better), mirroring .github/test-bench-reporter.js and
// .github/test-unit-reporter.js so the same workflow can consume it.
//
// Stryker reporters run in the main process (not the sandbox), so the file is
// written to the project root alongside test-bench-results.json.
//
// TODO(future): extract to a published npm package alongside the perf/unit reporters.
import { writeFileSync } from "node:fs";
import { declareClassPlugin, PluginKind } from "@stryker-mutator/api/plugin";

const OUTPUT_FILE = "test-mutation-results.json";

class BenchmarkReporter {
	onMutationTestReportReady(_report, metrics) {
		const { mutationScore, killed, timeout, totalValid } =
			metrics.systemUnderTestMetrics.metrics;
		const results = [
			{
				name: "mutation score",
				unit: "%",
				value: mutationScore,
				extra: `${killed + timeout}/${totalValid} mutants killed`,
			},
		];
		writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
	}
}

export const strykerPlugins = [
	declareClassPlugin(PluginKind.Reporter, "benchmark", BenchmarkReporter),
];
