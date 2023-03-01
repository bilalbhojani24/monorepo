import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { getUsersOfProjectAPI } from 'api/projects.api';
import { getTagsAPI, getTestRunsAPI } from 'api/testruns.api';
import { setSelectedProject } from 'globalSlice';
import { selectMenuValueMapper } from 'utils/helperFunctions';

import { TABS_ARRAY } from '../const/immutableConst';
import {
  setAddTestRunForm,
  setAllTestRuns,
  setEditTestRunForm,
  setLoadedDataProjectId,
  setLoader,
  setMetaPage,
  setTagsArray,
  setUsers
} from '../slices/testRunsSlice';

const useTestRuns = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { projectId } = useParams();
  const currentPage = searchParams.get('p');
  const currentTab =
    searchParams.get('closed') === 'true'
      ? TABS_ARRAY[1].name
      : TABS_ARRAY[0].name;

  const loadedDataProjectId = useSelector(
    (state) => state.testRuns.loadedDataProjectId
  );
  const allTestRuns = useSelector((state) => state.testRuns.allTestRuns);
  const isTestRunsLoading = useSelector(
    (state) => state.testRuns.isLoading.testRuns
  );

  const isAddTestRunsFormVisible = useSelector(
    (state) => state.testRuns.isVisible.addTestRunsForm
  );
  const isEditTestRunsFormVisible = useSelector(
    (state) => state.testRuns.isVisible.editTestRunsForm
  );

  const setTestRunsLoader = (value) => {
    dispatch(setLoader({ key: 'testRuns', value }));
  };

  const fetchAllTestRuns = () => {
    if (location?.state?.isFromEditing && !isTestRunsLoading) return; // is from editing then do not refresh

    if (projectId) {
      dispatch(setSelectedProject(projectId));

      if (projectId === 'new') {
        dispatch(setAllTestRuns([]));
        setTestRunsLoader(false);
      } else {
        setTestRunsLoader(true);
        const isClosed = currentTab === TABS_ARRAY[1]?.name;
        getTestRunsAPI({ projectId, isClosed, page: currentPage }).then(
          (data) => {
            dispatch(setAllTestRuns(data?.test_runs || []));
            dispatch(setMetaPage(data?.info));
            setTestRunsLoader(false);
          }
        );
      }
    } else dispatch(setAllTestRuns([]));
  };

  const handleTabChange = (tabName) => {
    // dispatch(setCurrentTab(tabName.name));
    const params = {};
    if (tabName?.id === TABS_ARRAY[1].id) params.closed = true;
    setSearchParams(params);
  };

  const showTestRunAddFormHandler = () => {
    dispatch(setAddTestRunForm(true));
  };
  const showTestRunEditForm = () => {
    dispatch(setEditTestRunForm(true));
  };

  const fetchTags = () => {
    getTagsAPI({ projectId }).then((data) => {
      const mappedTags = selectMenuValueMapper(data?.tags || []);
      dispatch(setTagsArray(mappedTags));
    });
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

  const initFormValues = () => {
    if (loadedDataProjectId !== projectId) {
      fetchUsers();
      fetchTags();
    }
  };

  return {
    currentPage,
    isEditTestRunsFormVisible,
    isTestRunsLoading,
    currentTab,
    allTestRuns,
    projectId,
    isAddTestRunsFormVisible,
    handleTabChange,
    showTestRunAddFormHandler,
    initFormValues,
    fetchAllTestRuns,
    showTestRunEditForm
  };
};

export default useTestRuns;
