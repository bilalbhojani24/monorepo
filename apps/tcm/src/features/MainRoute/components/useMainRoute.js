import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import setupInterceptors from 'api/_utils/interceptor';

export default function useMainRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  return {};
}
