import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useMountEffect } from '@browserstack/hooks';
import {
  createNewGridProfile,
  fetchDataForCreateGrid,
  getCreateGridEventsLogsData
} from 'api/index';
import {
  GRID_MANAGER_NAMES,
  SCRATCH_RADIO_GROUP_OPTIONS
} from 'constants/index';
import { EVENT_LOGS_STATUS } from 'constants/onboarding';
import {
  getInstanceTypes,
  getRegions,
  getUserDetails
} from 'globalSlice/selector';

const useCreateGrid = () => {
  const DEFAULT_CLOUD_PROVIDER = SCRATCH_RADIO_GROUP_OPTIONS[0];
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

  // All Store variables:
  const userDetails = useSelector(getUserDetails);

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
  const [creatingGridProfile, setCreatingGridProfile] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);
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
    { label: 'label', value: 'value' },
    { label: 'label 2', value: 'value2' }
  ]);
  const [gridProfilesData, setGridProfilesData] = useState([]);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [newProfileErrorText, setNewProfileErrorText] = useState('');
  const [newProfileNameValue, setNewProfileNameValue] = useState('');
  const [opened, setOpened] = useState(false);
  const [pollForEventLogs, setPollForEventLogs] = useState(true);
  const [selectedClusterValue, setSelectedClusterValue] = useState('');
  const [selectedGridClusters, setSelectedGridclusters] = useState([]);
  const [selectedGridConcurrency, setSelectedGridConcurrency] = useState(0);
  const [selectedGridName, setSelectedGridName] =
    useState('high-scale-testing');

  const [selectedGridProfile, setSelectedGridProfile] = useState('default');
  const [selectedInstanceType, setSelectedInstanceType] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedSubnetValues, setSelectedSubnetValues] = useState([]);
  const [selectedVPCValue, setSelectedVPCValue] = useState('');
  const [setupState, setSetupState] = useState(1);
  const [showEventLogsModal, setShowEventLogsModal] = useState(false);
  const [showGridHeartBeats, setShowGridHeartbeats] = useState(true);
  const [showSaveProfileModal, setShowSaveProfileModal] = useState(false);
  const [showSetupClusterModal, setShowSetupClusterModal] = useState(false);
  const [totalSteps, setTotalSteps] = useState(0);

  const ref = useRef({});

  const [searchParams, setSearchparams] = useSearchParams();
  const type = searchParams.get('type');

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

  const clusterChangeHandler = (e) => {
    setSelectedClusterValue(e);
    commonHandler();
  };

  const editClusterBtnClickHandler = () => {
    setEditClusterNameInputValue(selectedClusterValue.value);
    setShowSetupClusterModal(true);
  };

  const gridConcurrencyChangeHandler = (e) => {
    const newValue = e.target.value;
    setSelectedGridConcurrency(newValue);
  };

  const gridNameChangeHandler = (e) => {
    const newValue = e.target.value;
    setSelectedGridName(newValue);
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
  };

  const saveAndProceedClickHandler = () => {
    setCreatingGridProfile(true);

    if (newProfileNameValue.length > 0) {
      const profileData = {
        profile: {
          name: selectedGridProfile.value,
          region: 'us-east-2',
          cloudProvider: currentSelectedCloudProvider.configName,
          instanceType: 't3.2xlarge',
          domain: 'bsstag.com',
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
    setShowSaveProfileModal(true);
  };

  const saveProfileChangeHandler = (e) => {
    setNewProfileNameValue(e.target.value);
  };

  const setupBtnClickHandler = () => {
    setShowSetupClusterModal(false);
  };

  const setupNewClusterBtnClickHandler = () => {
    setShowSetupClusterModal(true);
  };

  const subnetChangeHandler = (e) => {
    setSelectedSubnetValues(e);
  };

  const viewEventLogsClickHandler = () => {
    setShowEventLogsModal(true);
  };

  const vpcChangeHandler = (e) => {
    setSelectedVPCValue(e);
  };

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
        ].find((e) => e.label === selectedGridProfileData?.profile.region)
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
        selectedRegion.label !== selectedGridProfileData.profile.region ||
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

  useMountEffect(() => {
    const fetchEventsLogsData = async () => {
      const response = await getCreateGridEventsLogsData(userDetails.id);

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
      }
    };

    fetchDataForCreateGrid().then((res) => {
      const response = res.data;

      setCodeSnippetsForExistingSetup(response.codeSnippets.existing);
      setGridProfilesData(response.gridProfiles);
    });

    if (pollForEventLogs) {
      setInterval(() => {
        fetchEventsLogsData();
      }, 10000);
    }

    fetchEventsLogsData();
  });

  return {
    IS_MANDATORY,
    activeGridManagerCodeSnippet,
    allAvailableSubnets,
    allAvailableVPCIDs,
    breadcrumbsData,
    closeEventLogsModal,
    clusterChangeHandler,
    codeSnippetsForExistingSetup,
    collapsibleBtntextForAdvSettings,
    collapsibleBtntextForCode,
    creatingGridProfile,
    currentProvidersInstanceTypes,
    currentProvidersRegions,
    currentSelectedCloudProvider,
    currentStep,
    dataChanged,
    editClusterBtnClickHandler,
    editClusterNameInputValue,
    eventLogsCode,
    eventLogsStatus,
    frameworkURLs,
    gridConcurrencyChangeHandler,
    gridNameChangeHandler,
    gridProfiles,
    instanceChangeHandler,
    isSetupComplete,
    modalCrossClickhandler,
    newProfileNameValue,
    opened,
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
    setupNewClusterBtnClickHandler,
    setupState,
    showEventLogsModal,
    showGridHeartBeats,
    showSaveProfileModal,
    showSetupClusterModal,
    subnetChangeHandler,
    totalSteps,
    type,
    viewEventLogsClickHandler,
    vpcChangeHandler
  };
};

export default useCreateGrid;
