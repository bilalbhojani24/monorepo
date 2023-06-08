import React from 'react';
import { Header } from '@browserstack/bifrost';
import ROUTES from 'constants/routes';

const HSTHeader = () => {
  const DOC_HOME_URL = 'https://browserstack.com/docs';

  return (
    <Header
      documentation={{
        title: 'Key Features',
        options: [
          {
            name: 'Customize your Grid',
            link: `${DOC_HOME_URL}/features/customize-your-grid`
          },
          {
            name: 'Visualise Grids on Console',
            link: `${DOC_HOME_URL}/features/visualise-grids-on-console`
          },
          {
            name: 'On-Demand Grids using CLI',
            link: `${DOC_HOME_URL}/features/automate-setup-via-cli`
          },
          {
            name: 'Configure Test Queueing',
            link: `${DOC_HOME_URL}/parallelization/queue-tests`
          },
          {
            name: 'Organize your Tests',
            link: `${DOC_HOME_URL}/features/organize-your-tests`
          }
        ]
      }}
      others={{
        title: 'Getting Started',
        options: [
          {
            name: 'Create a new Grid',
            link: `${DOC_HOME_URL}/getting-started/create-grid`
          },
          {
            name: 'Set up AWS Integration',
            link: `${DOC_HOME_URL}/getting-started/setup-on-aws`
          },
          {
            name: 'Supported Browsers & Versions',
            link: `${DOC_HOME_URL}/getting-started/browsers-and-versions`
          }
        ]
      }}
      headerElementArray={['team', 'help', 'account']}
      onSignoutClick={(e) => {
        e.preventDefault();
        window.location.href = window.location.origin + ROUTES.SIGN_OUT;
      }}
      productName="Automation Grid"
      productLink={ROUTES.GRID_CONSOLE}
      planButtonVisible={false}
      references={{
        title: 'Overview',
        options: [
          {
            name: 'What is Automation Grid?',
            link: `${DOC_HOME_URL}`
          }
        ]
      }}
      release="Alpha"
      wrapperClassName="sticky"
    />
  );
};

export default HSTHeader;
