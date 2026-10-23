#!/usr/bin/env bash
# Reads a customBiggerIsBetter / customSmallerIsBetter JSON results file and
# writes one shields.io endpoint badge JSON per metric to <out-dir>/<name>.json.
# Color thresholds are keyed off the metric's goal — green always means
# "meeting the goal" regardless of direction.
#
# Usage: badge.sh <input.json> <up|down> <out-dir>
set -euo pipefail

input=$1
direction=$2
out_dir=$3

# Goal lookup is by metric stem (suffix `_<n>d` stripped) so window choice
# can change without re-keying. Case statement keeps us bash-3.2-portable —
# same convention as test-unit-badge/badge.sh.
goal_for() {
	case "$1" in
		merge_frequency)             echo 2 ;;
		deployment_frequency)        echo 1 ;;
		sprint_planning_accuracy)    echo 85 ;;
		coding_time_p90)             echo 8 ;;
		pr_pickup_p90)               echo 1 ;;
		pr_review_p90)               echo 30 ;;
		deploy_time_p90)             echo 15 ;;
		cycle_time_p90)              echo 24 ;;
		change_failure_rate)         echo 1 ;;
		mttr_p90)                    echo 1 ;;
		pr_size_p90)                 echo 100 ;;
		rework_rate)                 echo 2 ;;
		refactor_rate)               echo 10 ;;
		sprint_capacity_deviation)   echo 15 ;;
		*)                           echo "" ;;
	esac
}

# One jq invocation streams every entry as a TSV row.
jq -r '.[] | [.name, (.value | tostring), .unit] | @tsv' "$input" |
while IFS=$'\t' read -r name value unit; do
	stem=${name%_[0-9]*d}
	g=$(goal_for "$stem")

	if [ -z "$g" ]; then
		color=lightgrey
	elif [ "$direction" = "up" ]; then
		# bigger-is-better: green at/above goal, red far below
		if   awk "BEGIN{exit !($value >= $g)}";        then color=brightgreen
		elif awk "BEGIN{exit !($value >= $g * 0.85)}"; then color=yellow
		elif awk "BEGIN{exit !($value >= $g * 0.5)}";  then color=orange
		else                                                color=red
		fi
	else
		# smaller-is-better: green at/below goal, red far above
		if   awk "BEGIN{exit !($value <= $g)}";        then color=brightgreen
		elif awk "BEGIN{exit !($value <= $g * 1.5)}";  then color=yellow
		elif awk "BEGIN{exit !($value <= $g * 3)}";    then color=orange
		else                                                color=red
		fi
	fi

	# Trim trailing ".0" / ".00" for cleaner badges; keep up to 2 decimals.
	msg=$(awk -v v="$value" -v u="$unit" 'BEGIN{printf (v==int(v) ? "%d %s" : "%.2f %s"), v, u}')
	jq -n --arg label "$name" --arg msg "$msg" --arg color "$color" \
		'{schemaVersion:1, label:$label, message:$msg, color:$color}' \
		> "$out_dir/$name.json"
done
