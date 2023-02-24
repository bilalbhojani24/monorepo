import { useEffect } from 'react';

import useAuthentication from './useAuthentication';

export default function useMainRoute() {
  const { authInit } = useAuthentication();

  useEffect(() => {
    authInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
}
