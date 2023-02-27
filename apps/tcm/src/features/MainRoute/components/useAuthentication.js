import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authUser } from 'api/auth.api';
import { AUTH_TOKEN_KEY } from 'const/immutables';
import AppRoute from 'const/routes';
import { setUser } from 'globalSlice';

import { setTestRailsCred } from '../../quickImportFlow/slices/importSlice';

const useAuthentication = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAuthSuccessHandler = (res) => {
    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(res?.data?.user));
    if (res?.data?.user) {
      dispatch(setUser(res.data.user));
      dispatch(setTestRailsCred({ key: 'email', value: res.data.user?.email }));
    }
    // on redirection after login, location.pathname tanks! hence using window.location.pathname
    if (window.location.pathname === AppRoute.LANDING) navigate(AppRoute.ROOT);
  };

  const onAuthFailureHandler = (res) => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    if (res?.response?.data?.data?.login_url) {
      window.location.href = res.response.data.data.login_url;
      // hard redirect
      // dispatch(setLoginURL(res.response.data.data.login_url));
    }
    // navigate(AppRoute.LANDING);
  };

  const authInit = () => {
    const bypassHosts = ['localhost:5173', '127.0.0.1:5500'];
    if (
      bypassHosts.includes(window.location.host) ||
      window.location.host.includes('.in.ngrok.io')
    ) {
      // mock for localhost
      if (localStorage.getItem('TCM_LOGGED_OUT') === 'true') {
        onAuthFailureHandler({
          response: {
            data: {
              data: {
                login_url: 'https://browserstack.com/'
              }
            }
          }
        });
      } else {
        onAuthSuccessHandler({
          data: {
            user: {
              full_name: 'Ribin Roy',
              email: 'fake2@example.com',
              onboarded: 1
            }
          }
        });
      }
    } else {
      authUser().then(onAuthSuccessHandler).catch(onAuthFailureHandler);
    }
  };

  return { authInit };
};

export default useAuthentication;
