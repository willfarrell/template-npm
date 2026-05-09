# OWASP SPVS 1.5 — Self-Attested Compliance Map

This is a self-attestation against [OWASP SPVS](https://owasp.org/www-project-spvs/), specifically the **1.0 base requirements** as published in the 1.5 release. It is **not third-party verified**. The maintainers welcome external audits.

**Scope:**
- ✅ SPVS 1.0 base controls (pipeline security) — audited and mapped below.
- ➖ SPVS 1.5 AI Pipeline Security addendum — **not applicable**. This is a non-AI npm library template; it does not build, train, deploy, fine-tune, or invoke AI/ML models, agents, or MCP tool servers. The 1.5 controls covering AIBOM, agent identity, prompt sanitization, model supply chain, and runtime safeguards are out of scope by project nature.

**Claimed level:** Level 2 (pipeline-actionable controls). Selected Level 3 controls are also met where the evidence is in-repo or in GitHub branch settings; org-level L3 controls (centralised IdP, quarterly admin audits, IR drill testing) require evidence outside this repository.

**Last reviewed:** see git log on this file.

Legend:
- ✅ Met — evidence inline.
- ⚠️ Partial — partial evidence; gap noted.
- 📄 Policy — met by policy in `SECURITY.md` or this doc; no automated enforcement possible.
- ➖ N/A — not applicable to a pure npm library template.

## V1 — Plan

| ID | Level | Control | Status | Evidence |
|---|---|---|---|---|
| V1.1.1 | L2 | MFA on developer laptops | 📄 | Maintainer policy; not repo-enforceable |
| V1.1.2 | L3 | Centralised IdP for all identities | 📄 | Out of scope for personal-account project |
| V1.1.3 | L3 | Pipeline tools follow least privilege | ✅ | Scoped `permissions:` in every workflow |
| V1.1.4 | L3 | Stale identities removed | 📄 | GitHub org policy |
| V1.1.5 | L2 | Service account tokens reviewed | ✅ | Only `secrets.GITHUB_TOKEN` (auto-rotated) and OIDC; no static service tokens |
| V1.1.6 | L2 | VCS requires MFA | 📄 | GitHub MFA enforcement on maintainer accounts |
| V1.1.7 | L2 | Quarterly VCS admin audit | 📄 | Maintainer policy |
| V1.1.8 | L1 | Secrets encrypted at rest + in transit | ✅ | GitHub Secrets (encrypted at rest); HTTPS-only via lockfile-lint `--validate-https` |
| V1.2.1-4 | L1 | Endpoint protection / patching / FDE | 📄 | Maintainer device policy |
| V1.2.5-6 | L3 | Auto-lock, CIS benchmarks | 📄 | Maintainer device policy |
| V1.3.1 | L1 | Documented software pipeline | ✅ | `docs/PIPELINE.md` |
| V1.3.2 | L1 | Secure dev policy covers OWASP CICD-SEC Top 10 | ✅ | `SECURITY.md` Threat Model section |
| V1.3.3 | L2 | Secure OSS policy | ✅ | `SECURITY.md` Open Source Components section |
| V1.3.4 | L1 | Secrets/credentials policy | ✅ | `SECURITY.md` Secrets and Credentials section |
| V1.3.5 | L1 | Developers reviewed secure dev policy | 📄 | Maintainer attestation; CODEOWNERS approval gates |
| V1.4.1-5 | L1-L2 | Approved/up-to-date IDE + plugins, secure protocols, monitoring | 📄 | Maintainer device policy |
| V1.5.1 | L1 | VCS with RBAC | ✅ | GitHub |
| V1.5.2 | L1 | `.gitignore` present | ✅ | `.gitignore` |
| V1.5.3 | L3 | Branch schema enforced | ✅ | `develop → main` flow; branch protection documented in `docs/PIPELINE.md` |

## V2 — Develop

| ID | Level | Control | Status | Evidence |
|---|---|---|---|---|
| V2.1.1 | L1 | Secure coding OSS policy enforcement | ✅ | `SECURITY.md` |
| V2.2.1-2 | L1 | Monthly linting + remediation | ✅ | `test-lint.yml` runs Biome on every PR |
| V2.2.3-4 | L1 | Monthly style scans + remediation | ✅ | Biome covers style |
| V2.2.5 | L2 | Unit tests cover security paths | ✅ | `index.test.js` + `index.fuzz.js` |
| V2.2.6 | L1 | Code-quality tools flag insecure patterns | ✅ | Biome + semgrep + CodeQL |
| V2.3.1 | L3 | Code review policy requires security review | ✅ | `.github/CODEOWNERS` + branch protection (2 reviewers) |
| V2.3.2 | L3 | Reviews conducted per policy | ✅ | Branch protection enforced |
| V2.4.1-3 | L2 | First-party SAST monthly + current | ✅ | CodeQL on every PR + weekly cron; pinned to v3.30.5 |
| V2.4.4-6 | L2 | 3rd-party code SAST monthly + current | ✅ | Trivy + semgrep on every PR; weekly cron |
| V2.4.7-9 | L2 | Secrets detection monthly + current | ✅ | TruffleHog + gitleaks on every PR + weekly cron (test-sast.yml) |
| V2.4.10-13 | L2 | IaC scanning | ➖ | No IaC in this template |
| V2.4.14 | L2 | 3rd-party libs scanned for known vulns | ✅ | Trivy SCA |
| V2.4.15 | L2 | 3rd-party libs updated promptly | ✅ | Dependabot weekly with cooldown |
| V2.4.16 | — | Pre-commit security checks | ⚠️ | Husky runs lint + unit; full SAST too heavy for pre-commit by design |
| V2.5.1 | L2 | No hardcoded credentials | ✅ | TruffleHog + gitleaks enforce |
| V2.6.1 | L3 | Deps from trusted sources, hashes verified | ✅ | `npm ci` integrity check + lockfile-lint + `npm audit signatures` in publish job |
| V2.6.2 | L3 | Dep versions pinned (dep confusion) | ✅ | `package-lock.json` + lockfile-lint allowed-hosts |
| V2.7.1-2 | L2 | Security unit tests automated | ✅ | fast-check fuzz tests; `node --test` on every PR |

## V3 — Integrate (CI)

| ID | Level | Control | Status | Evidence |
|---|---|---|---|---|
| V3.1.1 | L1 | Build servers hardened/patched | ✅ | GitHub-hosted ephemeral `ubuntu-latest` |
| V3.1.2 | L2 | Build server access restricted | ✅ | GitHub Actions ACLs |
| V3.1.3 | L2 | Build servers monitored | ✅ | `step-security/harden-runner` egress audit on every job |
| V3.1.4 | — | Hardened to platform guidelines | ✅ | GitHub-managed runners |
| V3.1.5 | L3 | Build systems reviewed for misconfig | ✅ | `zizmor` job in `test-sast.yml` lints workflows on every PR + weekly cron |
| V3.2.1 | L1 | No hardcoded secrets in pipeline | ✅ | TruffleHog + gitleaks; GitHub Secrets only |
| V3.2.2 | L1 | Built-in secret manager / no hardcoding | ✅ | GitHub Secrets + OIDC for npm |
| V3.2.3 | L1 | Only authorized see secrets | ✅ | GitHub Secrets RBAC |
| V3.2.4 | L1 | Secrets not in logs | ✅ | GitHub Actions auto-masks |
| V3.2.5 | L2 | Secrets only used for integration | ✅ | No production secrets; OIDC for publish |
| V3.2.6 | L2 | Secret rotation per policy | ✅ | `GITHUB_TOKEN` per-job; OIDC = no static token |
| V3.3.1-3 | L1 | First-party SAST monthly + current | ✅ | CodeQL v3.30.5 on every PR |
| V3.3.4-6 | L1 | 3rd-party SAST monthly + current | ✅ | Trivy v0.33.1, semgrep 1.111.0 |
| V3.3.7-9 | L1 | Secrets detection monthly + current | ✅ | TruffleHog v3.95.2, gitleaks v2.3.9 |
| V3.3.10-13 | L1 | IaC tooling | ➖ | N/A |
| V3.3.14 | L1 | DAST | ✅ | fast-check fuzz tests in `test-dast.yml` (HTTP DAST not applicable to library) |
| V3.3.15 | L2 | Automated security scans on integration | ✅ | `test-sast.yml` triggered on every PR |
| V3.3.16 | L2 | Integration tests include security cases | ✅ | Fuzz tests |
| V3.3.17 | L2 | Security testing in CI | ✅ | Multiple SAST/DAST workflows |
| V3.3.18 | L3 | Branch protection enforced | ✅ | Documented in `docs/PIPELINE.md` |
| V3.3.19 | L3 | Auto-merge restricted | ✅ | Disabled per branch protection |
| V3.3.20 | L3 | Manual approval for sensitive ops | ✅ | 2-reviewer requirement on `main` is the manual approval gate; release follows from merge |
| V3.4.1 | L3 | Build artifacts cryptographically signed | ✅ | `actions/attest-build-provenance` (Sigstore); `npm publish --provenance` |
| V3.4.2 | L3 | Checksums validate before deployment | ✅ | `gh attestation verify` runs in publish job before `npm publish` |

## V4 — Release (CD)

| ID | Level | Control | Status | Evidence |
|---|---|---|---|---|
| V4.1.1 | L1 | Comprehensive security assessments on RC | ✅ | All SAST/DAST/lint/unit/perf run on every PR before merge |
| V4.2.1 | L1 | Pipeline policies documented + reviewed | ✅ | `SECURITY.md` + `docs/PIPELINE.md` + this file |
| V4.3.1 | L1 | Automated deployment | ✅ | `release.yml` |
| V4.3.2 | L2 | Deployment scripts reviewed | ✅ | CODEOWNERS + branch protection |
| V4.3.3 | L2 | Secure transfer protocols | ✅ | HTTPS-only registry; lockfile-lint `--validate-https` |
| V4.3.4 | L2 | Config in secrets manager | ➖ | Library has no runtime config |
| V4.3.5 | L2 | Prod isolated from dev/test | ➖ | Library — no environments |
| V4.3.6 | L2 | Deployment scripts check for unauthorized changes | ✅ | `gh attestation verify` + `npm audit signatures` before publish |

## V5 — Operate

| ID | Level | Control | Status | Evidence |
|---|---|---|---|---|
| V5.1.1-2 | L2 | User audits + access log review | 📄 | GitHub audit log (org-level) |
| V5.1.3 | L2 | PAM implemented + monitored | 📄 | GitHub permissions |
| V5.2.1-2 | L3 | Continuous policy enforcement | ✅ | OSSF Scorecard weekly; this evidence map |
| V5.3.1 | L1 | Patches applied timely | ✅ | Dependabot weekly + cooldown |
| V5.4.1 | L2 | Real-time monitoring + anomaly detection | ✅ | `harden-runner` egress audit; OSSF Scorecard |
| V5.4.2 | L2 | Logs reviewed for anomalies | 📄 | Maintainer review of harden-runner reports |
| V5.4.3 | L2 | Alerts responded to timely | 📄 | Maintainer policy; SLA in `SECURITY.md` |
| V5.5.1 | L2 | IR plans include pipeline incidents | ✅ | `SECURITY.md` Pipeline Incident Response section |
| V5.5.2 | L3 | IR plans tested regularly | 📄 | Annual tabletop exercise (maintainer commitment) |
| V5.5.3 | L3 | Recovery procedures tested | 📄 | Annual exercise |

## Gaps and Roadmap

- **V5.5.2 / V5.5.3** Annual IR drill — currently a maintainer commitment, not yet exercised. Will be performed and dated in this file.
- **`harden-runner` egress mode** Currently `audit` with `disable-telemetry: true` (no data sent to StepSecurity; egress events only in GitHub Actions log). Once egress allowlist is observed for one full release cycle, switch to `block`.
- **`npm audit signatures` enforcement** Now blocking in `release.yml`. If a dependency lacks a registry signature, the release fails — this may surface false positives until the npm ecosystem completes signature rollout. Investigate per failure.
