import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { imageUploadRTEHandlerAPI } from 'api/attachments.api';
import { addTestRun, verifyTagAPI } from 'api/testruns.api';
import { routeFormatter, selectMenuValueMapper } from 'utils/helperFunctions';

import {
  setAddTestRunForm,
  setIssuesArray,
  setIsVisibleProps,
  setUnsavedDataExists,
  updateTestRunFormData
} from '../slices/testRunsSlice';

const useAddEditTestRun = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [inputError, setInputError] = useState(false);
  const [usersArrayMapped, setUsersArray] = useState([]);

  const isAddIssuesModalShown = useSelector(
    (state) => state.testRuns.isVisible.addIssuesModal
  );
  const isAddTagModalShown = useSelector(
    (state) => state.testRuns.isVisible.addTagsModal
  );
  const isUnsavedDataExists = useSelector(
    (state) => state.testRuns.isUnsavedDataExists
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

  const hideAddIssuesModal = () => {
    dispatch(setIsVisibleProps({ key: 'addIssuesModal', value: false }));
  };
  const hideAddTagsModal = () => {
    dispatch(setIsVisibleProps({ key: 'addTagsModal', value: false }));
  };
  const showAddIssuesModal = () => {
    dispatch(setIsVisibleProps({ key: 'addIssuesModal', value: true }));
  };
  const showAddTagsModal = () => {
    dispatch(setIsVisibleProps({ key: 'addTagsModal', value: true }));
  };

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

  const addIssuesSaveHelper = (newIssuesArray) => {
    hideAddIssuesModal();
    const updatedAllIssues = selectMenuValueMapper([
      ...new Set([...issuesArray.map((item) => item.value), ...newIssuesArray])
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

  const tagVerifierFunction = async (tags) => verifyTagAPI({ projectId, tags });

  const createTestRunHandler = () => {
    if (!testRunFormData.test_run.name) {
      setInputError(true);
    } else
      addTestRun({ payload: testRunFormData, projectId }).then((data) => {
        debugger;
      });
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

  return {
    inputError,
    isAddTagModalShown,
    isAddIssuesModalShown,
    usersArrayMapped,
    testRunFormData,
    tagsArray,
    issuesArray,
    handleTestRunInputFieldChange,
    imageUploadRTEHelper,
    showAddTagsModal,
    showAddIssuesModal,
    hideAddIssuesModal,
    hideAddTagsModal,
    tagVerifierFunction,
    addIssuesSaveHelper,
    createTestRunHandler
  };
};

export default useAddEditTestRun;
