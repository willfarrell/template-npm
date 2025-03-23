# Roadmap

See [milestones](https://github.com/willfarrell/template-npm/milestones) for planned upcoming releases.

## Docs

- OSSF Self reporting
- Update release doc to use release-please
- total code coverage badge (%)
- Threat modelling
- Monorepo changes
- Setup GitHub org-bot account
  - Owns tokens for org

## Scripts

## Actions

- `test-unit` Error on reduction of code coverage
- `test-perf` Error on reduction of performance
- streamline release process
  - Needs to support signed releases - https://github.com/googleapis/release-please/issues/1314
- automate secret rotation (npm)
- automate secret rotation (release-please)
- deprecate experimental flag `--experimental-test-coverage`

## Schedule

Repository will be reviewed annually after each nodejs major LTS release. Deprecate support for old versions nodejs.
Security review should be conduced for every major version release, or every 5 years, which ever comes first.
