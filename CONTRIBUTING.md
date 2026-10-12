# Contributing to Lisan Studio

Fork the repository and create a branch for your change. Describe the problem and the resulting behavior in your pull request. Screenshots help when you change the interface; check English and Arabic layouts.

## Local workflow

Use Node.js 22 or newer:

```sh
npm ci
npm run check
npm test
npm start
```

The test suite uses a local mock provider. Do not add real API keys or charged generation calls to automated tests. Keep the source media validation, upload consent, localhost binding, and uncertain-upload recovery behavior intact.

Edit `server/app.mjs` or `server/index.mjs`, rather than generated bundles. `npm start` rebuilds them. Commit `package-lock.json` when changing dependencies, but do not commit `node_modules/`, `data/`, generated server bundles, or private media.

For a bug report, include the operating system, Node version, steps to reproduce, and a sanitized error message. Remove credentials, signed download links, personal video names, and private transcripts. A public issue is not a place to share API keys.

Contributions are made under the project's MIT License. Third-party assets must have a compatible license and appropriate attribution.
