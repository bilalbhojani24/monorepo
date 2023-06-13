import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestTCMAccessAPI } from 'api/common.api';
import { addNotificaton, setRequestAccessConfig } from 'globalSlice';

import { REQUEST_ACCESS_NOTIFICATION_CONFIG } from '../const/immutables';

const useRequestAccessModal = () => {
  const dispatch = useDispatch();
  const [requestLoader, setRequestLoader] = useState(false);
  const requestAccessConfig = useSelector(
    (state) => state.global.requestAccessConfig
  );

  const handleRequestClick = () => {
    setRequestLoader(true);
    requestTCMAccessAPI()
      .then(() => {
        setRequestLoader(false);
        dispatch(addNotificaton(REQUEST_ACCESS_NOTIFICATION_CONFIG));
        dispatch(
          setRequestAccessConfig({
            is_admin: requestAccessConfig.isAdmin,
            tcm_access: requestAccessConfig.userHasAccess,
            is_access_requested: true
          })
        );
      })
      .catch(() => setRequestLoader(false));
  };

  const { isAdmin, userHasAccess, accessRequested } = requestAccessConfig;
  return {
    isAdmin,
    userHasAccess,
    accessRequested,
    handleRequestClick,
    requestLoader
  };
};

export default useRequestAccessModal;
