import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authUser } from 'api/auth.api';
import { AUTH_TOKEN_KEY } from 'const/immutables';
import AppRoute from 'const/routes';
import { setLoginURL, setUser } from 'globalSlice/globalSlice';
import Cookies from 'universal-cookie';

export default function useMainRoute() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  window.TCM = { logged_in: true };

  useEffect(() => {
    if (window.location.host === 'localhost:5173') {
      // mock for localhost
      if (localStorage.getItem('TCM_LOGGED_OUT') === 'true') {
        dispatch(setLoginURL('https://browserstack.com/'));
        cookies.remove(AUTH_TOKEN_KEY);
        navigate(AppRoute.LANDING);
      } else {
        cookies.set(AUTH_TOKEN_KEY, 'true');
        navigate(AppRoute.PROJECTS);
        dispatch(
          setUser({ full_name: 'Faker Name', email: 'fake2@example.com' }),
        );
      }
    } else {
      authUser()
        .then((data) => {
          if (data.response.data?.data?.logged_in) {
            cookies.set(AUTH_TOKEN_KEY, 'true');
            navigate(AppRoute.PROJECTS);
          }
          if (data.response.data?.data?.user) {
            dispatch(setUser(data.response.data.data.user));
          }
        })
        .catch((data) => {
          if (data.response?.data?.data?.login_url) {
            dispatch(setLoginURL(data.response.data.data.login_url));
            cookies.remove(AUTH_TOKEN_KEY);
            navigate(AppRoute.LANDING);
          }
        });
    }
  }, []);

  return {};
}
