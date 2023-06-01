import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { GETTING_STARTED_DOC_LINK } from 'constants/common';

const GettingStarted = () => {
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = () => {
    setIsLoading(false);
  };
  return (
    <div className="m-auto flex h-full w-full max-w-screen-xl flex-col overflow-hidden pt-0">
      <iframe
        className={twClassNames('w-full h-0 border-0 rounded', {
          'h-full border border-base-200 ': !isLoading
        })}
        title="getting-started"
        onLoad={onLoad}
        src={GETTING_STARTED_DOC_LINK}
      />
    </div>
  );
};

export default GettingStarted;
