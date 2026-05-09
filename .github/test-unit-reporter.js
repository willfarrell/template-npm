// node:test reporter — pulls the test:coverage summary and yields one JSON
// document in github-action-benchmark's customBiggerIsBetter shape (higher % = better).
//
// TODO(future): extract to a published npm package alongside the perf reporter.
export default async function* coverageReporter(source) {
	let totals;
	for await (const event of source) {
		if (event.type === "test:coverage") {
			totals = event.data.summary?.totals;
		}
	}
	const results = totals
		? [
				{
					name: "lines",
					unit: "%",
					value: totals.coveredLinePercent,
					extra: `${totals.coveredLineCount}/${totals.totalLineCount} lines`,
				},
				{
					name: "branches",
					unit: "%",
					value: totals.coveredBranchPercent,
					extra: `${totals.coveredBranchCount}/${totals.totalBranchCount} branches`,
				},
				{
					name: "functions",
					unit: "%",
					value: totals.coveredFunctionPercent,
					extra: `${totals.coveredFunctionCount}/${totals.totalFunctionCount} functions`,
				},
			]
		: [];
	yield JSON.stringify(results, null, 2);
}
