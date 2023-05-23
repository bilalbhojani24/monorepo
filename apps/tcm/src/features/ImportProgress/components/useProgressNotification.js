import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notify } from '@browserstack/bifrost';
import AppRoute from 'const/routes';

import { dismissNotification } from '../../../api/import.api';
import { setReportModal } from '../slices/importProgressSlice';

const useProgressNotification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notificationConfig = useSelector(
    (state) => state.importProgress.progressNotification
  );
  const importDetails = useSelector(
    (state) => state.importProgress.importDetails
  );
  const importId = useSelector((state) => state.import.importId);

  const removeNotification = useCallback(
    (toastDataId) => {
      notify.remove(toastDataId);
      dismissNotification(importId);
    },
    [importId]
  );

  const handleFirstButtonClick = (toastDataId) => {
    removeNotification(toastDataId);
    dispatch(setReportModal(true));
  };

  const handleSecondButtonClick = (toastDataId) => {
    removeNotification(toastDataId);
    navigate(AppRoute.ROOT);
  };

  useEffect(() => {
    if (notificationConfig?.show === false)
      removeNotification(notificationConfig?.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationConfig?.show, notificationConfig?.id]);

  return {
    notify,
    dispatch,
    notificationConfig,
    removeNotification,
    importDetails,
    handleFirstButtonClick,
    handleSecondButtonClick
  };
};

export default useProgressNotification;
