# Release Plan

## Versioning

All releases follow semantic versioning.

## Process

1. Pull latest commits from `develop` branch
1. Update `package.json` to the `version` desired.
1. Run `npm run release:sync` if necessary
1. git tag commit
1. submit PR from `develop` to `main`
1. merge PR
1. Create GitHub Release
1. On publish of release, `release.yml` will trigger and deploy to `npm`

## Schedule

Repository will be reviewed annually after each nodejs major LTS release.
