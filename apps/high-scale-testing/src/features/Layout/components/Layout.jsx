import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Banner,
  Button,
  MdCampaign,
  NotificationsContainer,
  SidebarItem,
  SidebarNavigation
} from '@browserstack/bifrost';
import { BannerMessages } from 'constants/bannerMessages';
import HSTHeader from 'features/HSTHeader/component';

import { useLayout } from './useLayout';

const Layout = () => {
  const {
    isCurrent,
    navigationClickHandler,
    primaryNavs,
    secondaryNavs,
    showTrialGridBannerInGridOverview
  } = useLayout();

  return (
    <>
      <HSTHeader />
      <main className="bg-base-50 flex flex-col">
        {showTrialGridBannerInGridOverview && (
          <Banner
            align="extreme"
            bannerIcon={
              <MdCampaign aria-hidden="true" className="h-6 w-6 text-white" />
            }
            ctaButton={<Button colors="white">Create Grid</Button>}
            description={BannerMessages.trialGridGridOverviewIntro}
            isDismissButton={false}
          />
        )}
        <div className="flex">
          <nav
            className="sticky"
            style={{
              height: `calc(100vh - 64px)`,
              top: `64px`
            }}
          >
            <SidebarNavigation
              sidebarPrimaryNavigation={primaryNavs.map((item) => (
                <SidebarItem
                  current={isCurrent(item)}
                  nav={item}
                  handleNavigationClick={navigationClickHandler}
                />
              ))}
              sidebarSecondaryNavigation={secondaryNavs.map((item) => (
                <SidebarItem
                  nav={item}
                  handleNavigationClick={navigationClickHandler}
                />
              ))}
              wrapperClassName="md:sticky bg-white py-5 px-2 w-64 flex-none md:inset-y-16 h-full"
            />
          </nav>
          <Outlet />
        </div>
        <NotificationsContainer />
      </main>
    </>
  );
};

export default Layout;
