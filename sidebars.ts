import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'introduction',
    {type: 'category', label: 'Getting started', items: ['guides/quick-start', 'guides/exchange']},
    {type: 'category', label: 'Trading strategies', items: ['guides/dca', 'guides/fng', 'guides/sharing']},
    {type: 'category', label: 'Markets and alerts', items: ['guides/market', 'guides/price-alerts', 'guides/inbox']},
    {type: 'category', label: 'Notifications', items: ['guides/app-push', 'guides/email', 'guides/telegram', 'guides/webhook', 'guides/perception', 'notifications/bark']},
    {type: 'category', label: 'Account and support', items: ['guides/account', 'guides/troubleshooting', 'guides/faq']},
    {type: 'category', label: 'For operators', items: ['operations/notifications']},
  ],
};

export default sidebars;
