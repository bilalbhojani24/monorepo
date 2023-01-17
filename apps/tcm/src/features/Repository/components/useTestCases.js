import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addTestCaseAPI,
  deleteTestCaseAPI,
  editTestCaseAPI,
  getTestCasesAPI,
} from 'api/testcases.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import { dropDownOptions } from '../const/testCaseConst';
import {
  addSingleTestCase,
  deleteTestCase,
  setAddTestCaseVisibility,
  setDeleteTestCaseModalVisibility,
  setEditTestCasePageVisibility,
  setSelectedTestCase,
  setTestCaseFormData,
  updateAllTestCases,
  updateTestCase,
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
  const isTestCaseEditing = useSelector(
    (state) => state.repository.showEditTestCaseForm,
  );
  const testCaseFormData = useSelector(
    (state) => state.repository.testCaseFormData,
  );
  const isTestCaseViewVisible = useSelector(
    (state) => state.repository.isTestCaseViewVisible,
  );
  const showEditPage = useSelector(
    (state) => state.repository.showEditTestCaseForm,
  );
  const showDeleteModal = useSelector(
    (state) => state.repository.showDeleteTestCaseModal,
  );
  const selectedTestCase = useSelector(
    (state) => state.repository.selectedTestCase,
  );

  const showTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(true));
  };
  const hideTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(false));
    dispatch(setEditTestCasePageVisibility(false));
  };

  const fetchAllTestCases = () => {
    if (folderId)
      getTestCasesAPI({ projectId, folderId }).then((data) => {
        dispatch(updateAllTestCases(data?.testcases || []));
      });
    else dispatch(updateAllTestCases([]));
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

  const handleTestCaseViewClick = (testCaseItem) => () => {
    navigate(
      routeFormatter(AppRoute.TEST_CASES, {
        projectId,
        folderId,
        testCaseId: testCaseItem?.id,
      }),
    );
  };

  const onDropDownChange = (e, selectedItem) => {
    if (e.currentTarget.textContent === dropDownOptions[0].body) {
      // edit
      dispatch(setEditTestCasePageVisibility(true));
      dispatch(setAddTestCaseVisibility(true));
      dispatch(setTestCaseFormData(selectedItem));
    } else if (e.currentTarget.textContent === dropDownOptions[1].body) {
      // delete
      dispatch(setDeleteTestCaseModalVisibility(true));
    }
    dispatch(setSelectedTestCase(selectedItem));
  };

  const hideDeleteTestCaseModal = () => {
    dispatch(setDeleteTestCaseModalVisibility(false));
  };

  const deleteTestCaseHandler = () => {
    if (selectedTestCase)
      deleteTestCaseAPI({
        projectId,
        folderId,
        testCaseId: selectedTestCase.id,
      }).then((res) => {
        dispatch(deleteTestCase(res.data['test-case']));
        dispatch(setDeleteTestCaseModalVisibility(false));
        hideDeleteTestCaseModal();
      });
  };

  return {
    hideDeleteTestCaseModal,
    deleteTestCaseHandler,
    onDropDownChange,
    handleTestCaseFieldChange,
    testCaseFormData,
    inputError,
    selectedFolder,
    showTestCaseAdditionPage,
    hideTestCaseAdditionPage,
    allTestCases,
    isAddTestCasePageVisible,
    saveTestCase,
    editTestCase,
    folderId,
    projectId,
    fetchAllTestCases,
    handleTestCaseViewClick,
    isTestCaseViewVisible,
    showEditPage,
    showDeleteModal,
    selectedTestCase,
    isTestCaseEditing,
  };
}
