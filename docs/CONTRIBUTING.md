# Contributing

In the spirit of Open Source Software, everyone is very welcome to contribute to this repository. Feel free to [raise issues](https://github.com/willfarrell/template-npm/issues) or to [submit Pull Requests](https://github.com/willfarrell/template-npm/pulls). All issues will be responded to within 2-12 months. You can view a full history of [all issues](https://github.com/willfarrell/template-npm/issues).

Before contributing to the project, make sure to have a look at our [Code of Conduct](/docs/CODE_OF_CONDUCT.md).

Want to help, but finding new features and bugs a little daunting to tackle. Improving documentation (grammar, spelling, examples, internationalization), improving unit test coverage, and refactoring to use newer native APIs are great places to add value.

## 1. Fork

Ensure git history is pulled from the `develop` branch.

## 2. Setup

```bash
npm i -g nmq
npm i -g lockfile-lint
brew install actionlint
brew install semgrep
brew install trivy
brew install trufflehog
brew install zizmor
brew install --cask zap
```

## 3. Implementation

When necessary ensure changes follow secure design principles. See [SECURITY.md](/SECURITY.md)

## 4. Testing

```bash
npm test
```

Ensure tests are updated and pass. All tests are automatically enforced using GitHub Actions on Pull-Requests.

### Formating / Linting

We use `biome` with recommended configurations plus a few correctness additions.

### Unit tests

We use `node --test` with a minimum test coverage of:

- lines: 100%
- branches: 100%
- functions: 100%

Of course higher is always better. Bug fixes should always start with a failing unit test.
New features should have acceptance and rejection tests.

### Mutation tests

We use `StrykerJS` to measure the _quality_ of the unit suite, not just its coverage. Line and branch
coverage prove the code was executed; they do not prove a test would fail if the code were wrong. Stryker
copies the project to a sandbox, applies one source mutation at a time (e.g. `return true` becomes
`return false`, or a string literal is emptied), and re-runs `node --test`. A mutant that survives a green
suite is an assertion the tests never make.

```bash
npm run test:mutation
```

The mutation score must be 100% (`thresholds.break` in `stryker.config.json`). A surviving
mutant means a missing or vacuous assertion — fix the test, not the threshold.

### SAST

We use `CodeQL` & `semgrep` to ensure code is written in a secure way.

#### SCA

We use `DependaBot` & `sandworm` to ensure dependancies as free of known vulnerabilities.

### DAST

We use `fast-check` to run fuzzing on user inputs. It is expected that user inputs are pre-validated and/or sanitized
before reaching this packages inputs.

### Performance benchmarks

We use the built-in [`node:bench`](https://nodejs.org/api/bench.html) (Node.js >= 26.9) to ensure there are no performance regressions. Benchmarks live in `*.bench.js` files and run with `npm run test:bench`.

## 5. Committing

Ensure git commits meet the following FLOSS Best Practices:

- Message follows [Conventional Commits](https://www.conventionalcommits.org/) pattern. This is automatically enforce using `@commitlint/cli`.
- Message includes sign off for [Developer Certificate of Origin (DCO)](https://developercertificate.org/) compliance. This is automatically enforced using GitHub Actions on Pull-Requests.
  a. `git config --global user.name "Your Name"` and `git config --global user.email username@example.org` setup with `--signoff` flag on `git commit`
  a. Or, `Signed-off-by: username <email address>` as the last line of a commit, when a change is made through GitHub
- Commit is cryptographically signed and can be verified. This is automatically enforced GitHub security configuration. [GitHub Docs: About commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)

## 6. Pull Request (PR)

Submit a PR to the `develop` branch. Keep PR in draft mode until all automated tests are successful. Once ready, at least 2 maintainers will review the PR and request changes if necessary. Reviewers will be evaluating for secure design principles.

## 7. Release

If you are a maintainer and want to release a new version, consult the [RELEASE manual](/docs/RELEASE.md).
