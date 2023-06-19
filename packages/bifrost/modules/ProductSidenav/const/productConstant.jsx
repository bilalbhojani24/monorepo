import React from 'react';

import AccessibilityIcon from '../icons/AccessibilityIcon';
import AppAutomateIcon from '../icons/AppAutomateIcon';
import AppLiveIcon from '../icons/AppLiveIcon';
import AutomateIcon from '../icons/AutomateIcon';
import LiveIcon from '../icons/LiveIcon';
import PercyIcon from '../icons/PercyIcon';
import TestManagementIcon from '../icons/TestManagementIcon';
import TestObservabilityIcon from '../icons/TestObservabilityIcon';

export const WEB_MANUAL_TESTING = {
  title: 'MANUAL TESTING',
  products: [
    {
      name: 'Live Testing',
      icon: (props) => <LiveIcon {...props} />,
      isPlanPurchased: true,
      link: 'https://live.browserstack.com/dashboard',
      identifier: 'Live'
    },
    {
      name: 'Accessibility Testing',
      icon: (props) => <AccessibilityIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://accessibility.browserstack.com/',
      identifier: 'Accessibility Testing'
      // },
      // {
      //   name: 'API Testing',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
    }
  ]
};

export const APP_MANUAL_TESTING = {
  title: 'MANUAL TESTING',
  products: [
    {
      name: 'Live Testing',
      icon: (props) => <AppLiveIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://app-live.browserstack.com/dashboard',
      identifier: 'App Live'
      // },
      // {
      //   name: 'Accessibility Testing',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'Performance Testing',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'API Testing',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
    }
  ]
};

export const WEB_TEST_AUTOMATION = {
  title: 'TEST AUTOMATION',
  products: [
    {
      name: 'Automate',
      icon: (props) => <AutomateIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://automate.browserstack.com',
      identifier: 'Automate'
    },
    {
      name: 'Visual Automation (Percy)',
      icon: (props) => <PercyIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://percy.io/api/auth/start-sso',
      identifier: 'Percy'
      // },
      // {
      //   name: 'Automation Grid',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'Accessibility Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'API Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'Low Code Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
    }
  ]
};

export const APP_TEST_AUTOMATION = {
  title: 'TEST AUTOMATION',
  products: [
    {
      name: 'Automate',
      icon: (props) => <AppAutomateIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://app-automate.browserstack.com',
      identifier: 'App Automate'
    },
    {
      name: 'Visual Automation (App Percy)',
      icon: (props) => <PercyIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://www.browserstack.com/app-percy',
      identifier: 'App Percy'
      // },
      // {
      //   name: 'Accessibility Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'Performance Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'API Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'Low Code Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
    }
  ]
};

export const TEST_MANAGEMENT_AND_OPTIMIZATION = {
  title: 'MANAGEMENT & OPTIMIZATION',
  products: [
    {
      name: 'Test Management',
      icon: (props) => <TestManagementIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://test-management.browserstack.com',
      identifier: 'Test Management'
    },
    {
      name: 'Test Observability',
      icon: (props) => <TestObservabilityIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://observability.browserstack.com',
      identifier: 'Test Observability'
    }
  ]
};
