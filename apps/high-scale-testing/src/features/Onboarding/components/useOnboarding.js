import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getOnboardingData } from '../../../apis';
import { getUserDetails } from '../../../globalSlice/selector';

const useOnboarding = () => {
  // All Store variables:
  const userDetails = useSelector(getUserDetails);

  // All Constants:
  const CODE_SNIPPETS_SCRATCH = {
    'create-grid': {
      a: {
        code: 'npm install @browserstack/browserstack-cli',
        text: 'Download CLI.'
      },
      b: {
        code: `/* Set these values in your ~/.zprofile (zsh) or ~/.profile (bash) */
export BROWSERSTACK_USERNAME=<username>
export BROWSERSTACK_ACCESS_KEY=<accesskey>

/* Create HST configuration profile with AWS credentials */
browserstack-cli hst init`,
        text: 'Setup CLI with AWS credentials.'
      },
      c: {
        code: 'browserstack-cli hst create grid',
        text: 'Execute grid creation command.'
      }
    }
  };

  const DUMMY_EVENT_LOGS = `info: Creating required dependencies - EKS Role, VPC & Subnets
info: Dependencies created successfully
debug: Role => arn:aws:iam:72354175:role/EKSServiceRole-ac309e2e-1987-49jh
info: Creating cluster “high-scale-grid-cluster”`;
  const GRID_MANAGER_NAMES = {
    helm: 'Helm',
    kubectl: 'Kubectl',
    cli: 'cli'
  };
  const HEADER_TEXTS_OBJECT = {
    intro: `Hey ${userDetails.username}, Welcome to High Scale Testing`,
    scratch: 'Create Automation Grid',
    existing: 'Create Automation Grid'
  };
  const LIST_FEED_PROPS = {
    feedIconColor: 'grey',
    feedIconContainerSize: 'sm',
    feedIconSize: 'sm',
    feedIconVariant: 'light'
  };
  const ONBOARDING_TYPES = {
    scratch: 'scratch',
    existing: 'existing'
  };
  const SCRATCH_RADIO_GROUP_OPTIONS = [
    {
      disabled: false,
      id: 'radio-1',
      name: 'Amazon Cloud',
      configName: 'amazon-cloud'
    },
    {
      disabled: true,
      id: 'radio-2',
      name: 'Google Cloud',
      configName: 'google-cloud'
    },
    {
      disabled: true,
      id: 'radio-3',
      name: 'Microsoft Azure',
      configName: 'microsoft-azure'
    }
  ];
  const DEFAULT_CLOUD_PROVIDER = SCRATCH_RADIO_GROUP_OPTIONS[0];

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
  const [allAvailableRegionsByProvider, setAllAvailableRegionsByProvider] =
    useState(null);
  const [breadcrumbDataTrace, setBreadcrumbDataTrace] = useState();
  const [activeGridManagerCodeSnippet, setActiveGridManagerCodeSnippet] =
    useState(GRID_MANAGER_NAMES.helm);
  const [codeSnippetsForExistingSetup, setCodeSnippetsForExistingSetup] =
    useState(null);
  const [currentSelectedCloudProvider, setCurrentCloudProvider] = useState(
    DEFAULT_CLOUD_PROVIDER
  );
  const [eventLogsCode, setEventLogsCode] = useState(DUMMY_EVENT_LOGS);
  const [headerText, setHeaderText] = useState(HEADER_TEXTS_OBJECT.intro);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingType, setOnboardingType] = useState(
    ONBOARDING_TYPES.scratch
  );
  const [currentProvidersRegions, setCurrentProvidersRegions] = useState(
    allAvailableRegionsByProvider?.[DEFAULT_CLOUD_PROVIDER]
  );
  const [subHeaderText, setSubHeaderText] = useState(SUB_TEXTS_OBJECT.intro);
  const [selectedOption, setSelectedOption] = useState(
    STEP_1_RADIO_GROUP_OPTIONS[0]
  );
  const [selectedRegion, setSelectedRegion] = useState();

  // All functions:
  const breadcrumbStepClickHandler = (event, stepData) => {
    const { goToStep } = stepData;
    if (Number.isInteger(goToStep)) {
      setOnboardingStep(goToStep);
    }
  };

  const continueClickHandler = () => {
    console.group('Log: continueClickHandler');
    setOnboardingStep(1);
    console.groupEnd('Log: continueClickHandler');
  };

  // All useEffects:
  useEffect(() => {
    if (onboardingStep > 0) {
      setHeaderText(HEADER_TEXTS_OBJECT[onboardingType]);
      setSubHeaderText(SUB_TEXTS_OBJECT[onboardingType]);
    } else {
      setHeaderText(HEADER_TEXTS_OBJECT.intro);
      setSubHeaderText(SUB_TEXTS_OBJECT.intro);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboardingStep]);

  useEffect(() => {
    if (selectedOption.label === STEP_1_RADIO_GROUP_OPTIONS[0].label) {
      setOnboardingType('scratch');
      setBreadcrumbDataTrace([
        {
          current: false,
          name: 'Setup Guide',
          url: '#',
          goToStep: 0
        },
        {
          current: false,
          name: 'Create Automation Grid from Scratch',
          url: '#',
          goToStep: 1
        }
      ]);
    } else {
      setOnboardingType('existing');
      setBreadcrumbDataTrace([
        {
          current: false,

          name: 'Setup Guide',
          url: '#',
          goToStep: 0
        },
        {
          current: false,
          name: 'Create Automation Grid in existing Kubernetes setup',
          url: '#',
          goToStep: 1
        }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  useEffect(() => {
    console.log(
      'Log: activeGridManagerCodeSnippet:',
      activeGridManagerCodeSnippet
    );
  }, [activeGridManagerCodeSnippet]);

  useEffect(() => {
    if (allAvailableRegionsByProvider) {
      setCurrentProvidersRegions(
        allAvailableRegionsByProvider[currentSelectedCloudProvider.configName]
      );
    }
  }, [allAvailableRegionsByProvider, currentSelectedCloudProvider]);

  useEffect(() => {
    const fetchOnboardingData = async () => {
      const response = await getOnboardingData(userDetails.id);
      const res = response.data;

      setAllAvailableRegionsByProvider(res.scratch['step-1'].regions);
      setCodeSnippetsForExistingSetup(res.existing);

      return response.data;
    };
    fetchOnboardingData();
  }, []);

  return {
    CODE_SNIPPETS_SCRATCH,
    DEFAULT_CLOUD_PROVIDER,
    GRID_MANAGER_NAMES,
    LIST_FEED_PROPS,
    ONBOARDING_TYPES,
    SCRATCH_RADIO_GROUP_OPTIONS,
    SHOW_LINE_NUMBERS,
    SHOW_SINGLE_LINE,
    STEP_1_RADIO_GROUP_OPTIONS,
    activeGridManagerCodeSnippet,
    breadcrumbDataTrace,
    breadcrumbStepClickHandler,
    codeSnippetsForExistingSetup,
    continueClickHandler,
    currentProvidersRegions,
    currentSelectedCloudProvider,
    eventLogsCode,
    headerText,
    onboardingStep,
    onboardingType,
    selectedOption,
    selectedRegion,
    setActiveGridManagerCodeSnippet,
    setCurrentCloudProvider,
    setEventLogsCode,
    setSelectedOption,
    setSelectedRegion,
    subHeaderText
  };
};

export default useOnboarding;
