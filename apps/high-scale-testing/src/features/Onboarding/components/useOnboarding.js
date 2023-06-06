import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMountEffect } from '@browserstack/hooks';
import { logEvent } from '@browserstack/utils';
import {
  getOnboardingData,
  getOnboardingEventsLogsData,
  markOnboardingRegionChange,
  markOnboardingStatus
} from 'api';
import {
  AGHaveSetupInteracted,
  AGHaveSetupPresented,
  AGNoSetupInteracted,
  AGNoSetupPresented,
  AGNoSetupStepsExecuted,
  AGSetupGuideInteracted,
  AGSetupGuideVisited
} from 'constants/event-names';
import {
  GRID_MANAGER_NAMES,
  SCRATCH_RADIO_GROUP_OPTIONS
} from 'constants/index';
import { EVENT_LOGS_STATUS } from 'constants/onboarding';
import ROUTES from 'constants/routes';
import { getUserDetails } from 'globalSlice/selector';

const useOnboarding = () => {
  // All Store variables:
  const userDetails = useSelector(getUserDetails);

  // All Constants:
  const CODE_SNIPPETS_SCRATCH = {
    'create-grid': {
      a: {
        code: 'npm install browserstack-node-sdk',
        language: 'npm',
        text: 'Download CLI.'
      },
      b: {
        code: `# Set these values in your ~/.zprofile (zsh) or ~/.profile (bash)
export BROWSERSTACK_USERNAME=${userDetails.username}
export BROWSERSTACK_ACCESS_KEY=${userDetails.accessKey}

# Create HST configuration profile with AWS credentials
browserstack-cli hst init`,
        language: 'node',
        text: 'Setup CLI with AWS credentials.'
      },
      c: {
        code: 'browserstack-cli hst create grid',
        language: 'node',
        text: 'Execute grid creation command.'
      }
    }
  };

  const HEADER_TEXTS_OBJECT = {
    intro: `Hey ${userDetails.fullname}, Welcome to Automation Grid`,
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

  const DEFAULT_CLOUD_PROVIDER = SCRATCH_RADIO_GROUP_OPTIONS[0];

  const SHOW_LINE_NUMBERS = false;
  const SHOW_SINGLE_LINE = true;
  const SUB_TEXTS_OBJECT = {
    intro:
      'Create and manage your own Automation Grid that supports frameworks like Selenium, Playwright, and Cypress to support browser testing at scale',
    scratch: 'Quickly create a grid in below 4 steps.',
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
    useState({ index: 0, name: GRID_MANAGER_NAMES.helm });
  const [codeSnippetsForExistingSetup, setCodeSnippetsForExistingSetup] =
    useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSelectedCloudProvider, setCurrentCloudProvider] = useState(
    DEFAULT_CLOUD_PROVIDER
  );
  const [eventLogsCode, setEventLogsCode] = useState();
  const [eventLogsStatus, setEventLogsStatus] = useState(
    EVENT_LOGS_STATUS.NOT_STARTED
  );
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
  const [showEventLogsModal, setShowEventLogsModal] = useState(true);
  const [showGridHeartBeats, setShowGridHeartbeats] = useState(true);
  const [showSetupStatusModal, setShowSetupStatusModal] = useState(false);
  const [subHeaderText, setSubHeaderText] = useState(SUB_TEXTS_OBJECT.intro);
  const [selectedOption, setSelectedOption] = useState(
    STEP_1_RADIO_GROUP_OPTIONS[0]
  );
  const [selectedRegion, setSelectedRegion] = useState();
  const [totalSteps, setTotalSteps] = useState(0);

  // All functions:
  const breadcrumbStepClickHandler = (event, stepData) => {
    if (stepData.name === 'Setup Guide') {
      if (onboardingType === ONBOARDING_TYPES.existing) {
        logEvent(['amplitude'], 'web_events', AGHaveSetupInteracted, {
          action: 'setupguide_clicked'
        });
      } else if (onboardingType === ONBOARDING_TYPES.scratch) {
        logEvent(['amplitude'], 'web_events', AGNoSetupPresented, {
          action: 'setupguide_clicked'
        });
      }
    }
    const { goToStep } = stepData;
    if (Number.isInteger(goToStep)) {
      setOnboardingStep(goToStep);
    }
  };

  const closeEventLogsModal = () => {
    setShowEventLogsModal(false);
  };

  const closeSetupStatusModal = () => {
    setShowSetupStatusModal(false);
  };

  const cloudProviderChangeHandler = (e, option) => {
    const newOption = SCRATCH_RADIO_GROUP_OPTIONS.find(
      (item) => item.id === option
    );

    logEvent([], 'web_events', AGNoSetupStepsExecuted, {
      action: 'cloudprovider_selected',
      value: option.configName
    });
    setCurrentCloudProvider(newOption);
  };

  const cloudRegionChangeHandler = (e) => {
    logEvent([], 'web_events', AGNoSetupStepsExecuted, {
      action: 'cloudregion_selected',
      option: e.value
    });
    setSelectedRegion(e);
  };

  const codeSnippetTabChangeHandler = (e) => {
    const eventData = {
      action: ''
    };

    if (e.name === 'Helm') {
      eventData.action = 'hrlmoption_clicked';
    } else if (e.name === 'Kubectl') {
      eventData.action = 'kubectloption_clicked';
    } else if (e.name === 'CLI') {
      eventData.action = 'clioption_clicked';
    }

    logEvent(['amplitude'], 'web_events', AGHaveSetupInteracted, eventData);

    setActiveGridManagerCodeSnippet(e);
  };

  const continueClickHandler = () => {
    logEvent(['amplitude'], 'web_events', AGSetupGuideInteracted, {
      action: 'continue_clicked',
      option:
        selectedOption.label === STEP_1_RADIO_GROUP_OPTIONS[0].label
          ? 'no_setup'
          : 'have_setup'
    });
    setOnboardingStep(1);
  };

  const exploreAutomationClickHandler = () => {
    closeSetupStatusModal();
    window.location = `${window.location.origin}${ROUTES.GRID_CONSOLE}`;
  };

  const logTermsConditionsEvents = () => {
    logEvent(['amplitude'], 'web_events', AGSetupGuideInteracted, {
      action: 'termsdoc_clicked'
    });
  };

  const logViewDocumentationEvents = () => {
    logEvent(['amplitude'], 'web_events', AGSetupGuideInteracted, {
      action: 'viewdoc_clicked'
    });
  };

  const viewAllBuildsClickHandler = () => {
    closeSetupStatusModal();
    window.location = `${window.location.origin}${ROUTES.BUILDS}`;
  };

  const viewEventLogsClickHandler = () => {
    if (onboardingType === ONBOARDING_TYPES.scratch) {
      logEvent([''], 'web_events', AGNoSetupInteracted, {
        action: 'vieweventlogs_clicked'
      });
    } else if (onboardingType === ONBOARDING_TYPES.existing) {
      logEvent(['amplitude'], 'web_events', AGHaveSetupInteracted, {
        action: 'vieweventlogs_clicked'
      });
    }
    setShowEventLogsModal(true);
  };

  // All useEffects:
  useEffect(() => {
    if (onboardingStep > 0) {
      setHeaderText(HEADER_TEXTS_OBJECT[onboardingType]);
      setSubHeaderText(SUB_TEXTS_OBJECT[onboardingType]);
      setPollForEventLogs(true);
    } else {
      setHeaderText(HEADER_TEXTS_OBJECT.intro);
      setSubHeaderText(SUB_TEXTS_OBJECT.intro);
      setPollForEventLogs(false);
    }

    if (onboardingStep > 0) {
      if (onboardingType === ONBOARDING_TYPES.scratch) {
        logEvent([], 'web_events', AGNoSetupPresented);
      }

      if (onboardingType === ONBOARDING_TYPES.existing) {
        logEvent([], 'web_events', AGHaveSetupPresented);
      }
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
      logEvent(['amplitude'], 'web_events', AGSetupGuideInteracted, {
        action: 'nosetup_clicked'
      });
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
      logEvent(['amplitude'], 'web_events', AGSetupGuideInteracted, {
        action: 'havesetup_clicked'
      });
    }
  }, [STEP_1_RADIO_GROUP_OPTIONS, selectedOption]);

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
      currentSelectedCloudProvider.configName,
      selectedRegion
    );
  }, [currentSelectedCloudProvider, selectedRegion, userDetails]);

  useEffect(() => {
    if (currentStep === -1) {
      setTimeout(() => {
        setEventLogsStatus(EVENT_LOGS_STATUS.FAILED);
        setIsSetupComplete(true);
      }, 1000);
    } else if (currentStep === 0) {
      setEventLogsStatus(EVENT_LOGS_STATUS.NOT_STARTED);
    } else if (currentStep > 0 && currentStep !== totalSteps) {
      setEventLogsStatus(EVENT_LOGS_STATUS.IN_PROGRESS);
      if (showGridHeartBeats) {
        setTimeout(() => {
          setShowGridHeartbeats(false);
        }, 1000);
      }
    } else if (currentStep === totalSteps) {
      setEventLogsStatus(EVENT_LOGS_STATUS.FINISHED);

      setTimeout(() => {
        setIsSetupComplete(true);
      }, 1000);
    }
  }, [currentStep, showGridHeartBeats, totalSteps]);

  useEffect(() => {
    setShowSetupStatusModal(isSetupComplete);
  }, [isSetupComplete]);

  useMountEffect(() => {
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

      if (
        onboardingStep === 0 &&
        res.currentStep > 0 &&
        (res.onboardingType === ONBOARDING_TYPES.scratch ||
          res.onboardingType === ONBOARDING_TYPES.existing)
      ) {
        setOnboardingType(res.onboardingType);
        // setOnboardingStep(1);
      }

      if (res.currentStep === res.totalSteps) {
        setPollForEventLogs(false);
        setFrameworkURLs(res.framework);
        setTimeout(() => {
          setIsSetupComplete(true);
        }, 1000);

        markOnboardingStatus(userDetails.id, 'success');
      }
    };

    if (!userDetails.onboardingCompleted) {
      fetchOnboardingData();

      if (pollForEventLogs) {
        setInterval(() => {
          fetchEventsLogsData();
        }, 10000);
      }

      fetchEventsLogsData();
    } else {
      window.location.href = `${window.location.origin}${ROUTES.GRID_CONSOLE}`;
    }

    logEvent([], 'web_events', AGSetupGuideVisited);
  });

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
    closeEventLogsModal,
    closeSetupStatusModal,
    cloudProviderChangeHandler,
    cloudRegionChangeHandler,
    codeSnippetsForExistingSetup,
    codeSnippetTabChangeHandler,
    continueClickHandler,
    currentStep,
    currentProvidersRegions,
    currentSelectedCloudProvider,
    eventLogsCode,
    eventLogsStatus,
    exploreAutomationClickHandler,
    frameworkURLs,
    headerText,
    isSetupComplete,
    logTermsConditionsEvents,
    logViewDocumentationEvents,
    onboardingStep,
    onboardingType,
    selectedOption,
    selectedRegion,
    setCurrentCloudProvider,
    setSelectedOption,
    setSelectedRegion,
    showEventLogsModal,
    showGridHeartBeats,
    showSetupStatusModal,
    subHeaderText,
    totalSteps,
    viewAllBuildsClickHandler,
    viewEventLogsClickHandler
  };
};

export default useOnboarding;
