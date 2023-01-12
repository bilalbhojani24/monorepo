import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTestCase, getTestCases } from 'api/testcases.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import {
  addSingleTestCase,
  setAddTestCaseVisibility,
  updateAllTestCases,
  updateTestCaseFormData,
} from '../slices/repositorySlice';

export default function useTestCases() {
  const navigate = useNavigate();
  const { projectId, folderId } = useParams();
  const [inputError, setInputError] = useState(false);
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

  const saveTestCase = (formData) => {
    if (!formData.name) setInputError(true);
    else {
      addTestCase({
        projectId,
        folderId,
        payload: { test_case: formData },
      }).then((data) => {
        dispatch(addSingleTestCase(data));
        dispatch(setAddTestCaseVisibility(false));
      });
    }
  };

  const handleTestCaseFieldChange = (key, value) => {
    if (key === 'name' && value) setInputError(false);
    dispatch(updateTestCaseFormData({ key, value }));
  };

  const handleTestCaseViewClick = (testCaseItem) => () => {
    navigate(
      routeFormatter(AppRoute.TEST_CASES, {
        projectId,
        folderId,
        testCaseId: testCaseItem?.id,
      }),
    );
  };

  return {
    handleTestCaseFieldChange,
    newTestCaseData,
    inputError,
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
