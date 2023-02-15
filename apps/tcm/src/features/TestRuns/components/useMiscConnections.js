import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { closeTestRunAPI, deleteTestRunAPI } from 'api/testruns.api';

import { closeAllVisibleForms, deleteTestRun } from '../slices/testRunsSlice';

const useMiscConnections = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const selectedTestRun = useSelector(
    (state) => state.testRuns.selectedTestRun
  );
  const isDeleteModalVisible = useSelector(
    (state) => state.testRuns.isVisible.deleteTestRunModal
  );
  const isCloseTVisible = useSelector(
    (state) => state.testRuns.isVisible.closeRunTestRunModal
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

  return {
    isCloseTVisible,
    isDeleteModalVisible,
    closeAll,
    deleteTestRunHandler,
    closeTestRunHandler
  };
};

export default useMiscConnections;
