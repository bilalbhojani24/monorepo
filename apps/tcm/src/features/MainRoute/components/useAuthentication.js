import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authUser } from 'api/auth.api';
import AppRoute from 'const/routes';
import {
  setRequestAccessConfig,
  setUser,
  setUserAndGroupConfig
} from 'globalSlice';

const useAuthentication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const successRedirectURL = (res) => {
    let redirectURL = null;

    if (location.pathname === AppRoute.NO_ACCESS) {
      // if in no access page hit, redirect to root page
      redirectURL = AppRoute.ROOT;
    }

    if (res.data.user?.onboarded === 0) {
      // to be onboarded user
      redirectURL = AppRoute.ONBOARDING;
    } else if (location.pathname === AppRoute.ONBOARDING) {
      // if already onboarded user
      // check if trying to accesss onboard page, if so redirect to ROOT
      redirectURL = AppRoute.ROOT;
    }

    return redirectURL;
  };

  const onAuthSuccessHandler = (res) => {
    if (res.data?.user) {
      dispatch(setUser(res.data.user));
      dispatch(
        setUserAndGroupConfig({
          tmUserId: res?.data?.user?.id,
          bsUserId: res?.data?.user?.browserstack_user_id,
          tmGroupId: res?.data?.group?.id,
          bsGroupId: res?.data?.group?.browserstack_group_id
        })
      );

      const url = successRedirectURL(res);
      if (url) navigate(url);
    }

    return true;
  };

  const onAuthFailureHandler = (res) => {
    if (res?.response?.status === 412) {
      // alpha no access error
      navigate(AppRoute.NO_ACCESS);
      return true;
    }
    if (res?.response?.status === 403) {
      dispatch(setRequestAccessConfig(res.response.data.data));
      navigate(AppRoute.REQUEST_ACCESS);
      return true;
    }

    return false;
  };

  const authInit = () =>
    authUser().then(onAuthSuccessHandler).catch(onAuthFailureHandler);

  return { authInit };
};

export default useAuthentication;
