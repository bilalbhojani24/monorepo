import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  deleteTestCaseAPI,
  deleteTestCasesBulkAPI,
  getTestCasesAPI
} from 'api/testcases.api';
import { addNotificaton } from 'globalSlice';
import {
  handleBulkEntryDeletion,
  handleLastEntryDeletionInAPage
} from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import {
  deleteTestCase,
  resetBulkSelection,
  setBulkUpdateProgress,
  setDeleteTestCaseModalVisibility,
  setMetaPage,
  updateAllTestCases,
  updateCtaLoading,
  updateTestCasesListLoading
} from '../../slices/repositorySlice';

import useUpdateTCCountInFolders from './useUpdateTCCountInFolders';

export default function useDeleteTestCase() {
  // eslint-disable-next-line no-unused-vars
  const modalFocusRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const { projectId, folderId } = useParams();
  const deletedTestCaseCountRef = useRef({
    [folderId]: { page: null, count: 0 }
  });
  const dispatch = useDispatch();
  const { updateTCCount } = useUpdateTCCountInFolders();

  const bulkSelection = useSelector((state) => state.repository.bulkSelection);
  const metaPage = useSelector((state) => state.repository.metaPage);
  const isBulkUpdate = useSelector(
    (state) => state.repository.isBulkUpdateInit
  );
  const allTestCases = useSelector((state) => state.repository.allTestCases);

  const selectedTestCase = useSelector(
    (state) => state.repository.selectedTestCase
  );
  const deleteTestCaseCtaLoading = useSelector(
    (state) => state.repository.isLoading.deleteTestCaseCta
  );
  const bulkDeleteTestCaseCtaLoading = useSelector(
    (state) => state.repository.isLoading.bulkDeleteTestCaseCta
  );

  const selectedBulkTCCount = bulkSelection.select_all
    ? metaPage.count - bulkSelection.de_selected_ids.length
    : bulkSelection.ids.length;

  console.log('delete test case count', deletedTestCaseCountRef.current);
  const handleNoEntryOnFirstPage = () => {
    dispatch(updateTestCasesListLoading(true));
    getTestCasesAPI({ projectId, folderId })
      .then((res) => {
        dispatch(updateAllTestCases(res?.test_cases || []));
        dispatch(setMetaPage(res.info));
        dispatch(updateTestCasesListLoading(false));
      })
      .catch(() => {
        // if page error, reset p=1
        setSearchParams({});
        dispatch(updateTestCasesListLoading(false));
      });
  };

  const setMetaCount = (newCount) => {
    dispatch(
      setMetaPage({
        ...metaPage,
        count: newCount
      })
    );
  };

  const setDeletedTestCaseCount = (count) => {
    if (
      Object.keys(deletedTestCaseCountRef.current)[0] === folderId &&
      searchParams.get('p') ===
        deletedTestCaseCountRef.current[`${folderId}`].page
    )
      deletedTestCaseCountRef.current[`${folderId}`].count += count;
    else
      deletedTestCaseCountRef.current = {
        [folderId]: { page: searchParams.get('p'), count }
      };
  };

  const hideDeleteTestCaseModal = () => {
    dispatch(setDeleteTestCaseModalVisibility(false));
    setTimeout(() => {
      // animation wait
      dispatch(setBulkUpdateProgress(false));
    }, 500);
  };

  const bulkDeleteHandler = () => {
    dispatch(
      logEventHelper('TM_DelteAllBtnClicked', {
        project_id: projectId,
        folder_id_src: folderId,
        testcase_id: bulkSelection?.ids
      })
    );
    dispatch(updateCtaLoading({ key: 'bulkDeleteTestCaseCta', value: true }));

    deleteTestCasesBulkAPI({ projectId, folderId, bulkSelection })
      .then((data) => {
        updateTCCount({ casesObj: data?.cases_count });
        dispatch(
          updateCtaLoading({ key: 'bulkDeleteTestCaseCta', value: false })
        );

        let updatedTestCases = [];
        const updatedCount = metaPage.count - selectedBulkTCCount;
        setDeletedTestCaseCount(selectedBulkTCCount);
        if (bulkSelection.select_all) {
          updatedTestCases = allTestCases.filter((item) =>
            bulkSelection.de_selected_ids.includes(item.id)
          );
        } else {
          updatedTestCases = allTestCases.filter(
            (item) => !bulkSelection.ids.includes(item.id)
          );
        }

        setMetaCount(updatedCount);
        if (updatedTestCases.length === 0 && updatedCount > 0) {
          // TC exists but need to fetch, set page to 1
          // setSearchParams({});
          handleBulkEntryDeletion({
            metaPage,
            searchParams,
            setSearchParams,
            handleNoEntryOnFirstPage
          });
        }
        // else dispatch(updateAllTestCases(updatedTestCases));
        dispatch(updateAllTestCases(updatedTestCases));

        dispatch(
          logEventHelper('TM_TcBulkDeleteNotification', {
            project_id: projectId,
            testcase_id: bulkSelection?.ids
          })
        );
        dispatch(
          addNotificaton({
            id: `test_cases_deleted`,
            title: `${bulkSelection?.ids?.length} Test cases deleted`,
            variant: 'success'
          })
        );
        dispatch(resetBulkSelection());
        hideDeleteTestCaseModal();
      })
      .catch(() => {
        dispatch(
          updateCtaLoading({ key: 'bulkDeleteTestCaseCta', value: false })
        );
      });
  };

  const singleItemDeleteHelper = () => {
    dispatch(
      logEventHelper('TM_DeleteCaseBtnClicked', {
        project_id: selectedTestCase.project_id,
        testcase_id: selectedTestCase?.id
      })
    );

    dispatch(updateCtaLoading({ key: 'deleteTestCaseCta', value: true }));
    deleteTestCaseAPI({
      projectId: selectedTestCase?.project_id,
      folderId: selectedTestCase?.test_case_folder_id,
      testCaseId: selectedTestCase.id
    })
      .then((data) => {
        const folderData = data.data.folder;
        updateTCCount({
          casesObj: { [folderData.id]: folderData.cases_count }
        });
        dispatch(updateCtaLoading({ key: 'deleteTestCaseCta', value: false }));
        setDeletedTestCaseCount(1);

        dispatch(
          logEventHelper('TM_TcDeletedNotification', {
            project_id: selectedTestCase?.project_id,
            testcase_id: selectedTestCase?.id
          })
        );

        dispatch(deleteTestCase([selectedTestCase.id]));
        console.log(
          'deleted test case count',
          deletedTestCaseCountRef.current[`${folderId}`]
        );
        handleLastEntryDeletionInAPage({
          metaPage,
          searchParams,
          setSearchParams,
          moveToPrevPage:
            deletedTestCaseCountRef.current[`${folderId}`] % 30 === 0,
          handleNoEntryOnFirstPage
        });
        setMetaCount(metaPage.count - 1);
        hideDeleteTestCaseModal();
      })
      .catch(() => {
        dispatch(updateCtaLoading({ key: 'deleteTestCaseCta', value: false }));
      });
  };

  const deleteTestCaseHandler = () => {
    if (isBulkUpdate) {
      dispatch(
        logEventHelper('TM_DeleteAllCtaClicked', {
          project_id: projectId,
          testcase_id: bulkSelection?.ids,
          folder_id_src: folderId
        })
      );
      bulkDeleteHandler();
    } else if (selectedTestCase) {
      singleItemDeleteHelper();
    }
  };

  return {
    modalFocusRef,
    deleteTestCaseHandler,
    hideDeleteTestCaseModal,
    isBulkUpdate,
    selectedBulkTCCount,
    deleteTestCaseCtaLoading,
    bulkDeleteTestCaseCtaLoading
  };
}
