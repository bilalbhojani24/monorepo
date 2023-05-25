import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@browserstack/bifrost';
import ROUTES from 'constants/routes';

const Layout = () => (
  <>
    <Header
      documentation={{
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
        title: 'Documentation'
      }}
      headerElementArray={[
        'team',
        // 'pricing',
        'help',
        'account'
        // 'notifications'
        // 'search'
      ]}
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
    />
    <main>
      <Outlet />
    </main>
  </>
);

export default Layout;
