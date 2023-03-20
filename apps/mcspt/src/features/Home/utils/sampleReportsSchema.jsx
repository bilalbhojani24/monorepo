import React from 'react';
import { Hyperlink } from '@browserstack/bifrost';
import discordLogo from 'assets/discordLogo.png';
import twitterLogo from 'assets/twitterLogo.png';
import wikiLogo from 'assets/wikiLogo.png';

export const sampleReportColumns = [
  {
    name: 'Icon',
    key: 'appIcon',
    cell: (row) => (
      <>
        <div className="flex">
          <img src={row.logo} alt="app logo" />
        </div>
      </>
    )
  },
  {
    name: 'Application',
    key: 'application',
    cell: (row) => (
      <>
        <div className="flex flex-col">
          <div className="text-base-900 text-sm font-medium leading-5">
            {row.application}
          </div>
          <div className="text-base-500 text-sm font-normal leading-5">
            {row.packageDetails}
          </div>
        </div>
      </>
    )
  },
  {
    name: 'Device',
    key: 'device',
    cell: (row) => (
      <>
        <div className="text-base-900 text-sm font-medium leading-5">
          {row.device}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5">
          {row.osDetails}
        </div>
      </>
    )
  },
  {
    name: 'View Button',
    key: 'viewButton',
    cell: () => (
      <Hyperlink wrapperClassName="text-sm leading-5 font-normal ">
        View Sample Report
      </Hyperlink>
    )
  }
];

export const sampleReportRows = [
  {
    logo: twitterLogo,
    application: 'Twitter',
    device: 'iPhone 14 Pro Max',
    time: '10:55pm',
    packageDetails: 'com.bird.app ∙ v10.03',
    osDetails: 'iOS 16'
  },
  {
    logo: wikiLogo,
    application: 'Wikipedia',
    device: 'Google Pixel 7 Pro',
    time: '10:54pm',
    packageDetails: 'com.wikipedia.app ∙ v2.03',
    osDetails: 'Android 13'
  },
  {
    logo: discordLogo,
    application: 'Discord',
    device: 'Samsung Galaxy S22 Ultra',
    time: '10:56pm',
    packageDetails: 'com.discord.app ∙ v9.16',
    osDetails: 'Android 13'
  }
];
