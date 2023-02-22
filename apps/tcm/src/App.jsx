/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationsContainer } from '@browserstack/bifrost';
import { useAuthRoutes } from '@browserstack/hooks';
import { twClassNames } from '@browserstack/utils';
import axios from 'axios';
import { TMHeader } from 'common/bifrostProxy';
// import MainRoute from 'features/MainRoute';
import ImportStatus from 'features/quickImportFlow/components/ImportStatus';
import SideNav from 'features/SideNav';

import { APP_ROUTES } from './const/routes';
import {
  setImportConfigurations,
  setQuickImportStatus
} from './features/quickImportFlow/slices/importSlice';

const initAPI = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, 2000);
  });

  // returns status code - 200 (uncomment and test)
  return axios.get(
    'https://run.mocky.io/v3/ae5ce0d2-cecc-4580-8bdb-a91cd9d8db94'
  );

  // returns status code - 401 (uncomment and test)
  // return axios.get(
  //   'https://run.mocky.io/v3/a1656866-98fe-49cd-9b97-1163c2866b48'
  // );
};

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

  // Auth Routes
  const Routes = useAuthRoutes(
    APP_ROUTES,
    initAPI,
    'https://www.browserstack.com/users/sign_in'
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
          {/* <MainRoute /> */}
        </div>
      </div>
      <NotificationsContainer />
      {Routes}
    </>
  );
}

export default App;
