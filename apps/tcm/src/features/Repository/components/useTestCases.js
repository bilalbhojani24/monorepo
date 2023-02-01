import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteTestCaseAPI,
  deleteTestCasesBulkAPI,
  getTestCasesAPI
} from 'api/testcases.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import { dropDownOptions } from '../const/testCaseConst';
import {
  deleteTestCase,
  setAddTestCaseVisibility,
  setBulkUpdateProgress,
  setDeleteTestCaseModalVisibility,
  setEditTestCasePageVisibility,
  setSelectedTestCase,
  setTestCaseFormData,
  updateAllTestCases
} from '../slices/repositorySlice';

export default function useTestCases() {
  const navigate = useNavigate();
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder
  );
  const allTestCases = useSelector((state) => state.repository.allTestCases);
  const isAddTestCasePageVisible = useSelector(
    (state) => state.repository.isAddTestCasePageVisible
  );
  const isTestCaseViewVisible = useSelector(
    (state) => state.repository.isTestCaseViewVisible
  );
  const showDeleteModal = useSelector(
    (state) => state.repository.showDeleteTestCaseModal
  );
  const selectedTestCase = useSelector(
    (state) => state.repository.selectedTestCase
  );
  const isBulkUpdate = useSelector(
    (state) => state.repository.isBulkUpdateInit
  );
  const bulkSelectionValue = useSelector(
    (state) => state.repository.bulkSelection
  );

  const showTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(true));
  };

  const hideTestCaseAddEditPage = () => {
    dispatch(setAddTestCaseVisibility(false));
    dispatch(setEditTestCasePageVisibility(false));
    dispatch(setBulkUpdateProgress(false));
  };

  const fetchAllTestCases = () => {
    if (folderId)
      getTestCasesAPI({ projectId, folderId }).then((data) => {
        dispatch(updateAllTestCases(data?.testcases || []));
      });
    else dispatch(updateAllTestCases([]));
  };

  const handleTestCaseViewClick = (testCaseItem) => () => {
    navigate(
      routeFormatter(AppRoute.TEST_CASES, {
        projectId,
        folderId,
        testCaseId: testCaseItem?.id
      })
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
    setTimeout(() => {
      // animation wait
      dispatch(setBulkUpdateProgress(false));
    }, 500);
  };

  const deleteTestCaseHandler = () => {
    if (isBulkUpdate) {
      // bulkSelectionValue
      const testCaseIds = [];
      // deleteTestCasesBulkAPI((projectId, folderId, testCaseIds)).then((res) => {
      //   dispatch(deleteTestCase([selectedTestCase.id]));
      //   hideDeleteTestCaseModal();
      // });
    } else if (selectedTestCase)
      deleteTestCaseAPI({
        projectId,
        folderId,
        testCaseId: selectedTestCase.id
      }).then((res) => {
        dispatch(deleteTestCase([selectedTestCase.id]));
        hideDeleteTestCaseModal();
      });
  };

  return {
    hideDeleteTestCaseModal,
    deleteTestCaseHandler,
    onDropDownChange,
    selectedFolder,
    showTestCaseAdditionPage,
    hideTestCaseAddEditPage,
    allTestCases,
    isAddTestCasePageVisible,
    folderId,
    projectId,
    fetchAllTestCases,
    handleTestCaseViewClick,
    isTestCaseViewVisible,
    showDeleteModal,
    selectedTestCase,
    isBulkUpdate
  };
}
