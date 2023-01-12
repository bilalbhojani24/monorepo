import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestRuns } from 'api/testruns.api';

// import { setSelectedProject } from 'globalSlice/globalSlice';
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
    if (projectId)
      getTestRuns({ projectId }).then((data) => {
        dispatch(updateAllTestRuns(data?.testruns || []));
      });
    else dispatch(updateAllTestRuns([]));
  };

  const handleTestRunFieldChange = (key, value) => {
    setTestRunFormData((prevState) => {
      const newState = { ...prevState };
      newState[`${key}`] = value;
      return newState;
    });
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
