import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestRuns } from 'api/testruns.api';
import { setSelectedProject } from 'globalSlice';

import {
  setAddTestRun,
  setAddTestRunFormData,
  updateAllTestRuns,
} from '../slices/testRunsSlice';

const useTestRuns = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const allTestRunsArray = useSelector(
    (state) => state.testRuns.allTestRunsArray,
  );
  const showAddTestRunsForm = useSelector(
    (state) => state.testRuns.showAddTestRunsForm,
  );
  const testRunFormData = useSelector(
    (state) => state.testRuns.testRunFormData,
  );
  const showAddTestCaseModal = useSelector(
    (state) => state.testRuns.showAddTestCaseModal,
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

  const handleTestRunInputFieldChange = (key1, key2) => (e) => {
    dispatch(setAddTestRunFormData({ key1, key2, value: e.target.value }));
  };

  const handleSelectMenuChange = (key1, key2) => (value) => {
    console.log('gone in select menu');
    dispatch(setAddTestRunFormData({ key1, key2, value }));
  };

  return {
    allTestRunsArray,
    fetchAllTestRuns,
    handleTestRunInputFieldChange,
    handleSelectMenuChange,
    projectId,
    testRunFormData,
    showTestRunAddFormHandler,
    showAddTestRunsForm,
    showAddTestCaseModal,
  };
};

export default useTestRuns;
