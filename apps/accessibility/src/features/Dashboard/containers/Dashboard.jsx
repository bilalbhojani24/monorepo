// NOTE: Don't remove sidebar logic, will add once it required
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Header,
  NotificationsContainer,
  SidebarItem,
  SidebarNavigation,
  SkipToContent
} from '@browserstack/bifrost';
import ReverseTrialBanner from 'common/ReverseTrialBanner';
import { getUrlForHeader } from 'constants';
import { arrayOf, node, oneOfType, string } from 'prop-types';

import { getShowBanner } from '../slices/selectors';

import useDashboard from './useDashboard';

export default function Dashboard({ children }) {
  const {
    mainRef,
    primaryNav,
    currentPath,
    secondaryNav,
    handleNavigationClick
  } = useDashboard();

  const showBanner = useSelector(getShowBanner);

  const SWBSidebarPri = primaryNav.map((item) => (
    <SidebarItem
      key={item.id}
      nav={item}
      current={item.id === currentPath}
      handleNavigationClick={handleNavigationClick}
    />
  ));

  const SWBSidebarSec = secondaryNav.map((item) => (
    <SidebarItem
      key={item.id}
      nav={item}
      current={item.id === currentPath}
      handleNavigationClick={handleNavigationClick}
    />
  ));

  return (
    <div>
      <SkipToContent target={mainRef} wrapperClassName="z-50 bg-white">
        Skip to main content
      </SkipToContent>
      <Header
        wrapperClassName="fixed top-0 z-10 w-full"
        productName="Accessibility Testing"
        release="Beta"
        planButtonVisible={false}
        productArray={[
          { name: 'Live', link: 'https://live.browserstack.com/dashboard' },
          {
            name: 'Automate',
            link: 'https://automate.browserstack.com/dashboard'
          },
          {
            name: 'Percy',
            link: 'https://percy.io/api/auth/start-sso'
          }
        ]}
        headerElementArray={['team', 'help', 'notifications', 'account']}
        documentation={{
          title: 'Documentation',
          options: [
            {
              name: 'Introduction',
              link: getUrlForHeader('docs/accessibility/overview/introduction')
            }
          ]
        }}
        references={{
          title: 'References',
          options: [
            { name: 'WCAG 2.0', link: 'https://www.w3.org/TR/WCAG20/' },
            { name: 'WCAG 2.1', link: 'https://www.w3.org/TR/WCAG21/' }
          ]
        }}
        supportLink={getUrlForHeader('contact#other')}
        documentationLink={getUrlForHeader(
          'docs/accessibility/overview/introduction'
        )}
      />
      {showBanner ? <ReverseTrialBanner /> : null}
      <SidebarNavigation
        sidebarPrimaryNavigation={SWBSidebarPri}
        sidebarSecondaryNavigation={SWBSidebarSec}
        wrapperClassName={`bg-white mt-5 ${showBanner ? 'pt-32' : 'pt-16'}`}
      />
      <main
        ref={mainRef}
        className="bg-base-50 mt-16 h-full pl-64"
        style={{
          marginTop: showBanner ? '128px' : '0'
        }}
      >
        {children}
      </main>
      <NotificationsContainer />
    </div>
  );
}

Dashboard.propTypes = {
  children: oneOfType([arrayOf(node), node, string])
};

Dashboard.defaultProps = {
  children: null
};
