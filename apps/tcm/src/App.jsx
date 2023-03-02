/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NotificationsContainer } from '@browserstack/bifrost';
import { initLogger, twClassNames } from '@browserstack/utils';
import setupInterceptors from 'api/_utils/interceptor';
import { TMHeader } from 'common/bifrostProxy';
import MainRoute from 'features/MainRoute';
import Notification from 'features/Notification';
import ImportStatus from 'features/quickImportFlow/components/ImportStatus';
import SideNav from 'features/SideNav';

import {
  setImportConfigurations,
  setQuickImportStatus
} from './features/quickImportFlow/slices/importSlice';

if (window.initialized !== true) {
  window.initialized = false;
}

function App() {
  const navigate = useNavigate();
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

  setupInterceptors(navigate, dispatch);

  useEffect(() => {
    dispatch(setImportConfigurations());
  }, [importStarted, dispatch]);

  useEffect(() => {
    if (isNotificationDismissed === false)
      dispatch(setQuickImportStatus(importId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isNotificationDismissed]);

  useMemo(() => {
    const keys = {
      amplitudeKey: '985eaa9c45d824a94344e64a2a3ca724',
      analyticsKey: 'UA-418548-19',
      EDSDetails: {
        userDetails: '12',
        config: {
          server: 'eds.browserstack.com',
          port: '443',
          api: '3T5kkUTZ2cGiy0zhLwyxBdDbx0GeJuZQd'
        }
      }
    };
    if (window.initialized === false) {
      initLogger(keys);
      window.initialized = true;
    }
  }, []);

  return (
    <>
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
    </>
  );
}

export default App;
