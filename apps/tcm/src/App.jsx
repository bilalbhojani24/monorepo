/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NotificationsContainer } from '@browserstack/bifrost';
import { initLogger, twClassNames } from '@browserstack/utils';
import setupInterceptors from 'api/_utils/interceptor';
import { TMHeader } from 'common/bifrostProxy';
import MainRoute from 'features/MainRoute';
import Notification from 'features/Notification';
import ImportStatusGlobal from 'features/quickImportFlow/components/ImportStatusGlobal';
import SideNav from 'features/SideNav';

if (window.initialized !== true) {
  window.initialized = false;
}

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.global.user);
  const importStatus = useSelector((state) => state.import.importStatus);

  setupInterceptors(navigate, dispatch);

  useMemo(() => {
    const keys = {
      amplitudeKey: '985eaa9c45d824a94344e64a2a3ca724',
      amplitudeConfig: {
        key: '985eaa9c45d824a94344e64a2a3ca724',
        userData: { user_id: userData?.id },
        groupData: { group_id: userData?.group_id }
      },
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
    if (window.initialized === false && userData?.id && userData?.group_id) {
      initLogger(keys);
      window.initialized = true;
    }
  }, [userData]);

  return (
    <>
      <TMHeader />
      <div className="bg-base-50 flex h-screen items-stretch pt-16">
        {/* Only if user is logged in proceed */}
        {!!userData && <ImportStatusGlobal />}
        <div
          className={twClassNames(
            'relative flex w-full items-stretch overflow-hidden',
            {
              'mt-16': importStatus === 'ongoing'
            }
          )}
        >
          {/* Only if user is logged in proceed */}
          {!!userData && <SideNav importStatus={importStatus} />}
          <MainRoute />
        </div>
      </div>
      <Notification />
      <NotificationsContainer />
    </>
  );
}

export default App;
