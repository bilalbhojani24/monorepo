import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useInterval, useMountEffect } from '@browserstack/hooks';
import {
  createTrialGridForUser,
  getSetupData,
  getSetupEventsLogsData,
  markSetupRegionChange,
  markSetupStatus
} from 'api';
import { BannerMessages } from 'constants/bannerMessages';
import {
  AGErrorGridModalInteracted,
  AGErrorGridModalPresented,
  AGEventsLogModalInteracted,
  AGHaveSetupInteracted,
  AGHaveSetupPresented,
  AGHaveSetupStepsExecuted,
  AGNoRetrySetupStepsExecuted,
  AGNoSetupInteracted,
  AGNoSetupPresented,
  AGNoSetupStepsExecuted,
  AGSetupGuideInteracted,
  AGSetupGuideVisited,
  AGSuccessGridModalInteracted,
  AGSuccessGridModalPresented
} from 'constants/event-names';
import {
  EVENT_LOGS_POLLING_IN_MS,
  GRID_MANAGER_NAMES,
  SCRATCH_RADIO_GROUP_OPTIONS
} from 'constants/index';
import ROUTES from 'constants/routes';
import {
  CODE_SNIPPETS_SCRATCH,
  EVENT_LOGS_STATUS,
  HEADER_TEXTS_OBJECT,
  SETUP_TYPES,
  STEP_1_RADIO_GROUP_OPTIONS
} from 'constants/setup';
import { SETUP_GUIDE } from 'constants/strings';
import { setTrialGridUsed } from 'globalSlice/index';
import {
  getShowSetup,
  getTrialGrid,
  getUserDetails,
  getUserHasSessions
} from 'globalSlice/selector';
import { logHSTEvent } from 'utils/logger';

import { DEFAULT_CLOUD_PROVIDER, SUB_TEXTS_OBJECT } from '../constants';

const useSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // All Store variables:
  const { isExpired: isTrialGridExpired, isUsed: isTrialGridUsed } =
    useSelector(getTrialGrid);
  const showSetup = useSelector(getShowSetup);
  const userDetails = useSelector(getUserDetails);
  const userHasSessions = useSelector(getUserHasSessions);

  // All Constants:
  const CODE_SNIPPETS_FOR_SCRATCH = CODE_SNIPPETS_SCRATCH(userDetails);

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
  const [headerText, setHeaderText] = useState(
    HEADER_TEXTS_OBJECT(userDetails).intro
  );
  const [isGridSetupComplete, setIsGridSetupComplete] = useState(false);
  const [onboardingStep, setSetupStep] = useState(0);
  const [setupType, setSetupType] = useState(SETUP_TYPES.scratch);
  const [currentProvidersRegions, setCurrentProvidersRegions] = useState(
    allAvailableRegionsByProvider?.[DEFAULT_CLOUD_PROVIDER]
  );
  const [frameworkURLs, setFrameworkURLs] = useState({
    selenium: null,
    playwright: null
  });
  const [newGridName, setNewGridName] = useState(null);
  const [pollForEventLogs, setPollForEventLogs] = useState(true);
  const [showEventLogsModal, setShowEventLogsModal] = useState(true);
  const [showGridHeartBeats, setShowGridHeartbeats] = useState(true);
  const [showSetupStatusModal, setShowSetupStatusModal] = useState(false);
  const [showTrialGridBanner, setShowTrialGridBanner] = useState(false);
  const [subHeaderText, setSubHeaderText] = useState(SUB_TEXTS_OBJECT.intro);
  const [selectedOption, setSelectedOption] = useState(
    STEP_1_RADIO_GROUP_OPTIONS[0]
  );
  const [selectedRegion, setSelectedRegion] = useState();
  const [totalSteps, setTotalSteps] = useState(0);
  const [useTrialGridLoading, setUseTrialGridLoading] = useState(false);
  const [useTrialGridBannerText, setUseTrialGridBannerText] = useState(
    BannerMessages.trialGridSetupPageIntro
  );

  const intervalIdForEventLogs = useRef();

  // All functions:
  const breadcrumbStepClickHandler = (event, stepData) => {
    if (stepData.name === SETUP_GUIDE) {
      if (setupType === SETUP_TYPES.existing) {
        logHSTEvent(['amplitude'], 'web_events', AGHaveSetupInteracted, {
          action: 'setupguide_clicked'
        });
      } else if (setupType === SETUP_TYPES.scratch) {
        logHSTEvent(['amplitude'], 'web_events', AGNoSetupPresented, {
          action: 'setupguide_clicked'
        });
      }
    }
    const { goToStep } = stepData;
    if (Number.isInteger(goToStep)) {
      setSetupStep(goToStep);
    }
  };

  const closeEventLogsModal = () => {
    logHSTEvent(['amplitude'], 'web_events', AGEventsLogModalInteracted, {
      action: 'actionbutton_clicked'
    });
    setShowEventLogsModal(false);
  };

  const closeSetupStatusModal = () => {
    logHSTEvent([
      'amplitude',
      'web_events',
      AGErrorGridModalInteracted,
      { action: 'close_clicked' }
    ]);
    setShowSetupStatusModal(false);
  };

  const cloudProviderChangeHandler = (value) => {
    const newOption = SCRATCH_RADIO_GROUP_OPTIONS.find(
      (item) => item.value === value
    );

    logHSTEvent([], 'web_events', AGNoSetupStepsExecuted, {
      action: 'cloudprovider_selected',
      value
    });
    setCurrentCloudProvider(newOption);
  };

  const cloudRegionChangeHandler = (e) => {
    logHSTEvent([], 'web_events', AGNoSetupStepsExecuted, {
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

    logHSTEvent(['amplitude'], 'web_events', AGHaveSetupInteracted, eventData);

    setActiveGridManagerCodeSnippet(e);
  };

  const continueClickHandler = () => {
    logHSTEvent(['amplitude'], 'web_events', AGSetupGuideInteracted, {
      action: 'continue_clicked',
      option:
        selectedOption.label === STEP_1_RADIO_GROUP_OPTIONS[0].label
          ? 'no_setup'
          : 'have_setup'
    });
    setSetupStep(1);
  };

  const copyCallbackFnForExistingSetup = (codeType) => {
    const eventData = {
      action: 'command copied',
      option: codeType.toLowerCase()
    };
    logHSTEvent([], 'web_events', AGHaveSetupStepsExecuted, eventData);
  };

  const copyCallbackFnForNewSetup = (type) => {
    const eventData = {
      action: 'command copied',
      option: type.toLowerCase()
    };
    logHSTEvent([], 'web_events', AGNoSetupStepsExecuted, eventData);
  };

  const copySetupFailureCode = () => {
    const eventData = { action: 'command_copied', option: 'create' };
    logHSTEvent([], 'web_events', AGNoRetrySetupStepsExecuted, eventData);
  };

  const exploreAutomationClickHandler = () => {
    logHSTEvent(['amplitude'], 'web_events', AGSuccessGridModalInteracted, {
      action: 'console_clicked'
    });
    closeSetupStatusModal();
    window.location = `${window.location.origin}${ROUTES.GRID_CONSOLE}`;
  };

  const handleDismissClick = () => {
    setShowSetupStatusModal(false);
  };

  const logTermsConditionsEvents = () => {
    logHSTEvent(['amplitude'], 'web_events', AGSetupGuideInteracted, {
      action: 'termsdoc_clicked'
    });
  };

  const logViewDocumentationEvents = () => {
    let eventName = '';

    if (onboardingStep === 0) {
      eventName = AGSetupGuideInteracted;
    } else if (onboardingStep === 1 && setupType === SETUP_TYPES.scratch) {
      eventName = AGNoSetupInteracted;
    } else if (onboardingStep === 1 && setupType === SETUP_TYPES.existing) {
      eventName = AGHaveSetupInteracted;
    }

    logHSTEvent(['amplitude'], 'web_events', eventName, {
      action: 'viewdoc_clicked'
    });
  };

  const useTrialGridClickHandler = async () => {
    setUseTrialGridLoading(true);
    await createTrialGridForUser({
      userId: userDetails.id,
      setupType: setupType
    }).then((res) => {
      const { gridId } = res.data;
      if (res.status === 200) {
        dispatch(setTrialGridUsed(true));
        navigate(`/grid-console/grid/${gridId}/overview`);
      }
    });
  };

  const viewAllBuildsClickHandler = () => {
    logHSTEvent(['amplitude'], 'web_events', AGSuccessGridModalInteracted, {
      action: 'viewbuilds_clicked'
    });
    closeSetupStatusModal();
    window.location = `${window.location.origin}${ROUTES.BUILDS}`;
  };

  const viewEventLogsClickHandler = () => {
    if (setupType === SETUP_TYPES.scratch) {
      logHSTEvent([''], 'web_events', AGNoSetupInteracted, {
        action: 'vieweventlogs_clicked'
      });
    } else if (setupType === SETUP_TYPES.existing) {
      logHSTEvent(['amplitude'], 'web_events', AGHaveSetupInteracted, {
        action: 'vieweventlogs_clicked'
      });
    }
    setShowEventLogsModal(true);
  };

  // All useEffects:
  useEffect(() => {
    if (onboardingStep > 0) {
      setHeaderText(HEADER_TEXTS_OBJECT(userDetails)[setupType]);
      setSubHeaderText(SUB_TEXTS_OBJECT[setupType]);
      setPollForEventLogs(true);
      setShowTrialGridBanner(!isTrialGridUsed);
    } else {
      setHeaderText(HEADER_TEXTS_OBJECT(userDetails).intro);
      setSubHeaderText(SUB_TEXTS_OBJECT.intro);
      setPollForEventLogs(false);
      setShowTrialGridBanner(false);
    }

    if (onboardingStep > 0) {
      if (setupType === SETUP_TYPES.scratch) {
        logHSTEvent([], 'web_events', AGNoSetupPresented);
      }

      if (setupType === SETUP_TYPES.existing) {
        logHSTEvent([], 'web_events', AGHaveSetupPresented);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboardingStep]);

  useEffect(() => {
    if (
      selectedOption.description === STEP_1_RADIO_GROUP_OPTIONS[0].description
    ) {
      setSetupType('scratch');
      setBreadcrumbDataTrace([
        {
          current: false,
          name: SETUP_GUIDE,
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
      logHSTEvent(['amplitude'], 'web_events', AGSetupGuideInteracted, {
        action: 'nosetup_clicked'
      });
    } else {
      setSetupType('existing');
      setBreadcrumbDataTrace([
        {
          current: false,

          name: SETUP_GUIDE,
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
      logHSTEvent(['amplitude'], 'web_events', AGSetupGuideInteracted, {
        action: 'havesetup_clicked'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  useEffect(() => {
    if (Object.keys(allAvailableRegionsByProvider).length > 0) {
      setCurrentProvidersRegions(
        allAvailableRegionsByProvider[currentSelectedCloudProvider.value]
      );

      /*
        allAvailableRegionsByProvider contains the absolute list of regions supported by various cloud Providers.
        Now, we are setting the default region based on the currently selected Cloud Provider below
      */
      const defaultRegionToSet = allAvailableRegionsByProvider[
        currentSelectedCloudProvider.value
      ].find((region) => region.default === true);

      setSelectedRegion(defaultRegionToSet);
    }
  }, [allAvailableRegionsByProvider, currentSelectedCloudProvider]);

  useEffect(() => {
    markSetupRegionChange(
      userDetails.id,
      currentSelectedCloudProvider.value,
      selectedRegion
    );
  }, [currentSelectedCloudProvider, selectedRegion, userDetails]);

  useEffect(() => {
    if (currentStep === -1) {
      setTimeout(() => {
        logHSTEvent([], 'web_events', AGErrorGridModalPresented);
        setEventLogsStatus(EVENT_LOGS_STATUS.FAILED);
        setIsGridSetupComplete(true);
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
      logHSTEvent([''], 'web_events', AGSuccessGridModalPresented);
      setEventLogsStatus(EVENT_LOGS_STATUS.FINISHED);

      setTimeout(() => {
        setIsGridSetupComplete(true);
      }, 1000);
    }
  }, [currentStep, showGridHeartBeats, totalSteps]);

  useEffect(() => {
    setShowSetupStatusModal(isGridSetupComplete);
  }, [isGridSetupComplete]);

  useEffect(() => {
    if (useTrialGridLoading) {
      setUseTrialGridBannerText(BannerMessages.trialGridSetupPageIntroLoading);
    } else {
      setUseTrialGridBannerText(BannerMessages.trialGridSetupPageIntro);
    }
  }, [useTrialGridLoading]);

  const fetchEventsLogsData = async (type, step) => {
    const response = await getSetupEventsLogsData(userDetails.id, type);
    const res = response.data;

    setEventLogsCode(res.currentLogs);
    setCurrentStep(res.currentStep);
    setTotalSteps(res.totalSteps);
    setNewGridName(res.gridName);

    if (
      step === 0 &&
      res.currentStep > 0 &&
      (res.setupType === SETUP_TYPES.scratch ||
        res.setupType === SETUP_TYPES.existing)
    ) {
      setSetupType(res.setupType);
      setSetupStep(1);
    }

    if (res.currentStep === res.totalSteps) {
      setPollForEventLogs(false);
      setFrameworkURLs(res.framework);
      setTimeout(() => {
        setIsGridSetupComplete(true);
      }, 1000);

      markSetupStatus(userDetails.id, 'success');
    }
  };

  useInterval(
    () => {
      fetchEventsLogsData(setupType, onboardingStep);
    },
    intervalIdForEventLogs.current === null ? null : EVENT_LOGS_POLLING_IN_MS
  );

  useMountEffect(() => {
    const fetchSetupData = async () => {
      const response = await getSetupData(userDetails.id);
      const res = response.data;

      setAllAvailableRegionsByProvider(res.scratch['step-1'].regions);
      setCodeSnippetsForExistingSetup(res.existing);
      return response.data;
    };

    if (showSetup) {
      fetchSetupData();

      if (pollForEventLogs) {
        intervalIdForEventLogs.current = EVENT_LOGS_POLLING_IN_MS;
      }
    } else {
      window.location.href = `${window.location.origin}${ROUTES.GRID_CONSOLE}`;
    }

    logHSTEvent([], 'web_events', AGSetupGuideVisited);
  });

  return {
    CODE_SNIPPETS_FOR_SCRATCH,
    DEFAULT_CLOUD_PROVIDER,
    SCRATCH_RADIO_GROUP_OPTIONS,
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
    copyCallbackFnForExistingSetup,
    copyCallbackFnForNewSetup,
    copySetupFailureCode,
    currentStep,
    currentProvidersRegions,
    currentSelectedCloudProvider,
    eventLogsCode,
    eventLogsStatus,
    exploreAutomationClickHandler,
    frameworkURLs,
    handleDismissClick,
    headerText,
    isGridSetupComplete,
    isTrialGridExpired,
    isTrialGridUsed,
    logTermsConditionsEvents,
    logViewDocumentationEvents,
    navigate,
    newGridName,
    onboardingStep,
    setupType,
    selectedOption,
    selectedRegion,
    setCurrentCloudProvider,
    setSelectedOption,
    setSelectedRegion,
    showEventLogsModal,
    showGridHeartBeats,
    showSetupStatusModal,
    showTrialGridBanner,
    subHeaderText,
    totalSteps,
    userHasSessions,
    useTrialGridBannerText,
    useTrialGridClickHandler,
    useTrialGridLoading,
    viewAllBuildsClickHandler,
    viewEventLogsClickHandler
  };
};

export default useSetup;
