import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addTestCaseAPI,
  editTestCaseAPI,
  getTestCaseDetailsAPI,
} from 'api/testcases.api';

import {
  addSingleTestCase,
  setAddTestCaseVisibility,
  setEditTestCasePageVisibility,
  setTestCaseFormData,
  updateTestCase,
  updateTestCaseFormData,
} from '../slices/repositorySlice';

export default function useAddEditTestCase() {
  const { projectId, folderId } = useParams();
  const [inputError, setInputError] = useState(false);
  const dispatch = useDispatch();

  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder,
  );
  const isTestCaseEditing = useSelector(
    (state) => state.repository.showEditTestCaseForm,
  );
  const testCaseFormData = useSelector(
    (state) => state.repository.testCaseFormData,
  );

  const selectedTestCase = useSelector(
    (state) => state.repository.selectedTestCase,
  );

  const hideTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(false));
    dispatch(setEditTestCasePageVisibility(false));
  };

  const fetchTestCaseDetails = () => {
    if (folderId && selectedTestCase?.id) {
      getTestCaseDetailsAPI({
        projectId,
        folderId,
        testCaseId: selectedTestCase.id,
      }).then((data) => {
        dispatch(setTestCaseFormData(data?.data?.test_case || null));
      });
    }
  };

  const saveTestCase = (formData) => {
    if (!formData.name) setInputError(true);
    else {
      addTestCaseAPI({
        projectId,
        folderId,
        payload: { test_case: formData },
      }).then((data) => {
        dispatch(addSingleTestCase(data));
        dispatch(setAddTestCaseVisibility(false));
      });
    }
  };

  const editTestCase = (formData) => {
    if (!formData.name) setInputError(true);
    else {
      editTestCaseAPI({
        projectId,
        folderId,
        testCaseId: selectedTestCase.id,
        payload: { test_case: formData },
      }).then((data) => {
        dispatch(updateTestCase(data));
        dispatch(setAddTestCaseVisibility(false));
        dispatch(setEditTestCasePageVisibility(false));
      });
    }
  };

  const handleTestCaseFieldChange = (key, value) => {
    if (key === 'name' && value) setInputError(false);
    dispatch(updateTestCaseFormData({ key, value }));
  };

  useEffect(() => {
    if (isTestCaseEditing) fetchTestCaseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTestCaseEditing]);

  return {
    handleTestCaseFieldChange,
    testCaseFormData,
    inputError,
    selectedFolder,
    hideTestCaseAdditionPage,
    saveTestCase,
    editTestCase,
    folderId,
    projectId,
    selectedTestCase,
    isTestCaseEditing,
  };
}
