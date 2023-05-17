import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  getOnboardingData,
  getOnboardingEventsLogsData,
  markOnboardingRegionChange,
  markOnboardingStatus
} from '../../../apis';
import ROUTES from '../../../constants/routes';
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
        code: `# Set these values in your ~/.zprofile (zsh) or ~/.profile (bash)
export BROWSERSTACK_USERNAME=${userDetails.username}
export BROWSERSTACK_ACCESS_KEY=${userDetails.accessKey}

# Create HST configuration profile with AWS credentials
browserstack-cli hst init`,
        text: 'Setup CLI with AWS credentials.'
      },
      c: {
        code: 'browserstack-cli hst create grid',
        text: 'Execute grid creation command.'
      }
    }
  };

  const GRID_MANAGER_NAMES = {
    helm: 'Helm',
    kubectl: 'Kubectl',
    cli: 'CLI'
  };
  const HEADER_TEXTS_OBJECT = {
    intro: `Hey ${userDetails.fullname}, Welcome to High Scale Testing`,
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
    scratch: '',
    existing: ''
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
    useState({});
  const [breadcrumbDataTrace, setBreadcrumbDataTrace] = useState();
  const [activeGridManagerCodeSnippet, setActiveGridManagerCodeSnippet] =
    useState(GRID_MANAGER_NAMES.helm);
  const [codeSnippetsForExistingSetup, setCodeSnippetsForExistingSetup] =
    useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSelectedCloudProvider, setCurrentCloudProvider] = useState(
    DEFAULT_CLOUD_PROVIDER
  );
  const [eventLogsCode, setEventLogsCode] = useState();
  const [headerText, setHeaderText] = useState(HEADER_TEXTS_OBJECT.intro);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingType, setOnboardingType] = useState(
    ONBOARDING_TYPES.scratch
  );
  const [currentProvidersRegions, setCurrentProvidersRegions] = useState(
    allAvailableRegionsByProvider?.[DEFAULT_CLOUD_PROVIDER]
  );
  const [frameworkURLs, setFrameworkURLs] = useState({
    selenium: null,
    playwright: null
  });
  const [pollForEventLogs, setPollForEventLogs] = useState(true);
  const [showSetupStatusModal, setShowSetupStatusModal] = useState(true);
  const [subHeaderText, setSubHeaderText] = useState(SUB_TEXTS_OBJECT.intro);
  const [selectedOption, setSelectedOption] = useState(
    STEP_1_RADIO_GROUP_OPTIONS[0]
  );
  const [selectedRegion, setSelectedRegion] = useState();
  const [totalSteps, setTotalSteps] = useState(0);

  // All functions:
  const breadcrumbStepClickHandler = (event, stepData) => {
    const { goToStep } = stepData;
    if (Number.isInteger(goToStep)) {
      setOnboardingStep(goToStep);
    }
  };

  const continueClickHandler = () => {
    setOnboardingStep(1);
  };

  const exploreAutomationClickHandler = () => {
    setShowSetupStatusModal(false);
    window.location = `${window.location.origin}${ROUTES.GRID_CONSOLE}`;
  };

  const viewAllBuildsClickHandler = () => {
    setShowSetupStatusModal(false);
    window.location = `${window.location.origin}${ROUTES.BUILDS}`;
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
    if (Object.keys(allAvailableRegionsByProvider).length > 0) {
      setCurrentProvidersRegions(
        allAvailableRegionsByProvider[currentSelectedCloudProvider.configName]
      );

      /*
        allAvailableRegionsByProvider contains the absolute list of regions supported by various cloud Providers.
        Now, we are setting the default region based on the currently selected Cloud Provider below
      */
      const defaultRegionToSet = allAvailableRegionsByProvider[
        currentSelectedCloudProvider.configName
      ].find((region) => region.default === true);

      setSelectedRegion(defaultRegionToSet);
    }
  }, [allAvailableRegionsByProvider, currentSelectedCloudProvider]);

  useEffect(() => {
    markOnboardingRegionChange(
      userDetails.id,
      currentSelectedCloudProvider,
      selectedRegion
    );
  }, [currentSelectedCloudProvider, selectedRegion, userDetails]);

  useEffect(() => {
    const fetchOnboardingData = async () => {
      const response = await getOnboardingData(userDetails.id);
      const res = response.data;

      setAllAvailableRegionsByProvider(res.scratch['step-1'].regions);
      setCodeSnippetsForExistingSetup(res.existing);
      return response.data;
    };

    const fetchEventsLogsData = async () => {
      const response = await getOnboardingEventsLogsData(
        userDetails.id,
        onboardingType
      );
      const res = response.data;

      setEventLogsCode(res.currentLogs);
      setCurrentStep(res.currentStep);
      setTotalSteps(res.totalSteps);

      if (res.currentStep === res.totalSteps) {
        setPollForEventLogs(false);
        setFrameworkURLs(res.framework);
        setTimeout(() => {
          setIsSetupComplete(true);
        }, 1000);

        markOnboardingStatus(userDetails.id, 'success');
      }
    };

    fetchOnboardingData();

    if (pollForEventLogs) {
      setInterval(() => {
        fetchEventsLogsData();
      }, 5000);
    }
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
    currentStep,
    currentProvidersRegions,
    currentSelectedCloudProvider,
    eventLogsCode,
    exploreAutomationClickHandler,
    frameworkURLs,
    headerText,
    isSetupComplete,
    onboardingStep,
    onboardingType,
    selectedOption,
    selectedRegion,
    setActiveGridManagerCodeSnippet,
    setCurrentCloudProvider,
    setSelectedOption,
    setSelectedRegion,
    showSetupStatusModal,
    subHeaderText,
    totalSteps,
    viewAllBuildsClickHandler
  };
};

export default useOnboarding;
