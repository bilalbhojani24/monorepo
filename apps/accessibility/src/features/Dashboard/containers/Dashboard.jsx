// NOTE: Don't remove sidebar logic, will add once it required
/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import {
  ActionPanel,
  Button,
  Header,
  NotificationsContainer,
  SidebarItem,
  SidebarNavigation,
  SkipToContent
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import FreshchatIntegration from 'common/FreshchatIntegration';
import ReverseTrialBannerWrapper from 'common/ReverseTrialBannerWrapper';
import ReverseTrialModalWrapper from 'common/ReverseTrialModalWrapper';
import { BSTACK_TOPNAV_ELEMENT_ID, getUrlForHeader } from 'constants';
import { arrayOf, node, oneOfType, string } from 'prop-types';
import { getBrowserStackBase } from 'utils';
import { logEvent } from 'utils/logEvent';

import useDashboard from './useDashboard';

export default function Dashboard({ children }) {
  const {
    mainRef,
    isFreeUser,
    primaryNav,
    currentPath,
    secondaryNav,
    handleNavigationClick,
    onGetADemoClick,
    onBuyPlanClick,
    showBanner,
    remainingDays,
    showTrialTile
  } = useDashboard();

  const SWBSidebarPri = primaryNav.map((item) => (
    <SidebarItem
      key={item.id}
      nav={item}
      current={item.id === currentPath}
      handleNavigationClick={handleNavigationClick}
    />
  ));

  const SWBSidebarSecPri = (
    <div className="flex flex-col items-start justify-center pb-3">
      <div className="px-2 pb-3">
        <ActionPanel
          content={
            <Button colors="white" onClick={onGetADemoClick} size="small">
              Get a demo
            </Button>
          }
          description="Learn how to unlock the full potential of Accessibility Testing"
          title="Need help?"
        />
      </div>
      {secondaryNav.map((item) => {
        if (item.show) {
          return (
            <SidebarItem
              key={item.id}
              nav={item}
              current={item.id === currentPath}
              handleNavigationClick={handleNavigationClick}
            />
          );
        }
        return null;
      })}
    </div>
  );

  const SWBSidebarSecSec = (
    <div className="flex flex-col items-start justify-center pb-3">
      <div className="px-2 pb-3">
        <ActionPanel
          content={
            <>
              <Button colors="success" onClick={onBuyPlanClick} fullWidth>
                Buy a plan
              </Button>
              <Button
                wrapperClassName="mt-3"
                colors="white"
                onClick={onGetADemoClick}
                fullWidth
              >
                Get a demo
              </Button>
            </>
          }
          description={
            <span
              className={twClassNames('rounded-full px-3 py-1 font-semibold', {
                'bg-attention-100 text-attention-800': remainingDays > 0,
                'bg-danger-100 text-danger-800': remainingDays === 0
              })}
            >
              {`${remainingDays} days remaining`}
            </span>
          }
          title={
            remainingDays === 0
              ? 'Your Team free trial has expired'
              : 'Your Team free trial is active'
          }
        />
      </div>
      {secondaryNav.map((item) => {
        if (item.show) {
          return (
            <SidebarItem
              key={item.id}
              nav={item}
              current={item.id === currentPath}
              handleNavigationClick={handleNavigationClick}
            />
          );
        }
        return null;
      })}
    </div>
  );

  return (
    <div>
      <ReverseTrialModalWrapper />
      <SkipToContent target={mainRef} wrapperClassName="z-50 bg-white">
        Skip to main content
      </SkipToContent>
      <div id={BSTACK_TOPNAV_ELEMENT_ID}>
        <Header
          wrapperClassName="fixed top-0 z-10 w-full"
          productName="Accessibility Testing"
          release="Beta"
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
          headerElementArray={['team', 'help', 'account', 'pricing']}
          documentation={{
            title: 'Documentation',
            options: [
              {
                name: 'Introduction',
                link: getUrlForHeader(
                  'docs/accessibility/overview/introduction'
                )
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
          isFreeUser={isFreeUser}
          buyPlanText="Buy a plan"
          buyPlanLink={`${getBrowserStackBase()}/pricing?product=accessibility-testing&ref=accessibility-dashboard-top-header-csf-lead`}
          buyPlanTarget="_blank"
          planButtonVisible
          planPricingLink={`${getBrowserStackBase()}/pricing?product=accessibility-testing`}
          supportLink={getUrlForHeader('contact#other')}
          documentationLink={getUrlForHeader(
            'docs/accessibility/overview/introduction'
          )}
          callbackFunctions={{
            onPlanAndPricingClick: () => {
              logEvent('ClickHeaderPlansAndPricing', {
                url: window.location.href
              });
            },
            buyPlanClick: () => {
              logEvent('ClickedBuyaPlan', {
                Product: 'Accessibility Testing',
                section: 'dashboard-top-header',
                ProductPlanType: `${isFreeUser ? 'free' : 'paid'}`,
                URL: window.location.href,
                signed_in: true
              });
              if (!isFreeUser) {
                logEvent('UpgradeCTAClicked_ProductDashboard', {
                  Product: 'Accessibility Testing',
                  section: 'dashboard-top-header',
                  URL: window.location.href,
                  signed_in: true
                });
              }
            }
          }}
        />
      </div>
      <ReverseTrialBannerWrapper />
      <SidebarNavigation
        sidebarPrimaryNavigation={SWBSidebarPri}
        sidebarSecondaryNavigation={
          showTrialTile() ? SWBSidebarSecSec : SWBSidebarSecPri
        }
        wrapperClassName={twClassNames('bg-white mt-5', {
          'pt-32': showBanner,
          'pt-16': !showBanner
        })}
      />
      <main
        ref={mainRef}
        className="bg-base-50 mt-16 h-full pl-64"
        style={{
          marginTop: showBanner ? '128px' : '64px'
        }}
      >
        {children}
      </main>
      <NotificationsContainer containerStyle={{ top: '84px', right: '40px' }} />
      <FreshchatIntegration />
    </div>
  );
}

Dashboard.propTypes = {
  children: oneOfType([arrayOf(node), node, string])
};

Dashboard.defaultProps = {
  children: null
};
