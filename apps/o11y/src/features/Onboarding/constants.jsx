import React from 'react';
import {
  CypressIcon,
  JUnitIcon,
  MochaIcon,
  NightwatchIcon,
  PlaywrightIcon,
  TestngIcon,
  WdioIcon
} from 'assets/icons/components';

export const FRAMEWORK_IDS = {
  testng: 'testng',
  mocha: 'mocha',
  webdriverio: 'webdriverio',
  nightwatch: 'nightwatchjs',
  junit: 'junit-reports',
  playwright: 'playwright',
  cypress: 'cypress'
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
  },
  {
    id: FRAMEWORK_IDS.nightwatch,
    name: 'Nightwatch.js',
    logo: <NightwatchIcon width="48" height="48" />
  },
  {
    id: FRAMEWORK_IDS.junit,
    name: 'Upload JUnit Reports',
    logo: <JUnitIcon width="48" height="48" />
  },
  {
    id: FRAMEWORK_IDS.playwright,
    name: 'Playwright',
    logo: <PlaywrightIcon width="48" height="48" />
  },
  {
    id: FRAMEWORK_IDS.cypress,
    name: 'Cypress (Coming Soon)',
    logo: <CypressIcon width="48" height="48" />,
    isUpComing: true
  }
];

export const suggestedFrameworks = {
  Java: ['Gauge', 'JBehave', 'Selenide', 'Serenity'],
  NodeJS: [
    'CodeceptJS',
    'CucumberJS',
    'Intern',
    'JestJS',
    'Protractor',
    'TestCafe',
    'WD'
  ],
  'C#': ['MBUnit', 'NUnit', 'PNUnit', 'SpecFlow', 'XUnit'],
  Python: ['Behave', 'Lettuce', 'Robot', 'Pytest'],
  PHP: ['Behat', 'Codeception', 'PHPUnit'],
  Ruby: ['Capybara', 'RSpec'],
  LCNC: [
    'Katalon',
    'Ranorex',
    'Testim',
    'TestProject',
    'Tricentis Tosca',
    'Oxygen',
    'Leapwork',
    'Qmetry',
    'TestingWhiz',
    'Testsigma',
    'Cerberus',
    'ACCELQ'
  ],
  'App Testing Frameworks': [
    'Espresso',
    'XCUITest',
    'Detox',
    'Flutter',
    'EarlGrey'
  ]
};
