import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestRuns } from 'api/testruns.api';
import { setSelectedProject } from 'globalSlice';

import { setAddTestRun, updateAllTestRuns } from '../slices/testRunsSlice';

const useTestRuns = () => {
  const [testRunFormData, setTestRunFormData] = useState({
    name: '',
    description: '',
    state: '',
    assignTo: '',
  });

  const { projectId } = useParams();
  const dispatch = useDispatch();
  const allTestRunsArray = useSelector(
    (state) => state.testRuns.allTestRunsArray,
  );
  const showAddTestRunsForm = useSelector(
    (state) => state.testRuns.showAddTestRunsForm,
  );

  const showTestRunAddFormHandler = () => {
    dispatch(setAddTestRun(true));
  };

  const fetchAllTestRuns = () => {
    if (projectId) {
      dispatch(setSelectedProject(projectId));
      getTestRuns({ projectId }).then((data) => {
        dispatch(updateAllTestRuns(data?.testruns || []));
      });
    } else dispatch(updateAllTestRuns([]));
  };

  const handleTestRunFieldChange = (key, value) => {
    setTestRunFormData({ ...testRunFormData, [key]: value });
  };

  return {
    allTestRunsArray,
    fetchAllTestRuns,
    handleTestRunFieldChange,
    projectId,
    testRunFormData,
    showTestRunAddFormHandler,
    showAddTestRunsForm,
  };
};

export default useTestRuns;
