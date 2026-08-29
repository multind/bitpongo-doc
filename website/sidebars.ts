/**
 * Copyright (c) Bitpongo contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
