import {readFile, mkdir, writeFile, copyFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import yaml from 'js-yaml';

const parser = unified().use(remarkParse).use(remarkGfm);
const simpleTags = {paragraph: 'p', strong: 'strong', emphasis: 'em', inlineCode: 'code', blockquote: 'blockquote', listItem: 'li', tableRow: 'tr', tableCell: 'td'};

function safeLink(url, ids) {
  const doc = /^(?:\.\/)?([a-z0-9-]+)\.md(?:#[a-z0-9-]+)?$/.exec(url);
  if (doc && ids.has(doc[1])) return `/help/docs/${doc[1]}`;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:' && !parsed.username && !parsed.password) return parsed.href;
  } catch { /* Non-public relative paths are deliberately not exported. */ }
  return undefined;
}

export async function exportHelp({root, output}) {
  root = path.resolve(root);
  output = path.resolve(output);
  const topics = JSON.parse(await readFile(path.join(root, 'help-topics.json'), 'utf8'));
  const ids = new Set();
  for (const topic of topics) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.id) || ids.has(topic.id) || !/^[a-z-]+$/.test(topic.category)) throw Error('Invalid or duplicate help topic');
    ids.add(topic.id);
  }
  const images = new Map();
  async function convert(node) {
    if (node.type === 'html' || node.type === 'definition') return null;
    if (node.type === 'text') return {tag: 'text', text: node.value};
    if (node.type === 'inlineCode') return {tag: 'code', children: [{tag: 'text', text: node.value}]};
    if (node.type === 'image') {
      if (!/^\/img\/guides\/[a-zA-Z0-9/_-]+\.(png|jpg|webp|svg)$/.test(node.url)) throw Error(`Unsafe help image path: ${node.url}`);
      const source = path.join(root, 'static', node.url);
      try { await readFile(source); } catch { throw Error(`Missing help image: ${node.url}`); }
      images.set(source, node.url);
      return {tag: 'img', src: `/help-docs${node.url}`, alt: node.alt || 'Bitpongo guide'};
    }
    if (node.type === 'code') return {tag: 'pre', children: [{tag: 'code', children: [{tag: 'text', text: node.value}]}]};
    if (node.type === 'break') return {tag: 'br'};
    if (node.type === 'thematicBreak') return {tag: 'hr'};
    const children = (await Promise.all((node.children ?? []).map(convert))).filter(Boolean);
    if (node.type === 'link') {
      const href = safeLink(node.url, ids);
      return href ? {tag: 'a', href, children} : {tag: 'span', children};
    }
    if (node.type === 'heading') return {tag: `h${Math.min(4, Math.max(2, node.depth))}`, children};
    if (node.type === 'list') return {tag: node.ordered ? 'ol' : 'ul', children};
    if (node.type === 'table') {
      if (children[0]) children[0].children = children[0].children.map(cell => ({...cell, tag: 'th'}));
      return {tag: 'table', children: [{tag: 'tbody', children}]};
    }
    return {tag: simpleTags[node.type] ?? 'span', children};
  }
  const articles = [];
  for (const topic of topics) {
    for (const locale of ['en', 'zh-Hans']) {
      const directory = locale === 'en' ? 'docs' : 'i18n/zh-Hans/docusaurus-plugin-content-docs/current';
      const source = await readFile(path.join(root, directory, 'guides', `${topic.id}.md`), 'utf8');
      const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source);
      if (!match) throw Error(`Missing metadata: ${topic.id}/${locale}`);
      const meta = yaml.load(match[1]);
      if (!meta?.title || !meta?.description) throw Error(`Missing title/description: ${topic.id}/${locale}`);
      const ast = parser.parse(match[2]);
      const blocks = (await Promise.all(ast.children.map(convert))).filter(Boolean);
      articles.push({id: topic.id, locale, category: topic.category, title: String(meta.title), summary: String(meta.description), searchText: blocks.map(blockText).join('\n'), blocks});
    }
  }
  const result = {version: 1, articles};
  await mkdir(output, {recursive: true});
  for (const [source, relative] of images) {
    const destination = path.join(output, relative);
    await mkdir(path.dirname(destination), {recursive: true});
    await copyFile(source, destination);
  }
  await writeFile(path.join(output, 'catalog.json'), JSON.stringify(result));
  return result;
}

function blockText(block) { return block.text ?? (block.children ?? []).map(blockText).join(block.tag === 'tr' ? ' | ' : ''); }

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
  const output = process.argv[2] ? path.resolve(process.argv[2]) : path.join(root, 'build/help-docs');
  const result = await exportHelp({root, output});
  console.log(`Exported ${result.articles.length} bilingual guides to ${output}`);
}
