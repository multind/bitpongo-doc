/**
 * Copyright (c) Bitpongo contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import assert from 'assert/strict';
import fs from 'fs';
import path from 'path';
import createConfigAsync from '../docusaurus.config';

async function checkBranding() {
  const config = await createConfigAsync();
  const themeConfig = config.themeConfig as {
    navbar: {title: string; logo: {alt: string; src: string; srcDark?: string}};
    footer: {logo: {alt: string; src: string; href: string}};
  };

  assert.equal(config.title, 'Bitpongo');
  assert.equal(config.favicon, 'img/bitpongo-favicon.png');
  assert.deepEqual(themeConfig.navbar.logo, {
    alt: 'Bitpongo Logo',
    src: 'img/bitpongo-logo.png',
    srcDark: 'img/bitpongo-logo.png',
    width: 32,
    height: 32,
  });
  assert.equal(themeConfig.navbar.title, 'Bitpongo');
  assert.deepEqual(themeConfig.footer.logo, {
    alt: 'Bitpongo Logo',
    src: '/img/bitpongo-logo.png',
    href: '/',
  });

  assert.equal(
    fs.existsSync(
      path.join(process.cwd(), 'website/static/img/bitpongo-logo.png'),
    ),
    true,
  );
  assert.equal(
    fs.existsSync(
      path.join(process.cwd(), 'website/static/img/bitpongo-favicon.png'),
    ),
    true,
  );
}

checkBranding().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
