# Illustrated bilingual help implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship substantive English/Chinese illustrated user guides and a working shared-source App help centre.

**Architecture:** Markdown remains the source of truth. A build exporter produces a versioned, allowlisted help catalogue with safe structured blocks and copied illustrations. H5 bundles that export so tutorial detail works without an unconfigured documentation domain; no raw HTML/MDX execution. Legacy database articles remain the fallback and Articles remains unchanged.

**Tech Stack:** Existing Docusaurus 3, Node test runner, remark AST; existing Vue 3/Vitest H5.

**Spec:** `docs/superpowers/specs/2026-11-18-bilingual-help-design.md`

## Global Constraints

- English and simplified Chinese have paired IDs; preserve existing traditional Chinese pages.
- Real UI captures use intercepted demo responses, never production writes or private accounts. Clearly caption demonstration data and illustrative diagrams.
- No production deployment, strategy execution, database deletion or historical migration edits.
- Internal specs/plans remain excluded from production builds and the exported help catalogue.
- Work on `docs/illustrated-user-help` and `feat/illustrated-help`, preserving unrelated `.idea/` files.

## Review Focus

- Unsafe links/paths/raw HTML in Markdown must not become executable help content.
- Missing catalogue, invalid JSON, timeout and missing translation must produce usable fallback, not an empty help page.
- Switching accounts must not expose stale search history or delayed private results.
- Current F&G bands, relative profit drawdown and completed-round semantics must not be confused with price points or opening count.
- Small screens and long translated labels must not overflow; each key tutorial must have meaningful illustrations.

### Task 1: Shared help export

**Files:** `scripts/export-help.mjs`, `scripts/export-help.test.mjs`, `help-topics.json`, `package.json`.

**Interfaces:** `exportHelp({root, output})` produces `catalog.json` with `{version:1, articles:[{id,locale,category,title,summary,searchText,blocks}]}` plus local images. Safe blocks use only explicit tag/attribute allowlists. Export only topic IDs in `help-topics.json` and locales `en`/`zh-Hans`.

- [ ] Write Node tests for paired locales, controlled Markdown fixtures, link/path rejection, missing image and excluded internal material.
- [ ] Run failing tests, implement exporter, rerun to green.
- [ ] Add export/check scripts and explicit parser dependencies; baseline typecheck/build.

### Task 2: Illustrated user manual

**Files:** `docs/guides/*.md`, paired `i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/*.md`, `static/img/guides/*`, screenshot capture script and source audit, `sidebars.ts`, homepage and locale navigation.

**Interfaces:** Every allowlisted topic has same ID and appropriate locale, title, summary, substantive steps, limitations and troubleshooting. Core guides link to locally stored UI captures or explicitly labelled diagrams.

- [ ] Inspect relevant H5/API code and record exact field semantics and current menu paths.
- [ ] Capture current H5 pages using mocked network/session; render reusable rule diagrams from repo-native SVG.
- [ ] Author quick start, exchange, DCA, F&G, market/alerts, notification channels and escalation, inbox, sharing, account, troubleshooting, FAQ and separate operations guide in both languages.
- [ ] Update sidebar/homepage away from Bark-only onboarding; retain existing Bark routes as optional/legacy.
- [ ] Run catalogue checks, typecheck and full multilingual production build, verify assets and excluded private files.

### Task 3: App help integration

**Files (H5):** `scripts/sync-help-docs.mjs`, `src/api/helpDocs.ts`, `src/views/help/*`, safe node/detail components, route entries; generated `public/help-docs/*`.

**Consumes:** Task 1's version-1 catalogue. **Produces:** category/search guide index, `/help/docs/:id` structured detail, explicit English fallback and labelled legacy fallback. Existing `/articles/*` and account-scoped search history remain compatible.

- [ ] Write failing service/component tests for language selection, unsafe nodes/links, category/search results, unavailable catalogue/legacy fallback and late account responses.
- [ ] Implement fetch timeout (8s), safe schema validation and shared public-data cache; sync script refreshes generated assets only, without deleting unrelated paths.
- [ ] Render responsive illustrated guide details; no raw HTML or new third-party markdown runtime.
- [ ] Run focused tests, entire Vitest suite, typecheck and production build.

### Task 4: Review and handoff

- [ ] Preview Docusaurus and H5 on phone/desktop widths, inspect screenshots and verify deep links.
- [ ] Fresh read-only whole-change review; fix substantive findings with regression tests.
- [ ] Commit focused docs/frontend changes and report validation plus remaining manual/device QA, without claiming production deployment.
