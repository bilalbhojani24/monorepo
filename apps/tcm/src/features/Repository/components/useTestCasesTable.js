import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { moveTestCasesBulkAPI } from 'api/testcases.api';
import AppRoute from 'const/routes';
import { addNotificaton } from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

// import { setTestCaseViewVisibility } from '../../TestCaseDetailsView/slices/testCaseDetailsSlice';
import { dropDownOptions } from '../const/testCaseConst';
import {
  resetBulkSelection,
  setAddTestCaseVisibility,
  // setBulkAllSelected,
  setBulkDeSelectedtestCaseIDs,
  setBulkSelectedtestCaseIDs,
  setBulkUpdateProgress,
  setCurrentEditedTestCaseData,
  setDeleteTestCaseModalVisibility,
  setDummyTestCaseFormData,
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
  const [isAllChecked, setAllChecked] = useState(false); // for the current page alone
  const [isIndeterminate, setIndeterminate] = useState(false); // for the current page alone
  const dispatch = useDispatch();

  const setSelectedTestCaseIDs = (data) => {
    dispatch(setBulkSelectedtestCaseIDs(data));
  };
  const setDeSelectedTestCaseIDs = (data) => {
    dispatch(setBulkDeSelectedtestCaseIDs(data));
  };
  // const setBulkAll = (data) => {
  //   dispatch(setBulkAllSelected(data));
  // };
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
    (state) => state.repository.bulkSelection.select_all // logic when all the items through out all the pages were selected, currently this isnt in place.
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
      // setBulkAll(true);
      setSelectedTestCaseIDs([
        ...new Set([
          ...selectedTestCaseIDs,
          ...prop?.rows.map((item) => item.id)
        ])
      ]);
      setDeSelectedTestCaseIDs([]);
    } else {
      // setBulkAll(false);
      const thisPageTCIDs = prop?.rows.map((item) => item.id);
      setSelectedTestCaseIDs(
        selectedTestCaseIDs.filter((item) => !thisPageTCIDs.includes(item))
      );
      setDeSelectedTestCaseIDs([]);
    }
  };

  const initBulkMove = () => {
    setshowMoveModal(true);
  };

  const initBulkEdit = () => {
    dispatch(
      logEventHelper('TM_BulkEditBtnClicked', {
        project_id: projectId,
        folder_id_src: folderId,
        testcase_id: bulkSelection?.ids
      })
    );
    dispatch(setAddTestCaseVisibility(true));
    setBulkStatus(true);
  };

  const initBulkDelete = () => {
    dispatch(
      logEventHelper('TM_BulkDeleteBtnClicked', {
        project_id: projectId,
        testcase_id: bulkSelection?.ids
      })
    );
    dispatch(setDeleteTestCaseModalVisibility(true));
    setBulkStatus(true);
  };

  const hideFolderModal = () => {
    setshowMoveModal(false);
  };

  const moveTestCasesHandler = (selectedFolder) => {
    if (selectedFolder?.id) {
      dispatch(
        logEventHelper('TM_TcMoveAllCtaClicked', {
          project_id: projectId,
          folder_id_src: folderId,
          folder_id_dest: selectedFolder.id,
          testcase_id: bulkSelection?.ids
        })
      );
      moveTestCasesBulkAPI({
        projectId,
        folderId,
        newParentFolderId: selectedFolder.id,
        bulkSelection
      }).then((data) => {
        dispatch(updateAllTestCases(data?.test_cases || []));
        dispatch(resetBulkSelection());
        dispatch(
          logEventHelper('TM_TcMovedNotification', {
            project_id: projectId,
            testcase_id: bulkSelection?.ids
          })
        );
        dispatch(
          addNotificaton({
            id: `test_cases_moved`,
            title: `${bulkSelection?.ids?.length} Test cases moved to new location`,
            variant: 'success'
          })
        );
        hideFolderModal();
      });
    }
  };

  const onDropDownChange = (selectedOption, selectedItem, isFromTable) => {
    if (selectedOption?.id === dropDownOptions[0].id) {
      // edit
      dispatch(setEditTestCasePageVisibility(true));
      dispatch(setAddTestCaseVisibility(true));
      dispatch(setDummyTestCaseFormData(selectedItem));
      dispatch(setCurrentEditedTestCaseData(selectedItem)); // [NOTE: RTE fix]
      dispatch(setTestCaseFormData(selectedItem));
    } else if (selectedOption?.id === dropDownOptions[1].id) {
      // delete
      dispatch(setDeleteTestCaseModalVisibility(true));
      if (isFromTable)
        dispatch(
          logEventHelper('TM_DeleteTcLinkClickedTcList', {
            project_id: projectId,
            testcase_id: selectedItem?.id
          })
        );
    }
    dispatch(setSelectedTestCase(selectedItem));
  };

  const handleTestCaseViewClick = (testCaseItem) => () => {
    if (prop?.isMini) return;

    dispatch(
      logEventHelper('TM_TcDetailView', {
        project_id: projectId,
        testcase_id: testCaseItem?.id
      })
    );
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
    if (prop?.rows) {
      const checkedItems = prop?.rows
        .map((item) => item.id)
        .filter((item) => selectedTestCaseIDs.includes(item));

      setAllChecked(checkedItems.length === prop.rows.length);

      setIndeterminate(
        checkedItems.length === prop.rows.length || !checkedItems.length
          ? false
          : checkedItems.length !== prop.rows.length
      );
    }
  }, [prop?.rows, selectedTestCaseIDs]);

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
    isIndeterminate,
    isAllChecked,
    isSearchFilterView,
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
