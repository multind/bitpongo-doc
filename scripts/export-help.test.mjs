import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, readFile} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {exportHelp} from './export-help.mjs';

async function fixture(t, body = '## Start\n\nChoose **BTC**.\n\n![Demo](/img/guides/demo.svg)') {
  const root = await mkdtemp(path.join(os.tmpdir(), 'bitpongo-help-test-'));
  // Intentionally leave temporary fixtures recoverable; no recursive deletion of arbitrary paths.
  for (const dir of ['docs/guides', 'i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides', 'static/img/guides'])
    await mkdir(path.join(root, dir), {recursive: true});
  await writeFile(path.join(root, 'help-topics.json'), JSON.stringify([{id: 'start', category: 'start'}]));
  await writeFile(path.join(root, 'static/img/guides/demo.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  for (const [dir, title] of [['docs', 'Start'], ['i18n/zh-Hans/docusaurus-plugin-content-docs/current', '开始']])
    await writeFile(path.join(root, dir, 'guides/start.md'), `---\ntitle: ${title}\ndescription: A practical guide\n---\n\n${body}`);
  return {root, output: path.join(root, 'export')};
}

test('exports paired public guides, structured formatting and local images', async (t) => {
  const options = await fixture(t);
  const result = await exportHelp(options);
  assert.equal(result.version, 1);
  assert.deepEqual(result.articles.map(a => [a.id, a.locale, a.title]), [['start', 'en', 'Start'], ['start', 'zh-Hans', '开始']]);
  assert.match(result.articles[0].searchText, /Choose BTC/);
  assert.equal(result.articles[0].blocks[0].tag, 'h2');
  assert.match(JSON.stringify(result.articles[0].blocks), /"tag":"strong"/);
  assert.match(JSON.stringify(result.articles[0].blocks), /\/help-docs\/img\/guides\/demo.svg/);
  assert.equal(JSON.parse(await readFile(path.join(options.output, 'catalog.json'), 'utf8')).version, 1);
  assert.match(await readFile(path.join(options.output, 'img/guides/demo.svg'), 'utf8'), /<svg/);
});

test('does not export raw HTML, executable links or unrelated internal documents', async (t) => {
  const options = await fixture(t, '<script>alert(1)</script>\n\n[Bad](javascript:alert)\n\n[Good](https://example.org/help)\n\n[Internal](../superpowers/private.md)');
  await mkdir(path.join(options.root, 'docs/superpowers'), {recursive: true});
  await writeFile(path.join(options.root, 'docs/superpowers/private.md'), 'PRIVATE MATERIAL');
  const json = JSON.stringify(await exportHelp(options));
  assert.doesNotMatch(json, /javascript:|<script|PRIVATE MATERIAL|superpowers/);
  assert.match(json, /https:\/\/example.org\/help/);
});

test('fails before export when a translation or image is missing', async (t) => {
  const options = await fixture(t, '![Missing](/img/guides/missing.png)');
  await assert.rejects(exportHelp(options), /image/i);
});

test('rejects traversal topic IDs and local image paths', async (t) => {
  const options = await fixture(t, '![Bad](/img/guides/../../secret.png)');
  await assert.rejects(exportHelp(options), /image|path/i);
  await writeFile(path.join(options.root, 'help-topics.json'), JSON.stringify([{id: '../secret', category: 'start'}]));
  await assert.rejects(exportHelp(options), /topic/i);
});
