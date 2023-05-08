/* eslint-disable no-console */
import { useEffect, useState } from 'react';

const useOnboarding = () => {
  const headerTextsArray = [
    'Hey John Doe, Welcome to High Scale Testing',
    'Create Automation Grid'
  ];
  const subTextsArray = [
    'Create your own Automation Grid to support functional testing at scale',
    'Setting up everything from scratch.'
  ];
  const radioGroupOptions = [
    {
      description: 'Create complete Automation Grid from scratch',
      disabled: false,
      id: 'radio-1',
      name: "No, I don't have a setup"
    },
    {
      description: 'Create Automation Grid in my existing Kubernetes setup',
      disabled: false,
      id: 'radio-2',
      name: 'Yes, I have a setup'
    }
  ];
  const [subHeaderText, setSubHeaderText] = useState(subTextsArray);

  const [headerText, setHeaderText] = useState(headerTextsArray[0]);
  const [selectedOption, setSelectedOption] = useState(radioGroupOptions[0]);
  const [onboardingState, setOnboardingState] = useState(0);

  const continueClickHandler = () => {
    console.group('Log: continueClickHandler');
    setOnboardingState(1);
    console.groupEnd('Log: continueClickHandler');
  };

  useEffect(() => {
    setHeaderText(headerTextsArray[onboardingState]);
    setSubHeaderText(subTextsArray[onboardingState]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboardingState]);

  return {
    continueClickHandler,
    headerText,
    onboardingState,
    radioGroupOptions,
    selectedOption,
    setSelectedOption,
    subHeaderText
  };
};

export default useOnboarding;
