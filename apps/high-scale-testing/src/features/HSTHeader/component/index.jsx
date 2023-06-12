import React from 'react';
import { Header } from '@browserstack/bifrost';
import ROUTES from 'constants/routes';
import { getEnvConfig } from 'utils/common';

const HSTHeader = () => {
  const ENV_CONFIG = getEnvConfig();

  const { baseUrl, docHomeURL } = ENV_CONFIG;

  return (
    <Header
      documentation={{
        title: 'Key Features',
        options: [
          {
            name: 'Customize your Grid',
            link: `${docHomeURL}/features/customize-your-grid`
          },
          {
            name: 'Visualise Grids on Console',
            link: `${docHomeURL}/features/visualise-grids-on-console`
          },
          {
            name: 'On-Demand Grids using CLI',
            link: `${docHomeURL}/features/automate-setup-via-cli`
          },
          {
            name: 'Configure Test Queueing',
            link: `${docHomeURL}/parallelization/queue-tests`
          },
          {
            name: 'Organize your Tests',
            link: `${docHomeURL}/features/organize-your-tests`
          }
        ]
      }}
      others={{
        title: 'Getting Started',
        options: [
          {
            name: 'Create a new Grid',
            link: `${docHomeURL}/getting-started/create-grid`
          },
          {
            name: 'Set up AWS Integration',
            link: `${docHomeURL}/getting-started/setup-on-aws`
          },
          {
            name: 'Supported Browsers & Versions',
            link: `${docHomeURL}/getting-started/browsers-and-versions`
          }
        ]
      }}
      headerElementArray={['team', 'help', 'account']}
      onSignoutClick={(e) => {
        e.preventDefault();
        window.location.href = baseUrl + ROUTES.SIGN_OUT;
      }}
      productName="Automation Grid"
      productLink={ROUTES.GRID_CONSOLE}
      planButtonVisible={false}
      references={{
        title: 'Overview',
        options: [
          {
            name: 'What is Automation Grid?',
            link: `${docHomeURL}`
          }
        ]
      }}
      release="Alpha"
      wrapperClassName="sticky"
    />
  );
};

export default HSTHeader;
