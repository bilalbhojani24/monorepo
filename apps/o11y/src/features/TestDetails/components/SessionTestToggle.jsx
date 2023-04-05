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
        colors="white"
        wrapperClassName={twClassNames(
          `border border-base-300 rounded-none rounded-l-md border-r-0 
                focus:ring-offset-0 focus:border-r peer/session focus:z-10 focus:ring-1 
                ring-brand-500 text-sm font-medium text-base-700`,
          {
            'border-brand-500 ring-1 z-10 border-r': sessionTestToggle
          }
        )}
        onClick={handleClickSessionTab}
      >
        Session
      </O11yButton>
      <O11yButton
        colors="white"
        wrapperClassName={twClassNames(
          `peer-focus/session:border-l-0 focus:z-10 focus:ring-1 ring-brand-500 
                  border border-base-300 rounded-none first:rounded-l-md last:rounded-r-md focus:ring-offset-0 
                  text-sm font-medium text-base-700`,
          {
            'border-brand-500 ring-1 z-10': !sessionTestToggle,
            'border-l-0': sessionTestToggle
          }
        )}
        onClick={handleClickTestTab}
      >
        Test
      </O11yButton>
    </div>
  );
};

export default SessionTestToggle;
