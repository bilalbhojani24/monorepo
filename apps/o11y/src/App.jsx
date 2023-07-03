import React from 'react';
import { useSelector } from 'react-redux';
import ErrorBoundary from 'common/ErrorBoundary';
import GenericErrorPage from 'common/GenericErrorPage';
import VWO from 'common/scripts/VWO';
import { PORTAL_ID } from 'constants/common';
import { APP_ROUTES } from 'constants/routesConstants';
import { getHasInitFailed } from 'globalSlice/selectors';
import useAuthRoutes from 'hooks/useAuthRoutes';
import useInitO11y from 'hooks/useInitO11y';
import { getEnvConfig } from 'utils/common';
import { portalize } from 'utils/portalize';

const envConfig = getEnvConfig();

const App = () => {
  const hasInitFailed = useSelector(getHasInitFailed);
  const { initO11y } = useInitO11y();

  const getFallbackUrl = () =>
    `${envConfig.signInUrl}?redirect_url=${encodeURIComponent(
      window.location.href
    )}`;

  const Routes = useAuthRoutes(APP_ROUTES, initO11y, getFallbackUrl);

  return (
    <ErrorBoundary>
      {envConfig?.enableAnalytics && <VWO />}
      {Routes}
      {portalize(
        hasInitFailed,
        <div className="absolute">
          <GenericErrorPage />
        </div>,
        PORTAL_ID
      )}
    </ErrorBoundary>
  );
};

export default App;
