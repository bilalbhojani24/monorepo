/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { NotificationsContainer } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { TMHeader } from 'common/bifrostProxy';
import MainRoute from 'features/MainRoute';
import Notification from 'features/Notification';
import ImportStatus from 'features/quickImportFlow/components/ImportStatus';
import SideNav from 'features/SideNav';

import {
  setImportConfigurations,
  setQuickImportStatus
} from './features/quickImportFlow/slices/importSlice';

function App() {
  const dispatch = useDispatch();
  const importId = useSelector((state) => state.import.importId);
  const importStarted = useSelector((state) => state.import.importStarted);
  const importStatus = useSelector((state) => state.import.importStatus);
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
    <BrowserRouter>
      <TMHeader />
      <div className="bg-base-50 flex h-screen items-stretch pt-16">
        {(importStarted ||
          isNotificationDismissed === false ||
          showNotificationModal) && (
          <div className="fixed top-16 z-10 w-full" id="import-status">
            <ImportStatus />
          </div>
        )}
        <div
          className={twClassNames(
            'relative flex w-full items-stretch overflow-hidden',
            {
              'mt-16': importStatus === 'ongoing'
            }
          )}
        >
          <SideNav importStatus={importStatus} />
          <MainRoute />
        </div>
      </div>
      <Notification />
      <NotificationsContainer />
    </BrowserRouter>
  );
}

export default App;
