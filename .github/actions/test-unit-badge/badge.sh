#!/usr/bin/env bash
# Reads the customBiggerIsBetter JSON emitted by .github/test-unit-reporter.js
# and writes a shields.io endpoint badge JSON for the LOWEST coverage metric
# across lines/branches/functions — so the badge can't hide a weak metric
# behind a strong one.
#
# Usage: badge.sh <input.json> <output.json>
set -euo pipefail

input=$1
output=$2

pct=$(jq -r '[.[].value] | min | round' "$input")

if   [ "$pct" -ge 95 ]; then color=brightgreen
elif [ "$pct" -ge 90 ]; then color=green
elif [ "$pct" -ge 80 ]; then color=yellowgreen
elif [ "$pct" -ge 70 ]; then color=yellow
elif [ "$pct" -ge 60 ]; then color=orange
else                          color=red
fi

printf '{"schemaVersion":1,"label":"coverage","message":"%d%%","color":"%s"}\n' "$pct" "$color" > "$output"
