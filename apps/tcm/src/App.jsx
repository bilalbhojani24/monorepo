/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { NotificationsContainer } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/bifrost/utils/tailwindUtils';
import HeaderDummy from 'features/HeaderDummy';
import MainRoute from 'features/MainRoute';
import SideNav from 'features/SideNav';

import { getLatestQuickImportConfig } from './api/import.api';
import ImportStatus from './features/Projects/components/ImportStatus';

function App() {
  const [importConfig, setImportConfig] = useState({});
  const { dispatch } = useDispatch();
  const importStarted = useSelector((state) => state.import.importStarted);
  const currentImportStatus = useSelector(
    (state) => state.import.currentImportStatus
  );

  useEffect(() => {
    getLatestQuickImportConfig().then(
      ({ status, is_dismissed: isDismissed, import_id: importId }) => {
        setImportConfig({ status, isDismissed, importId });
      }
    );
  }, [importStarted, dispatch, currentImportStatus]);

  return (
    <BrowserRouter>
      <HeaderDummy />
      <div className="bg-base-50 flex h-screen items-stretch pt-16">
        {(importStarted || importConfig?.isDismissed === false) && (
          <div className="fixed top-16 z-50 w-full">
            <ImportStatus importConfig={importConfig} />
          </div>
        )}
        <div
          className={twClassNames('relative flex w-full items-stretch', {
            'mt-16': importConfig?.status === 'ongoing'
            // ||
            // currentImportStatus === 'ongoing'
          })}
        >
          <SideNav importStatus={importConfig?.status} />
          <MainRoute />
        </div>
      </div>
      <NotificationsContainer />
    </BrowserRouter>
  );
}

export default App;
