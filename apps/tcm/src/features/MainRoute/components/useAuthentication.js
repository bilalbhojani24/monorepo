import { useDispatch } from 'react-redux';
import { authUser } from 'api/auth.api';
import { setUser } from 'globalSlice';

const useAuthentication = () => {
  const dispatch = useDispatch();

  const onAuthSuccessHandler = (res) => {
    if (res.data?.user) {
      dispatch(setUser(res.data.user));

      return Promise.resolve(res);
    }
  };

  const onAuthFailureHandler = (res) => Promise.reject(res);

  const authInit = () =>
    authUser().then(onAuthSuccessHandler).catch(onAuthFailureHandler);

  return { authInit };
};

export default useAuthentication;
