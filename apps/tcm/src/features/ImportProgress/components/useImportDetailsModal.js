import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logEventHelper } from 'utils/logEvent';

import { setCancelModal, setDetailsModal } from '../slices/importProgressSlice';

const useImportDetailsModal = () => {
  const dispatch = useDispatch();
  const importDetails = useSelector(
    (state) => state.importProgress.importDetails
  );

  const getCurrentlyImportingTitle = () => {
    if (importDetails?.percent === 100) return 'Currently Importing:';
    return `Currently Importing (${importDetails?.currentProjectNumber}/${importDetails?.totalProjects}):`;
  };

  const closeDetailsModal = () => {
    dispatch(setDetailsModal(false));
  };

  const cancelClickHandler = () => {
    dispatch(setCancelModal(true));
    dispatch(setDetailsModal(false));
    dispatch(logEventHelper('TM_QiProgressCancelImportLinkClicked', {}));
  };

  useEffect(() => {
    dispatch(logEventHelper('TM_QiProgressPopupLoaded', {}));
  }, [dispatch]);

  return {
    closeDetailsModal,
    cancelClickHandler,
    importDetails,
    getCurrentlyImportingTitle
  };
};

export default useImportDetailsModal;
