# Security Policy

This document outlines security procedures and general policies for Open Source projects as found on https://github.com/willfarrell.

- [Security Goals](#security-goals)
- [Threat Model](#threat-model)
- [Trust Boundaries](#trust-boundaries)
- [Secrets and Credentials](#secrets-and-credentials)
- [Open Source Components](#open-source-components)
- [Supported Versions](#supported-versions)
- [Reporting a Vulnerability](#reporting-a-vulnerability)
- [Disclosure Policy](#disclosure-policy)
- [Pipeline Incident Response](#pipeline-incident-response)

## Security Goals

Our goal is to ensure OSS follows secure design principles and meets security best practices as outlined by the following standards:

- [OWASP ASVS v5.0 Level 3](https://github.com/OWASP/ASVS/tree/master/5.0/en) — Application Security Verification Standard (where applicable to a library).
- [OWASP SPVS v1.5 Level 2](https://owasp.org/www-project-spvs/) — Secure Pipeline Verification Standard. This project self-attests to **Level 2** for the SPVS 1.0 base controls (pipeline-actionable). The SPVS 1.5 AI Pipeline Security addendum is **not applicable** — this template does not build, train, deploy, or invoke AI/ML models. See [`docs/SPVS-COMPLIANCE.md`](docs/SPVS-COMPLIANCE.md) for the per-control evidence map.
- [OpenSSF Scorecard](https://scorecard.dev) — runs weekly; results published to [scorecard.dev](https://scorecard.dev/viewer/?uri=github.com/willfarrell/template-npm) and to GitHub Code Scanning.
- [SLSA Level 3](https://slsa.dev) — build provenance via Sigstore + npm `--provenance`.

Standards are evaluated using automated scans (Linting, Unit tests, SAST, SCA, DAST, Perf) and manual self-audits. Third-party audits are welcome.

## Secure Design Principles

- secure by default
- use white lists
- no backdoors
- follow least privilege
- keep it simple

## Threat Model

The package is a published npm library; runtime threats fall on the consumer. The relevant attack surface for this repository is the **build and publish pipeline**. Threats considered, mapped to [OWASP CICD-SEC Top 10](https://owasp.org/www-project-top-10-ci-cd-security-risks/):

| Risk | Threat | Mitigation |
|---|---|---|
| CICD-SEC-1 Insufficient Flow Control | Direct push to `main`, single-reviewer merge, auto-merge of malicious PR | Branch protection on `main` requires 2 reviewers; CODEOWNERS; release-please as the only path from `develop` to `main` |
| CICD-SEC-2 Inadequate IAM | Compromised maintainer account publishes malicious version | MFA enforced on maintainer accounts; npm publish via OIDC (no static token); GitHub Environments can be added if needed |
| CICD-SEC-3 Dependency Chain Abuse | Typosquat, dependency confusion, malicious transitive dep | `package-lock.json` integrity hashes; `lockfile-lint` restricts to npm registry over HTTPS; Trivy SCA on PR + weekly cron; Dependabot updates |
| CICD-SEC-4 Poisoned Pipeline Execution | Malicious workflow change introduced via PR | Workflow files require CODEOWNERS approval; `zizmor` lints workflows on every change; `step-security/harden-runner` audits egress |
| CICD-SEC-5 Insufficient PBAC | Workflows have excessive permissions | All workflows declare scoped `permissions:` blocks (`contents: read` default); write scopes minimized to publishing jobs |
| CICD-SEC-6 Insufficient Credential Hygiene | Hardcoded secret committed | TruffleHog + gitleaks scan on every PR; `.gitignore` excludes common secret stores; npm publish uses OIDC |
| CICD-SEC-7 Insecure System Configuration | Build runner misconfigured | GitHub-hosted ephemeral runners; `harden-runner` egress audit; container pinning where containers are used |
| CICD-SEC-8 Ungoverned Use of 3rd-Party Services | Unreviewed third-party action runs in workflow | All actions pinned to commit SHA with version comment; Dependabot updates github-actions ecosystem |
| CICD-SEC-9 Improper Artifact Integrity Validation | Tampered artifact published to npm | `actions/attest-build-provenance` Sigstore attestation; `gh attestation verify` runs in publish job before `npm publish`; npm publish with `--provenance` |
| CICD-SEC-10 Insufficient Logging and Visibility | Pipeline tampering goes undetected | `harden-runner` egress logs; OSSF Scorecard weekly; GitHub audit log retained at org level |

## Trust Boundaries

- **Maintainer machine → VCS:** signed commits + DCO sign-off required; HTTPS only.
- **VCS → CI runner:** GitHub Actions OIDC; no long-lived deploy tokens; per-workflow scoped `permissions:`.
- **CI runner → npm registry:** OIDC short-lived token, no `NPM_TOKEN` secret; `--provenance` attaches Sigstore signature.
- **CI runner → GitHub releases:** scoped `contents: write` on the release job only; release is created in `draft` state.
- **CI runner → external network:** `harden-runner` in `audit` mode with `disable-telemetry: true` (no data sent to StepSecurity); egress logs land in the GitHub Actions log only. Flip to `block` once allowlist stabilizes.

Anything outside these boundaries (consumer-side runtime, downstream package builds) is out of scope for this policy.

## Secrets and Credentials

- No long-lived secrets are required by the publish pipeline; npm publishing uses OIDC.
- `secrets.GITHUB_TOKEN` is auto-rotated per job by GitHub.
- Credentials policy:
  - No hardcoded credentials in source or workflow files (enforced by TruffleHog + gitleaks).
  - No production credentials in development workflows.
  - Secrets scoped to the minimum job and step that needs them.
  - Secrets never echoed to logs.
- Reporting accidentally committed credentials: see [Reporting a Vulnerability](#reporting-a-vulnerability) — treat as a P0.

## Open Source Components

- All dependencies pinned via `package-lock.json` with integrity hashes.
- `lockfile-lint` enforces npm-registry-only sources over HTTPS.
- Trivy SCA on every PR + weekly cron.
- License allowlist enforced via `package.json` script: `0BSD, Apache-2.0, BSD-1-Clause, BSD-2-Clause, BSD-3-Clause, CC0-1.0, CC-BY-4.0, ISC, MIT`.
- Components reaching end-of-life are surfaced by Dependabot and tracked in issues.
- `npm audit signatures` runs in the publish job to verify dependency provenance.

## Supported Versions

Only the latest major version is supported for security updates.

## Reporting a Vulnerability

The core OSS team and community take all security vulnerabilities seriously. Thank you for improving the security of our open source software. We appreciate your efforts and responsible disclosure and will make every effort to acknowledge your contributions.

Report security vulnerabilities by emailing the lead maintainer at:

```
willfarrell@proton.me
```

This email address does support PGP.

The lead maintainer will acknowledge your email within 14 days, and will send a more detailed response within the following 48 hours indicating the next steps in handling your report. After the initial reply to your report, the security team will endeavour to keep you informed of the progress towards a fix and full announcement, and may ask for additional information or guidance. We will try to have a fix completed as soon as possible, but no longer than 60 days. Credit, if requested, can be included within the release notes.

Report security vulnerabilities in third-party modules to the person or team maintaining the module.

## Disclosure Policy

When the security team receives a security bug report, they will assign it to a primary handler. This person will coordinate the fix and release process, involving the following steps:

- Confirm the problem and determine the affected versions.
- Audit code to find any potential similar problems.
- Prepare fixes for all releases still under maintenance. These fixes will be released as fast as possible.

## Pipeline Incident Response

For incidents affecting the pipeline itself (compromised maintainer credentials, unauthorized publish, attestation verification failure on a published artifact, leaked secret in a workflow log):

1. **Contain.** Revoke any suspected credentials immediately. Disable affected GitHub Actions via repository settings if a workflow is actively malicious. Rotate `GITHUB_TOKEN` is automatic per-run; npm OIDC tokens are short-lived (no rotation needed).
2. **Assess.** Identify the affected versions. Use `gh attestation verify` against published artifacts on registry.npmjs.org to detect tampering. Cross-reference Sigstore transparency log entries.
3. **Notify.** If a malicious version reached npm, deprecate it via `npm deprecate` and publish a security advisory via GitHub Security Advisories. Notify dependents through standard release channels.
4. **Recover.** Rebuild and republish from a clean tag. Document the incident in `docs/CHANGELOG.md` security section.
5. **Review.** Within 30 days, publish a post-incident review covering root cause, blast radius, and pipeline changes that prevent recurrence.

This response process is exercised at least annually as part of pipeline maintenance.
