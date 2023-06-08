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
            name: 'Automate setup via CLI',
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
            name: 'Create Grid',
            link: `${DOC_HOME_URL}/getting-started/create-grid`
          },
          {
            name: 'Setup on AWS',
            link: `${DOC_HOME_URL}/getting-started/setup-on-aws`
          },
          {
            name: 'Browsers & Versions',
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
