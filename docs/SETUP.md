# Manual Configuration

Last reviewed: 2025-03-11

## Open Source Security Foundation Scorecard

Automated using `.github/workflows/ossf-scorecard.yml`. Details on check and remediations can be found at: https://github.com/ossf/scorecard/blob/main/docs/checks.md

## GitHub Settings

### General

1. Go to [General](https://github.com/willfarrell/template-npm/settings)
1. Enable `Require contributors to sign off on web-based commits Loadings`

### Rulesets

1. Go to [Rulesets](https://github.com/willfarrell/template-npm/settings/rules)
1. Click `New ruleset`
1. Set `Ruleset Name` to `main`
1. Set `Enforcement status` to `Active`
1. Setup `Bypass list`
   1. Confirm it says `Bypass list is empty` [Branch-Protection tier 2]
1. Setup `Targets`
   1. Click `Add target`, choose `Include default branch`
1. Setup `Rules`
   1. Enable `Restrict deletions` [Branch-Protection tier 1]
   1. Enable `Require signed commits`
   1. Enable `Require a pull request before merging` [Branch-Protection tier 2]
      1. Set `Required approvals` to `1` [Branch-Protection tier 2]
      1. Set `Required approvals` to `2` or a higher number [Branch-Protection tier 4]
      1. Enable `Dismiss stale pull request approvals when new commits are pushed` [Branch-Protection tier 5]
      1. Enable `Require review from Code Owners` [Branch-Protection tier 4]
      1. Enable `Require approval of the most recent reviewable push` [Branch-Protection tier 2]
   1. Check `Require status checks to pass` to be `checked`
      1. Enable `Require branches to be up to date before merging` [Branch-Protection tier 2]
      1. Click `Add checks`, Add in GitHub Action job names (ex `Test (lint) (23.x)`) [Branch-Protection tier 2]
   1. Enable `Block force pushes` [Branch-Protection tier 1]
   1. Enable `Require code scanning results`
      1. Click `Add tool`, select `CodeQL`
1. Click `Create`

### Code security

1. Go to [Code security](https://github.com/willfarrell/template-npm/settings/security_analysis)
1. Under **Private vulnerability reporting**, Click `Enable`
1. Setup `Dependabot`
   1. Under **Dependabot alerts**, Click `Enable`
   1. Under **Dependabot security updates**, Click `Enable`
   1. Under **Grouped security updates**, Click `Enable`
   1. Under **Dependabot on Actions runners**, Click `Enable`
1. Setup `Secret scanning`
   1. Under **Secret scanning**, Click `Enable`
   1. Under **Push protection**, Click `Enable`

## Actions secrets and variables

You will need the following secrets setup:

- `NPM_TOKEN`
  - Source: [npm Access Tokens](https://www.npmjs.com/settings/willfarrell/tokens)
  - Type: `Granular Access Token`
  - Permissions: `Read and write` + `Only select packages and scopes`
- `PR_SECRET`
  - Source: [GitHub Personal access tokens](https://github.com/settings/personal-access-tokens)
  - Type: `Fine-grained personal access tokens`
  - Permissions: `Only select repositories` + `Contents: Read and write` & `Pull requests: Read and write` & `Workflows: Read and write`

Actions secrets and variables can be added at the [organization level](https://github.com/organizations/willfarrell/settings/secrets/actions) or the [repository level](https://github.com/willfarrell/template-npm/settings/secrets/actions).

## Release Please

Update `signoff` in `.github/workflows/.release-please-config.json` to match owner of personal access token for `PR_TOKEN` set above. Use `username@users.noreply.github.com` as the email address.

## Open Source Security Foundation Report

https://www.bestpractices.dev/en/criteria
