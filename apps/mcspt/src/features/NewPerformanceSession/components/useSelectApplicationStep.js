import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getSelectedApplication,
  setCurrentSetupStep,
  setSelectedApplication
} from '../slices/newPerformanceSessionSlice';

const lisOfApplications = [
  {
    name: 'Gmail',
    packageName: 'com.Gmail.app',
    version: '5211'
  },
  {
    name: 'Netflix',
    packageName: 'com.Netflix.app',
    version: '5212'
  },
  {
    name: 'Spotify',
    packageName: 'com.Spotify.app',
    version: '5213'
  },
  {
    name: 'Wikipedia',
    packageName: 'com.Wikipedia.app',
    version: '5214'
  },
  {
    name: 'YouTube',
    packageName: 'com.YouTube.app',
    version: '5215'
  },
  {
    name: 'Zepto',
    packageName: 'com.Zepto.app',
    version: '5216'
  },
  {
    name: 'Zomato',
    packageName: 'com.tomato.app',
    version: '5216'
  }
];

const useSelectApplicationStep = () => {
  const [areApplicationsStillLoading, setareApplicationsStillLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(lisOfApplications);

  const selectedApplication = useSelector(getSelectedApplication);

  const dispatch = useDispatch();

  const applicationSelected = (x) => {
    dispatch(setSelectedApplication(x));
  };

  const navigateToStep = (x) => {
    dispatch(setCurrentSetupStep(x));
  };

  const performSearch = (event) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);

    setSearchResults(() =>
      lisOfApplications.filter(
        (x) => x.name.toLowerCase().indexOf(newValue) !== -1
      )
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setareApplicationsStillLoading(false);
    }, 2000);
  }, []);

  return {
    areApplicationsStillLoading,
    searchTerm,
    searchResults,
    performSearch,
    selectedApplication,
    applicationSelected,
    navigateToStep
  };
};

export default useSelectApplicationStep;
