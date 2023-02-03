import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTestCaseAPI, deleteTestCasesBulkAPI } from 'api/testcases.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import { dropDownOptions } from '../const/testCaseConst';
import {
  deleteTestCase,
  resetBulkSelection,
  setAddTestCaseVisibility,
  setBulkUpdateProgress,
  setDeleteTestCaseModalVisibility,
  setEditTestCasePageVisibility,
  setMetaPage,
  setSelectedTestCase,
  setTestCaseFormData,
  updateAllTestCases
} from '../slices/repositorySlice';

export default function useTestCases() {
  const [isFilterVisible, setFilter] = useState(false);
  const navigate = useNavigate();
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const usersArray = useSelector((state) => state.repository.usersArray);
  const metaPage = useSelector((state) => state.repository.metaPage);
  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder
  );
  const bulkSelection = useSelector((state) => state.repository.bulkSelection);
  const isTestCasesLoading = useSelector(
    (state) => state.repository.isTestCasesLoading
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

  const selectedBulkTCCount = bulkSelection.select_all
    ? metaPage.count - bulkSelection.de_selected_ids.length
    : metaPage.count - bulkSelection.ids.length;

  const showTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(true));
  };

  const hideTestCaseAddEditPage = () => {
    dispatch(setAddTestCaseVisibility(false));
    dispatch(setEditTestCasePageVisibility(false));
    dispatch(setBulkUpdateProgress(false));
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
      deleteTestCasesBulkAPI({ projectId, folderId, bulkSelection }).then(
        () => {
          let updatedTestCases = [];
          if (bulkSelection.select_all) {
            updatedTestCases = allTestCases.filter((item) =>
              bulkSelection.de_selected_ids.includes(item.id)
            );
          } else {
            updatedTestCases = allTestCases.filter(
              (item) => !bulkSelection.ids.includes(item.id)
            );
          }
          dispatch(
            setMetaPage({
              ...metaPage,
              count: bulkSelection.select_all
                ? metaPage.count - bulkSelection.de_selected_ids.length
                : metaPage.count - bulkSelection.ids.length
            })
          );
          dispatch(updateAllTestCases(updatedTestCases));
          dispatch(resetBulkSelection());
          hideDeleteTestCaseModal();
        }
      );
    } else if (selectedTestCase)
      deleteTestCaseAPI({
        projectId,
        folderId,
        testCaseId: selectedTestCase.id
      }).then(() => {
        dispatch(deleteTestCase([selectedTestCase.id]));
        dispatch(
          setMetaPage({
            ...metaPage,
            count: metaPage.count - 1
          })
        );
        hideDeleteTestCaseModal();
      });
  };

  return {
    selectedBulkTCCount,
    usersArray,
    isFilterVisible,
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
    handleTestCaseViewClick,
    isTestCaseViewVisible,
    showDeleteModal,
    selectedTestCase,
    isBulkUpdate,
    isTestCasesLoading,
    setFilter
  };
}
