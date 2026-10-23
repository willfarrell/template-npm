# Release Plan

## Versioning

All releases follow [semantic versioning](https://semver.org/).

## Process

### Maintenance

Before deploying a new version, update all dependancies where possible without breaking changes.

### Publishing

1. Release Please Bot will trigger automatically and create a PR against `develop` with the version & changelog update
1. Merge the Release Please PR into `develop`
1. `prerelease.yml` will automatically open a `develop` -> `main` PR titled `release: vX.Y.Z`
1. Preview PR
1. Merge PR, this will trigger `release.yml`
1. Approve the `npm-publish` environment deployment when prompted (required reviewers gate the `publish` job)
1. CI stages the publish (`npm stage publish`); the package is not live yet
1. A maintainer runs `npm run release:approve` locally (requires `npm login` with 2FA) to approve the staged publish and make the version live
1. Delete branch
