import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Banner,
  Button,
  MdCampaign,
  NotificationsContainer,
  SidebarItem,
  SidebarNavigation,
  Tooltip,
  TooltipBody,
  TooltipHeader
} from '@browserstack/bifrost';
import { BannerMessages } from 'constants/bannerMessages';
import ROUTES from 'constants/routes';
import { AUTOMATION_CONSOLE, BUILDS_DASHBOARD } from 'constants/strings';
import HSTHeader from 'features/HSTHeader/component';

import { useLayout } from './useLayout';

const Layout = () => {
  const {
    currentOnboardingTooltipCount,
    isCurrent,
    lastKnownSetupType,
    navigate,
    navigationClickHandler,
    primaryNavs,
    secondaryNavs,
    selectedGridData,
    showOnboardingTooltips,
    showTrialGridBannerInGridOverview,
    userDetails
  } = useLayout();

  const { totalTime, timeUsed } = selectedGridData.trialGridDetail || 0;

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
            ctaButton={
              <Button
                colors="white"
                onClick={() =>
                  navigate(`${ROUTES.SETUP}?type=${lastKnownSetupType}`)
                }
              >
                Create Grid
              </Button>
            }
            description={BannerMessages.trialGridGridOverviewIntro(
              totalTime - timeUsed
            )}
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
                <Tooltip
                  alignOffset={10}
                  arrowPadding={10}
                  content={
                    <>
                      <TooltipHeader>
                        {item.onboardingTooltipHeader}
                      </TooltipHeader>
                      <TooltipBody>
                        <div className="flex flex-col">
                          <div>{item.onboardingTooltipContent}</div>
                          <div className="mt-4 flex flex-row gap-3">
                            <Button
                              onClick={item.onboardingTooltipNextBtnhandler}
                            >
                              {item.label === AUTOMATION_CONSOLE
                                ? 'Next'
                                : 'Close'}
                            </Button>
                            <Button
                              onClick={item.onboardingTooltipSkipBtnHandler}
                              variant="primary"
                              colors="white"
                            >
                              Skip tips
                            </Button>
                          </div>
                        </div>
                      </TooltipBody>
                    </>
                  }
                  defaultOpen={
                    showOnboardingTooltips &&
                    !userDetails.trialGridProductOnboardingCompleted &&
                    ((currentOnboardingTooltipCount === 3 &&
                      item.label === AUTOMATION_CONSOLE) ||
                      (currentOnboardingTooltipCount === 4 &&
                        item.label === BUILDS_DASHBOARD))
                  }
                  placementAlign="start"
                  placementSide="bottom"
                  show={
                    showOnboardingTooltips &&
                    !userDetails.trialGridProductOnboardingCompleted &&
                    ((currentOnboardingTooltipCount === 3 &&
                      item.label === AUTOMATION_CONSOLE) ||
                      (currentOnboardingTooltipCount === 4 &&
                        item.label === BUILDS_DASHBOARD))
                  }
                  theme="dark"
                  wrapperClassName="w-60"
                >
                  <SidebarItem
                    current={isCurrent(item)}
                    nav={item}
                    handleNavigationClick={navigationClickHandler}
                  />
                </Tooltip>
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
