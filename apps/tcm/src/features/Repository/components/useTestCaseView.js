import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestCaseDetails, getTestRunOfTestCase } from 'api/testcases.api';

import { setTestCaseDetails } from '../slices/repositorySlice';

export default function useTestCases() {
  // const [inputError, setInputError] = useState(false);
  const testCaseId = 128;
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const isTestCaseViewVisible = useSelector(
    (state) => state.repository.isTestCaseViewVisible,
  );

  const fetchTestCaseDetails = () => {
    if (folderId) {
      getTestCaseDetails({ projectId, folderId, testCaseId }).then((data) => {
        dispatch(setTestCaseDetails(data?.data?.['test-case'] || null));
      });
      getTestRunOfTestCase({ projectId, folderId, testCaseId }).then((data) => {
        dispatch(setTestCaseDetails(data?.test_runs || null));
      });
    }
  };

  const hideTestCaseViewDrawer = () => () => {
    dispatch(setTestCaseViewVisibility(false));
  };

  return {
    hideTestCaseViewDrawer,
    isTestCaseViewVisible,
    fetchTestCaseDetails,
  };
}
