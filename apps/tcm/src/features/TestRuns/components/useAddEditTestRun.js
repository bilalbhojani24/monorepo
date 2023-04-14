import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import {
  addTestRunAPI,
  addTestRunWithoutProjectAPI,
  editTestRunAPI,
  getTestRunDetailsAPI
} from 'api/testruns.api';
import AppRoute from 'const/routes';
import { addGlobalProject, addNotificaton } from 'globalSlice';
import { routeFormatter, selectMenuValueMapper } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import {
  addTestRun,
  setAddTestRunForm,
  setEditTestRunForm,
  setIssuesArray,
  setIsVisibleProps,
  setTagsArray,
  setTestRunFormData,
  setUnsavedDataExists,
  updateTestRun,
  updateTestRunFormData,
  updateTestRunsCtaLoading
} from '../slices/testRunsSlice';

const useAddEditTestRun = () => {
  const [searchParams] = useSearchParams();
  const { projectId, testRunId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputError, setInputError] = useState(false);
  const [selectedTCIDs, setSelectedTCIDs] = useState([]);
  const [usersArrayMapped, setUsersArray] = useState([]);
  const userData = useSelector((state) => state.global.user);
  const updatedMySelfLabelName = `Myself (${userData?.full_name})`;

  const isEditing = useSelector(
    (state) => state.testRuns.isVisible.editTestRunsForm
  );
  const isAddIssuesModalShown = useSelector(
    (state) => state.testRuns.isVisible.addIssuesModal
  );
  const isAddTagModalShown = useSelector(
    (state) => state.testRuns.isVisible.addTagsModal
  );
  const isAddTestCaseModalShown = useSelector(
    (state) => state.testRuns.isVisible.addTestCaseModal
  );
  const isUnsavedDataExists = useSelector(
    (state) => state.testRuns.isUnsavedDataExists
  );
  const selectedTestRun = useSelector(
    (state) => state.testRuns.selectedTestRun
  );
  const tagsArray = useSelector((state) => state.testRuns.tagsArray);
  const usersArray = useSelector((state) => state.testRuns.usersArray);
  const issuesArray = useSelector((state) => state.testRuns.issuesArray);
  const loadedDataProjectId = useSelector(
    (state) => state.testRuns.loadedDataProjectId
  );
  const testRunFormData = useSelector(
    (state) => state.testRuns.testRunFormData
  );
  const createTestRunsCtaLoading = useSelector(
    (state) => state.testRuns.isLoading.createTestRunCta
  );
  const editTestRunsCtaLoading = useSelector(
    (state) => state.testRuns.isLoading.editTestRunCta
  );
  const isTestRunsFormLoading = useSelector(
    (state) => state.testRuns.isLoading.testRunFormData
  );

  const handleTestRunInputFieldChange = (key, value) => {
    if (!isUnsavedDataExists) dispatch(setUnsavedDataExists(true));

    if (key === 'name' && value) setInputError(false);
    if (key === 'test_case_ids')
      dispatch(updateTestRunFormData({ key, value }));
    else
      dispatch(
        updateTestRunFormData({ key: 'test_run', innerKey: key, value })
      );
  };

  const cleanupActivities = () => {
    // this will reset everything in the slice
    dispatch(setAddTestRunForm(false));
  };

  const hideAddTestRunForm = (goBack, action) => {
    if (isEditing || goBack) {
      navigate(
        routeFormatter(
          location?.state?.isFromTRDetails
            ? AppRoute.TEST_RUN_DETAILS
            : AppRoute.TEST_RUNS,
          {
            projectId,
            testRunId: testRunFormData?.test_run?.id
          }
        ),
        { state: { isFromEditing: true } }
      );
    } else {
      if (action === 'Cancel')
        dispatch(
          logEventHelper('TM_CreateTrCancelCtaClicked', {
            project_id: projectId
          })
        );
      dispatch(setAddTestRunForm(false));
    }
  };

  const hideAddIssuesModal = () => {
    dispatch(setIsVisibleProps({ key: 'addIssuesModal', value: false }));
  };
  const hideTestCasesModal = () => {
    dispatch(setIsVisibleProps({ key: 'addTestCaseModal', value: false }));
  };
  const showAddIssuesModal = () => {
    dispatch(setIsVisibleProps({ key: 'addIssuesModal', value: true }));
  };
  const showTestCasesModal = () => {
    dispatch(setIsVisibleProps({ key: 'addTestCaseModal', value: true }));
  };
  const showAddTagsModal = () => {
    dispatch(setIsVisibleProps({ key: 'addTagsModal', value: true }));
  };

  const hideAddTagsModal = (newTags, selectedTags) => {
    const updatedAllTags = selectMenuValueMapper([
      ...new Set([...newTags, ...tagsArray.map((item) => item.value)])
    ]);
    const currentSelectedTags = selectedTags;

    dispatch(setTagsArray(updatedAllTags));
    handleTestRunInputFieldChange(
      'tags',
      updatedAllTags.filter((element) =>
        currentSelectedTags.includes(element.value)
      )
    );
    dispatch(setIsVisibleProps({ key: 'addTagsModal', value: false }));
  };

  const addIssuesSaveHelper = (newIssuesArray) => {
    hideAddIssuesModal();
    const existingIssues = testRunFormData?.test_run?.issues
      ? testRunFormData.test_run.issues.map((item) => item.value)
      : [];
    const updatedAllIssues = selectMenuValueMapper([
      ...new Set([
        ...existingIssues,
        ...issuesArray.map((item) => item.value),
        ...newIssuesArray
      ])
    ]);
    const selectedIssues = testRunFormData?.test_run?.issues
      ? [
          ...new Set([
            ...newIssuesArray,
            ...testRunFormData?.test_run?.issues?.map((item) => item.value)
          ])
        ]
      : newIssuesArray;
    const combinedIssues = updatedAllIssues.filter((item) =>
      selectedIssues.includes(item.value)
    );

    dispatch(setIssuesArray(updatedAllIssues));
    handleTestRunInputFieldChange('issues', combinedIssues);
  };

  // const tagVerifierFunction = async (tags) => verifyTagAPI({ projectId, tags });

  const formDataFormatter = (formData) => {
    const testRun = {
      ...formData.test_run
    };

    if (formData.test_run.tags)
      testRun.tags = formData.test_run.tags?.map((item) => item.value);
    if (formData.test_run.issues)
      testRun.issues = formData?.test_run.issues?.map((item) => item.value);

    return {
      test_run: testRun,
      test_case_ids: formData.test_case_ids
    };
  };

  const formDataRetriever = (formData) => {
    const testRun = { ...formData.test_run };
    testRun.tags = tagsArray.filter((item) =>
      testRun.tags.includes(item.value)
    );
    testRun.owner = parseInt(testRun.owner, 10);
    testRun.issues = selectMenuValueMapper(
      testRun?.issues?.map((item) => item.jira_id)
    );

    // update the issues array with data from this one as well
    if (testRun?.issues)
      dispatch(
        setIssuesArray([
          ...new Set([
            ...testRun.issues,
            ...issuesArray.map((item) => item.value)
          ])
        ])
      );

    return {
      test_run: testRun,
      test_case_ids: testRun?.test_cases
        ? testRun?.all_test_cases?.map((item) => item.id) || []
        : formData.test_case_ids
    };
  };

  const saveEditingForm = () => {
    dispatch(
      logEventHelper('TM_UpdateTrCtaClicked', {
        project_id: projectId,
        testrun_id: testRunFormData?.test_run?.id
      })
    );
    dispatch(updateTestRunsCtaLoading({ key: 'editTestRunCta', value: true }));
    editTestRunAPI({
      payload: formDataFormatter(testRunFormData),
      projectId,
      testRunId: testRunFormData?.test_run?.id
    })
      .then((data) => {
        dispatch(
          updateTestRunsCtaLoading({ key: 'editTestRunCta', value: false })
        );
        dispatch(
          logEventHelper('TM_TrUpdatedNotification', {
            project_id: projectId,
            testrun_id: testRunFormData?.test_run?.id
          })
        );
        dispatch(updateTestRun(data.data.testrun || []));
        hideAddTestRunForm();
      })
      .catch(() => {
        dispatch(
          updateTestRunsCtaLoading({ key: 'editTestRunCta', value: false })
        );
      });
  };

  const saveNewTestRun = () => {
    dispatch(
      logEventHelper('TM_CreateTrCtaClicked', {
        project_id: projectId
      })
    );
    const addtestRunAPIFunction =
      projectId === 'new' ? addTestRunWithoutProjectAPI : addTestRunAPI;
    dispatch(
      updateTestRunsCtaLoading({ key: 'createTestRunCta', value: true })
    );
    addtestRunAPIFunction({
      payload: formDataFormatter(testRunFormData),
      projectId
    })
      .then((data) => {
        dispatch(
          updateTestRunsCtaLoading({ key: 'createTestRunCta', value: false })
        );
        const isInClosedTab = !!searchParams.get('closed');
        if (
          (isInClosedTab && data.data.testrun.run_state === 'closed') ||
          (!isInClosedTab && data.data.testrun.run_state !== 'closed')
        ) {
          // dont append if status is closed and not in closed tab
          // dont append if in active tab and status is closed
          dispatch(addTestRun(data.data.testrun || []));
        }
        dispatch(
          logEventHelper('TM_TrCreatedNotification', {
            project_id: projectId,
            testrun_id: data.data.testrun?.id
          })
        );
        dispatch(
          addNotificaton({
            id: `test_run_added${data.data.testrun?.id}`,
            title: `${data.data.testrun?.identifier} : Test run created`,
            variant: 'success'
          })
        );

        if (projectId === 'new') {
          dispatch(addGlobalProject(data.data.project));
          navigate(
            `${routeFormatter(AppRoute.TEST_RUNS, {
              projectId: data.data.testrun?.project_id
            })}`
          );
        }

        hideAddTestRunForm();
      })
      .catch(() => {
        dispatch(
          updateTestRunsCtaLoading({ key: 'createTestRunCta', value: false })
        );
      });
  };

  const createTestRunHandler = () => {
    if (!testRunFormData.test_run.name.trim()) {
      setInputError(true);
      dispatch(
        updateTestRunFormData({ key: 'test_run', innerKey: 'name', value: '' })
      );
    } else if (isEditing) {
      saveEditingForm();
    } else {
      saveNewTestRun();
    }
  };

  const selectTestCasesConfirm = () => {
    handleTestRunInputFieldChange('test_case_ids', selectedTCIDs);
    hideTestCasesModal();
  };

  const onItemSelectionHandler = (selectedItems) => {
    setSelectedTCIDs(selectedItems);
  };

  const onBreadcrumbClick = (a, clickedLink) => {
    if (clickedLink?.isHome) {
      hideAddTestRunForm();
    }
  };

  const fetchTestRunDetails = (testRunID) => {
    getTestRunDetailsAPI({ projectId, testRunId: testRunID }).then((data) => {
      if (data.data.test_run.run_state === 'closed') {
        // if trying to edit the closed test run go back
        hideAddTestRunForm(true);
      }
      dispatch(setTestRunFormData(formDataRetriever(data.data)));
      dispatch(
        updateTestRunsCtaLoading({ key: 'testRunFormData', value: false })
      );
    });
  };

  const initTestRunFormData = () => {
    dispatch(setEditTestRunForm(true));
    if (testRunId) fetchTestRunDetails(testRunId);
  };

  const handleMenuOpen = (key, isMenuOpened) => {
    if (key === 'tags' && !tagsArray.length && isMenuOpened) showAddTagsModal();
    else if (key === 'issues' && !issuesArray.length && isMenuOpened)
      showAddIssuesModal();
  };

  useEffect(() => {
    if (projectId === loadedDataProjectId) {
      setUsersArray(
        usersArray.map((item) => {
          if (item.full_name === 'Myself') {
            return {
              label: updatedMySelfLabelName,
              value: item.id
            };
          }
          return { label: item.full_name, value: item.id };
        })
      );
    } else {
      setUsersArray([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, usersArray]);

  useEffect(() => {
    setSelectedTCIDs(testRunFormData?.test_case_ids || []);
  }, [testRunFormData?.test_case_ids]);

  useEffect(() => {
    if (!isEditing)
      dispatch(
        updateTestRunFormData({
          key: 'test_run',
          innerKey: 'owner',
          value: userData?.id
        })
      );
  }, [isEditing, userData, dispatch]);

  useEffect(() => {
    if (isEditing && selectedTestRun?.id) {
      dispatch(
        setTestRunFormData(
          formDataRetriever({
            test_run: selectedTestRun,
            test_case_ids: []
          })
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, selectedTestRun]);

  return {
    isTestRunsFormLoading,
    isEditing,
    selectedTCIDs,
    projectId,
    isAddTestCaseModalShown,
    inputError,
    isAddTagModalShown,
    isAddIssuesModalShown,
    usersArrayMapped,
    updatedMySelfLabelName,
    testRunFormData,
    tagsArray,
    issuesArray,
    createTestRunsCtaLoading,
    editTestRunsCtaLoading,
    handleMenuOpen,
    showTestCasesModal,
    handleTestRunInputFieldChange,
    showAddTagsModal,
    showAddIssuesModal,
    hideAddIssuesModal,
    hideAddTagsModal,
    // tagVerifierFunction,
    addIssuesSaveHelper,
    createTestRunHandler,
    hideTestCasesModal,
    onItemSelectionHandler,
    selectTestCasesConfirm,
    hideAddTestRunForm,
    onBreadcrumbClick,
    initTestRunFormData,
    cleanupActivities
  };
};

export default useAddEditTestRun;
