import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { notify } from '@browserstack/bifrost';
import { dismissNotificationAPI } from 'api/import.api';
import AppRoute from 'const/routes';
import { logEventHelper } from 'utils/logEvent';

import { IMPORT_STATUS } from '../const/immutables';
import {
  setNotificationConfig,
  setNotificationDismissed,
  setReportModal
} from '../slices/importProgressSlice';

const useProgressNotification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const timerRef = useRef();
  const notificationConfig = useSelector(
    (state) => state.importProgress.progressNotification
  );
  const importDetails = useSelector(
    (state) => state.importProgress.importDetails
  );
  const importId = useSelector((state) => state.import.importId);
  const importStatus = useSelector(
    (state) => state.importProgress.importStatus
  );
  const isNotificationDismissed = useSelector(
    (state) => state.importProgress.isNotificationDismissed
  );

  const removeNotification = useCallback(
    (toastDataId) => {
      notify.remove(toastDataId);
      if (importId) dismissNotificationAPI(importId);
      dispatch(setNotificationDismissed(true));
      dispatch(setNotificationConfig({ show: false }));
      clearTimeout(timerRef.current);
    },
    [importId, dispatch]
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
    if (
      (notificationConfig?.show === false ||
        location.pathname === AppRoute.ROOT) &&
      (importStatus === IMPORT_STATUS.SUCCESS ||
        importStatus === IMPORT_STATUS.FAILURE) &&
      !isNotificationDismissed // i.e. an import is completed
    ) {
      removeNotification(notificationConfig?.id);
    }

    if (notificationConfig?.show) {
      if (importStatus === IMPORT_STATUS.SUCCESS)
        dispatch(logEventHelper('TM_QiSuccessNotification', {}));
      if (importStatus === IMPORT_STATUS.FAILURE)
        dispatch(logEventHelper('TM_QiErrorNotification', {}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationConfig?.show, notificationConfig?.id, location.pathname]);

  return {
    notify,
    timerRef,
    importStatus,
    dispatch,
    notificationConfig,
    removeNotification,
    importDetails,
    handleFirstButtonClick,
    handleSecondButtonClick
  };
};

export default useProgressNotification;
