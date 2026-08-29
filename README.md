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
npm run serve
```

The generated static site is written to `build/`.

## Add documentation

Add Markdown or MDX files under `docs/`, then register them in `sidebars.ts`.
Static assets belong under `static/`.

## License

MIT
