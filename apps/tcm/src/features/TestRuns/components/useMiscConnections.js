import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  assignTestRunAPI,
  closeTestRunAPI,
  deleteTestRunAPI
} from 'api/testruns.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import {
  closeAllVisibleForms,
  deleteTestRun,
  updateTestRun,
  updateTestRunsCtaLoading
} from '../slices/testRunsSlice';

const useMiscConnections = (prop) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const assignTestRunCtaLoading = useSelector(
    (state) => state.testRuns.isLoading.assignTestRunCta
  );
  const closeTestRunCtaLoading = useSelector(
    (state) => state.testRuns.isLoading.closeTestRunCta
  );
  const deleteTestRunCtaLoading = useSelector(
    (state) => state.testRuns.isLoading.deleteTestRunCta
  );

  const closeAll = () => {
    dispatch(closeAllVisibleForms());
  };

  const deleteTestRunHandler = () => {
    if (selectedTestRun?.id) {
      dispatch(
        updateTestRunsCtaLoading({ key: 'deleteTestRunCta', value: true })
      );
      dispatch(
        logEventHelper('TM_DeleteTrCtaClicked', {
          project_id: projectId,
          testrun_id: selectedTestRun?.id
        })
      );
      deleteTestRunAPI({ projectId, testRunId: selectedTestRun.id })
        .then(() => {
          dispatch(
            updateTestRunsCtaLoading({ key: 'deleteTestRunCta', value: false })
          );
          dispatch(
            logEventHelper('TM_TrDeletedNotification', {
              project_id: projectId,
              testrun_id: selectedTestRun?.id
            })
          );
          dispatch(deleteTestRun(selectedTestRun));
          if (prop?.redirectToDetails) {
            // move to test runs list page if in detaiils page
            navigate(routeFormatter(AppRoute.TEST_RUNS, { projectId }));
          }
          closeAll();
        })
        .catch(() => {
          dispatch(
            updateTestRunsCtaLoading({ key: 'deleteTestRunCta', value: false })
          );
        });
    }
  };

  const closeTestRunHandler = () => {
    if (selectedTestRun?.id) {
      dispatch(
        updateTestRunsCtaLoading({ key: 'closeTestRunCta', value: true })
      );
      dispatch(
        logEventHelper('TM_CloseTrCtaClicked', {
          project_id: projectId,
          testrun_id: selectedTestRun?.id
        })
      );
      closeTestRunAPI({ projectId, testRunId: selectedTestRun.id })
        .then(() => {
          dispatch(
            updateTestRunsCtaLoading({ key: 'closeTestRunCta', value: false })
          );
          dispatch(
            logEventHelper('TM_TrClosedNotification', {
              project_id: projectId,
              testrun_id: selectedTestRun?.id
            })
          );
          dispatch(deleteTestRun(selectedTestRun));
          closeAll();
          prop?.updateCb();
        })
        .catch(() => {
          dispatch(
            updateTestRunsCtaLoading({ key: 'closeTestRunCta', value: false })
          );
        });
    }
  };

  const assignTestRunHandler = () => {
    if (selectedTestRun?.id && selectedAssignee?.value) {
      dispatch(
        updateTestRunsCtaLoading({ key: 'assignTestRunCta', value: true })
      );
      assignTestRunAPI({
        projectId,
        testRunId: selectedTestRun.id,
        ownerId: selectedAssignee.value
      })
        .then(() => {
          dispatch(
            updateTestRunsCtaLoading({ key: 'assignTestRunCta', value: false })
          );
          dispatch(
            updateTestRun({
              ...selectedTestRun,
              assignee: {
                ...selectedAssignee,
                full_name: selectedAssignee.label
              }
            })
          );
          setAssignee(null);
          closeAll();
        })
        .catch(() => {
          dispatch(
            updateTestRunsCtaLoading({ key: 'assignTestRunCta', value: false })
          );
        });
    }
  };

  return {
    selectedTestRun,
    isAssignTestVisible,
    isCloseTRVisible,
    isDeleteModalVisible,
    selectedAssignee,
    assignTestRunCtaLoading,
    closeTestRunCtaLoading,
    deleteTestRunCtaLoading,
    setAssignee,
    closeAll,
    deleteTestRunHandler,
    closeTestRunHandler,
    assignTestRunHandler
  };
};

export default useMiscConnections;
