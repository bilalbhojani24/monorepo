import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authUser } from 'api/auth.api';
import { AUTH_TOKEN_KEY } from 'const/immutables';
import AppRoute from 'const/routes';
import { setLoginURL, setUser } from 'globalSlice/globalSlice';
import Cookies from 'universal-cookie';

export default function useMainRoute() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.host === 'localhost:5173') {
      // mock for localhost
      if (localStorage.getItem('TCM_LOGGED_OUT') === 'true') {
        cookies.remove(AUTH_TOKEN_KEY);
        dispatch(setLoginURL('https://browserstack.com/'));
        navigate(AppRoute.LANDING);
      } else {
        cookies.set(AUTH_TOKEN_KEY, 'true');
        if (location.pathname === AppRoute.LANDING) navigate(AppRoute.ROOT);
        dispatch(
          setUser({ full_name: 'Faker Name', email: 'fake2@example.com' }),
        );
      }
    } else {
      authUser()
        .then((res) => {
          cookies.set(AUTH_TOKEN_KEY, 'true');
          if (location.pathname === AppRoute.LANDING) navigate(AppRoute.ROOT);
          if (res.data?.data?.user) {
            dispatch(setUser(res.data.data.user));
          }
        })
        .catch((res) => {
          if (res?.data?.data?.login_url) {
            dispatch(setLoginURL(res.data.data.login_url));
            cookies.remove(AUTH_TOKEN_KEY);
            navigate(AppRoute.LANDING);
          }
        });
    }
  }, []);

  return {};
}
