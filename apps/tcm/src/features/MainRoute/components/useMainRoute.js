import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authUser } from 'api/auth.api';
import { AUTH_TOKEN_KEY } from 'const/immutables';
import AppRoute from 'const/routes';
import { setLoginURL, setUser } from 'globalSlice/globalSlice';

export default function useMainRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onSuccessHandler = (res) => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'true');
    if (location.pathname === AppRoute.LANDING) navigate(AppRoute.ROOT);
    if (res.data?.data?.user) {
      dispatch(setUser(res.data.data.user));
    }
  };

  const onFailureHandler = (res) => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    if (res?.data?.data?.login_url) {
      dispatch(setLoginURL(res.data.data.login_url));
      navigate(AppRoute.LANDING);
    }
  };

  useEffect(() => {
    if (window.location.host === 'localhost:5173') {
      // mock for localhost
      if (localStorage.getItem('TCM_LOGGED_OUT') === 'true') {
        onFailureHandler({
          data: {
            data: {
              login_url: 'https://browserstack.com/',
            },
          },
        });
      } else {
        onSuccessHandler({
          data: {
            data: { full_name: 'Faker Name', email: 'fake2@example.com' },
          },
        });
      }
    } else {
      authUser().then(onSuccessHandler).catch(onFailureHandler);
    }
  }, []);

  return {};
}
