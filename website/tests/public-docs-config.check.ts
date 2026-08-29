/**
 * Copyright (c) Bitpongo contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import assert from 'assert/strict';
import createConfigAsync from '../docusaurus.config';
import sidebars from '../sidebars';

async function checkPublicDocsConfig() {
  const config = await createConfigAsync();
  const themeConfig = config.themeConfig as {
    navbar: {items: unknown[]};
    footer: {links: unknown[]; copyright: string};
  };

  const [, presetOptions] = config.presets[0] as unknown as [
    string,
    {
      docs: {
        editUrl: (args: {locale: string; docPath: string}) => string;
      };
    },
  ];
  assert.equal(
    presetOptions.docs.editUrl({
      locale: config.i18n.defaultLocale,
      docPath: 'notifications/bark.md',
    }),
    'https://github.com/multind/bitpongo-doc/edit/main/website/docs/notifications/bark.md',
  );
  assert.deepEqual(sidebars, {
    docs: [
      'introduction',
      {
        type: 'category',
        label: 'Notifications',
        items: ['notifications/bark'],
      },
    ],
  });

  assert.deepEqual(themeConfig.navbar.items, [
    {
      type: 'docSidebar',
      sidebarId: 'docs',
      position: 'left',
      label: 'Documentation',
    },
    {
      href: 'https://github.com/multind/bitpongo-doc',
      label: 'GitHub',
      position: 'right',
    },
  ]);

  assert.deepEqual(themeConfig.footer.links, [
    {
      title: 'Documentation',
      items: [
        {label: 'Introduction', to: '/docs/introduction'},
        {label: 'Bark notifications', to: '/docs/notifications/bark'},
      ],
    },
    {
      title: 'Open source',
      items: [
        {
          label: 'GitHub',
          href: 'https://github.com/multind/bitpongo-doc',
        },
      ],
    },
  ]);
  assert.match(themeConfig.footer.copyright, /Bitpongo contributors/);
}

checkPublicDocsConfig().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
