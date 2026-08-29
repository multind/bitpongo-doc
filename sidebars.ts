import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Notifications',
      items: ['notifications/bark'],
    },
  ],
};

export default sidebars;
