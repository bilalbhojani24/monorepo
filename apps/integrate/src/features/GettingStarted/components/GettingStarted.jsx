import React, { useState } from 'react';
// import { Loader } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';

const GettingStarted = () => {
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = () => {
    setIsLoading(false);
  };
  return (
    <div className="m-auto flex w-full max-w-screen-xl flex-col overflow-hidden p-12 pt-0">
      <iframe
        className={twClassNames('w-full h-0 border-0 rounded', {
          'h-full border border-base-200 ': !isLoading
        })}
        title="getting-started"
        onLoad={onLoad}
        src="https://www.browserstack.com/docs/test-observability/quick-start/mocha"
      />
    </div>
  );
};

export default GettingStarted;
