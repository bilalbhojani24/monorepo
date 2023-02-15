import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getAreApplicationsStillLoading,
  getListOfApplications,
  getSelectedApplication,
  setCurrentSetupStep,
  setSelectedApplication
} from '../slices/newPerformanceSessionSlice';
import { fetchApplicationsFromSelectedDevice } from '../slices/newPerformanceSessionThunks';

const useSelectApplicationStep = () => {
  const areApplicationsStillLoading = useSelector(
    getAreApplicationsStillLoading
  );
  const lisOfApplications = useSelector(getListOfApplications);
  const selectedApplication = useSelector(getSelectedApplication);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(lisOfApplications);

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
    dispatch(fetchApplicationsFromSelectedDevice());
  }, [dispatch]);

  useEffect(() => {
    setSearchResults(lisOfApplications);
  }, [lisOfApplications]);

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
