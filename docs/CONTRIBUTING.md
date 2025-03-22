# Contributing

In the spirit of Open Source Software, everyone is very welcome to contribute to this repository. Feel free to [raise issues](https://github.com/willfarrell/template-npm/issues) or to [submit Pull Requests](https://github.com/willfarrell/template-npm/pulls). All issues will be responded to within 2-12 months. You can view a full history of [all issues](https://github.com/willfarrell/template-npm/issues).

Before contributing to the project, make sure to have a look at our [Code of Conduct](/docs/CODE_OF_CONDUCT.md).

## 1. Fork

Ensure git history is pulled from the `develop` branch.

## 2. Setup

```bash
npm i -g @sandworm/audit
brew install semgrep
brew install trufflehog
brew install --cask zap
```

## 3. Testing

```bash
npm test
```

Ensure tests are updated and pass.

- [ ] Linting
- [ ] Unit tests
- [ ] SAST
- [ ] Performance benchmarks
- [ ] DAST

All tests are automatically enforced using GitHub Actions on Pull-Requests.

## 4. Committing

Ensure git commits meet the following FLOSS Best Practices:

- Message follows [Conventional Commits](https://www.conventionalcommits.org/) pattern. This is automatically enforce using `@commitlint/cli`.
- Message includes sign off for [Developer Certificate of Origin (DCO)](https://developercertificate.org/) compliance. This is automatically enforced using GitHub Actions on Pull-Requests.
  a. `git config --global user.name "Your Name"` and `git config --global user.email username@example.org` setup with `--signoff` flag on `git commit`
  a. Or, `Signed-off-by: username <email address>` as the last line of a commit, when a change is made through GitHub
- Commit is cryptographically signed and can be verified. This is automatically enforced GitHub security configuration. [GitHub Docs: About commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)

## 5. Pull Request (PR)

Submit a PR to the `develop` branch. Keep PR in draft mode until all automated tests are successful. Once ready, at least 2 maintainers will review the PR and request changes if necessary.

## 6. Release

If you are a maintainer and want to release a new version, consult the [RELEASE manual](/docs/RELEASE.md).
