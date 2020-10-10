# Semver Parse

This GitHub Action parses semver strings.

## Outputs

**major**: The major version component.

**minor**: The minor version component.

**patch**: The patch version component.

**prerelease**: The merged prerelease component of the version.

**build**: The merged build component of the version.

**version**: The parsed, validated semver string. Empty if not valid.

## Example

```yml
name: Tag creation

on:
  push:
    tags:
      - v*

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Get the version
        id: version
        run: echo ::set-output name=VERSION::${GITHUB_REF/refs\/tags\//}
        shell: bash

      - uses: apexskier/github-semver-parse@v1
        id: semver
        with:
          version: ${{ steps.version.outputs.VERSION }}

      - name: Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.RELEASE_GH_TOKEN }}
        with:
          tag_name: ${{ steps.version.outputs.VERSION }}
          release_name: ${{ steps.version.outputs.VERSION }}
          prerelease: ${{ !!steps.semver.outputs.prerelease }}
```

## Versions

Workflows will automatically update the tags `v1` and `latest`, allowing you to reference one of those instead of locking to a specific release.
