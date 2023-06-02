import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import {
  BSTACK_DEVINT,
  BSTACK_PROD,
  GETTING_STARTED_DOC_LINK
} from 'constants/common';
import { getEnvConfig } from 'utils/getEnvConfig';

const GettingStarted = () => {
  const [isLoading, setIsLoading] = useState(true);
  const envConfig = getEnvConfig();
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
    </div>
  );
};

export default GettingStarted;
