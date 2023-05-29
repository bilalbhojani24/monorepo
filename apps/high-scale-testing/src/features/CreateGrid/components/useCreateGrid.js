import { useEffect, useRef, useState } from 'react';
import { fetchDataForCreateGrid } from 'api/index';
import { SCRATCH_RADIO_GROUP_OPTIONS } from 'constants/index';

const useCreateGrid = () => {
  const COMBOBOX_OPTIONS = [
    { label: 'a', value: 'a' },
    { label: 'd', value: 'd' },
    { label: 'c', value: 'c' },
    { label: 'b', value: 'b' }
  ];
  const DEFAULT_CLOUD_PROVIDER = SCRATCH_RADIO_GROUP_OPTIONS[0];

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
  const [gridProfiles, setGridProfiles] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selectedGridProfile, setSelectedGridProfile] = useState('default');

  const ref = useRef({});

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
    fetchDataForCreateGrid().then((res) => {
      const response = res.data;
      setGridProfiles(response['grid-profiles']);
      setAllAvailableRegionsByProvider(response.regions);
      setAllAvailableInstanceTypes(response['instance-types']);
      setAllAvailableVPCIDs(response['vpc-id']);
      setAllAvailableSubnets(response.subnets);
    });
  }, []);

  return {
    COMBOBOX_OPTIONS,
    allAvailableInstanceTypes,
    allAvailableRegionsByProvider,
    allAvailableSubnets,
    allAvailableVPCIDs,
    currentProvidersRegions,
    breadcrumbsData,
    currentSelectedCloudProvider,
    gridProfiles,
    opened,
    ref,
    selectedGridProfile,
    setOpened,
    setCurrentCloudProvider,
    setSelectedGridProfile
  };
};

export default useCreateGrid;
