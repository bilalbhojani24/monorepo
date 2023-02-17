import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { getUsersOfProjectAPI } from 'api/projects.api';
import { getTagsAPI, getTestRunsAPI } from 'api/testruns.api';
import { setSelectedProject } from 'globalSlice';
import { selectMenuValueMapper } from 'utils/helperFunctions';

import { TABS_ARRAY } from '../const/immutableConst';
import {
  setAddTestRunForm,
  setAllTestRuns,
  setCurrentTab,
  setLoadedDataProjectId,
  setLoader,
  setMetaPage,
  setTagsArray,
  setUsers
} from '../slices/testRunsSlice';

const useTestRuns = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { projectId } = useParams();
  const currentPage = searchParams.get('p');

  const loadedDataProjectId = useSelector(
    (state) => state.testRuns.loadedDataProjectId
  );
  const allTestRuns = useSelector((state) => state.testRuns.allTestRuns);
  const currentTab = useSelector((state) => state.testRuns.currentTab);
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
    if (projectId) {
      dispatch(setSelectedProject(projectId));
      setTestRunsLoader(true);
      const isClosed = currentTab === TABS_ARRAY[1]?.name;
      getTestRunsAPI({ projectId, isClosed, page: currentPage }).then(
        (data) => {
          dispatch(setAllTestRuns(data?.test_runs || []));
          dispatch(setMetaPage(data?.info));
          setTestRunsLoader(false);
        }
      );
    } else dispatch(setAllTestRuns([]));
  };

  const handleTabChange = (tabName) => {
    dispatch(setCurrentTab(tabName.name));
  };

  const showTestRunAddFormHandler = () => {
    dispatch(setAddTestRunForm(true));
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
    fetchAllTestRuns
  };
};

export default useTestRuns;
