import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { imageUploadRTEHandlerAPI } from 'api/attachments.api';
import { verifyTagAPI } from 'api/testruns.api';

import { setAddTestRunForm, setIsVisibleProps } from '../slices/testRunsSlice';

const useAddEditTestRun = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [usersArrayMapped, setUsersArray] = useState([]);

  const isAddIssuesModalShown = useSelector(
    (state) => state.testRuns.isVisible.addIssuesModal
  );
  const isAddTagModalShown = useSelector(
    (state) => state.testRuns.isVisible.addTagsModal
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

  const imageUploadRTEHelper = (files) =>
    imageUploadRTEHandlerAPI({ files, projectId });

  const tagVerifierFunction = async (tags) => verifyTagAPI({ projectId, tags });
  const handleTestRunInputFieldChange = () => {};

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
    tagVerifierFunction
  };
};

export default useAddEditTestRun;
