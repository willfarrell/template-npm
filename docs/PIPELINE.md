# Pipeline

This document describes the CI/CD pipeline for this repository, including its trust model and how it satisfies [OWASP SPVS 1.5](https://owasp.org/www-project-spvs/) controls (1.0 base; 1.5 AI addendum is not applicable to this template). For per-control evidence, see [`SPVS-COMPLIANCE.md`](SPVS-COMPLIANCE.md).

## Branch and Release Flow

```
feature/*  ──PR──>  develop  ──release-please PR──>  main  ──release-please tag──>  npm publish
                       │                              │
                       │                              └─ requires 2 reviewers (manual approval gate)
                       └─ runs full test suite on every PR
```

- **`develop`** is the integration branch. All feature PRs target `develop`.
- **`main`** is release-only. The only PRs into `main` are opened by `release-please` (see `.github/workflows/prerelease.yml`), which collects conventional commits since the last release into a versioned PR.
- Merging the release-please PR into `main` triggers `release.yml`, which:
  1. Builds the package and runs `npm pack`.
  2. Generates a Sigstore build provenance attestation (`actions/attest-build-provenance`).
  3. Creates a draft GitHub release with the `.tgz` attached.
  4. Verifies the attestation (`gh attestation verify`) and dependency signatures (`npm audit signatures`).
  5. Publishes to npm with `--provenance` (OIDC; no static `NPM_TOKEN`).

## Manual Approval Gate (SPVS V3.3.20)

SPVS L3 requires manual approval for sensitive operations. **The two-reviewer requirement on `main` is the manual approval gate.** No code reaches `main`, and therefore no release is triggered, without two human approvals.

This is enforced via GitHub branch protection on `main`:

- Required pull request reviews: **2**
- Dismiss stale approvals on new commits: **on**
- Require review from CODEOWNERS: **on**
- Require status checks to pass: **on**
- Required status checks: `Tests (unit)`, `Tests (lint)`, `Tests (sast)`, `Tests (perf)`, `Tests (dast)`, `Tests (dco)`
- Require branches to be up to date: **on**
- Restrict who can push: **only release-please bot via PR**
- Allow force pushes: **off**
- Allow deletions: **off**

Defense-in-depth alternative (not currently enabled): wrap the `publish` job in a GitHub Environment with required reviewers, providing a second approval gate at the publish moment. Deferred — the merge gate is sufficient under SPVS.

## Workflows

| Workflow | Trigger | Purpose | SPVS controls |
|---|---|---|---|
| `test-lint.yml` | PR | Biome lint/format check | V2.2.1 |
| `test-unit.yml` | PR + push to main | Unit tests + coverage gate (95/80/80) | V2.2.5, V2.7.x |
| `test-perf.yml` | PR + push to main | tinybench regression check | V3.3.16 |
| `test-dast.yml` | PR | fast-check property/fuzz tests | V3.3.14 |
| `test-sast.yml` | PR + weekly cron | Trivy SCA, Trivy license, lockfile-lint, CodeQL, semgrep, TruffleHog, gitleaks, zizmor (workflow SAST) | V2.4.1-9, V2.4.14, V3.1.5, V3.3.4-9, V2.5.1, V3.2.1 |
| `test-dco.yml` | PR | Developer Certificate of Origin sign-off | V1.5.x |
| `ossf-scorecard.yml` | weekly cron + push to main | OpenSSF Scorecard scan, results to code-scanning | V5.2.x, V5.4.1 |
| `prerelease.yml` | PR closed on `develop` | Opens release-please promotion PR `develop → main` | V1.5.3 |
| `release.yml` | PR closed on `main` | Build, attest, publish to npm | V3.4.x, V4.1.1, V4.3.x |

## Pipeline Hardening

- **Runner hardening:** Every job (except containerised semgrep) starts with `step-security/harden-runner` in `audit` mode with `disable-telemetry: true`. The action monitors process and network activity entirely on the GitHub-hosted runner; with telemetry disabled, no data is transmitted to StepSecurity's API. Egress events appear only in the GitHub Actions log for that run. Once the allowlist stabilises, mode flips to `block`. Trade-off: no StepSecurity dashboard — egress review is manual.
- **Action pinning:** All third-party actions pinned to commit SHA with `# vX.Y.Z` comment. Dependabot bumps the `github-actions` ecosystem weekly.
- **Permissions:** Workflows declare `permissions: read-all` or scoped equivalents at the workflow level; jobs only request additional scopes when needed.
- **Workflow SAST:** `zizmor` runs as a job inside `test-sast.yml` (every PR + weekly cron), catching template-injection, untrusted-checkout, and over-broad permission patterns.
- **Secret scanning:** TruffleHog + gitleaks both run on every PR. TruffleHog uses `--only-verified` to reduce false positives; gitleaks runs the full ruleset.

## Provenance and Verification

- Build provenance is attested with [Sigstore](https://sigstore.dev) via `actions/attest-build-provenance`. The attestation is uploaded to the GitHub attestations API and to the Sigstore transparency log.
- Each `.tgz` is verified with `gh attestation verify` in the `publish` job before reaching `npm publish`.
- `npm publish --provenance` re-attests at the registry layer; consumers see the provenance badge on npmjs.com.
- Dependency signatures are verified with `npm audit signatures` before publish, ensuring all installed packages bear valid registry signatures.

## Pipeline Documentation Maintenance

- This document is reviewed at least annually and on any structural change to the pipeline.
- The SPVS evidence map (`SPVS-COMPLIANCE.md`) is updated in lockstep with pipeline changes that affect any control.
- Workflow changes require CODEOWNERS approval (see `.github/CODEOWNERS`).
