import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@browserstack/bifrost';
import ROUTES from 'constants/routes';

const LayoutWOSidebar = () => (
  <>
    <Header
      documentation={{
        options: [
          {
            // eslint-disable-next-line sonarjs/no-duplicate-string
            link: 'https://www.browserstack.com',
            name: 'lorem'
          },
          {
            link: 'https://www.browserstack.com',
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
            link: 'https://www.browserstack.com',
            name: 'lorem'
          },
          {
            link: 'https://www.browserstack.com',
            name: 'ipsum'
          }
        ],
        title: 'References'
      }}
      release="alpha"
      wrapperClassName="sticky"
    />
    <main className="bg-base-50 flex">
      <Outlet />
    </main>
  </>
);

export default LayoutWOSidebar;
