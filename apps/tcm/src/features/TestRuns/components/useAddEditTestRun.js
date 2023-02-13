import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestRuns } from 'api/testruns.api';

import { setAddTestRunForm } from '../slices/testRunsSlice';

const useAddEditTestRun = () => {
  const dispatch = useDispatch();
  const tagsArray = [];
  const issuesArray = [];
  const testRunFormData = useSelector(
    (state) => state.testRuns.testRunFormData
  );

  const handleTestRunInputFieldChange = () => {};

  return {
    testRunFormData,
    tagsArray,
    issuesArray,
    handleTestRunInputFieldChange
  };
};

export default useAddEditTestRun;
