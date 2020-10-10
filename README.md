# Semver Parse

This GitHub Action parses semver strings.

## Example

```yml
on:
  release:
    types: [published]

jobs:
  release:
    steps:
      - uses: apexskier/github-semver-parse@v1
        id: semver
        with:
          version: v1.12.123-alpha.1+BUILD.ID
```
