# Bitpongo Documentation

[English](README.md) | [简体中文](README_zh-CN.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.10.2-3ECC5F.svg)](https://docusaurus.io/)
[![Languages](https://img.shields.io/badge/languages-en%20%7C%20zh--Hans%20%7C%20zh--Hant-18D6C6.svg)](#localization)

This repository contains the source for the Bitpongo documentation website. It is built with Docusaurus and publishes English, Simplified Chinese, and Traditional Chinese documentation from one versioned source tree.

The documentation currently covers Bitpongo concepts, project entry points, and Bark notification setup. Contributions should keep all supported languages synchronized.

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
- Update English, Simplified Chinese, and Traditional Chinese content together.

## Contributing

1. Create a focused branch.
2. Update the English source and both Chinese translations.
3. Run type checking, the production build, and `check:i18n`.
4. Verify navigation at desktop and mobile widths.
5. Open a pull request describing the affected documents and locales.

## License

Released under the [MIT License](LICENSE).
