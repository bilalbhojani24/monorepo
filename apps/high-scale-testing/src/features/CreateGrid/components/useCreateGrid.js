import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchDataForCreateGrid } from 'api/index';
import { SCRATCH_RADIO_GROUP_OPTIONS } from 'constants/index';

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

  const [allAvailableInstanceTypes, setAllAvailableInstanceTypes] = useState(
    []
  );
  const [allAvailableRegionsByProvider, setAllAvailableRegionsByProvider] =
    useState([]);
  const [allAvailableSubnets, setAllAvailableSubnets] = useState([]);
  const [allAvailableVPCIDs, setAllAvailableVPCIDs] = useState([]);
  const [currentProvidersRegions, setCurrentProvidersRegions] = useState(
    allAvailableRegionsByProvider?.[DEFAULT_CLOUD_PROVIDER.configName] || []
  );
  const [currentSelectedCloudProvider, setCurrentCloudProvider] = useState(
    DEFAULT_CLOUD_PROVIDER
  );
  const [gridProfiles, setGridProfiles] = useState([
    { label: 'label', value: 'value' },
    { label: 'label 2', value: 'value2' }
  ]);
  const [selectedGridName, setSelectedGridName] =
    useState('high-scale-testing');
  const [selectedGridClusters, setSelectedGridclusters] = useState([]);
  const [selectedGridConcurrency, setSelectedGridConcurrency] = useState(0);
  const [gridProfilesData, setGridProfilesData] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selectedGridProfile, setSelectedGridProfile] = useState('default');

  const ref = useRef({});

  const [searchParams, setSearchparams] = useSearchParams();

  const gridConcurrencyChangeHandler = (e) => {
    const newValue = e.target.value;
    setSelectedGridConcurrency(newValue);
  };

  const gridNameChangeHandler = (e) => {
    const newValue = e.target.value;
    setSelectedGridName(newValue);
  };

  useEffect(() => {
    if (Object.keys(allAvailableRegionsByProvider).length > 0) {
      setCurrentProvidersRegions(
        allAvailableRegionsByProvider[currentSelectedCloudProvider.configName]
      );
    }
  }, [allAvailableRegionsByProvider]);

  useEffect(() => {
    setSelectedGridProfile(gridProfiles[0]);
  }, [gridProfiles]);

  useEffect(() => {
    setSelectedGridName(selectedGridProfile.value);
    if (selectedGridProfile) {
      const tmpArray = [];
      const rawClusters = gridProfilesData.filter(
        (profileData) => profileData.profile.name === selectedGridProfile.value
      )[0]?.clusters;

      rawClusters?.forEach((e) => {
        e = { ...e, label: e.name, value: e.name };
        tmpArray.push(e);
      });

      setSelectedGridclusters(tmpArray);
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
      console.log('Log: response:', response);
      setGridProfilesData(response);
      // setAllAvailableRegionsByProvider(response.regions);
      // setAllAvailableInstanceTypes(response['instance-types']);
      // setAllAvailableVPCIDs(response['vpc-id']);
      // setAllAvailableSubnets(response.subnets);
    });
  }, []);

  return {
    allAvailableInstanceTypes,
    allAvailableRegionsByProvider,
    allAvailableSubnets,
    allAvailableVPCIDs,
    currentProvidersRegions,
    breadcrumbsData,
    currentSelectedCloudProvider,
    gridConcurrencyChangeHandler,
    gridNameChangeHandler,
    gridProfiles,
    IS_MANDATORY,
    opened,
    ref,
    selectedGridClusters,
    selectedGridConcurrency,
    selectedGridName,
    selectedGridProfile,
    setOpened,
    setCurrentCloudProvider,
    setSelectedGridProfile
  };
};

export default useCreateGrid;
