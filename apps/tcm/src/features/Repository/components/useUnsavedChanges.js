import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setAddTestCaseFromSearch,
  setAddTestCaseVisibility,
  setBulkUpdateProgress,
  setEditTestCasePageVisibility,
  setRecentRquestedAfterUnsaved,
  setUnsavedDataExists,
  setUnsavedDataModal
} from '../slices/repositorySlice';

const useUnsavedChanges = () => {
  const modalFocusRef = useRef();
  const dispatch = useDispatch();
  const isUnsavedDataExists = useSelector(
    (state) => state.repository.isUnsavedDataExists
  );

  const isUnsavedDataModalVisible = useSelector(
    (state) => state.repository.isUnsavedDataModalVisible
  );
  const recentRequestedStep = useSelector(
    (state) => state.repository.recentRequestedAfterUnsaved
  );
  const setRecentRequestedStep = (value) => {
    dispatch(setRecentRquestedAfterUnsaved(value));
  };

  const hideUnsavedModal = () => {
    dispatch(setUnsavedDataModal(false));
  };

  const exitAndClearForm = () => {
    dispatch(setAddTestCaseVisibility(false));
    dispatch(setEditTestCasePageVisibility(false));
    dispatch(setBulkUpdateProgress(false));
    dispatch(setAddTestCaseFromSearch(false));
    dispatch(setUnsavedDataExists(false));
  };

  const clearUnsavedChangesHandler = () => {
    exitAndClearForm();
    recentRequestedStep.callBack?.();
    setRecentRequestedStep('');
    hideUnsavedModal();
  };

  const isOkToExitForm = (isForcedExit, requestedStep) => {
    if (isForcedExit) {
      exitAndClearForm();
      return true;
    }
    if (isUnsavedDataExists) {
      if (!isUnsavedDataModalVisible) dispatch(setUnsavedDataModal(true));
      setRecentRequestedStep(isUnsavedDataExists ? requestedStep : '');
    } else if (!requestedStep) {
      exitAndClearForm();
    }

    return !isUnsavedDataExists;
  };

  const unsavedFormConfirmation = (isForcedExit, callBack) => {
    // if ok to proceed rightaway call the function, else wait until complied, if not drop
    const isOk = isOkToExitForm(isForcedExit, {
      callBack
    });

    if (isOk) callBack();
  };

  return {
    modalFocusRef,
    isUnsavedDataModalVisible,
    hideUnsavedModal,
    clearUnsavedChangesHandler,
    isOkToExitForm,
    unsavedFormConfirmation
  };
};

export default useUnsavedChanges;
