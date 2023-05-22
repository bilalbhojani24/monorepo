// import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getUsersOfProjectAPI } from 'api/projects.api';
import { getTagsAPI, getTestCasesAPI } from 'api/testcases.api';
import AppRoute from 'const/routes';
import { setSelectedProject } from 'globalSlice';
import { routeFormatter, selectMenuValueMapper } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { setCurrentTestManagementTool } from '../../quickImportFlow/slices/importSlice';
import {
  cleanUpValues,
  resetTestCaseDetails,
  setAddTestCaseVisibility,
  setFilterSearchView,
  setLoadedDataProjectId,
  setMetaPage,
  setTagsArray,
  setTestCaseDetails,
  setTestCaseFormData,
  setUsers,
  updateAllTestCases,
  updateCtaLoading,
  updateTestCasesListLoading
} from '../slices/repositorySlice';
import { formDataRetriever } from '../utils/sharedFunctions';

export default function useTestCases() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { projectId, folderId, testCaseId } = useParams();
  const dispatch = useDispatch();

  const metaPage = useSelector((state) => state.repository.metaPage);
  const isBulkUpdate = useSelector(
    (state) => state.repository.isBulkUpdateInit
  );
  const openedFolderModal = useSelector(
    (state) => state.repository.openedFolderModal
  );
  const noResultsText = useSelector(
    (state) => state.repository.searchEmptyText
  );
  const isSearchFilterView = useSelector(
    (state) => state.repository.isSearchFilterView
  );
  const testCaseDetailsIDs = useSelector(
    (state) => state.repository.testCaseDetails
  );
  const isAddTestCaseFromSearch = useSelector(
    (state) => state.repository.isAddTestCaseFromSearch
  );
  const loadedDataProjectId = useSelector(
    (state) => state.repository.loadedDataProjectId
  );
  const usersArray = useSelector((state) => state.repository.usersArray);
  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder
  );
  const isTestCasesLoading = useSelector(
    (state) => state.repository.isLoading.testCases
  );
  const isFoldersLoading = useSelector(
    (state) => state.repository.isLoading.folder
  );
  const allTestCases = useSelector((state) => state.repository.allTestCases);
  const allFolders = useSelector((state) => state.repository.allFolders);
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

  const setRepoView = (update) => {
    dispatch(setFilterSearchView(update));
  };

  const fetchUsers = () => {
    getUsersOfProjectAPI(projectId).then((data) => {
      dispatch(
        setUsers([
          { full_name: 'Myself', id: data.myself.id },
          ...data.users.filter((item) => item.id !== data.myself.id)
        ])
      );

      dispatch(setLoadedDataProjectId(projectId));

      // if (data?.myself?.id)
      //   dispatch(
      //     updateTestCaseFormData({ key: 'owner', value: data.myself.id }),
      //   );
    });
  };
  const fetchTags = () => {
    dispatch(updateCtaLoading({ key: 'tags', value: true }));
    getTagsAPI({ projectId }).then((data) => {
      const mappedTags = selectMenuValueMapper(data?.tags);
      dispatch(setTagsArray(mappedTags));

      if (selectedTestCase) {
        const formattedData = formDataRetriever(mappedTags, selectedTestCase);
        dispatch(setTestCaseFormData(formattedData));
      }
      dispatch(updateCtaLoading({ key: 'tags', value: false }));
      // handleTestCaseFieldChange('tags', mappedTags);
    });
  };

  const initFormValues = () => {
    if (loadedDataProjectId !== projectId) {
      fetchUsers();
      fetchTags();
    }
  };

  const fetchAllTestCases = () => {
    if (!isAddTestCaseFromSearch) dispatch(setAddTestCaseVisibility(false)); // if routed from search view and the user clicked Create Test Case CTA, do not reset
    if (projectId === 'new') {
      // dont load anything start from scratch
      dispatch(updateTestCasesListLoading(false));
    } else if (folderId) {
      dispatch(updateTestCasesListLoading(true));
      const page = searchParams.get('p');
      getTestCasesAPI({ projectId, folderId, page })
        .then((res) => {
          dispatch(updateAllTestCases(res?.test_cases || []));
          dispatch(setMetaPage(res.info));
          dispatch(updateTestCasesListLoading(false));
        })
        .catch((err) => {
          if (err.rejectAll) return;
          // if page error, reset p=1
          setSearchParams({});
          dispatch(updateTestCasesListLoading(false));
        });
    } else {
      dispatch(updateAllTestCases([]));
      dispatch(updateTestCasesListLoading(false));
    }
  };

  const detailsCloseHandler = (isSilentClose) => {
    dispatch(resetTestCaseDetails());
    if (!isSearchFilterView && !isSilentClose)
      navigate(
        `${routeFormatter(
          AppRoute.TEST_CASES,
          {
            projectId,
            folderId
          },
          true
        )}`,
        {
          replace: true
        }
      );
  };

  const initTestCaseDetails = () => {
    if (testCaseId && folderId) {
      dispatch(
        setTestCaseDetails({
          folderId,
          testCaseId
        })
      );
    }
  };

  const handleFilterPagination = ({ p }) => {
    const currentParams = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const entry of searchParams.entries()) {
      const [key, value] = entry;
      currentParams[key] = value;
    }

    setSearchParams({ ...currentParams, p: p || 1 });
  };

  const quickImportButtonClicked = () => {
    dispatch(
      logEventHelper('TM_QiBtnClickedEmptyFolder', {
        project_id: projectId,
        folder_id: folderId
      })
    );
    dispatch(setCurrentTestManagementTool(''));
  };

  const importCSVButtonClicked = () => {
    dispatch(
      logEventHelper('TM_ImportCsvBtnClickedEmptyFolder', {
        project_id: projectId
      })
    );
  };

  const cleanUpRepository = () => {
    dispatch(cleanUpValues());
  };

  useEffect(() => {
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    openedFolderModal,
    noResultsText,
    testCaseDetailsIDs,
    testCaseId,
    metaPage,
    allFolders,
    isBulkUpdate,
    isSearchFilterView,
    currentPage: searchParams.get('p'),
    searchKey: searchParams.get('q'),
    usersArray,
    selectedFolder,
    allTestCases,
    isAddTestCasePageVisible,
    folderId,
    projectId,
    isTestCaseViewVisible,
    showDeleteModal,
    selectedTestCase,
    isTestCasesLoading,
    isFoldersLoading,
    fetchAllTestCases,
    fetchUsers,
    initFormValues,
    setRepoView,
    detailsCloseHandler,
    initTestCaseDetails,
    handleFilterPagination,
    quickImportButtonClicked,
    importCSVButtonClicked,
    cleanUpRepository
  };
}
