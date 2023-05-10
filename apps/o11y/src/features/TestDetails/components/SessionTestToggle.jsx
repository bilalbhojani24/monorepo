import React from 'react';
import { MdDone } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';

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
    <div>
      <div className="px-3 py-2">
        <span className="text-base-500 text-xs font-semibold leading-4">
          VIDEO DURATION
        </span>
      </div>
      <ul>
        <li className="hover:bg-base-50">
          <button
            type="button"
            onClick={handleClickTestTab}
            className="flex w-full items-center justify-between px-3 py-2"
          >
            <span
              className={twClassNames(
                'text-base-900 text-sm leading-5 font-normal',
                {
                  'font-semibold': !sessionTestToggle
                }
              )}
            >
              Test case
            </span>
            {!sessionTestToggle && (
              <MdDone className="text-brand-600 mr-1 h-5 w-5" />
            )}
          </button>
        </li>
        <li className="hover:bg-base-50 ">
          <button
            type="button"
            onClick={handleClickSessionTab}
            className="flex w-full items-center justify-between px-3 py-2"
          >
            <span
              className={twClassNames(
                'text-base-900 text-sm leading-5 font-normal',
                {
                  'font-semibold': sessionTestToggle
                }
              )}
            >
              Browser Session
            </span>
            {sessionTestToggle && (
              <MdDone className="text-brand-600 mr-1 h-5 w-5" />
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SessionTestToggle;
