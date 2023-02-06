import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { getUsersOfProjectAPI } from 'api/projects.api';
import { getTagsAPI, getTestCasesAPI } from 'api/testcases.api';
import { selectMenuValueMapper } from 'utils/helperFunctions';

import {
  setAddTestCaseVisibility,
  setBulkUpdateProgress,
  setEditTestCasePageVisibility,
  setLoadedDataProjectId,
  setMetaPage,
  setTagsArray,
  setUsers,
  updateAllTestCases,
  updateTestCasesListLoading
} from '../slices/repositorySlice';

export default function useTestCases() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterVisible, setFilter] = useState(false);
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();

  const isBulkUpdate = useSelector(
    (state) => state.repository.isBulkUpdateInit
  );
  const loadedDataProjectId = useSelector(
    (state) => state.repository.loadedDataProjectId
  );
  const usersArray = useSelector((state) => state.repository.usersArray);
  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder
  );
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

  const fetchUsers = () => {
    getUsersOfProjectAPI(projectId).then((data) => {
      debugger;
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
    getTagsAPI({ projectId }).then((data) => {
      const mappedTags = selectMenuValueMapper(data?.tags);
      dispatch(setTagsArray(mappedTags));
      // handleTestCaseFieldChange('tags', mappedTags);
    });
  };

  const initFormValues = () => {
    if (loadedDataProjectId !== projectId) {
      fetchUsers();
      fetchTags();
    }
  };
  const showTestCaseAdditionPage = () => {
    dispatch(setAddTestCaseVisibility(true));
  };

  const hideTestCaseAddEditPage = () => {
    dispatch(setAddTestCaseVisibility(false));
    dispatch(setEditTestCasePageVisibility(false));
    dispatch(setBulkUpdateProgress(false));
  };

  const fetchAllTestCases = () => {
    if (folderId) {
      dispatch(updateTestCasesListLoading(true));
      const page = searchParams.get('p');
      getTestCasesAPI({ projectId, folderId, page })
        .then((res) => {
          dispatch(updateAllTestCases(res?.test_cases || []));
          dispatch(setMetaPage(res.info));
          dispatch(updateTestCasesListLoading(false));
        })
        .catch(() => {
          // if page error, reset p=1
          setSearchParams({});
        });
    } else dispatch(updateAllTestCases([]));
  };

  return {
    isBulkUpdate,
    currentPage: searchParams.get('p'),
    usersArray,
    isFilterVisible,
    selectedFolder,
    showTestCaseAdditionPage,
    hideTestCaseAddEditPage,
    allTestCases,
    isAddTestCasePageVisible,
    folderId,
    projectId,
    isTestCaseViewVisible,
    showDeleteModal,
    selectedTestCase,
    isTestCasesLoading,
    setFilter,
    fetchAllTestCases,
    fetchUsers,
    initFormValues
  };
}
