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
1. Setup `Secret Protection`
   1. Under **Secret Protection**, Click `Enable`
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

## Release Please (future)

Update `signoff` in `.github/workflows/.release-please-config.json` to match owner of personal access token for `PR_TOKEN` set above. Use `username@users.noreply.github.com` as the email address.

## Open Source Security Foundation Report

https://www.bestpractices.dev/en/criteria

### Basics

#### Basic project website content

**The project website MUST provide information on how to: obtain, provide feedback (as bug reports or enhancements), and contribute to the software. **

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

**The information on how to contribute SHOULD include the requirements for acceptable contributions (e.g., a reference to any required coding standard).**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

#### Documentation

**The project MUST provide reference documentation that describes the external interface (both input and output) of the software produced by the project.**

Each package README should include the following sub-headings `Options`, `Inputs`, `Outputs`. See `docs/README.md`

### Change Control

#### Public version-controlled source repository

**To enable collaborative review, the project's source repository MUST include interim versions for review between releases; it MUST NOT include only final releases.**

Can be automated using `release-please` or follow `docs/RELEASE.md`

#### Unique version numbering

Can be automated using `release-please` or follow `docs/RELEASE.md`

#### Release notes

**The project MUST provide, in each release, release notes that are a human-readable summary of major changes in that release to help users determine if they should upgrade and what the upgrade impact will be. The release notes MUST NOT be the raw output of a version control log (e.g., the "git log" command results are not release notes). Projects whose results are not intended for reuse in multiple locations (such as the software for a single website or service) AND employ continuous delivery MAY select "N/A".**

Can be automated using `release-please` to create a `CHANGELOG.md` or use GitHub Releases.

### Reporting

#### Bug-reporting process

**The project MUST provide a process for users to submit bug reports (e.g., using an issue tracker or a mailing list).**

https://github.com/willfarrell/template-npm/blob/main/CONTRIBUTING.md

**The project MUST acknowledge a majority of bug reports submitted in the last 2-12 months (inclusive); the response need not include a fix.**

https://github.com/willfarrell/template-npm/blob/main/CONTRIBUTING.md

**The project SHOULD respond to a majority (>50%) of enhancement requests in the last 2-12 months (inclusive).**

https://github.com/willfarrell/template-npm/blob/main/CONTRIBUTING.md

**The project MUST have a publicly available archive for reports and responses for later searching.**

https://github.com/willfarrell/template-npm/blob/main/CONTRIBUTING.md

#### Vulnerability report process

**The project MUST publish the process for reporting vulnerabilities on the project site.**

https://github.com/willfarrell/template-npm/blob/main/SECURITY.md#reporting-a-vulnerability

**If private vulnerability reports are supported, the project MUST include how to send the information in a way that is kept private.**

https://github.com/willfarrell/template-npm/blob/main/SECURITY.md#reporting-a-vulnerability

**The project's initial response time for any vulnerability report received in the last 6 months MUST be less than or equal to 14 days.**

https://github.com/willfarrell/template-npm/blob/main/SECURITY.md#reporting-a-vulnerability

### Quality

See `docs/CONTRIBUTING.md`

### Security

#### Secured delivery against man-in-the-middle (MITM) attacks

This is met via npm.

### Analysis

#### Static code analysis

**At least one static code analysis tool (beyond compiler warnings and "safe" language modes) MUST be applied to any proposed major production release of the software before its release, if there is at least one FLOSS tool that implements this criterion in the selected language.**

CodeQL, semgrep
