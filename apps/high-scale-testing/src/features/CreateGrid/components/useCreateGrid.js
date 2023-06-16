import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useMountEffect } from '@browserstack/hooks';
import {
  createNewGridProfile,
  fetchDataForCreateGrid,
  getCreateGridEventsLogsData
} from 'api/index';
import {
  DEFAULT_GRID_CONCURRENCY,
  GRID_MANAGER_NAMES,
  SCRATCH_RADIO_GROUP_OPTIONS
} from 'constants/index';
import { EVENT_LOGS_STATUS } from 'constants/onboarding';
import ROUTES from 'constants/routes';
import {
  getInstanceTypes,
  getRegions,
  getUserDetails
} from 'globalSlice/selector';

import { setResourceMap } from '../slices';
import { getResourceMap } from '../slices/selectors';

const useCreateGrid = () => {
  const dispatch = useDispatch();

  // All Store variables:
  const userDetails = useSelector(getUserDetails);

  const CODE_SNIPPETS_SCRATCH = {
    'create-grid': {
      a: {
        code: 'npm install browserstack-node-sdk',
        language: 'node',
        text: 'Download CLI.'
      },
      b: {
        code: `browserstack-cli ats init --bstack-username ${userDetails.username} --bstack-accesskey ${userDetails.accessKey}`,
        language: 'node',
        text: 'Setup CLI with BrowserStack credentials.'
      },
      c: {
        code: 'browserstack-cli ats create grid',
        language: 'node',
        text: 'Execute grid creation command.'
      }
    }
  };
  const DEFAULT_CLOUD_PROVIDER = SCRATCH_RADIO_GROUP_OPTIONS[0];
  const DEFAULT_STEPPER_STATE = [
    {
      id: '1',
      name: 'CONFIGURE GRID PROFILE',
      status: 'complete'
    },
    {
      id: '2',
      name: 'CHOOSE CLOUD PROVIDER',
      status: 'complete'
    },
    {
      id: '3',
      name: 'CONFIGURE GRID SETTINGS',
      status: 'current'
    },
    { id: '4', name: 'SETUP IAM ROLE', status: 'upcoming' },
    {
      id: '5',
      name: 'CREATE GRID',
      status: 'upcoming'
    }
  ];
  const IS_MANDATORY = true;

  const breadcrumbsData = [
    {
      current: false,
      name: 'Automation Console',
      url: '/grid-console',
      goToStep: 0
    },
    {
      current: false,
      name: 'Create automation grid',
      url: '#',
      goToStep: 1
    }
  ];

  // All State variables
  const [activeGridManagerCodeSnippet, setActiveGridManagerCodeSnippet] =
    useState(GRID_MANAGER_NAMES.helm);
  const allAvailableInstanceTypes = useSelector(getInstanceTypes);
  const allAvailableRegionsByProvider = useSelector(getRegions);
  const [allAvailableSubnets, setAllAvailableSubnets] = useState([]);
  const [allAvailableVPCIDs, setAllAvailableVPCIDs] = useState([]);
  const [codeSnippetsForExistingSetup, setCodeSnippetsForExistingSetup] =
    useState(null);
  const [currentProvidersInstanceTypes, setCurrentProvidersInstanceTypes] =
    useState(
      allAvailableInstanceTypes?.[DEFAULT_CLOUD_PROVIDER.configName] || []
    );
  const [currentProvidersRegions, setCurrentProvidersRegions] = useState(
    allAvailableRegionsByProvider?.[DEFAULT_CLOUD_PROVIDER.configName] || []
  );
  const [currentSelectedCloudProvider, setCurrentCloudProvider] = useState(
    DEFAULT_CLOUD_PROVIDER
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [
    collapsibleBtntextForAdvSettings,
    setCollapsibleBtnTextForAdvSettings
  ] = useState('Show Cluster Details');
  const [collapsibleBtntextForCode, setCollapsibleBtnTextForCode] = useState(
    'View steps to download CLI'
  );
  const [concurrencyErrorText, setConcurrencyErrorText] = useState('');
  const [creatingGridProfile, setCreatingGridProfile] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);
  const [editClusterNameErrorText, setEditClusterNameErrorText] = useState('');
  const [editClusterNameInputValue, setEditClusterNameInputValue] =
    useState('');
  const [eventLogsCode, setEventLogsCode] = useState();
  const [eventLogsStatus, setEventLogsStatus] = useState(
    EVENT_LOGS_STATUS.NOT_STARTED
  );
  const [frameworkURLs, setFrameworkURLs] = useState({
    selenium: null,
    playwright: null
  });
  const [gridProfiles, setGridProfiles] = useState([
    { label: 'label', value: 'value' }
  ]);
  const [gridProfilesData, setGridProfilesData] = useState([]);
  const [isSaveProfileBtnDisabled, setIsSaveProfileBtnDisabled] =
    useState(true);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isSubnetLoading, setIsSubnetLoading] = useState(false);
  const [isVPCLoading, setIsVPCLoading] = useState(false);
  const [newGridName, setNewGridName] = useState(null);
  const [newProfileErrorText, setNewProfileErrorText] = useState('');
  const [newProfileNameValue, setNewProfileNameValue] = useState('');
  const [opened, setOpened] = useState(false);
  const [pollForEventLogs, setPollForEventLogs] = useState(true);
  const [selectedClusterValue, setSelectedClusterValue] = useState('');
  const [selectedGridClusters, setSelectedGridclusters] = useState([]);
  const [selectedGridConcurrency, setSelectedGridConcurrency] = useState(
    DEFAULT_GRID_CONCURRENCY
  );
  const [selectedGridName, setSelectedGridName] =
    useState('high-scale-testing');

  const [selectedGridProfile, setSelectedGridProfile] = useState('default');
  const [selectedInstanceType, setSelectedInstanceType] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedSubnetValues, setSelectedSubnetValues] = useState([]);
  const [selectedVPCValue, setSelectedVPCValue] = useState('');
  const [subnetQuery, setSubnetQuery] = useState('');
  const [setupState, setSetupState] = useState(1);
  const [showEventLogsModal, setShowEventLogsModal] = useState(false);
  const [showGridHeartBeats, setShowGridHeartbeats] = useState(true);
  const [showSaveProfileModal, setShowSaveProfileModal] = useState(false);
  const [showSetupClusterModal, setShowSetupClusterModal] = useState(false);
  const [showSetupStatusModal, setShowSetupStatusModal] = useState(false);
  const [stepperStepsState, setStepperStepsState] = useState(
    DEFAULT_STEPPER_STATE
  );
  const [subnetFilteredOptions, setSubnetFilteredOptions] =
    useState(allAvailableSubnets);
  const [totalSteps, setTotalSteps] = useState(0);
  const [VPCFilteredOptions, setVPCFilteredOptions] =
    useState(allAvailableVPCIDs);
  const [VPCQuery, setVPCQuery] = useState('');

  const resourceMap = useSelector(getResourceMap);

  const ref = useRef({});

  const [searchParams, setSearchparams] = useSearchParams();
  const type = searchParams.get('type');

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

  const updateGridProfileData = async (profileData) => {
    const res = await createNewGridProfile(userDetails.id, profileData);

    const { data } = res;

    if (data === 'OK') {
      setCreatingGridProfile(false);
      setShowSaveProfileModal(false);
      setShowSetupClusterModal(false);
      setDataChanged(false);

      setSelectedGridProfile({
        label: newProfileNameValue,
        value: newProfileNameValue
      });
    }
  };

  // All Click/Change Handlers:
  const commonHandler = () => {
    setDataChanged(true);
  };

  const closeEventLogsModal = () => {
    setShowEventLogsModal(false);
  };

  const closeSetupStatusModal = () => {
    setShowSetupStatusModal(false);
  };

  const clusterChangeHandler = (e) => {
    setSelectedClusterValue(e);
    commonHandler();
  };

  const clusterNameInputChangeHandler = (e) => {
    setEditClusterNameInputValue(e.target.value);
    commonHandler();
  };

  // const editClusterBtnClickHandler = () => {
  //   setEditClusterNameInputValue(selectedClusterValue.value);
  //   setShowSetupClusterModal(true);
  // };

  const exploreAutomationClickHandler = () => {
    closeSetupStatusModal();
    window.location = `${window.location.origin}${ROUTES.GRID_CONSOLE}`;
  };

  const gridConcurrencyChangeHandler = (e) => {
    const newValue = e.target.value;
    setSelectedGridConcurrency(newValue);

    setConcurrencyErrorText('');
    if (newValue < 0 || newValue > 1000) {
      setConcurrencyErrorText('Concurrency value must be between 0 and 1000');
    }

    commonHandler();
  };

  const gridNameChangeHandler = (e) => {
    const newValue = e.target.value;
    setSelectedGridName(newValue);
  };

  const handleDismissClick = () => {
    setShowSetupStatusModal(false);
  };

  const instanceChangeHandler = (e) => {
    setSelectedInstanceType(e);
  };

  const modalCrossClickhandler = () => {
    setShowSetupClusterModal(false);
    setShowSaveProfileModal(false);
  };

  const nextBtnClickHandler = () => {
    setSetupState(2);
  };

  const regionChangeHandler = (e) => {
    setSelectedRegion(e);
    setSelectedVPCValue({
      label: '',
      value: ''
    });
    setSelectedSubnetValues([]);
  };

  const saveAndProceedClickHandler = () => {
    setCreatingGridProfile(true);

    if (newProfileNameValue.length > 0) {
      const profileData = {
        profile: {
          name: newProfileNameValue,
          region: selectedRegion.value,
          cloudProvider: currentSelectedCloudProvider.configName,
          instanceType: selectedInstanceType.value,
          vpc: selectedVPCValue.value,
          subnets: selectedSubnetValues.map((e) => e.value),
          securityGroups: []
        },
        user: {
          id: userDetails.id,
          groupId: userDetails.groupId
        },
        cluster: {
          name: selectedClusterValue.value
        },
        name: selectedGridName,
        concurrency: selectedGridConcurrency
      };

      updateGridProfileData(profileData);
    } else {
      setNewProfileErrorText('Please enter a valid Grid Profile name');
      setCreatingGridProfile(false);
    }
  };

  const saveChangesClickHander = () => {
    if (concurrencyErrorText.length === 0 && selectedGridConcurrency.length > 0)
      setShowSaveProfileModal(true);
    else if (selectedGridConcurrency.length === 0) {
      setConcurrencyErrorText('Concurrency value must be between 0 and 1000');
    }
  };

  const saveProfileChangeHandler = (e) => {
    setNewProfileNameValue(e.target.value);
    setIsSaveProfileBtnDisabled(false);
  };

  const validateClusterDetails = () => {
    const clusterNameLength = editClusterNameInputValue.length;

    if (clusterNameLength === 0) {
      setEditClusterNameErrorText('Enter a valid Cluster name');
      return false;
    }

    setEditClusterNameErrorText('');
    return true;
  };

  const setupBtnClickHandler = () => {
    if (validateClusterDetails()) {
      const entry = {
        label: editClusterNameInputValue,
        value: editClusterNameInputValue
      };
      setSelectedClusterValue(entry);
      setSelectedGridclusters([...selectedGridClusters, entry]);

      setShowSetupClusterModal(false);
    }
  };

  const setupNewClusterBtnClickHandler = () => {
    setShowSetupClusterModal(true);
  };

  const stepperClickHandler = (_, step) => {
    if (step.id > 3) {
      setSetupState(2);
    } else {
      setSetupState(1);
    }
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

  const viewAllBuildsClickHandler = () => {
    closeSetupStatusModal();
    window.location = `${window.location.origin}${ROUTES.BUILDS}`;
  };

  const viewEventLogsClickHandler = () => {
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
    if (Object.keys(allAvailableRegionsByProvider).length > 0) {
      setCurrentProvidersRegions(
        allAvailableRegionsByProvider[currentSelectedCloudProvider.configName]
      );
    }
  }, [allAvailableRegionsByProvider, currentSelectedCloudProvider]);

  useEffect(() => {
    setSelectedGridProfile(gridProfiles[0]);
  }, [gridProfiles]);

  useEffect(() => {
    if (opened) {
      setCollapsibleBtnTextForCode('hide steps to download CLI');
      setCollapsibleBtnTextForAdvSettings('Hide Cluster Details');
    } else {
      setCollapsibleBtnTextForCode('View steps to download CLI');
      setCollapsibleBtnTextForAdvSettings('Show Cluster Details');
    }
  }, [opened]);

  useEffect(() => {
    if (Object.keys(resourceMap).length > 0) {
      const availableRegionsFromResourceMap = Object.keys(
        resourceMap[currentSelectedCloudProvider.configName]
      );

      const tempArray = [];

      availableRegionsFromResourceMap.forEach((region) => {
        const matchingEle = allAvailableRegionsByProvider[
          currentSelectedCloudProvider.configName
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
    setSelectedGridName(selectedGridProfile.value);

    if (selectedGridProfile) {
      const selectedGridProfileData = gridProfilesData.filter(
        (profileData) => profileData.profile.name === selectedGridProfile.value
      )[0];

      // --- Build Clusters ---
      const tmpArray = [];
      const rawClusters = selectedGridProfileData?.clusters;

      rawClusters?.forEach((e) => {
        e = { ...e, label: e.name, value: e.name };
        tmpArray.push(e);
      });

      setSelectedGridclusters(tmpArray);
      // --- X --- Build Clusters --- X ---

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

      setSelectedGridConcurrency(selectedGridProfileData?.profile.concurrency);

      const tmpCluster = {
        ...selectedGridProfileData?.clusters[0],
        label: selectedGridProfileData?.clusters[0].name,
        value: selectedGridProfileData?.clusters[0].name
      };
      setSelectedClusterValue(tmpCluster);

      const currentVPC = selectedGridProfileData?.profile.vpc;
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
        allAvailableRegionsByProvider[
          currentSelectedCloudProvider.configName
        ].find((e) => e.value === selectedGridProfileData?.profile.region)
      );

      setSelectedInstanceType(
        allAvailableInstanceTypes[currentSelectedCloudProvider.configName].find(
          (e) => e.label === selectedGridProfileData?.profile.instanceType
        )
      );
    }
  }, [gridProfilesData, selectedGridProfile]);

  useEffect(() => {
    const selectedGridProfileData = gridProfilesData.filter(
      (profileData) => profileData.profile.name === selectedGridProfile.value
    )[0];

    if (selectedGridProfileData) {
      const subnetsPlainArray = selectedSubnetValues.map((e) => e.value);

      if (
        selectedGridProfileData?.profile.concurrency !==
          selectedGridConcurrency ||
        selectedInstanceType.label !==
          selectedGridProfileData.profile.instanceType ||
        selectedRegion.value !== selectedGridProfileData.profile.region ||
        JSON.stringify(selectedGridProfileData.profile.subnets) !==
          JSON.stringify(subnetsPlainArray) ||
        selectedVPCValue.value !== selectedGridProfileData.profile.vpc
      ) {
        setDataChanged(true);
      }
    }
  }, [
    selectedClusterValue,
    selectedGridConcurrency,
    selectedInstanceType,
    selectedRegion,
    selectedSubnetValues,
    selectedVPCValue
  ]);

  useEffect(() => {
    if (
      Object.keys(resourceMap).length > 0 &&
      selectedRegion !== null &&
      selectedRegion !== undefined
    ) {
      const VPCInThisRegionArray = Object.keys(
        resourceMap[currentSelectedCloudProvider.configName][
          selectedRegion.value
        ]
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
          resourceMap[currentSelectedCloudProvider.configName][
            selectedRegion.value
          ][selectedVPCValue.value]?.subnets;
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
    setShowSetupStatusModal(isSetupComplete);
  }, [isSetupComplete]);

  useEffect(() => {
    if (!showSetupClusterModal) {
      setEditClusterNameInputValue('');
    }
  }, [showSetupClusterModal]);

  useEffect(() => {
    if (gridProfilesData.length > 0) {
      const tmpArray = [];
      gridProfilesData.forEach((profileData) => {
        const tmpObj = {
          label: profileData.profile.name,
          value: profileData.profile.name
        };

        tmpArray.push(tmpObj);
      });

      setGridProfiles(tmpArray);
    }
  }, [gridProfilesData]);

  useEffect(() => {
    if (setupState === 1) {
      setStepperStepsState(DEFAULT_STEPPER_STATE);
    } else if (setupState === 2) {
      const updatedStepperState = DEFAULT_STEPPER_STATE;
      updatedStepperState[2].status = 'complete';
      updatedStepperState[3].status = 'complete';
      updatedStepperState[4].status = 'current';

      setStepperStepsState(updatedStepperState);
    }
  }, [DEFAULT_STEPPER_STATE, setupState]);

  useMountEffect(() => {
    const fetchEventsLogsData = async (createGridType) => {
      const response = await getCreateGridEventsLogsData(
        userDetails.id,
        createGridType
      );

      const res = response.data;

      setEventLogsCode(res.currentLogs);
      setCurrentStep(res.currentStep);
      setTotalSteps(res.totalSteps);
      setNewGridName(res.gridName);

      if (res.currentStep === res.totalSteps) {
        setPollForEventLogs(false);
        setFrameworkURLs(res.framework);
        setTimeout(() => {
          setIsSetupComplete(true);
        }, 1000);
      }
    };

    fetchDataForCreateGrid(userDetails.id).then((res) => {
      const response = res.data;

      dispatch(setResourceMap(response.resourceMap));
      setCodeSnippetsForExistingSetup(response.codeSnippets.existing);
      setGridProfilesData(response.gridProfiles);
    });

    if (pollForEventLogs) {
      setInterval(() => {
        fetchEventsLogsData(type === 'Helm' ? 'existing' : 'scratch');
      }, 10000);
    }
    fetchEventsLogsData(type === 'Helm' ? 'existing' : 'scratch');
  });

  return {
    CODE_SNIPPETS_SCRATCH,
    IS_MANDATORY,
    activeGridManagerCodeSnippet,
    allAvailableSubnets,
    breadcrumbsData,
    closeEventLogsModal,
    closeSetupStatusModal,
    clusterChangeHandler,
    clusterNameInputChangeHandler,
    codeSnippetsForExistingSetup,
    collapsibleBtntextForAdvSettings,
    collapsibleBtntextForCode,
    concurrencyErrorText,
    creatingGridProfile,
    currentProvidersInstanceTypes,
    currentProvidersRegions,
    currentSelectedCloudProvider,
    currentStep,
    dataChanged,
    displaySubnetsItemsArray,
    displayVPCItemsArray,
    // editClusterBtnClickHandler,
    editClusterNameInputValue,
    editClusterNameErrorText,
    eventLogsCode,
    eventLogsStatus,
    exploreAutomationClickHandler,
    frameworkURLs,
    gridConcurrencyChangeHandler,
    gridNameChangeHandler,
    gridProfiles,
    handleDismissClick,
    instanceChangeHandler,
    isExactSubnetMatch,
    isExactVPCMatch,
    isSaveProfileBtnDisabled,
    isSetupComplete,
    isSubnetLoading,
    isVPCLoading,
    modalCrossClickhandler,
    newProfileNameValue,
    opened,
    newGridName,
    newProfileErrorText,
    nextBtnClickHandler,
    ref,
    regionChangeHandler,
    saveAndProceedClickHandler,
    saveChangesClickHander,
    saveProfileChangeHandler,
    selectedClusterValue,
    selectedGridClusters,
    selectedGridConcurrency,
    selectedGridName,
    selectedGridProfile,
    selectedInstanceType,
    selectedRegion,
    selectedSubnetValues,
    selectedVPCValue,
    setActiveGridManagerCodeSnippet,
    setupBtnClickHandler,
    setCurrentCloudProvider,
    setOpened,
    setSelectedGridProfile,
    setSubnetQuery,
    setupNewClusterBtnClickHandler,
    setupState,
    setVPCQuery,
    showEventLogsModal,
    showGridHeartBeats,
    showSaveProfileModal,
    showSetupClusterModal,
    showSetupStatusModal,
    stepperClickHandler,
    stepperStepsState,
    subnetChangeHandler,
    subnetInputChangeHandler,
    subnetQuery,
    totalSteps,
    type,
    viewAllBuildsClickHandler,
    viewEventLogsClickHandler,
    vpcChangeHandler,
    VPCInputChangeHandler,
    VPCQuery
  };
};

export default useCreateGrid;
