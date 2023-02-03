import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { moveTestCasesBulkAPI } from 'api/testcases.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import { dropDownOptions } from '../const/testCaseConst';
import {
  resetBulkSelection,
  setAddTestCaseVisibility,
  setBulkAllSelected,
  setBulkDeSelectedtestCaseIDs,
  setBulkSelectedtestCaseIDs,
  setBulkUpdateProgress,
  setDeleteTestCaseModalVisibility,
  setEditTestCasePageVisibility,
  setSelectedTestCase,
  setTestCaseFormData,
  updateAllTestCases
} from '../slices/repositorySlice';

const useTestCasesTable = () => {
  const navigate = useNavigate();
  const { projectId, folderId } = useParams();
  const [showMoveModal, setshowMoveModal] = useState(false);
  const dispatch = useDispatch();

  const setSelectedTestCaseIDs = (data) => {
    dispatch(setBulkSelectedtestCaseIDs(data));
  };
  const setDeSelectedTestCaseIDs = (data) => {
    dispatch(setBulkDeSelectedtestCaseIDs(data));
  };
  const setBulkAll = (data) => {
    dispatch(setBulkAllSelected(data));
  };
  const setBulkStatus = (data) => {
    dispatch(setBulkUpdateProgress(data));
  };

  const metaPage = useSelector((state) => state.repository.metaPage);
  const selectedTestCaseIDs = useSelector(
    (state) => state.repository.bulkSelection.ids
  );
  const deSelectedTestCaseIDs = useSelector(
    (state) => state.repository.bulkSelection.de_selected_ids
  );
  const isAllSelected = useSelector(
    (state) => state.repository.bulkSelection.select_all
  );
  const bulkSelection = useSelector((state) => state.repository.bulkSelection);

  const updateSelection = (e, listItem) => {
    if (e.currentTarget.checked) {
      setSelectedTestCaseIDs([...selectedTestCaseIDs, listItem.id]);
      setDeSelectedTestCaseIDs(
        deSelectedTestCaseIDs.filter((item) => item !== listItem.id)
      );
    } else {
      const deselectedUpdates = [...deSelectedTestCaseIDs, listItem.id];
      //   if (deselectedUpdates.length === rows.length) {
      //     // everything deselected
      //     setBulkAll(false);
      //   }
      setDeSelectedTestCaseIDs(deselectedUpdates);
      setSelectedTestCaseIDs(
        selectedTestCaseIDs.filter((item) => item !== listItem.id)
      );
    }
  };

  const selectAll = (e) => {
    if (e.currentTarget.checked) {
      setBulkAll(true);
      setDeSelectedTestCaseIDs([]);
    } else {
      setBulkAll(false);
      setSelectedTestCaseIDs([]);
      setDeSelectedTestCaseIDs([]);
    }
  };

  const initBulkMove = () => {
    setshowMoveModal(true);
  };

  const initBulkEdit = () => {
    dispatch(setAddTestCaseVisibility(true));
    setBulkStatus(true);
  };

  const initBulkDelete = () => {
    dispatch(setDeleteTestCaseModalVisibility(true));
    setBulkStatus(true);
  };

  const hideFolderModal = () => {
    setshowMoveModal(false);
  };

  const moveTestCasesHandler = (selectedFolder) => {
    if (selectedFolder?.id)
      moveTestCasesBulkAPI({
        projectId,
        folderId,
        newParentFolderId: selectedFolder.id,
        bulkSelection
      }).then((data) => {
        dispatch(updateAllTestCases(data?.test_cases || []));
        dispatch(resetBulkSelection());
        hideFolderModal();
      });
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

  const handleTestCaseViewClick = (testCaseItem) => () => {
    navigate(
      routeFormatter(AppRoute.TEST_CASES, {
        projectId,
        folderId,
        testCaseId: testCaseItem?.id
      })
    );
  };

  return {
    projectId,
    folderId,
    metaPage,
    showMoveModal,
    isAllSelected,
    selectedTestCaseIDs,
    deSelectedTestCaseIDs,
    selectAll,
    updateSelection,
    initBulkMove,
    initBulkEdit,
    initBulkDelete,
    hideFolderModal,
    moveTestCasesHandler,
    onDropDownChange,
    handleTestCaseViewClick
  };
};
export default useTestCasesTable;
