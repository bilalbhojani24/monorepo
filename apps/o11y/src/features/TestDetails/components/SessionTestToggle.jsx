import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { O11yButton } from 'common/bifrostProxy';

import { useLogsContext } from '../contexts/LogsContext';
import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';

const SessionTestToggle = () => {
  const { sessionTestToggle, handleSessionToggle } = useLogsContext();
  const { handleLogTDInteractionEvent } = useTestDetailsContentContext();

  const handleClickSessionTab = () => {
    if (!sessionTestToggle) {
      handleSessionToggle(true);
      handleLogTDInteractionEvent({
        event: 'O11yTestDetailsVideoInteracted',
        interaction: 'session_tab_clicked'
      });
    }
  };

  const handleClickTestTab = () => {
    if (sessionTestToggle) {
      handleSessionToggle(false);
      handleLogTDInteractionEvent({
        event: 'O11yTestDetailsVideoInteracted',
        interaction: 'tests_tab_clicked'
      });
    }
  };

  return (
    <div className="flex items-center">
      <O11yButton
        colors={sessionTestToggle ? 'brand' : 'white'}
        wrapperClassName={twClassNames(
          'rounded-r-none ring-0 focus:ring-0 active:ring-0 ring-offset-0 focus:ring-offset-0 active:ring-offset-0'
        )}
        onClick={handleClickSessionTab}
      >
        Session
      </O11yButton>
      <O11yButton
        colors={sessionTestToggle ? 'white' : 'brand'}
        wrapperClassName={twClassNames(
          'rounded-l-none ring-0 focus:ring-0 active:ring-0 ring-offset-0 focus:ring-offset-0 active:ring-offset-0'
        )}
        onClick={handleClickTestTab}
      >
        Test
      </O11yButton>
    </div>
  );
};

export default SessionTestToggle;
