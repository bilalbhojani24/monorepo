import React from 'react';
import MochaIcon from 'assets/icons/Mocha.svg';
import TestNgIcon from 'assets/icons/Testng.svg';
import WebDriverIOIcon from 'assets/icons/Webdriver-IO.svg';

export const FRAMEWORK_IDS = {
  testng: 'testng',
  mocha: 'mocha',
  webdriverio: 'webdriverio'
};

export const FRAMEWORKS = [
  {
    id: FRAMEWORK_IDS.testng,
    name: 'Java TestNG',
    logo: (
      <img className="max-h-12 max-w-full" src={TestNgIcon} alt="TestNg Icon" />
    )
  },
  {
    id: FRAMEWORK_IDS.mocha,
    name: 'MochaJS',
    logo: (
      <img className="max-h-12 max-w-full" src={MochaIcon} alt="Mocha Icon" />
    )
  },
  {
    id: FRAMEWORK_IDS.webdriverio,
    name: 'WebdriverIO',
    logo: (
      <img
        className="max-h-12 max-w-full"
        src={WebDriverIOIcon}
        alt="WebDriver IO Icon"
      />
    )
  }
];
