/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationsContainer } from '@browserstack/bifrost';
import {
  initLogger,
  setErrorLoggerUserContext,
  twClassNames
} from '@browserstack/utils';
import setupInterceptors from 'api/_utils/interceptor';
import { getLatestQuickImportConfigAPI } from 'api/import.api';
import { TMHeader } from 'common/bifrostProxy';
import FreshChatWidget from 'common/TMChatWidget';
import ProgressNotification from 'features/ImportProgress/components/ProgressNotification';
import ViewReportModal from 'features/ImportProgress/components/ViewReportModal';
import { IMPORT_STATUS } from 'features/ImportProgress/const/immutables';
import {
  setIsProgressDismissed,
  setNotificationDismissed,
  setTooltipDismissed
} from 'features/ImportProgress/slices/importProgressSlice';
import {
  parseImportDetails,
  setActualImportStatus
} from 'features/ImportProgress/slices/importProgressThunk';
import MainRoute from 'features/MainRoute';
import Notification from 'features/Notification';
import {
  setCurrentTestManagementTool,
  setImportId,
  setImportStarted
} from 'features/quickImportFlow/slices/importSlice';
import SideNav from 'features/SideNav';

import { PRODUCTION_HOST } from './const/immutables';
import { AMPLITUDE_KEY, ANALYTICS_KEY, EDS_KEY } from './const/keys';
import useWebSocketQI from './useWebSocketQI';

if (window.initialized !== true) {
  window.initialized = false;
}

function App() {
  const { connectWSQI } = useWebSocketQI();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = useSelector((state) => state.global.user);
  const userAndGroupConfig = useSelector(
    (state) => state.global.userAndGroupConfig
  );
  const importStarted = useSelector((state) => state.import.importStarted);

  setupInterceptors(navigate, dispatch);

  useMemo(() => {
    const keys = {
      amplitudeKey: AMPLITUDE_KEY,
      amplitudeConfig: {
        key: AMPLITUDE_KEY,
        userData: {
          user_id: userAndGroupConfig?.bsUserId,
          tm_user_id: userAndGroupConfig?.tmUserId,
          tm_group_id: userAndGroupConfig?.tmGroupId
        },
        groupData: {
          group_id: userAndGroupConfig?.bsGroupId
        }
      },
      analyticsKey: ANALYTICS_KEY,
      EDSDetails: {
        userDetails: {
          user_id: userAndGroupConfig?.bsUserId,
          tm_user_id: userAndGroupConfig?.tmUserId,
          tm_group_id: userAndGroupConfig?.tmGroupId
        },
        config: {
          server: 'eds.browserstack.com',
          port: '443',
          apiKey: EDS_KEY
        }
      }
    };
    if (
      window.initialized === false &&
      userAndGroupConfig?.bsUserId &&
      userAndGroupConfig?.tmUserId &&
      userAndGroupConfig?.bsGroupId &&
      userAndGroupConfig?.tmGroupId &&
      window.location.hostname === PRODUCTION_HOST
    ) {
      setErrorLoggerUserContext(userAndGroupConfig.bsUserId);
      initLogger(keys);
      window.initialized = true;
    }
  }, [userAndGroupConfig]);

  useEffect(() => {
    if (importStarted === null || importStarted) {
      // refresh or import is actually started
      getLatestQuickImportConfigAPI().then((data) => {
        dispatch(
          setCurrentTestManagementTool(data?.import_type?.split('_')[0] || null)
        );
        dispatch(setImportId(data?.import_id));
        dispatch(setIsProgressDismissed(data?.progress_banner_dismissed));
        dispatch(setNotificationDismissed(data?.notification_dismissed));
        dispatch(setTooltipDismissed(data?.quick_import_ftu));
        dispatch(setActualImportStatus(data));
        dispatch(parseImportDetails(data, location, true));
        if (data?.status === IMPORT_STATUS.ONGOING)
          connectWSQI({ importId: data?.import_id });

        dispatch(setImportStarted(false));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, importStarted]);

  return (
    <>
      <TMHeader />

      <div className="bg-base-50 flex h-screen items-stretch pt-16">
        {/* Only if user is logged in proceed */}
        <div
          className={twClassNames(
            'relative flex w-full items-stretch overflow-hidden'
          )}
        >
          {/* Only if user is logged in proceed */}
          {!!userData && <SideNav />}
          <MainRoute />
        </div>
      </div>
      <Notification />
      <ProgressNotification />
      <ViewReportModal />
      <FreshChatWidget />
      <NotificationsContainer />
    </>
  );
}

export default App;
