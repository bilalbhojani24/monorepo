import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { imageUploadRTEHandlerAPI } from 'api/attachments.api';
import {
  addTestRunAPI,
  editTestRunAPI,
  getTestRunDetailsAPI
} from 'api/testruns.api';
import { selectMenuValueMapper } from 'utils/helperFunctions';

import {
  addTestRun,
  setAddTestRunForm,
  setIssuesArray,
  setIsVisibleProps,
  setTagsArray,
  setTestRunFormData,
  setUnsavedDataExists,
  updateTestRun,
  updateTestRunFormData
} from '../slices/testRunsSlice';

const useAddEditTestRun = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [inputError, setInputError] = useState(false);
  const [selectedTCIDs, setSelectedTCIDs] = useState([]);
  const [usersArrayMapped, setUsersArray] = useState([]);

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

  const hideAddTestRunForm = () => {
    dispatch(setAddTestRunForm(false));
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
    const updatedAllIssues = selectMenuValueMapper([
      ...new Set([
        ...testRunFormData?.test_run?.issues.map((item) => item.value),
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

  const imageUploadRTEHelper = (files) =>
    imageUploadRTEHandlerAPI({ files, projectId });

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
        ? testRun.test_cases
        : formData.test_case_ids
    };
  };

  const createTestRunHandler = () => {
    if (!testRunFormData.test_run.name) {
      setInputError(true);
    } else if (isEditing) {
      editTestRunAPI({
        payload: formDataFormatter(testRunFormData),
        projectId,
        testRunId: selectedTestRun?.id
      }).then((data) => {
        dispatch(updateTestRun(data.data.testrun || []));
        hideAddTestRunForm();
      });
    } else {
      addTestRunAPI({
        payload: formDataFormatter(testRunFormData),
        projectId
      }).then((data) => {
        dispatch(addTestRun(data.data.testrun || []));
        hideAddTestRunForm();
      });
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

  useEffect(() => {
    if (projectId === loadedDataProjectId) {
      setUsersArray(
        usersArray.map((item) => ({ label: item.full_name, value: item.id }))
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
    if (isEditing && selectedTestRun?.id) {
      // fetch test run details
      dispatch(
        setTestRunFormData(
          formDataRetriever({
            test_run: selectedTestRun,
            test_case_ids: []
          })
        )
      );

      getTestRunDetailsAPI({ projectId, testRunId: selectedTestRun.id }).then(
        (data) => {
          dispatch(setTestRunFormData(formDataRetriever(data.data)));
        }
      );
      // WIP
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestRun]);

  return {
    isEditing,
    selectedTCIDs,
    projectId,
    isAddTestCaseModalShown,
    inputError,
    isAddTagModalShown,
    isAddIssuesModalShown,
    usersArrayMapped,
    testRunFormData,
    tagsArray,
    issuesArray,
    showTestCasesModal,
    handleTestRunInputFieldChange,
    imageUploadRTEHelper,
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
    onBreadcrumbClick
  };
};

export default useAddEditTestRun;
