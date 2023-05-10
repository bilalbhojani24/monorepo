/* eslint-disable no-console */
import { useEffect, useState } from 'react';

const useOnboarding = () => {
  const headerTextsObject = {
    intro: 'Hey John Doe, Welcome to High Scale Testing',
    scratch: 'Create Automation Grid',
    existing: 'Create Automation Grid'
  };
  const SELECT_OPTIONS = [
    { label: 'A', value: 'A' },
    { label: 'A', value: 'A' },
    { label: 'A', value: 'A' },
    { label: 'A', value: 'A' }
  ];
  const subTextsObject = {
    intro:
      'Create your own Automation Grid to support functional testing at scale',
    scratch: 'Setting up everything from scratch.',
    existing: 'Setting up grid in your existing Kubernetes setup.'
  };
  const radioGroupOptions = [
    {
      description: 'Create complete Automation Grid from scratch',
      disabled: false,
      id: 'radio-1',
      label: "No, I don't have a setup"
    },
    {
      description: 'Create Automation Grid in my existing Kubernetes setup',
      disabled: false,
      id: 'radio-2',
      label: 'Yes, I have a setup'
    }
  ];

  const [subHeaderText, setSubHeaderText] = useState(subTextsObject.intro);
  const [headerText, setHeaderText] = useState(headerTextsObject.intro);
  const [selectedOption, setSelectedOption] = useState(radioGroupOptions[0]);
  const [onboardingState, setOnboardingState] = useState(0);
  const [onboardingType, setOnboardingType] = useState('existing');

  const continueClickHandler = () => {
    console.group('Log: continueClickHandler');
    setOnboardingState(1);
    console.groupEnd('Log: continueClickHandler');
  };

  useEffect(() => {
    if (onboardingState > 0) {
      setHeaderText(headerTextsObject[onboardingType]);
      setSubHeaderText(subTextsObject[onboardingType]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboardingState]);

  useEffect(() => {
    console.log('Log: selectedOption has changed to:', selectedOption);
    if (selectedOption.label === radioGroupOptions[0].label) {
      setOnboardingType('scratch');
    } else {
      setOnboardingType('existing');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  return {
    continueClickHandler,
    headerText,
    onboardingState,
    onboardingType,
    radioGroupOptions,
    SELECT_OPTIONS,
    selectedOption,
    setSelectedOption,
    subHeaderText
  };
};

export default useOnboarding;
