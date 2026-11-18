# Bitpongo Documentation

[English](README.md) | [简体中文](README_zh-CN.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.10.2-3ECC5F.svg)](https://docusaurus.io/)
[![Languages](https://img.shields.io/badge/languages-en%20%7C%20zh--Hans%20%7C%20zh--Hant-18D6C6.svg)](#localization)

This repository contains the source for the Bitpongo documentation website. It is built with Docusaurus and publishes English, Simplified Chinese, and Traditional Chinese documentation from one versioned source tree.

The illustrated handbook covers onboarding, exchange connections, DCA/F&G strategies, market and price alerts, notification channels, sharing, and account safety. The 16 new user topics and operator guide are available in English and Simplified Chinese. Existing Traditional Chinese pages remain available; new topics fall back to English.

## Shared App help content

The paired Markdown guides in `docs/guides/` and `i18n/zh-Hans/` are the source for both website and App Help Center. `help-topics.json` lists public user topics; operator guides and internal plans are excluded from App help.

Run `npm test`, `npm run typecheck`, `npm run build`, `npm run check:help` and `npm run check:i18n`. The build exports a safe structured catalogue and local illustrations to `build/help-docs/`.

In the sibling frontend checkout run `npm run sync:help`, then test/build and commit the generated `public/help-docs/` assets. Frontend builds work independently after synchronization. Updating this website alone does not update an installed App's bundled resources.

Screenshots use the actual H5 UI with intercepted local demo data, not real accounts or orders. Refresh them with a local H5 preview and `H5_PREVIEW_URL=http://127.0.0.1:5186 npm run capture:guides`. The script blocks external requests and never submits final strategy/alert forms. Diagrams use `node scripts/generate-guide-diagrams.mjs`. Review images for layout and sensitive data before committing.

## Try Bitpongo online

Open the hosted application at [https://app.imastermind.io](https://app.imastermind.io). Create an account or sign in, connect a supported exchange account, and then create and monitor an automated strategy directly in your browser.

This is a live service, not a simulated demo. Depending on your exchange and strategy settings, actions can submit real orders. Use an API key with trading permission only, keep withdrawal permission disabled, and review every setting before starting a strategy.

## Related repositories

| Project | Repository |
| --- | --- |
| Web frontend | [multind/bitpongo](https://github.com/multind/bitpongo) |
| Backend API | [multind/bitpongo-api](https://github.com/multind/bitpongo-api) |

## Requirements

- Node.js 20 or later
- npm 10 or later

## Local development

```bash
npm install
npm start
```

The development site is available at `http://localhost:3000`.

## Verification and production build

```bash
npm run typecheck
npm run build
npm run check:i18n
npm run serve
```

The generated site is written to `build/`:

| Language | Path |
| --- | --- |
| English | `/` |
| Simplified Chinese | `/zh-Hans/` |
| Traditional Chinese | `/zh-Hant/` |

`npm run check:i18n` verifies multilingual output, repository links, and mobile navigation CSS.

## Add documentation

English Markdown or MDX files belong under `docs/` and are registered in [`sidebars.ts`](sidebars.ts).

Use the same relative path for translations:

```text
docs/<document>.md
i18n/zh-Hans/docusaurus-plugin-content-docs/current/<document>.md
i18n/zh-Hant/docusaurus-plugin-content-docs/current/<document>.md
```

Static assets belong under `static/`. Reference them from documents with paths rooted at `/`, for example `/img/example.png`.

## Localization

The default locale is English. Supported locale identifiers are:

- `en`
- `zh-Hans`
- `zh-Hant`

Theme translations are stored in each locale's `code.json`, `navbar.json`, and `footer.json`. When adding new translatable interface text, regenerate the catalogs before translating them:

```bash
npm run write-translations -- --locale zh-Hans
npm run write-translations -- --locale zh-Hant
```

When changing navigation or footer links, update both the Docusaurus configuration and the localized translation files.

## Docker image

The Dockerfile packages the already generated `build/` directory into `nginx:latest`.

```bash
npm install
npm run typecheck
npm run build
npm run check:i18n
docker build -t corbettzhang/bitpongodoc:latest .
docker run --rm -p 8080:80 corbettzhang/bitpongodoc:latest
```

Open `http://localhost:8080` to verify the container.

Publish the image with:

```bash
docker push corbettzhang/bitpongodoc:latest
```

## Content guidelines

- Use clear, task-oriented headings and short examples.
- Never publish API keys, Bark device keys, passwords, access tokens, or production logs.
- Mark irreversible operations and trading risks explicitly.
- Keep commands executable and verify referenced paths before submitting a pull request.
- Keep English and Simplified Chinese guides paired. When updating existing Traditional Chinese pages, maintain their translations; new guides may explicitly fall back to English until translated.

## Contributing

1. Create a focused branch.
2. Update the paired English/Simplified Chinese guides and any affected existing Traditional Chinese translations.
3. Run type checking, the production build, and `check:i18n`.
4. Verify navigation at desktop and mobile widths.
5. Open a pull request describing the affected documents and locales.

## License

Released under the [MIT License](LICENSE).
