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
  const testCaseId = 128;
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const isTestCaseViewVisible = useSelector(
    (state) => state.repository.isTestCaseViewVisible,
  );

  const fetchTestCaseDetails = () => {
    if (folderId) {
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
    hideTestCaseViewDrawer,
    isTestCaseViewVisible,
    fetchTestCaseDetails,
    handleTabChange,
  };
}
