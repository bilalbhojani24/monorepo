import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import setupInterceptors from 'api/_utils/interceptor';

import useAuthentication from './useAuthentication';
import useInitApp from './useInitApp';

export default function useMainRoute() {
  const navigate = useNavigate();
  const { authInit } = useAuthentication();
  const { initApp } = useInitApp();

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  useEffect(() => {
    authInit();
    initApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
}
