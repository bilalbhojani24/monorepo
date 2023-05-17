import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from '@browserstack/bifrost';
import { DOC_KEY_MAPPING, EXTERNAL_LINKS } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { getIsOnFreemium } from 'globalSlice/selectors';
import {
  getDocUrl,
  getEnvConfig,
  getExternalUrl,
  logOllyEvent
} from 'utils/common';

const envConfig = getEnvConfig();

const O11yHeader = () => {
  const isOnFreemium = useSelector(getIsOnFreemium);
  return (
    <Header
      wrapperClassName="sticky top-0"
      headerID="bstack-header"
      productName="Test Observability"
      productLink={ROUTES.root}
      release="Beta"
      // beamerProductId="xTSGUhhN11000"
      documentationLink={getDocUrl({ path: DOC_KEY_MAPPING.introduction })}
      supportLink={`${envConfig.baseUrl}/support/test-observability`}
      headerElementArray={[
        'team',
        'pricing',
        'help',
        // 'search',
        // 'notifications',
        'account'
      ]}
      showTestInsights={false}
      documentation={{
        title: 'Key Features',
        options: [
          {
            name: 'Upload backend application logs',
            link: getDocUrl({ path: DOC_KEY_MAPPING.uploading_logs })
          },
          {
            name: 'Automatic failure analysis',
            link: getDocUrl({ path: DOC_KEY_MAPPING.auto_analyser })
          },
          {
            name: 'Re-run a subset of tests',
            link: getDocUrl({ path: DOC_KEY_MAPPING.re_run })
          },
          {
            name: 'Mute problematic test cases',
            link: getDocUrl({ path: DOC_KEY_MAPPING.mute })
          },
          {
            name: 'View source code',
            link: getDocUrl({ path: DOC_KEY_MAPPING.source_code })
          }
        ]
      }}
      references={{
        title: 'Overview',
        options: [
          {
            name: 'Why use Test Observability?',
            link: getDocUrl({ path: DOC_KEY_MAPPING.introduction })
          }
        ]
      }}
      others={{
        title: 'Getting Started',
        options: [
          {
            name: 'WebdriverIO',
            link: getDocUrl({ path: DOC_KEY_MAPPING.wdio })
          },
          {
            name: 'TestNG',
            link: getDocUrl({ path: DOC_KEY_MAPPING.testng })
          },
          {
            name: 'Mocha',
            link: getDocUrl({ path: DOC_KEY_MAPPING.mocha })
          }
        ]
      }}
      onSignoutClick={(e) => {
        if (envConfig.signOutUrl) {
          e.preventDefault();
          window.location.href = envConfig.signOutUrl;
        }
      }}
      planPricingLink={getExternalUrl({ path: EXTERNAL_LINKS.planAndPricing })}
      buyPlanText={isOnFreemium ? 'Buy a Plan' : 'Upgrade'}
      buyPlanTarget="_blank"
      buyPlanLink={getExternalUrl({ path: EXTERNAL_LINKS.buyAPlan })}
      callbackFunctions={{
        onPlanAndPricingClick: () => {
          logOllyEvent({
            event: 'ClickHeaderPlansAndPricing',
            data: {
              url: window.location.href
            }
          });
        },
        buyPlanClick: () => {
          logOllyEvent({
            event: 'ClickedBuyaPlan',
            data: {
              section: 'dashboard-top-header',
              url: window.location.href
            }
          });
        }
      }}
    />
  );
};

export default O11yHeader;
