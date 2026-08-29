# Bitpongo Documentation Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the imported Docusaurus framework monorepo with a small, standard Bitpongo documentation site.

**Architecture:** Use the official Docusaurus 3.10.2 TypeScript Classic scaffold as the repository root. Keep public content in `docs/`, branding in `static/img/`, the landing page in `src/pages/`, and exclude internal planning files from document generation.

**Tech Stack:** Node.js 20, npm 10, Docusaurus 3.10.2, React 19, TypeScript 6.

**Spec:** `docs/superpowers/specs/2026-08-29-bitpongo-doc-rebuild.md`

## Global Constraints

- Preserve the existing Bitpongo logo, favicon, and Bark tutorial content.
- Publish only the introduction and Bark notification documentation.
- Use the MIT license with Bitpongo contributor attribution.
- Keep `@docusaurus/*` packages on version `3.10.2`.

---

### Task 1: Create the standard site

**Files:**
- Create: `package.json`
- Create: `docusaurus.config.ts`
- Create: `sidebars.ts`
- Create: `src/css/custom.css`
- Create: `src/pages/index.tsx`
- Create: `src/pages/index.module.css`

**Interfaces:**
- Consumes: Official Docusaurus TypeScript Classic scaffold.
- Produces: A single-locale site with `/`, `/docs/introduction`, and `/docs/notifications/bark` routes.

- [ ] **Step 1: Generate the official template**

  Run `npx create-docusaurus@latest site classic --typescript --package-manager npm --skip-install` and confirm version `3.10.2` is selected.

- [ ] **Step 2: Configure the public surface**

  Set the title to `Bitpongo Docs`, configure the `multind/bitpongo-doc` repository, disable the blog, register sidebar `docs`, and exclude `superpowers/**`.

- [ ] **Step 3: Add the branded homepage**

  Add links to `/docs/introduction`, `/docs/notifications/bark`, and `https://github.com/multind/bitpongo-doc`, using the Bitpongo orange palette and responsive single-column cards on screens narrower than 780px.

- [ ] **Step 4: Verify configuration and types**

  Run `npm run typecheck` and expect exit code 0.

### Task 2: Migrate and verify content

**Files:**
- Create: `docs/introduction.md`
- Create: `docs/notifications/bark.md`
- Create: `docs/notifications/_category_.yml`
- Create: `static/img/bitpongo-logo.png`
- Create: `static/img/bitpongo-favicon.png`
- Create: `LICENSE`
- Create: `README.md`

**Interfaces:**
- Consumes: Preserved Bitpongo assets and Bark tutorial.
- Produces: Complete public documentation and repository metadata.

- [ ] **Step 1: Restore preserved content**

  Copy the preserved Bark tutorial and image files into their listed target paths and verify their SHA-256 checksums match the backups.

- [ ] **Step 2: Install dependencies**

  Run `npm install` and confirm the lockfile is generated without package version conflicts.

- [ ] **Step 3: Build the production site**

  Run `npm run build` and expect exit code 0 with output in `build/`.

- [ ] **Step 4: Serve and check routes**

  Run `npm run serve -- --host 127.0.0.1 --port 3000`, then verify `/`, `/docs/introduction`, and `/docs/notifications/bark` return HTTP 200.

- [ ] **Step 5: Commit the rebuild**

  Commit all tracked changes with an `(AI-assisted)` disclosure in the commit message.
