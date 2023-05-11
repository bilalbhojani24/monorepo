/* eslint-disable no-console */
import { useEffect, useState } from 'react';

const useOnboarding = () => {
  // All Constants:
  const HEADER_TEXTS_OBJECT = {
    intro: 'Hey John Doe, Welcome to High Scale Testing',
    scratch: 'Create Automation Grid',
    existing: 'Create Automation Grid'
  };
  const LIST_FEED_PROPS = {
    feedIconColor: 'grey',
    feedIconContainerSize: 'sm',
    feedIconSize: 'sm',
    feedIconVariant: 'light'
  };
  const SELECT_OPTIONS = [
    { label: 'A', value: 'A' },
    { label: 'A', value: 'A' },
    { label: 'A', value: 'A' },
    { label: 'A', value: 'A' }
  ];
  const SHOW_LINE_NUMBERS = false;
  const SHOW_SINGLE_LINE = true;
  const SUB_TEXTS_OBJECT = {
    intro:
      'Create and manage your own Automation Grid that supports frameworks like Selenium, Playwright, and Cypress to support browser testing at scale',
    scratch: 'Setting up everything from scratch.',
    existing: 'Setting up grid in your existing Kubernetes setup.'
  };
  const STEP_1_RADIO_GROUP_OPTIONS = [
    {
      description:
        'Create Automation Grid from scratch. Choose this option to create a new grid with a new Kubernetes Cluster.',
      disabled: false,
      id: 'radio-1',
      label: "No, I don't have a setup."
    },
    {
      description:
        'Create Automation Grid in the existing setup. Choose this option to create a grid in your existing Kubernetes Cluster.',
      disabled: false,
      id: 'radio-2',
      label: 'Yes, I have a setup.'
    }
  ];

  // All State variables:
  const [breadcrumbDataTrace, setBreadcrumbDataTrace] = useState();
  const [headerText, setHeaderText] = useState(HEADER_TEXTS_OBJECT.intro);
  const [onboardingState, setOnboardingState] = useState(0);
  const [onboardingType, setOnboardingType] = useState('scratch');
  const [subHeaderText, setSubHeaderText] = useState(SUB_TEXTS_OBJECT.intro);
  const [selectedOption, setSelectedOption] = useState(
    STEP_1_RADIO_GROUP_OPTIONS[0]
  );

  // All functions:
  const continueClickHandler = () => {
    console.group('Log: continueClickHandler');
    setOnboardingState(1);
    console.groupEnd('Log: continueClickHandler');
  };

  // All useEffects:
  useEffect(() => {
    if (onboardingState > 0) {
      setHeaderText(HEADER_TEXTS_OBJECT[onboardingType]);
      setSubHeaderText(SUB_TEXTS_OBJECT[onboardingType]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboardingState]);

  useEffect(() => {
    console.log('Log: selectedOption has changed to:', selectedOption);
    if (selectedOption.label === STEP_1_RADIO_GROUP_OPTIONS[0].label) {
      setOnboardingType('scratch');
      setBreadcrumbDataTrace([
        {
          current: false,

          name: 'Setup Guide',
          url: '/onboarding'
        },
        {
          current: false,
          name: 'Create Automation Grid from Scratch',
          url: '/'
        }
      ]);
    } else {
      setOnboardingType('existing');
      setBreadcrumbDataTrace([
        {
          current: false,

          name: 'Setup Guide',
          url: '/onboarding'
        },
        {
          current: false,
          name: 'Create Automation Grid in existing Kubernetes setup',
          url: '/'
        }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  return {
    LIST_FEED_PROPS,
    SHOW_LINE_NUMBERS,
    SHOW_SINGLE_LINE,
    STEP_1_RADIO_GROUP_OPTIONS,
    SELECT_OPTIONS,
    breadcrumbDataTrace,
    continueClickHandler,
    headerText,
    onboardingState,
    onboardingType,
    selectedOption,
    setSelectedOption,
    subHeaderText
  };
};

export default useOnboarding;
