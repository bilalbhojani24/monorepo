import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestCaseDetails } from 'api/testcases.api';

import {
  setTestCaseDetails,
  setTestCaseViewVisibility,
} from '../slices/repositorySlice';

export default function useTestCases() {
  // const [inputError, setInputError] = useState(false);
  const { projectId, folderId, testCaseId } = useParams();
  const dispatch = useDispatch();

  const isTestCaseViewVisible = useSelector(
    (state) => state.repository.isTestCaseViewVisible,
  );

  const fetchTestCaseDetails = () => {
    dispatch(setTestCaseViewVisibility(true));
    if (folderId && testCaseId) {
      getTestCaseDetails({ projectId, folderId, testCaseId }).then((data) => {
        dispatch(setTestCaseDetails(data || null));
      });
    }
  };

  const hideTestCaseViewDrawer = () => () => {
    dispatch(setTestCaseViewVisibility(false));
  };

  const handleTabChange = () => {};

  return {
    testCaseId,
    hideTestCaseViewDrawer,
    isTestCaseViewVisible,
    fetchTestCaseDetails,
    handleTabChange,
  };
}
