# NAIS Test Automation Framework

End-to-end UI and API tests for [test-me.vzl.one](https://test-me.vzl.one/), built with JavaScript and Cypress.

## Requirements

- Node.js 22 LTS or newer
  (see [Cypress system requirements](https://docs.cypress.io/app/get-started/install-cypress#System-requirements))
- npm
- Google Chrome (the default browser for runs)

## Installation

```bash
npm ci
```

## Configuration

All settings live in `cypress.config.js`:

No credentials are required: every API test creates its own isolated workspace through `POST /api/workspaces` and
passes the returned token in the `x-workspace-token` header, so tests do not share or modify each other's data.

## Running tests

Interactive mode (Cypress Test Runner):

```bash
npx cypress open
```

UI tests in headed mode:

```bash
npm run e2e
```

API tests in headless mode:

```bash
npm run api
```

Run the whole suite headless, as on CI:

```bash
npx cypress run
```

## Report

Results of local runs are printed to the terminal; screenshots of failed tests are saved to `cypress/screenshots`.
Every API call is logged both to the Cypress command log and to the terminal (request body and response).

On CI the runs are recorded to [Cypress Cloud](https://cloud.cypress.io/) (project id `hztpmj`), where the full report,
history and failure screenshots are available.

## CI

The `.github/workflows/cypress.yml` workflow is started manually (`workflow_dispatch`) and runs two jobs — UI tests and
API tests — each parallelised across two containers through Cypress Cloud. Screenshots of failed UI tests are uploaded
as a workflow artifact and kept for 7 days.

## Directory structure

```
.
├── .github
│   └── workflows
├── cypress
│   ├── api
│   │   └── facades
│   ├── e2e
│   │   ├── api
│   │   └── ui
│   ├── fixtures
│   └── support
│       └── pages
├── cypress.config.js
└── TESTCASES.md
```

| Directory               | Purpose                                                                                          |
|-------------------------|--------------------------------------------------------------------------------------------------|
| `.github/workflows`     | GitHub Actions workflow for running the tests on CI with Cypress Cloud                           |
| `cypress/api`           | The transport layer: `ApiClient` — a wrapper around `cy.request()` with request/response logging |
| `cypress/api/facades`   | API facades — the business logic built on top of the client, one per resource                    |
| `cypress/e2e/api`       | API tests                                                                                        |
| `cypress/e2e/ui`        | UI e2e tests                                                                                     |
| `cypress/fixtures`      | Static test data (empty now but created by default)                                              |
| `cypress/support`       | Cypress support files, custom commands and helpers)                                              |
| `cypress/support/pages` | Page objects                                                                                     |
