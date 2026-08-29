import assert from 'node:assert/strict';
import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';

const cases = [
  {
    locale: 'en',
    basePath: '',
    hero: 'Automated investing, explained clearly.',
    barkTitle: 'Configure Bark Notifications',
  },
  {
    locale: 'zh-Hans',
    basePath: 'zh-Hans',
    hero: '清晰了解自动化投资。',
    barkTitle: '配置 Bark 通知',
  },
  {
    locale: 'zh-Hant',
    basePath: 'zh-Hant',
    hero: '清晰瞭解自動化投資。',
    barkTitle: '設定 Bark 通知',
  },
];

for (const testCase of cases) {
  const homePath = path.join('build', testCase.basePath, 'index.html');
  const introductionPath = path.join(
    'build',
    testCase.basePath,
    'docs',
    'introduction',
    'index.html',
  );
  const barkPath = path.join(
    'build',
    testCase.basePath,
    'docs',
    'notifications',
    'bark',
    'index.html',
  );
  const [home, introduction, bark] = await Promise.all([
    readFile(homePath, 'utf8'),
    readFile(introductionPath, 'utf8'),
    readFile(barkPath, 'utf8'),
  ]);

  assert.match(home, new RegExp(testCase.hero), `${testCase.locale} homepage`);
  assert.match(
    bark,
    new RegExp(testCase.barkTitle),
    `${testCase.locale} Bark documentation`,
  );
  assert.match(
    home,
    /href=(?:"https:\/\/github\.com\/multind\/bitpongo"|https:\/\/github\.com\/multind\/bitpongo)(?:\s|>)/,
    `${testCase.locale} frontend repository link`,
  );

  for (const page of [home, introduction, bark]) {
    assert.doesNotMatch(
      page,
      /github\.com\/multind\/bitpongo-doc/,
      `${testCase.locale} must not expose the documentation repository`,
    );
  }
}

const cssDirectory = path.join('build', 'assets', 'css');
const cssFiles = (await readdir(cssDirectory)).filter((file) =>
  file.endsWith('.css'),
);
const compiledCss = (
  await Promise.all(
    cssFiles.map((file) => readFile(path.join(cssDirectory, file), 'utf8')),
  )
).join('\n');

assert.doesNotMatch(
  compiledCss,
  /\.navbar\{[^}]*backdrop-filter:/,
  'the mobile navbar must not establish a containing block for its fixed sidebar',
);

console.log(
  'Verified multilingual builds, repository links, and mobile navigation CSS.',
);
