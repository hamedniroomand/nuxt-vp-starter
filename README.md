# vp-nuxt-starter

A [Nuxt](https://nuxt.com) starter that uses [Vite+](https://viteplus.dev/guide/) (`vp`) to install packages, format, lint, check types and run tests.

## Requirements

- Node.js 24. The version is in `.node-version`.
- The Vite+ global CLI. To install it, see the [Vite+ guide](https://viteplus.dev/guide/).

## Setup

```bash
vp install
```

This command also installs the Git hooks.

## Commands

| Command          | What it does                                                   |
| ---------------- | -------------------------------------------------------------- |
| `vpr dev`        | Starts the development server on `http://localhost:3000`.      |
| `vpr build`      | Builds the app for production.                                 |
| `vpr preview`    | Starts a local server for the production build.                |
| `vp check`       | Checks format, lint rules and types in TypeScript files.       |
| `vp check --fix` | Formats the files and fixes the lint problems that it can fix. |
| `vpr typecheck`  | Checks types in Vue and TypeScript files with `vue-tsc`.       |
| `vp test`        | Runs the tests.                                                |

> [!IMPORTANT]
> Use `vpr dev`, `vpr build` and `vpr preview`. The `vp dev`, `vp build` and `vp preview` commands run plain Vite, not Nuxt.

## Commits

The Git hooks do these checks:

- Before a commit, `vp staged` runs `vp check --fix` on the staged files.
- On each commit message, commitlint checks the [Conventional Commits](https://www.conventionalcommits.org) format. Example: `feat(home): add hero section`.

## CI

| File                             | When it runs                 | What it does                                                                                   |
| -------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------- |
| `.github/workflows/pr.yml`       | On each pull request         | Runs all the checks, the tests and the build. Checks the workflow files with zizmor.           |
| `.github/workflows/pr-title.yml` | On each pull request         | Checks the PR title with commitlint.                                                           |
| `.github/workflows/deploy.yml`   | On each push to `main`       | Runs all the checks, the tests and the build. Uploads `.output` as the `nuxt-output` artifact. |
| `.github/workflows/verify.yml`   | When other workflows call it | Contains the shared checks.                                                                    |

`deploy.yml` does not deploy the app yet. To deploy, add a job for your host to `deploy.yml`.

To use the PR title as the squash merge commit message, open **Settings > General > Pull Requests**. Under **Allow squash merging**, set **Default commit message** to **Pull request title**.

Each week, Dependabot opens update PRs for npm packages and GitHub Actions. It waits 7 days after a release, and 14 days after a major npm release. It does not open PRs for major updates of `@types/node` and `typescript`.

## Update Vite+

Dependabot does not update Vite+. `vite-plus` and the `vite` alias in `pnpm-workspace.yaml` must have the same version. `vp upgrade` updates the global `vp` CLI. Then `vp migrate` sets `vite-plus` and the `vite` alias to the version of the global CLI:

```bash
vp upgrade
vp migrate
```

For more information, see [Update Vite+](https://viteplus.dev/guide/upgrade-project).
