import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setImportConfigurations,
  setQuickImportStatus
} from '../slices/importSlice';

import ImportStatus from './ImportStatus';

const ImportStatusGlobal = () => {
  const dispatch = useDispatch();
  const importId = useSelector((state) => state.import.importId);
  const importStarted = useSelector((state) => state.import.importStarted);
  const isNotificationDismissed = useSelector(
    (state) => state.import.isDismissed
  );
  const showNotificationModal = useSelector(
    (state) => state.import.showNotificationModal
  );

  useEffect(() => {
    dispatch(setImportConfigurations());
  }, [importStarted, dispatch]);

  useEffect(() => {
    if (isNotificationDismissed === false)
      dispatch(setQuickImportStatus(importId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isNotificationDismissed]);

  return (
    <>
      {(importStarted ||
        isNotificationDismissed === false ||
        showNotificationModal) && (
        <div className="fixed top-16 z-10 w-full" id="import-status">
          <ImportStatus />
        </div>
      )}
    </>
  );
};

export default ImportStatusGlobal;
