import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  assignTestRunAPI,
  closeTestRunAPI,
  deleteTestRunAPI
} from 'api/testruns.api';

import {
  closeAllVisibleForms,
  deleteTestRun,
  updateTestRun
} from '../slices/testRunsSlice';

const useMiscConnections = () => {
  const dispatch = useDispatch();
  const [selectedAssignee, setAssignee] = useState(null);
  const { projectId } = useParams();

  const selectedTestRun = useSelector(
    (state) => state.testRuns.selectedTestRun
  );
  const isDeleteModalVisible = useSelector(
    (state) => state.testRuns.isVisible.deleteTestRunModal
  );
  const isCloseTRVisible = useSelector(
    (state) => state.testRuns.isVisible.closeRunTestRunModal
  );
  const isAssignTestVisible = useSelector(
    (state) => state.testRuns.isVisible.assignTestRunModal
  );

  const closeAll = () => {
    dispatch(closeAllVisibleForms());
  };

  const deleteTestRunHandler = () => {
    if (selectedTestRun?.id) {
      deleteTestRunAPI({ projectId, testRunId: selectedTestRun.id }).then(
        () => {
          dispatch(deleteTestRun(selectedTestRun));
          closeAll();
        }
      );
    }
  };

  const closeTestRunHandler = () => {
    if (selectedTestRun?.id) {
      closeTestRunAPI({ projectId, testRunId: selectedTestRun.id }).then(() => {
        dispatch(deleteTestRun(selectedTestRun));
        closeAll();
      });
    }
  };

  const assignTestRunHandler = () => {
    if (selectedTestRun?.id && selectedAssignee?.value) {
      assignTestRunAPI({
        projectId,
        testRunId: selectedTestRun.id,
        ownerId: selectedAssignee.value
      }).then(() => {
        dispatch(
          updateTestRun({
            ...selectedTestRun,
            assignee: { ...selectedAssignee, full_name: selectedAssignee.label }
          })
        );
        setAssignee(null);
        closeAll();
      });
    }
  };

  return {
    selectedTestRun,
    isAssignTestVisible,
    isCloseTRVisible,
    isDeleteModalVisible,
    selectedAssignee,
    setAssignee,
    closeAll,
    deleteTestRunHandler,
    closeTestRunHandler,
    assignTestRunHandler
  };
};

export default useMiscConnections;
