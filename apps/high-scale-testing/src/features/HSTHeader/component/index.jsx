import React from 'react';
import { Header } from '@browserstack/bifrost';
import ROUTES from 'constants/routes';

const HSTHeader = () => (
  <Header
    documentation={{
      options: [
        {
          link: 'https://www.browserstack.com/',
          name: 'lorem'
        },
        {
          link: 'https://www.browserstack.com/live',
          name: 'ipsum'
        }
      ],
      title: 'Documentation'
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
      options: [
        {
          link: 'https://www.browserstack.com/app-live',
          name: 'lorem'
        },
        {
          link: 'https://www.browserstack.com/automate',
          name: 'ipsum'
        }
      ],
      title: 'References'
    }}
    release="Alpha"
    wrapperClassName="sticky"
  />
);

export default HSTHeader;
