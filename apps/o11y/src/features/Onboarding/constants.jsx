import React from 'react';
import { MochaIcon, TestngIcon, WdioIcon } from 'assets/icons/components';

export const FRAMEWORK_IDS = {
  testng: 'testng',
  mocha: 'mocha',
  webdriverio: 'webdriverio'
};

export const FRAMEWORKS = [
  {
    id: FRAMEWORK_IDS.testng,
    name: 'Java TestNG',
    logo: <TestngIcon width="48" height="48" />
  },
  {
    id: FRAMEWORK_IDS.mocha,
    name: 'MochaJS',
    logo: <MochaIcon width="48" height="48" />
  },
  {
    id: FRAMEWORK_IDS.webdriverio,
    name: 'WebdriverIO',
    logo: <WdioIcon width="48" height="48" />
  }
];
