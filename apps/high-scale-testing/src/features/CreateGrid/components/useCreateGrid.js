import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { createNewGridProfile, fetchDataForCreateGrid } from 'api/index';
import {
  GRID_MANAGER_NAMES,
  SCRATCH_RADIO_GROUP_OPTIONS
} from 'constants/index';
import { getUserDetails } from 'globalSlice/selector';

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
  const [allAvailableInstanceTypes, setAllAvailableInstanceTypes] = useState(
    []
  );
  const [allAvailableRegionsByProvider, setAllAvailableRegionsByProvider] =
    useState([]);
  const [allAvailableSubnets, setAllAvailableSubnets] = useState([]);
  const [allAvailableVPCIDs, setAllAvailableVPCIDs] = useState([]);
  const [codeSnippetsForExistingSetup, setCodeSnippetsForExistingSetup] =
    useState(null);
  const [currentProvidersRegions, setCurrentProvidersRegions] = useState(
    allAvailableRegionsByProvider?.[DEFAULT_CLOUD_PROVIDER.configName] || []
  );
  const [currentSelectedCloudProvider, setCurrentCloudProvider] = useState(
    DEFAULT_CLOUD_PROVIDER
  );
  const [
    collapsibleBtntextForAdvSettings,
    setCollapsibleBtnTextForAdvSettings
  ] = useState('Show Cluster Details');
  const [collapsibleBtntextForCode, setCollapsibleBtnTextForCode] = useState(
    'View steps to download CLI'
  );
  const [dataChanged, setDataChanged] = useState(false);
  const [gridProfiles, setGridProfiles] = useState([
    { label: 'label', value: 'value' },
    { label: 'label 2', value: 'value2' }
  ]);
  const [gridProfilesData, setGridProfilesData] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selectedClusterValue, setSelectedClusterValue] = useState('');
  const [selectedGridClusters, setSelectedGridclusters] = useState([]);
  const [selectedGridConcurrency, setSelectedGridConcurrency] = useState(0);
  const [selectedGridName, setSelectedGridName] =
    useState('high-scale-testing');

  const [selectedGridProfile, setSelectedGridProfile] = useState('default');
  const [selectedRegion, setSelectedRegioon] = useState();
  const [selectedSubnetValues, setSelectedSubnetValues] = useState([]);
  const [selectedVPCValue, setSelectedVPCValue] = useState('');
  const [setupState, setSetupState] = useState(1);
  const [showSaveProfileModal, setShowSaveProfileModal] = useState(false);
  const [showSetupClusterModal, setShowSetupClusterModal] = useState(false);

  const ref = useRef({});

  const [searchParams, setSearchparams] = useSearchParams();
  const type = searchParams.get('type');

  const commonHandler = () => {
    setDataChanged(true);
  };

  const clusterChangeHandler = (e) => {
    setSelectedClusterValue(e);
    commonHandler();
  };

  const editClusterBtnClickHandler = () => {
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

  const modalCrossClickhandler = () => {
    setShowSetupClusterModal(false);
  };

  const updateGridProfileData = async (profileData) => {
    const res = await createNewGridProfile(userDetails.id, profileData);

    console.log('Log: res:', res);
  };

  const nextBtnClickHandler = () => {
    console.log('Log: selectedGridProfile:', selectedGridProfile);

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
    setSetupState(2);
  };

  const saveChangesClickHander = () => {};

  const setupBtnClickHandler = () => {
    setShowSetupClusterModal(false);
  };

  const setupNewClusterBtnClickHandler = () => {
    setShowSetupClusterModal(true);
  };

  const subnetChangeHandler = (e) => {
    setSelectedSubnetValues(e);
  };

  const vpcChangeHandler = (e) => {
    setSelectedVPCValue(e);
  };

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
    }
  }, [selectedGridProfile]);

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
    fetchDataForCreateGrid().then((res) => {
      const response = res.data;

      setCodeSnippetsForExistingSetup(response.codeSnippets.existing);
      setGridProfilesData(response.gridProfiles);
    });
  }, []);

  return {
    IS_MANDATORY,
    activeGridManagerCodeSnippet,
    allAvailableInstanceTypes,
    allAvailableSubnets,
    allAvailableVPCIDs,
    breadcrumbsData,
    clusterChangeHandler,
    codeSnippetsForExistingSetup,
    collapsibleBtntextForAdvSettings,
    collapsibleBtntextForCode,
    currentProvidersRegions,
    currentSelectedCloudProvider,
    dataChanged,
    editClusterBtnClickHandler,
    gridConcurrencyChangeHandler,
    gridNameChangeHandler,
    gridProfiles,
    modalCrossClickhandler,
    nextBtnClickHandler,
    opened,
    ref,
    saveChangesClickHander,
    selectedClusterValue,
    selectedGridClusters,
    selectedGridConcurrency,
    selectedGridName,
    selectedGridProfile,
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
    showSetupClusterModal,
    subnetChangeHandler,
    type,
    vpcChangeHandler
  };
};

export default useCreateGrid;
