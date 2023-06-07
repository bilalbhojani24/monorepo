import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  deleteTestCaseAPI,
  deleteTestCasesBulkAPI,
  deleteTestCasesBulkOnSFAPI,
  getTestCasesAPI,
  getTestCasesSearchFilterAPI
} from 'api/testcases.api';
import { addNotificaton } from 'globalSlice';
import { redirectToPrevPage } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import {
  deleteTestCase,
  resetBulkSelection,
  setBulkUpdateProgress,
  setDeleteTestCaseModalVisibility,
  setMetaPage,
  updateAllTestCases,
  updateCtaLoading,
  updateTestCasesListLoading,
  updateTestCasesOnSF
} from '../../slices/repositorySlice';
import {
  getExistingQueryParams,
  getFilterOptions,
  updatePageQueryParamsWORefresh
} from '../../utils/sharedFunctions';

import useUpdateTCCountInFolders from './useUpdateTCCountInFolders';

export default function useDeleteTestCase() {
  const ANIMATION_DELAY = 500;
  const modalFocusRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const { projectId, folderId } = useParams();

  const dispatch = useDispatch();
  const { updateTCCount } = useUpdateTCCountInFolders();

  const bulkSelection = useSelector((state) => state.repository.bulkSelection);
  const metaPage = useSelector((state) => state.repository.metaPage);
  const isBulkUpdate = useSelector(
    (state) => state.repository.isBulkUpdateInit
  );

  const selectedTestCase = useSelector(
    (state) => state.repository.selectedTestCase
  );
  const deleteTestCaseCtaLoading = useSelector(
    (state) => state.repository.isLoading.deleteTestCaseCta
  );
  const bulkDeleteTestCaseCtaLoading = useSelector(
    (state) => state.repository.isLoading.bulkDeleteTestCaseCta
  );
  const isSearchFilterView = useSelector(
    (state) => state.repository.isSearchFilterView
  );

  const selectedBulkTCCount = bulkSelection.ids.length;

  const lastPageLastEntry = (totalCount) =>
    totalCount - 1 === (searchParams.get('p') - 1) * 30;

  const updateLoadingState = (key, value) => {
    dispatch(updateCtaLoading({ key, value }));
  };

  const getQueryParams = (filterOptions) => {
    const queryParams = {};
    Object.keys(filterOptions).forEach((key) => {
      const value = Array.isArray(filterOptions[key])
        ? filterOptions[key].join(',')
        : filterOptions[key];

      if (value) {
        if (key === 'q') {
          queryParams[`q[query]`] = value;
        } else queryParams[`q[${key}]`] = value;
      }
    });
    return queryParams;
  };

  const refreshSearchAndFilterTestCases = () => {
    const page = searchParams.get('p');
    const filterOptions = getFilterOptions(searchParams);
    const queryParams = getQueryParams(filterOptions);

    if (page) queryParams.p = page;
    dispatch(updateTestCasesListLoading(true));

    if (lastPageLastEntry(metaPage?.count)) {
      redirectToPrevPage(searchParams, setSearchParams);
      return;
    }

    getTestCasesSearchFilterAPI({
      projectId,
      props: queryParams
    })
      .then((res) => {
        const testCases = res.test_cases.map((item) => ({
          ...item,
          folders: res?.folders?.[item.test_case_folder_id] || null
        }));

        dispatch(setMetaPage(res.info));
        dispatch(updateAllTestCases(testCases));
        dispatch(updateTestCasesListLoading(false));
      })
      .catch(() => {
        dispatch(updateTestCasesListLoading(false));
      });
  };

  const refreshNormalViewTestCases = () => {
    dispatch(updateTestCasesListLoading(true));
    getTestCasesAPI({ projectId, folderId, page: searchParams.get('p') })
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

  const refreshAllTestCases = () => {
    if (isSearchFilterView) {
      refreshSearchAndFilterTestCases();
      return;
    }

    refreshNormalViewTestCases();
  };

  const setMetaCount = (newCount) => {
    dispatch(
      setMetaPage({
        ...metaPage,
        count: newCount
      })
    );
  };

  const hideDeleteTestCaseModal = (callback) => {
    dispatch(setDeleteTestCaseModalVisibility(false));
    setTimeout(() => {
      // animation wait
      dispatch(setBulkUpdateProgress(false));
      callback?.();
    }, ANIMATION_DELAY);
  };

  const onBulkDeleteSuccess = (data) => {
    updateTCCount({ casesObj: data?.cases_count });
    updateLoadingState('bulkDeleteTestCaseCta', false);

    const updatedCount = metaPage.count - selectedBulkTCCount;

    const shouldRedirect =
      metaPage?.next === null &&
      data?.test_cases?.length === 0 &&
      searchParams.get('p') !== null;

    if (shouldRedirect) {
      redirectToPrevPage(searchParams, setSearchParams);
    } else {
      dispatch(updateAllTestCases(data?.test_cases));
    }

    setMetaCount(updatedCount);

    const logEventData = {
      project_id: projectId,
      testcase_id: bulkSelection?.ids
    };
    dispatch(logEventHelper('TM_TcBulkDeleteNotification', logEventData));

    const notificationData = {
      id: 'test_cases_deleted',
      title: `${bulkSelection?.ids?.length} Test cases deleted`,
      variant: 'success'
    };
    dispatch(addNotificaton(notificationData));

    hideDeleteTestCaseModal(() => {
      dispatch(resetBulkSelection());
    });
  };

  const bulkSearchDeleteHandler = () => {
    updateLoadingState('bulkDeleteTestCaseCta', true);

    deleteTestCasesBulkOnSFAPI({
      projectId,
      bulkSelection,
      queryParams: getExistingQueryParams(searchParams)
    })
      .then((data) => {
        dispatch(updateTestCasesOnSF(data));
        updatePageQueryParamsWORefresh(searchParams, data?.info?.page);

        const notificationData = {
          id: 'test_cases_deleted',
          title: `${bulkSelection?.ids?.length} Test cases deleted`,
          variant: 'success'
        };
        dispatch(addNotificaton(notificationData));

        hideDeleteTestCaseModal(() => {
          dispatch(resetBulkSelection());
        });
        updateLoadingState('bulkDeleteTestCaseCta', false);
      })
      .catch(() => {
        updateLoadingState('bulkDeleteTestCaseCta', false);
      });
  };

  const bulkDeleteHandler = () => {
    dispatch(
      logEventHelper('TM_DeleteAllBtnClicked', {
        project_id: projectId,
        folder_id_src: folderId,
        testcase_id: bulkSelection?.ids
      })
    );
    updateLoadingState('bulkDeleteTestCaseCta', true);

    deleteTestCasesBulkAPI({
      projectId,
      folderId,
      bulkSelection,
      page: searchParams.get('p') === null ? 1 : searchParams.get('p')
    })
      .then(onBulkDeleteSuccess)
      .catch(() => {
        updateLoadingState('bulkDeleteTestCaseCta', false);
      });
  };

  const onSingleItemDeleteSucceess = (data) => {
    const folderData = data.data.folder;
    updateTCCount({
      casesObj: { [folderData.id]: folderData.cases_count }
    });
    updateLoadingState('deleteTestCaseCta', false);

    dispatch(
      logEventHelper('TM_TcDeletedNotification', {
        project_id: selectedTestCase?.project_id,
        testcase_id: selectedTestCase?.id
      })
    );

    dispatch(deleteTestCase([selectedTestCase.id]));
    if (lastPageLastEntry(metaPage?.count))
      redirectToPrevPage(searchParams, setSearchParams);
    else refreshAllTestCases();

    setMetaCount(metaPage.count - 1);
    hideDeleteTestCaseModal();
  };

  const singleItemDeleteHelper = () => {
    dispatch(
      logEventHelper('TM_DeleteCaseBtnClicked', {
        project_id: selectedTestCase.project_id,
        testcase_id: selectedTestCase?.id
      })
    );

    updateLoadingState('deleteTestCaseCta', true);
    deleteTestCaseAPI({
      projectId: selectedTestCase?.project_id,
      folderId: selectedTestCase?.test_case_folder_id,
      testCaseId: selectedTestCase.id
    })
      .then(onSingleItemDeleteSucceess)
      .catch(() => {
        updateLoadingState('deleteTestCaseCta', false);
      });
  };

  const deleteTestCaseHandler = () => {
    if (isBulkUpdate) {
      dispatch(
        logEventHelper(
          isSearchFilterView
            ? 'TM_DeleteAllCtaClickedSearchFilter'
            : 'TM_DeleteAllCtaClicked',
          {
            project_id: projectId,
            testcase_id: bulkSelection?.ids,
            folder_id_src: folderId
          }
        )
      );
      if (isSearchFilterView) bulkSearchDeleteHandler();
      else bulkDeleteHandler();
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
