import React, { useCallback, useEffect, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { INTGLoader } from 'common/index';
import {
  BSTACK_DEVINT,
  BSTACK_PROD,
  GETTING_STARTED_DOC_LINK,
  URL_REGEX
} from 'constants/common';
import { getEnvConfig } from 'utils/getEnvConfig';

const getDomainName = (hostName) =>
  hostName.substring(
    hostName.lastIndexOf('.', hostName.lastIndexOf('.') - 1) + 1
  );
const allowedOrigin = (origin) => {
  if (!origin) return {};
  const domainName = getDomainName(origin);
  return !!(domainName === 'browserstack.com' || domainName === 'bsstag.com');
};

const GettingStarted = () => {
  const [isLoading, setIsLoading] = useState(true);
  const envConfig = getEnvConfig();

  const handleFrameTasks = useCallback((message) => {
    if (!message?.data) return;
    // Adding check for allowing messages only from browserstack domain
    if (!allowedOrigin(message?.origin)) return;
    const { type, payload } = message.data;
    if (type === 'update_route') {
      const isValidURL = URL_REGEX.test(payload.url);
      const sanitizedPayloadUrl = isValidURL ? payload.url : '';
      if (!sanitizedPayloadUrl) return;
      window.open(payload.url, payload.blank ? '_blank' : '_self');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleFrameTasks);
    return () => window.removeEventListener('message', handleFrameTasks);
  }, [handleFrameTasks]);

  const getDocLink = () =>
    `${
      envConfig.env === 'production' ? BSTACK_PROD : BSTACK_DEVINT
    }${GETTING_STARTED_DOC_LINK}`;

  const onLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="h-full w-full overflow-hidden pt-0">
      <iframe
        className={twClassNames('w-full h-0 border-0 rounded', {
          'h-full border border-base-200 ': !isLoading
        })}
        title="getting-started"
        onLoad={onLoad}
        src={getDocLink()}
      />

      {isLoading && <INTGLoader wrapperClassName="h-full" />}
    </div>
  );
};

export default GettingStarted;
