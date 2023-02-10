import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestedSteps } from '../const/unsavedConst';
import {
  setUnsavedDataModal,
  setUnsavedDataExists,
  setAddTestCaseVisibility,
  setEditTestCasePageVisibility,
  setBulkUpdateProgress,
  setAddTestCaseFromSearch,
  setTestCaseFormData,
  setRecentRquestedAfterUnsaved
} from '../slices/repositorySlice';

const useUnsavedChanges = () => {
  const dispatch = useDispatch();
  const isUnsavedDataExists = useSelector(
    (state) => state.repository.isUnsavedDataExists
  );

  const isUnsavedDataModalVisible = useSelector(
    (state) => state.repository.isUnsavedDataModalVisible
  );
  const recentRequestedStep = useSelector(
    (state) => state.repository.recentRquestedAfterUnsaved
  );
  const setRecentRequestedStep = (value) => {
    dispatch(setRecentRquestedAfterUnsaved(value));
  };

  const hideUnsavedModal = () => {
    dispatch(setUnsavedDataModal(false));
  };

  const clearForm = () => {
    dispatch(setTestCaseFormData(null));
    dispatch(setUnsavedDataExists(false));
  };

  const exitAndClearForm = () => {
    dispatch(setAddTestCaseVisibility(false));
    dispatch(setEditTestCasePageVisibility(false));
    dispatch(setBulkUpdateProgress(false));
    dispatch(setAddTestCaseFromSearch(false));
    dispatch(setUnsavedDataExists(false));
  };

  const clearUnsavedChangesHandler = () => {
    debugger;
    switch (recentRequestedStep) {
      case requestedSteps.CREATE_TEST_CASE: //clear and reopen, nothing additional
        clearForm();
        break;
      default:
        exitAndClearForm();
        break;
    }
    setRecentRequestedStep();
    hideUnsavedModal();
  };

  const isOkToExitForm = (isForcedExit, requestedStep) => {
    debugger;
    if (isForcedExit) {
      exitAndClearForm();
      return true;
    } else {
      if (isUnsavedDataExists) {
        if (!isUnsavedDataModalVisible) dispatch(setUnsavedDataModal(true));
        setRecentRequestedStep(isUnsavedDataExists ? requestedStep : '');
      } else if (!requestedStep) {
        exitAndClearForm();
      }
    }

    return !isUnsavedDataExists;
  };

  return {
    isUnsavedDataModalVisible,
    hideUnsavedModal,
    clearUnsavedChangesHandler,
    isOkToExitForm
  };
};

export default useUnsavedChanges;
