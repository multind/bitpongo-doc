import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Bitpongo Docs',
  tagline:
    'Documentation for Bitpongo automated investment strategies and notifications.',
  favicon: 'img/bitpongo-favicon.png',
  future: {v4: true},
  url: process.env.SITE_URL ?? 'https://multind.com',
  baseUrl: process.env.BASE_URL ?? '/',
  organizationName: 'multind',
  projectName: 'bitpongo-doc',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans', 'zh-Hant'],
    localeConfigs: {
      en: {label: 'English', htmlLang: 'en'},
      'zh-Hans': {label: '简体中文', htmlLang: 'zh-CN'},
      'zh-Hant': {label: '繁體中文', htmlLang: 'zh-TW'},
    },
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          exclude: ['superpowers/**'],
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: {respectPrefersColorScheme: true},
    navbar: {
      title: 'Bitpongo',
      logo: {alt: 'Bitpongo logo', src: 'img/bitpongo-logo.png'},
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/multind/bitpongo',
          label: 'Bitpongo GitHub',
          position: 'right',
        },
        {type: 'localeDropdown', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
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
              label: 'Bitpongo frontend',
              href: 'https://github.com/multind/bitpongo',
            },
            {
              label: 'MIT License',
              href: 'https://github.com/multind/bitpongo/blob/main/LICENSE',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Bitpongo contributors. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
