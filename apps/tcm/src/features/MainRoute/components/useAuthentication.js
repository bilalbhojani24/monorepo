import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authUser } from 'api/auth.api';
import AppRoute from 'const/routes';
import { setUser } from 'globalSlice';

const useAuthentication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onAuthSuccessHandler = (res) => {
    if (res.data?.user) {
      dispatch(setUser(res.data.user));

      if (res.data.user?.onboarded === 0) {
        // to be onboarded user
        navigate(AppRoute.ONBOARDING);
      } else if (location.pathname === AppRoute.ONBOARDING) {
        // if already onboarded user
        // check if trying to accesss onboard page, if so redirect to ROOT
        navigate(AppRoute.ROOT);
      }
    }

    return Promise.resolve(res);
  };

  const onAuthFailureHandler = (res) => {
    if (res?.response?.status === 412) {
      // alpha no access error
      navigate(AppRoute.NO_ACCESS);
    }

    return Promise.reject(res);
  };

  const authInit = () =>
    authUser().then(onAuthSuccessHandler).catch(onAuthFailureHandler);

  return { authInit };
};

export default useAuthentication;
