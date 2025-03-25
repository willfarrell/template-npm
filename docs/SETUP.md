# Manual Configuration

Last reviewed: 2025-03-11

## Open Source Security Foundation Scorecard

Automated using `.github/workflows/ossf-scorecard.yml`. Details on check and remediations can be found at: https://github.com/ossf/scorecard/blob/main/docs/checks.md

## GitHub Settings

- Ensure MFA is enabled for all maintainers.

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

#### Basic project website content [passing]

**The project website MUST succinctly describe what the software does (what problem does it solve?)**

**The project website MUST provide information on how to: obtain, provide feedback (as bug reports or enhancements), and contribute to the software.**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

**The information on how to contribute SHOULD include the requirements for acceptable contributions (e.g., a reference to any required coding standard).** [passing]

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

#### Project oversight [silver]

**The project SHOULD have a legal mechanism where all developers of non-trivial amounts of project software assert that they are legally authorized to make these contributions. The most common and easily-implemented approach for doing this is by using a Developer Certificate of Origin (DCO), where users add "signed-off-by" in their commits and the project links to the DCO website. However, this MAY be implemented as a Contributor License Agreement (CLA), or other legal mechanism.**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

**The project MUST clearly define and document its project governance model (the way it makes decisions, including key roles).**

https://github.com/willfarrell/template-npm/blob/main/docs/GOVERNANCE.md

**The project MUST adopt a code of conduct and post it in a standard location.**

https://github.com/willfarrell/template-npm?tab=coc-ov-file

**The project MUST clearly define and publicly document the key roles in the project and their responsibilities, including any tasks those roles must perform. It MUST be clear who has which role(s), though this might not be documented in the same way.**

https://github.com/willfarrell/template-npm/blob/main/docs/GOVERNANCE.md

**The project MUST be able to continue with minimal interruption if any one person dies, is incapacitated, or is otherwise unable or unwilling to continue support of the project. In particular, the project MUST be able to create and close issues, accept proposed changes, and release versions of software, within a week of confirmation of the loss of support from any one individual. This MAY be done by ensuring someone else has any necessary keys, passwords, and legal rights to continue the project. Individuals who run a FLOSS project MAY do this by providing keys in a lockbox and a will providing any needed legal rights (e.g., for DNS names).**

https://github.com/willfarrell/template-npm/blob/main/docs/GOVERNANCE.md

#### Project oversight [gold]

**The project MUST have at least two unassociated significant contributors.**

https://github.com/willfarrell/template-npm/blob/main/docs/GOVERNANCE.md

#### Other [gold]

**The project MUST include a copyright statement in each source file, identifying the copyright holder (e.g., the [project name] contributors).**

not applicable, managed by npm

**The project MUST include a license statement in each source file. This MAY be done by including the following inside a comment near the beginning of each file: SPDX-License-Identifier: [SPDX license expression for project].**

not applicable, managed by npm

#### Documentation [passing]

**The project MUST provide reference documentation that describes the external interface (both input and output) of the software produced by the project.**

Each package README should include the following sub-headings `Options`, `Inputs`, `Outputs`. See `docs/README.md`

#### Documentation [silver]

**The project MUST have a documented roadmap that describes what the project intends to do and not do for at least the next year.**

https://github.com/willfarrell/template-npm/blob/main/docs/ROADMAP.md

**The project MUST include documentation of the architecture (aka high-level design) of the software produced by the project. If the project does not produce software, select "not applicable" (N/A).**

N/A?

**The project MUST document what the user can and cannot expect in terms of security from the software produced by the project (its "security requirements").**

https://github.com/willfarrell/template-npm/security

**The project MUST provide a "quick start" guide for new users to help them quickly do something with the software.**

https://github.com/willfarrell/template-npm

**The project MUST make an effort to keep the documentation consistent with the current version of the project results (including software produced by the project). Any known documentation defects making it inconsistent MUST be fixed. If the documentation is generally current, but erroneously includes some older information that is no longer true, just treat that as a defect, then track and fix as usual.**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

**The project repository front page and/or website MUST identify and hyperlink to any achievements, including this best practices badge, within 48 hours of public recognition that the achievement has been attained.**

https://github.com/willfarrell/template-npm

**The project (both project sites and project results) SHOULD follow accessibility best practices so that persons with disabilities can still participate in the project and use the project results where it is reasonable to do so.**

https://accessibility.github.com/

**The software produced by the project SHOULD be internationalized to enable easy localization for the target audience's culture, region, or language. If internationalization (i18n) does not apply (e.g., the software doesn't generate text intended for end-users and doesn't sort human-readable text), select "not applicable" (N/A).**

the software doesn't generate text intended for end-users

#### Other [passing]

**The project SHOULD provide documentation in English and be able to accept bug reports and comments about code in English.**

#### Other [silver]

**If the project sites (website, repository, and download URLs) store passwords for authentication of external users, the passwords MUST be stored as iterated hashes with a per-user salt by using a key stretching (iterated) algorithm (e.g., Argon2id, Bcrypt, Scrypt, or PBKDF2). If the project sites do not store passwords for this purpose, select "not applicable" (N/A).**

project sites do not store passwords for this purpose

### Change Control

#### Public version-controlled source repository [passing]

**To enable collaborative review, the project's source repository MUST include interim versions for review between releases; it MUST NOT include only final releases.**

https://github.com/willfarrell/template-npm/blob/main/docs/RELEASE.md

#### Public version-controlled source repository [gold]

**The project MUST clearly identify small tasks that can be performed by new or casual contributors.**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

**The project MUST require two-factor authentication (2FA) for developers for changing a central repository or accessing sensitive data (such as private vulnerability reports). This 2FA mechanism MAY use mechanisms without cryptographic mechanisms such as SMS, though that is not recommended.** [gold]

https://github.com/willfarrell/template-npm/blob/main/docs/GOVERNANCE.md

**The project's two-factor authentication (2FA) SHOULD use cryptographic mechanisms to prevent impersonation. Short Message Service (SMS) based 2FA, by itself, does NOT meet this criterion, since it is not encrypted.** [gold]

https://github.com/willfarrell/template-npm/blob/main/docs/GOVERNANCE.md

#### Unique version numbering [passing]

https://github.com/willfarrell/template-npm/blob/main/docs/RELEASE.md

#### Release notes [passing]

**The project MUST provide, in each release, release notes that are a human-readable summary of major changes in that release to help users determine if they should upgrade and what the upgrade impact will be. The release notes MUST NOT be the raw output of a version control log (e.g., the "git log" command results are not release notes). Projects whose results are not intended for reuse in multiple locations (such as the software for a single website or service) AND employ continuous delivery MAY select "N/A".**

https://github.com/willfarrell/template-npm/releases
or
https://github.com/willfarrell/template-npm/blob/main/docs/CHANGELOG.md

**The release notes MUST identify every publicly known run-time vulnerability fixed in this release that already had a CVE assignment or similar when the release was created. This criterion may be marked as not applicable (N/A) if users typically cannot practically update the software themselves (e.g., as is often true for kernel updates). This criterion applies only to the project results, not to its dependencies. If there are no release notes or there have been no publicly known vulnerabilities, choose N/A.**

https://github.com/willfarrell/template-npm/security

#### Previous versions [silver]

**The project MUST maintain the most often used older versions of the product or provide an upgrade path to newer versions. If the upgrade path is difficult, the project MUST document how to perform the upgrade (e.g., the interfaces that have changed and detailed suggested steps to help upgrade).**

https://github.com/willfarrell/template-npm/blob/main/docs/UPGRADE.md

### Reporting

#### Bug-reporting process [passing]

**The project MUST provide a process for users to submit bug reports (e.g., using an issue tracker or a mailing list).**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

**The project MUST acknowledge a majority of bug reports submitted in the last 2-12 months (inclusive); the response need not include a fix.**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

**The project SHOULD respond to a majority (>50%) of enhancement requests in the last 2-12 months (inclusive).**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

**The project MUST have a publicly available archive for reports and responses for later searching.**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

#### Bug-reporting process [silver]

**The project MUST use an issue tracker for tracking individual issues.**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

#### Vulnerability report process [passing]

**The project MUST publish the process for reporting vulnerabilities on the project site.**

https://github.com/willfarrell/template-npm?tab=security-ov-file

**If private vulnerability reports are supported, the project MUST include how to send the information in a way that is kept private.**

https://github.com/willfarrell/template-npm?tab=security-ov-file

**The project's initial response time for any vulnerability report received in the last 6 months MUST be less than or equal to 14 days.**

https://github.com/willfarrell/template-npm?tab=security-ov-file

#### Vulnerability report process [silver]

**The project MUST give credit to the reporter(s) of all vulnerability reports resolved in the last 12 months, except for the reporter(s) who request anonymity. If there have been no vulnerabilities resolved in the last 12 months, select "not applicable" (N/A).**

https://github.com/willfarrell/template-npm?tab=security-ov-file

**The project MUST have a documented process for responding to vulnerability reports.**

https://github.com/willfarrell/template-npm?tab=security-ov-file

### Quality

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

#### Working build systems [silver/gold]

(N/A) not applicable for javascript

#### Installation system [silver]

(Met) Handled by npm

#### Externally-maintained components [silver]

**The project MUST list external dependencies in a computer-processable way.**

https://github.com/willfarrell/template-npm/blob/main/package-lock.json

**Projects MUST monitor or periodically check their external dependencies (including convenience copies) to detect known vulnerabilities, and fix exploitable vulnerabilities or verify them as unexploitable.**

GitHub Dependabot enabled

**The project MUST make it easy to identify and update reused externally-maintained components. Then, if a vulnerability is found in a reused component, it will be easy to update that component.**

Handled by npm

**The project SHOULD avoid using deprecated or obsolete functions and APIs where FLOSS alternatives are available in the set of technology it uses (its "technology stack") and to a supermajority of the users the project supports (so that users have ready access to the alternative).**

https://github.com/willfarrell/template-npm/blob/main/docs/RELEASE.md

#### Automated test suite [silver/gold]

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

#### New functionality testing [silver]

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

#### Warning flags [silver]

**Projects MUST be maximally strict with warnings in the software produced by the project, where practical.**

default for javascript

### Security

https://github.com/willfarrell/template-npm?tab=security-ov-file

#### Secured delivery against man-in-the-middle (MITM) attacks [passing]

This is met via npm.

#### Secure development knowledge [silver]

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

#### Secure release [silver]

This is met via npm & GitHub Actions

#### Other security issues [silver]

https://github.com/willfarrell/template-npm?tab=security-ov-file

### Analysis

#### Static code analysis [passing]

**At least one static code analysis tool (beyond compiler warnings and "safe" language modes) MUST be applied to any proposed major production release of the software before its release, if there is at least one FLOSS tool that implements this criterion in the selected language.**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

#### Static code analysis [silver]

**The project MUST use at least one static analysis tool with rules or approaches to look for common vulnerabilities in the analyzed language or environment, if there is at least one FLOSS tool that can implement this criterion in the selected language.**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

#### Dynamic code analysis [silver]

**If the software produced by the project includes software written using a memory-unsafe language (e.g., C or C++), then at least one dynamic tool (e.g., a fuzzer or web application scanner) MUST be routinely used in combination with a mechanism to detect memory safety problems such as buffer overwrites. If the project does not produce software written in a memory-unsafe language, choose "not applicable" (N/A).**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md

**The project SHOULD include many run-time assertions in the software it produces and check those assertions during dynamic analysis.**

https://github.com/willfarrell/template-npm/blob/main/docs/CONTRIBUTING.md
