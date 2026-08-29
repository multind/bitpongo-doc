# Bitpongo Documentation Rebuild Specification

Rebuild the repository as a standard Docusaurus 3 TypeScript Classic site instead of retaining the upstream Docusaurus framework monorepo.

The public site must include the Bitpongo logo and favicon, a branded homepage, an introduction, the existing Bark notification tutorial, GitHub links, and the MIT license. The sample blog and tutorial content must be removed. The internal implementation plan must not be published as documentation.

The result must pass TypeScript checking and a production build under Node.js 20 or later, then be served locally for route verification.
