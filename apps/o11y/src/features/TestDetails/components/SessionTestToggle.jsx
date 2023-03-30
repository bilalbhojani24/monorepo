import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { O11yButton } from 'common/bifrostProxy';

import { useLogsContext } from '../contexts/LogsContext';

const SessionTestToggle = () => {
  const { sessionTestToggle, handleSessionToggle } = useLogsContext();
  return (
    <div className="flex items-center">
      <O11yButton
        colors={sessionTestToggle ? 'brand' : 'white'}
        wrapperClassName={twClassNames(
          'rounded-r-none ring-0 focus:ring-0 active:ring-0 ring-offset-0 focus:ring-offset-0 active:ring-offset-0'
        )}
        onClick={() => handleSessionToggle(true)}
      >
        Session
      </O11yButton>
      <O11yButton
        colors={sessionTestToggle ? 'white' : 'brand'}
        wrapperClassName={twClassNames(
          'rounded-l-none ring-0 focus:ring-0 active:ring-0 ring-offset-0 focus:ring-offset-0 active:ring-offset-0'
        )}
        onClick={() => handleSessionToggle(false)}
      >
        Test
      </O11yButton>
    </div>
  );
};

export default SessionTestToggle;
