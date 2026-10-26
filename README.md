# nuxt-vp-starter

A [Nuxt](https://nuxt.com) starter that uses [Vite+](https://viteplus.dev/guide/) (`vp`) to install packages, format, lint, check types and run tests.

## Requirements

- Node.js 24. The version is in `.node-version`.
- The Vite+ global CLI. To install it, see the [Vite+ guide](https://viteplus.dev/guide/).
- A Cloudflare account, for the deploy.

## Setup

```bash
vp install
```

This command also installs the Git hooks.

## Commands

| Command                                     | What it does                                                   |
| ------------------------------------------- | -------------------------------------------------------------- |
| `vpr dev`                                   | Starts the development server on `http://localhost:3000`.      |
| `vpr build`                                 | Builds the app for production.                                 |
| `vp check`                                  | Checks format, lint rules and types in TypeScript files.       |
| `vp check --fix`                            | Formats the files and fixes the lint problems that it can fix. |
| `vpr typecheck`                             | Checks types in Vue and TypeScript files with `vue-tsc`.       |
| `vp test`                                   | Runs the tests.                                                |
| `vp exec void db generate`                  | Makes a SQL migration from the changes in `db/schema.ts`.      |
| `vp exec void db migrate`                   | Applies the migrations to the local database.                  |
| `vp exec void deploy --platform cloudflare` | Builds the app and deploys it to Cloudflare.                   |

> [!IMPORTANT]
> Use `vpr dev` and `vpr build`. The `vp dev` and `vp build` commands run plain Vite, not Nuxt.

## Database

The app keeps its data in [Cloudflare D1](https://developers.cloudflare.com/d1/). [Void](https://void.cloud) connects the server routes to D1 and applies the migrations. The tables are in `db/schema.ts`. The SQL migrations are in `db/migrations/`.

Before you start the development server for the first time, apply the migrations to the local database:

```bash
vp exec void db migrate
```

When you change `db/schema.ts`, make a migration and apply it:

```bash
vp exec void db generate
vp exec void db migrate
```

Commit the new files in `db/migrations/`. A deploy stops when the schema has changes that have no migration.

## API

| Method | Path         | What it does                                                                                                             |
| ------ | ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/todos` | Returns the 100 newest todos.                                                                                            |
| `POST` | `/api/todos` | Adds a todo. Body: `{ "title": "Buy milk" }`. The title must have 1 to 200 characters. Returns the todo with status 201. |

The routes are in `server/api/`. They are examples. Replace them with your tables and routes.

## Deploy

[Void](https://void.cloud) builds the app, creates the D1 database, applies the migrations and deploys the Worker to your Cloudflare account.

> [!WARNING]
> Before the first deploy, change `name` in `package.json`. Void uses it as the Worker name. Void names the D1 database `<name>-db`. Two apps with the same name in one Cloudflare account share the Worker and the database.

Do the first deploy from your computer:

```bash
vp exec void deploy --platform cloudflare
```

Void opens your browser to sign in to Cloudflare. Void writes the IDs of the Cloudflare resources to `void.lock.json`. This template does not commit that file, because it holds the IDs of one Cloudflare account. In your project, remove `void.lock.json` from `.gitignore`, then commit the file.

To use a custom domain, add it to `cloudflare.routes` in `void.config.ts`:

```ts
export default defineConfig({
  cloudflare: {
    routes: [{ pattern: 'app.example.com', custom_domain: true }],
  },
});
```

Do not add the domain only in the Cloudflare dashboard. Void can stop a deploy when the Worker has routes that you added in the dashboard. Keep the preview URLs of the Worker on. Void tests each new version on its preview URL before it sends traffic to it.

## Commits

The Git hooks do these checks:

- Before a commit, `vp staged` runs `vp check --fix` on the staged files.
- On each commit message, commitlint checks the [Conventional Commits](https://www.conventionalcommits.org) format. Example: `feat(home): add hero section`.

## CI

| File                             | When it runs                 | What it does                                                                                |
| -------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------- |
| `.github/workflows/pr.yml`       | On each pull request         | Runs all the checks, the tests and the build. Checks the workflow files with zizmor.        |
| `.github/workflows/pr-title.yml` | On each pull request         | Checks the PR title with commitlint.                                                        |
| `.github/workflows/deploy.yml`   | On each push to `main`       | Runs all the checks, the tests and the build. Then deploys the app to Cloudflare with Void. |
| `.github/workflows/verify.yml`   | When other workflows call it | Contains the shared checks.                                                                 |

`deploy.yml` deploys only when the `CLOUDFLARE_API_TOKEN` secret is set. Without it, the deploy job shows a warning, skips the deploy steps and ends as passed. Add these values in **Settings > Secrets and variables > Actions**:

| Name                           | Type     | When you need it                                                                                                                 |
| ------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`         | Secret   | Always. For the token permissions, see [Deploying from CI](https://void.cloud/integrations/cloudflare#deploying-from-ci).        |
| `CLOUDFLARE_ACCOUNT_ID`        | Variable | When the token can access more than one Cloudflare account.                                                                      |
| `CLOUDFLARE_WORKERS_SUBDOMAIN` | Variable | Only when a deploy fails because the Worker version has no preview URL. Use your `workers.dev` subdomain, for example `my-team`. |

Do the first deploy from your computer and commit `void.lock.json` before you add the secret.

To use the PR title as the squash merge commit message, open **Settings > General > Pull Requests**. Under **Allow squash merging**, set **Default commit message** to **Pull request title**.

Each week, Dependabot opens update PRs for npm packages and GitHub Actions. It waits 7 days after a release, and 14 days after a major npm release. It does not open PRs for major updates of `@types/node` and `typescript`.

## Update Vite+

Dependabot does not update Vite+. `vite-plus` and the `vite` alias in `pnpm-workspace.yaml` must have the same version. `vp upgrade` updates the global `vp` CLI. Then `vp migrate` sets `vite-plus` and the `vite` alias to the version of the global CLI:

```bash
vp upgrade
vp migrate
```

For more information, see [Update Vite+](https://viteplus.dev/guide/upgrade-project).
