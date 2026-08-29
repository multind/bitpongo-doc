# Bitpongo Documentation

The source for the Bitpongo documentation website, built with Docusaurus.

## Requirements

- Node.js 20 or later
- npm 10 or later

## Local development

```bash
npm install
npm start
```

The development site is available at `http://localhost:3000`.

## Production build

```bash
npm run typecheck
npm run build
npm run check:i18n
npm run serve
```

The generated static site is written to `build/`. A full build generates English at `/`, Simplified Chinese at `/zh-Hans/`, and Traditional Chinese at `/zh-Hant/`.

## Add documentation

English Markdown or MDX files belong under `docs/` and are registered in `sidebars.ts`.

Localized documents use the same relative path under:

```text
i18n/zh-Hans/docusaurus-plugin-content-docs/current/
i18n/zh-Hant/docusaurus-plugin-content-docs/current/
```

Homepage and theme translations are stored in each locale's `code.json`, `navbar.json`, and `footer.json`. When adding new translatable interface text, regenerate the catalogs before translating them:

```bash
npm run write-translations -- --locale zh-Hans
npm run write-translations -- --locale zh-Hant
```

Static assets belong under `static/`.

## License

MIT
