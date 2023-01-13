import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authUser } from 'api/auth.api';
import { AUTH_TOKEN_KEY } from 'const/immutables';
import AppRoute from 'const/routes';
import { setLoginURL, setUser } from 'slices/index';

const useAuthentication = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAuthSuccessHandler = (res) => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'true');
    if (res.data?.data?.user) {
      dispatch(setUser(res.data.data.user));
    }
    // on redirection after login, location.pathname tanks! hence using window.location.pathname
    if (window.location.pathname === AppRoute.LANDING) navigate(AppRoute.ROOT);
  };

  const onAuthFailureHandler = (res) => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    if (res?.response?.data?.data?.login_url) {
      dispatch(setLoginURL(res.response.data.data.login_url));
    }
    navigate(AppRoute.LANDING);
  };

  const authInit = () => {
    if (window.location.host === 'localhost:5173') {
      // mock for localhost
      if (localStorage.getItem('TCM_LOGGED_OUT') === 'true') {
        onAuthFailureHandler({
          response: {
            data: {
              data: {
                login_url: 'https://browserstack.com/',
              },
            },
          },
        });
      } else {
        onAuthSuccessHandler({
          data: {
            data: { full_name: 'Faker Name', email: 'fake2@example.com' },
          },
        });
      }
    } else {
      authUser().then(onAuthSuccessHandler).catch(onAuthFailureHandler);
    }
  };

  return { authInit };
};

export default useAuthentication;
