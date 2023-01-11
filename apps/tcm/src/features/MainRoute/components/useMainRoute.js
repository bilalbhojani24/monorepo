import { useEffect } from 'react';

import useAuthentication from './useAuthentication';
import useInitApp from './useInitApp';

export default function useMainRoute() {
  const { authInit } = useAuthentication();
  const { initApp } = useInitApp();

  useEffect(() => {
    authInit();
    initApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
}
