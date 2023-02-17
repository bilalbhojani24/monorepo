import { useEffect, useState } from 'react';
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
  setTestCaseDetails,
  setTestCaseFormData,
  updateAllTestCases
} from '../slices/repositorySlice';

const useTestCasesTable = (prop) => {
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
  const selectedTestCaseIDs = useSelector(
    (state) => state.repository.bulkSelection.ids
  );
  const deSelectedTestCaseIDs = useSelector(
    (state) => state.repository.bulkSelection.de_selected_ids
  );
  const isSearchFilterView = useSelector(
    (state) => state.repository.isSearchFilterView
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

  const onDropDownChange = (e, selectedOption, selectedItem) => {
    if (selectedOption?.id === dropDownOptions[0].id) {
      // edit
      dispatch(setEditTestCasePageVisibility(true));
      dispatch(setAddTestCaseVisibility(true));
      dispatch(setTestCaseFormData(selectedItem));
    } else if (selectedOption?.id === dropDownOptions[1].id) {
      // delete
      dispatch(setDeleteTestCaseModalVisibility(true));
    }
    dispatch(setSelectedTestCase(selectedItem));
  };

  const handleTestCaseViewClick = (testCaseItem) => () => {
    if (prop?.isMini) return;

    dispatch(
      setTestCaseDetails({
        folderId: testCaseItem?.test_case_folder_id,
        testCaseId: testCaseItem?.id
      })
    );
    if (!isSearchFilterView) {
      // update route only if its in repostiory view
      navigate(
        routeFormatter(
          AppRoute.TEST_CASES,
          {
            projectId,
            folderId: testCaseItem.test_case_folder_id,
            testCaseId: testCaseItem?.id
          },
          true
        ),
        {
          replace: true
        }
      );
    }
  };

  useEffect(() => {
    prop?.onItemSelectionCb?.(selectedTestCaseIDs);
  }, [prop, selectedTestCaseIDs]);

  useEffect(() => {
    if (prop?.selectedTestCases) {
      setSelectedTestCaseIDs(prop?.selectedTestCases);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    projectId,
    folderId,
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
