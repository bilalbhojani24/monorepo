import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestTMAccessAPI } from 'api/common.api';
import { addNotificaton, setRequestAccessConfig } from 'globalSlice';

import { REQUEST_ACCESS_NOTIFICATION_CONFIG } from '../const/immutables';

const useRequestAccessModal = () => {
  const dispatch = useDispatch();
  const [requestLoader, setRequestLoader] = useState(false);
  const requestAccessConfig = useSelector(
    (state) => state.global.requestAccessConfig
  );
  const { isAdmin, userHasAccess, accessRequested } = requestAccessConfig;

  const handleRequestClick = () => {
    if (isAdmin) {
      window.open('https://www.browserstack.com/accounts/manage-users');
      return;
    }
    setRequestLoader(true);
    requestTMAccessAPI()
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

  const getButtonText = () => {
    if (isAdmin) return 'Manage Access';
    return accessRequested ? 'Request Sent' : 'Request Access';
  };

  return {
    isAdmin,
    userHasAccess,
    accessRequested,
    handleRequestClick,
    requestLoader,
    getButtonText
  };
};

export default useRequestAccessModal;
