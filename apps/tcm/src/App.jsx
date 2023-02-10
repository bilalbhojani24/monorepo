/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { NotificationsContainer } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/bifrost/utils/tailwindUtils';
import HeaderDummy from 'features/HeaderDummy';
import MainRoute from 'features/MainRoute';
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
      <HeaderDummy />
      <div className="bg-base-50 flex min-h-[calc(100vh-64px)] items-stretch pt-16">
        {(importStarted ||
          isNotificationDismissed === false ||
          showNotificationModal) && (
          <div className="fixed top-16 z-50 w-full">
            <ImportStatus />
          </div>
        )}
        <div
          className={twClassNames(
            'relative flex min-h-[calc(100vh-64px)] w-full items-stretch',
            {
              'mt-16': importStatus === 'ongoing'
            }
          )}
        >
          <SideNav importStatus={importStatus} />
          <MainRoute />
        </div>
      </div>
      <NotificationsContainer />
    </BrowserRouter>
  );
}

export default App;
