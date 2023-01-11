import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTestCase, getTestCases } from 'api/testcases.api';

import {
  addSingleTestCase,
  setAddTestCaseVisibility,
  setTestCaseViewVisibility,
  updateAllTestCases,
  updateTestCaseFormData,
} from '../slices/repositorySlice';

export default function useTestCases() {
  // const [inputError, setInputError] = useState(false);
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder,
  );
  const allTestCases = useSelector((state) => state.repository.allTestCases);
  const isAddTestCasePageVisible = useSelector(
    (state) => state.repository.isAddTestCasePageVisible,
  );
  const newTestCaseData = useSelector(
    (state) => state.repository.newTestCaseData,
  );
  const isTestCaseViewVisible = useSelector(
    (state) => state.repository.isTestCaseViewVisible,
  );

  const showTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(true));
  };
  const hideTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(false));
  };

  const fetchAllTestCases = () => {
    if (folderId)
      getTestCases({ projectId, folderId }).then((data) => {
        dispatch(updateAllTestCases(data?.testcases || []));
      });
    else dispatch(updateAllTestCases([]));
  };

  const saveTestCase = (formData) => () => {
    addTestCase({
      projectId,
      folderId,
      payload: { test_case: formData },
    }).then((data) => {
      dispatch(addSingleTestCase(data));
      dispatch(setAddTestCaseVisibility(false));
    });
  };

  const handleTestCaseFieldChange = (key, value) => {
    dispatch(updateTestCaseFormData({ key, value }));
  };

  const handleTestCaseViewClick = (testCaseItem) => () => {
    dispatch(setTestCaseViewVisibility(true));
    // navigate(`${AppRoute.PROJECTS}/${projectId}${AppRoute.TEST_RUNS}`);
  };

  return {
    handleTestCaseFieldChange,
    newTestCaseData,
    // inputError,
    selectedFolder,
    showTestCaseAdditionPage,
    hideTestCaseAdditionPage,
    allTestCases,
    isAddTestCasePageVisible,
    saveTestCase,
    folderId,
    projectId,
    fetchAllTestCases,
    handleTestCaseViewClick,
    isTestCaseViewVisible,
  };
}
