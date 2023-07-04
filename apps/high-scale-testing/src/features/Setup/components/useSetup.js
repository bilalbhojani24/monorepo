import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInterval, useMountEffect } from '@browserstack/hooks';
import {
  createNewGridProfile,
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
  DEFAULT_GRID_CONCURRENCY,
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
  getInstanceTypes,
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
  const searchParams = useSearchParams()[0];

  // All Store variables:
  const allAvailableInstanceTypes = useSelector(getInstanceTypes);
  const { isExpired: isTrialGridExpired, isUsed: isTrialGridUsed } =
    useSelector(getTrialGrid);
  const showSetup = useSelector(getShowSetup);
  const userDetails = useSelector(getUserDetails);
  const userHasSessions = useSelector(getUserHasSessions);

  // All State variables:
  const [allAvailableRegionsByProvider, setAllAvailableRegionsByProvider] =
    useState({});
  const [allAvailableSubnets, setAllAvailableSubnets] = useState([]);
  const [allAvailableVPCIDs, setAllAvailableVPCIDs] = useState([]);
  const [breadcrumbDataTrace, setBreadcrumbDataTrace] = useState();
  const [currenClusterName, setCurrentClusterName] =
    useState('high-scale-testing');
  const [currentGridConcurrency, setCurrentGridConcurrency] = useState(
    DEFAULT_GRID_CONCURRENCY
  );
  const [currentGridInstanceType, setCurrentGridInstanceType] = useState(null);
  const [currentGridName, setCurrentGridName] = useState('default');
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
  const [gridProfileData, setGridProfileData] = useState({});
  const [headerText, setHeaderText] = useState(
    HEADER_TEXTS_OBJECT(userDetails).intro
  );
  const [isGridSetupComplete, setIsGridSetupComplete] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isSubnetLoading, setIsSubnetLoading] = useState(false);
  const [isVPCLoading, setIsVPCLoading] = useState(false);
  const [onboardingStep, setSetupStep] = useState(0);
  const [resourceMap, setResourceMap] = useState({});
  const [selectedGridProfile, setSelectedGridProfile] = useState('default');
  const [selectedSubnetValues, setSelectedSubnetValues] = useState([]);
  const [selectedVPCValue, setSelectedVPCValue] = useState('');
  const [setupType, setSetupType] = useState(SETUP_TYPES.scratch);
  const [subnetQuery, setSubnetQuery] = useState('');
  const [currentProvidersRegions, setCurrentProvidersRegions] = useState(
    allAvailableRegionsByProvider?.[DEFAULT_CLOUD_PROVIDER]
  );
  const [frameworkURLs, setFrameworkURLs] = useState({
    selenium: null,
    playwright: null
  });
  const [newGridName, setNewGridName] = useState(null);
  const [pollForEventLogs, setPollForEventLogs] = useState(true);
  const [showCustomiseGridDetailsModal, setShowCustomiseGridDetailsModal] =
    useState(false);
  const [selectedGridName, setSelectedGridName] =
    useState('high-scale-testing');
  const [selectedInstanceType, setSelectedInstanceType] = useState();
  const [showEventLogsModal, setShowEventLogsModal] = useState(true);
  const [showGridHeartBeats, setShowGridHeartbeats] = useState(true);
  const [showSetupStatusModal, setShowSetupStatusModal] = useState(false);
  const [showTrialGridBanner, setShowTrialGridBanner] = useState(false);
  const [subHeaderText, setSubHeaderText] = useState(SUB_TEXTS_OBJECT.intro);
  const [subnetFilteredOptions, setSubnetFilteredOptions] =
    useState(allAvailableSubnets);
  const [selectedOption, setSelectedOption] = useState(
    STEP_1_RADIO_GROUP_OPTIONS[0]
  );
  const [selectedRegion, setSelectedRegion] = useState();
  const [totalSteps, setTotalSteps] = useState(0);
  const [useTrialGridLoading, setUseTrialGridLoading] = useState(false);
  const [useTrialGridBannerText, setUseTrialGridBannerText] = useState(
    BannerMessages.trialGridSetupPageIntro
  );
  const [VPCFilteredOptions, setVPCFilteredOptions] =
    useState(allAvailableVPCIDs);
  const [VPCQuery, setVPCQuery] = useState('');

  const intervalIdForEventLogs = useRef();

  // All Constants:
  const CODE_SNIPPETS_FOR_SCRATCH = CODE_SNIPPETS_SCRATCH(userDetails);
  const currentProvidersInstanceTypes =
    allAvailableInstanceTypes?.[DEFAULT_CLOUD_PROVIDER.value] || [];

  const displaySubnetsItemsArray = subnetQuery
    ? subnetFilteredOptions
    : allAvailableSubnets;

  const displayVPCItemsArray = VPCQuery
    ? VPCFilteredOptions
    : allAvailableVPCIDs;

  const isExactSubnetMatch = useMemo(
    () => displaySubnetsItemsArray.find((item) => item.label === subnetQuery),
    [subnetQuery, displaySubnetsItemsArray]
  );

  const isExactVPCMatch = useMemo(
    () => displayVPCItemsArray.find((item) => item.label === VPCQuery),
    [VPCQuery, displayVPCItemsArray]
  );

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

  const customiseBtnHandler = () => {
    console.log('Log: customiseBtnHandler');
    setShowCustomiseGridDetailsModal(true);
  };

  const dismissCustomiseGridDetailModal = () => {
    setShowCustomiseGridDetailsModal(false);
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

  const instanceChangeHandler = (e) => {
    setSelectedInstanceType(e);
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

  const subnetChangeHandler = (currentItem) => {
    const foundObject = allAvailableSubnets.find(
      (obj) => obj.value === currentItem.value
    );

    if (!foundObject) {
      setAllAvailableSubnets([...allAvailableSubnets, ...currentItem]);
    }

    setSelectedSubnetValues(currentItem);
    setSubnetQuery('');
  };

  const subnetInputChangeHandler = useCallback(
    (val) => {
      setIsSubnetLoading(false);
      setTimeout(() => {
        setSubnetQuery(val);

        const filtered = allAvailableSubnets.filter((fv) =>
          fv.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(val.toLowerCase().replace(/\s+/g, ''))
        );
        setSubnetFilteredOptions(filtered);
        setIsSubnetLoading(false);
      }, 0);
    },
    [allAvailableSubnets]
  );

  const useTrialGridClickHandler = async () => {
    setUseTrialGridLoading(true);
    await createTrialGridForUser({
      userId: userDetails.id,
      setupType
    }).then((res) => {
      const { gridId } = res.data;
      if (res.status === 200) {
        dispatch(
          setTrialGridUsed({
            isExpired: false,
            isUsed: true
          })
        );
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

  const vpcChangeHandler = (currentItem) => {
    const foundObject = allAvailableVPCIDs.find(
      (obj) => obj.value === currentItem.value
    );

    if (!foundObject) {
      setAllAvailableVPCIDs([...allAvailableVPCIDs, currentItem]);
    }

    setSelectedVPCValue(currentItem);
    setVPCQuery('');
  };

  const VPCInputChangeHandler = useCallback(
    (val) => {
      setIsVPCLoading(true);
      setTimeout(() => {
        setVPCQuery(val);

        const filtered = allAvailableVPCIDs.filter((fv) =>
          fv.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(val.toLowerCase().replace(/\s+/g, ''))
        );
        setVPCFilteredOptions(filtered);
        setIsVPCLoading(false);
      }, 0);
    },
    [allAvailableVPCIDs]
  );

  const saveBtnClickHandler = async () => {
    setIsSaving(true);
    const profileData = {
      profile: {
        name: gridProfileData.profile.name,
        region: selectedRegion.value,
        cloudProvider: currentSelectedCloudProvider.value,
        instanceType: selectedInstanceType.value,
        vpc: selectedVPCValue.value,
        subnets: selectedSubnetValues.map((e) => e.value),
        securityGroups: gridProfileData.profile.securityGroups
      },
      user: {
        id: userDetails.id,
        groupId: userDetails.groupId
      },
      cluster: {
        id: gridProfileData.clusters[0].id,
        name: gridProfileData.clusters[0].name
      },
      concurrency: gridProfileData.profile.concurrency
    };

    const res = await createNewGridProfile(userDetails.id, profileData);

    const { status } = res;

    if (status === 200) {
      console.log('Successfully customised Setup grid');

      setCurrentClusterName(gridProfileData.clusters[0].name);
      setCurrentGridConcurrency(gridProfileData.concurrency);
      setCurrentGridInstanceType(gridProfileData.profile.instanceType);
      setCurrentGridName(gridProfileData.profile.name);

      setIsSaving(false);
      setShowCustomiseGridDetailsModal(false);
    } else {
      console.log('Failed to customise Setup grid');
      setIsSaving(false);
    }
  };

  // All useEffects:

  useEffect(() => {
    console.log('Log: gridProfileData:', gridProfileData);
    setSelectedGridName(selectedGridProfile.value);

    if (Object.keys(gridProfileData).length > 0 && selectedGridProfile) {
      const selectedGridProfileData = gridProfileData;
      console.log('Log: selectedGridProfileData:', selectedGridProfileData);

      // --- Build Subnets ---
      const tmpSubnets = selectedGridProfileData?.subnets;

      const tmpSubnetsArray = [];
      tmpSubnets?.forEach((e) => {
        tmpSubnetsArray.push({
          label: e,
          value: e
        });
      });

      setAllAvailableSubnets(tmpSubnetsArray);
      // --- X --- Build Subnets --- X ---

      // --- Build VPCs ---
      const tmpVpcs = selectedGridProfileData?.vpcs;

      const tmpVPCsArray = [];
      tmpVpcs?.forEach((e) => {
        tmpVPCsArray.push({
          label: e,
          value: e
        });
      });

      setAllAvailableVPCIDs(tmpVPCsArray);
      // --- X --- Build VPCs --- X ---

      const currentVPC = selectedGridProfileData?.profile.vpc || '';
      setSelectedVPCValue({
        label: currentVPC,
        value: currentVPC
      });

      const currentSubnets = selectedGridProfileData?.profile.subnets;
      const tmpCurrentSubnetsArray = [];
      currentSubnets?.forEach((e) =>
        tmpCurrentSubnetsArray.push({ label: e, value: e })
      );
      setSelectedSubnetValues(tmpCurrentSubnetsArray);

      setSelectedRegion(
        allAvailableRegionsByProvider[currentSelectedCloudProvider.value].find(
          (e) => e.value === selectedGridProfileData?.profile.region
        )
      );

      setSelectedInstanceType(
        allAvailableInstanceTypes[currentSelectedCloudProvider.value].find(
          (e) => e.label === selectedGridProfileData?.profile.instanceType
        )
      );
    }
  }, [gridProfileData]);

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
    if (Object.keys(resourceMap).length > 0) {
      const availableRegionsFromResourceMap = Object.keys(
        resourceMap[currentSelectedCloudProvider.value]
      );

      const tempArray = [];

      availableRegionsFromResourceMap.forEach((region) => {
        const matchingEle = allAvailableRegionsByProvider[
          currentSelectedCloudProvider.value
        ].find((ele) => ele.value === region);

        tempArray.push(matchingEle);
      });

      setCurrentProvidersRegions(tempArray);
    }
  }, [
    allAvailableRegionsByProvider,
    currentSelectedCloudProvider,
    resourceMap
  ]);

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
    if (
      Object.keys(resourceMap).length > 0 &&
      selectedRegion !== null &&
      selectedRegion !== undefined
    ) {
      const VPCInThisRegionArray = Object.keys(
        resourceMap[currentSelectedCloudProvider.value][selectedRegion.value]
      );

      const tmpVPCsArray = [];
      VPCInThisRegionArray?.forEach((e) => {
        tmpVPCsArray.push({
          label: e,
          value: e
        });
      });

      setAllAvailableVPCIDs(tmpVPCsArray);

      if (
        allAvailableVPCIDs !== null &&
        allAvailableVPCIDs !== undefined &&
        selectedVPCValue.value.length > 0
      ) {
        const tmpSubnets =
          resourceMap[currentSelectedCloudProvider.value][selectedRegion.value][
            selectedVPCValue.value
          ]?.subnets;
        const tmpSubnetsArray = [];

        tmpSubnets?.forEach((e) => {
          tmpSubnetsArray.push({
            label: e,
            value: e
          });
        });

        setAllAvailableSubnets(tmpSubnetsArray);
      }
    }
  }, [
    allAvailableVPCIDs,
    currentSelectedCloudProvider,
    resourceMap,
    selectedRegion,
    selectedVPCValue
  ]);

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
    const type = searchParams.get('type');
    const fetchSetupData = async () => {
      const response = await getSetupData(userDetails.id);
      const res = response.data;

      setAllAvailableRegionsByProvider(res.scratch['step-1'].regions);
      setCodeSnippetsForExistingSetup(res.existing);
      setGridProfileData(res.gridProfile);
      setResourceMap(res.resourceMap);
      return response.data;
    };

    if (showSetup) {
      fetchSetupData();

      if (pollForEventLogs) {
        intervalIdForEventLogs.current = EVENT_LOGS_POLLING_IN_MS;
      }

      if (type === 'scratch') {
        setSelectedOption(STEP_1_RADIO_GROUP_OPTIONS[0]);
        setSetupStep(1);
      } else if (type === 'existing') {
        setSelectedOption(STEP_1_RADIO_GROUP_OPTIONS[1]);
        setSetupStep(1);
      }
    } else {
      window.location.href = `${window.location.origin}${ROUTES.GRID_CONSOLE}`;
    }

    logHSTEvent([], 'web_events', AGSetupGuideVisited);
  });

  return {
    CODE_SNIPPETS_FOR_SCRATCH,
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
    currenClusterName,
    currentGridConcurrency,
    currentGridInstanceType,
    currentGridName,
    currentStep,
    currentProvidersInstanceTypes,
    currentProvidersRegions,
    currentSelectedCloudProvider,
    customiseBtnHandler,
    dismissCustomiseGridDetailModal,
    displaySubnetsItemsArray,
    displayVPCItemsArray,
    eventLogsCode,
    eventLogsStatus,
    exploreAutomationClickHandler,
    frameworkURLs,
    gridProfileData,
    handleDismissClick,
    headerText,
    isExactSubnetMatch,
    isExactVPCMatch,
    isGridSetupComplete,
    instanceChangeHandler,
    isSaving,
    isSubnetLoading,
    isTrialGridExpired,
    isTrialGridUsed,
    isVPCLoading,
    logTermsConditionsEvents,
    logViewDocumentationEvents,
    navigate,
    newGridName,
    onboardingStep,
    saveBtnClickHandler,
    setupType,
    selectedInstanceType,
    selectedRegion,
    selectedSubnetValues,
    selectedVPCValue,
    setSelectedOption,
    setSubnetQuery,
    setVPCQuery,
    showCustomiseGridDetailsModal,
    showEventLogsModal,
    showGridHeartBeats,
    showSetupStatusModal,
    showTrialGridBanner,
    subHeaderText,
    subnetChangeHandler,
    subnetInputChangeHandler,
    subnetQuery,
    totalSteps,
    userHasSessions,
    useTrialGridBannerText,
    useTrialGridClickHandler,
    useTrialGridLoading,
    viewAllBuildsClickHandler,
    viewEventLogsClickHandler,
    vpcChangeHandler,
    VPCInputChangeHandler,
    VPCQuery
  };
};

export default useSetup;
