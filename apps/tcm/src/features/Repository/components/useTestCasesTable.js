import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  moveTestCasesBulkAPI,
  moveTestCasesBulkOnSFAPI
} from 'api/testcases.api';
import AppRoute from 'const/routes';
import { addNotificaton, setShowFreshChatButton } from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { dropDownOptions } from '../const/testCaseConst';
import {
  resetBulkFormData,
  resetBulkSelection,
  setAddTestCaseVisibility,
  // setBulkAllSelected,
  setBulkDeSelectedtestCaseIDs,
  setBulkSelectedtestCaseIDs,
  setBulkUpdateProgress,
  setDeleteTestCaseModalVisibility,
  setEditTestCasePageVisibility,
  setIssuesArray,
  setSelectedTestCase,
  setTestCaseDetails,
  setTestCaseFormData,
  updateAllTestCases,
  updateCtaLoading,
  updateTestCasesOnSF
} from '../slices/repositorySlice';
import {
  formDataRetriever,
  getExistingQueryParams,
  updatePageQueryParamsWORefresh
} from '../utils/sharedFunctions';

import useUpdateTCCountInFolders from './AddEditTestCase/useUpdateTCCountInFolders';

const useTestCasesTable = (prop) => {
  const navigate = useNavigate();
  const { projectId, folderId, testCaseId } = useParams();
  const [searchParams] = useSearchParams();
  const [showMoveModal, setshowMoveModal] = useState(false);
  const [isAllChecked, setAllChecked] = useState(false); // for the current page alone
  const [isIndeterminate, setIndeterminate] = useState(false); // for the current page alone
  const { updateTCCount } = useUpdateTCCountInFolders();
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
  const tagsArray = useSelector((state) => state.repository.tagsArray);
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
  const bulkMoveTestCaseCtaLoading = useSelector(
    (state) => state.repository.isLoading.bulkMoveTestCaseCta
  );

  const closeTCDetailsSlide = () => {
    dispatch(
      setTestCaseDetails({
        folderId: null,
        testCaseId: null
      })
    );
  };

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
    closeTCDetailsSlide();
    if (isSearchFilterView) {
      dispatch(
        logEventHelper('TM_TcBulkMoveBtnClickedSearchFilter', {
          project_id: projectId,
          testcase_id: bulkSelection?.ids
        })
      );
    }
    setshowMoveModal(true);
  };

  const initBulkEdit = () => {
    closeTCDetailsSlide();
    const eventProps = {
      project_id: projectId,
      testcase_id: bulkSelection?.ids
    };
    if (isSearchFilterView) eventProps.folder_id_src = folderId;
    dispatch(
      logEventHelper(
        isSearchFilterView
          ? 'TM_BulkEditBtnClickedSearchFilter'
          : 'TM_BulkEditBtnClicked',
        isSearchFilterView
      )
    );
    dispatch(setAddTestCaseVisibility(true));
    dispatch(resetBulkFormData()); // resetting bulk form before edit, so that it we start afresh
    dispatch(setIssuesArray([]));
    setBulkStatus(true);
  };

  const initBulkDelete = () => {
    closeTCDetailsSlide();
    dispatch(
      logEventHelper(
        isSearchFilterView
          ? 'TM_BulkDeleteBtnClickedSearchFilter'
          : 'TM_BulkDeleteBtnClicked',
        {
          project_id: projectId,
          testcase_id: bulkSelection?.ids
        }
      )
    );
    dispatch(setDeleteTestCaseModalVisibility(true));
    setBulkStatus(true);
  };

  const hideFolderModal = () => {
    setshowMoveModal(false);
  };

  const moveTestCasesSFHandler = (selectedFolder) => {
    moveTestCasesBulkOnSFAPI({
      projectId,
      newParentFolderId: selectedFolder.id,
      bulkSelection,
      queryParams: getExistingQueryParams(searchParams)
    })
      .then((data) => {
        dispatch(updateTestCasesOnSF(data));
        updatePageQueryParamsWORefresh(searchParams, data?.info?.page);

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
        dispatch(
          updateCtaLoading({ key: 'bulkMoveTestCaseCta', value: false })
        );
      })
      .catch(() => {
        dispatch(
          updateCtaLoading({ key: 'bulkMoveTestCaseCta', value: false })
        );
      });
  };

  const moveTestCasesHandler = (selectedFolder) => {
    if (selectedFolder?.id) {
      dispatch(updateCtaLoading({ key: 'bulkMoveTestCaseCta', value: true }));

      dispatch(
        logEventHelper(
          isSearchFilterView
            ? 'TM_TcMoveAllCtaClickedSearchFilter'
            : 'TM_TcMoveAllCtaClicked',
          {
            project_id: projectId,
            folder_id_src: folderId,
            folder_id_dest: selectedFolder.id,
            testcase_id: bulkSelection?.ids
          }
        )
      );

      if (isSearchFilterView) {
        moveTestCasesSFHandler(selectedFolder);
        return;
      }
      moveTestCasesBulkAPI({
        projectId,
        folderId,
        newParentFolderId: selectedFolder.id,
        bulkSelection
      })
        .then((data) => {
          updateTCCount({ casesObj: data?.cases_count });
          dispatch(
            updateCtaLoading({ key: 'bulkMoveTestCaseCta', value: false })
          );
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
        })
        .catch(() => {
          dispatch(
            updateCtaLoading({ key: 'bulkMoveTestCaseCta', value: false })
          );
        });
    }
  };

  const onDropDownChange = (selectedOption, selectedItem, isFromTable) => {
    if (selectedOption?.id === dropDownOptions[0].id) {
      // edit
      const formattedData = formDataRetriever(tagsArray, selectedItem);
      dispatch(setEditTestCasePageVisibility(true));
      dispatch(setAddTestCaseVisibility(true));
      dispatch(setTestCaseFormData(formattedData));
      if (formattedData.issues) dispatch(setIssuesArray(formattedData.issues));
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

  const handleTableAmplitudeEvents = (item, action) => {
    dispatch(
      logEventHelper(`TM_${action}ClickedTcList`, {
        project_id: projectId,
        testcase_id: item?.id
      })
    );
  };

  const handleTestCaseViewClick = (testCaseItem, action) => () => {
    handleTableAmplitudeEvents(testCaseItem, action);
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
    testCaseId,
    isIndeterminate,
    isAllChecked,
    isSearchFilterView,
    projectId,
    folderId,
    showMoveModal,
    isAllSelected,
    selectedTestCaseIDs,
    deSelectedTestCaseIDs,
    bulkMoveTestCaseCtaLoading,
    selectAll,
    updateSelection,
    initBulkMove,
    initBulkEdit,
    initBulkDelete,
    hideFolderModal,
    moveTestCasesHandler,
    onDropDownChange,
    handleTestCaseViewClick,
    dispatch,
    setShowFreshChatButton
  };
};
export default useTestCasesTable;
