import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineNetworkCheck } from '@browserstack/bifrost';
import {
  ApplicationIcon,
  DeviceIcon,
  SeleniumIcon,
  TerminalIcon
} from 'assets/icons/components';
import {
  O11yButton,
  O11yCheckbox,
  O11yPopoverBody,
  O11yPopoverFooter
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { LOG_LEVELS, LOG_TYPES } from '../constants';
import { useLogsContext } from '../contexts/LogsContext';
import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';
import { getActiveLogLevels } from '../slices/selectors';
import { setActiveLogLevels } from '../slices/uiSlice';

export default function FilterPopoverContent({ onClose }) {
  const dispatch = useDispatch();
  const activeLogLevels = useSelector(getActiveLogLevels);
  const { handleLogTDInteractionEvent } = useTestDetailsContentContext();
  const { handleSetCurrentTime } = useLogsContext();
  const [logsStatus, setLogsStatus] = useState({
    [LOG_TYPES.TEST_LOG]: {
      [LOG_LEVELS.FATAL]: false,
      [LOG_LEVELS.ERROR]: false,
      [LOG_LEVELS.WARNING]: false,
      [LOG_LEVELS.DEBUG]: false,
      [LOG_LEVELS.TRACE]: false,
      [LOG_LEVELS.INFO]: false
    },
    [LOG_TYPES.TEXT_LOGS]: {
      [LOG_LEVELS.INFO]: false,
      [LOG_LEVELS.WARNING]: false,
      [LOG_LEVELS.ERROR]: false
    },
    [LOG_TYPES.TEST_SCREENSHOT]: {
      [LOG_LEVELS.DEBUG]: false
    },
    [LOG_TYPES.CONSOLE_LOGS]: {
      [LOG_LEVELS.SEVERE]: false,
      [LOG_LEVELS.ERROR]: false,
      [LOG_LEVELS.WARNING]: false,
      [LOG_LEVELS.INFO]: false
    },
    [LOG_TYPES.NETWORK_LOGS]: {
      [LOG_LEVELS.ERROR]: false,
      [LOG_LEVELS.WARNING]: false
    },
    [LOG_TYPES.APPLICATION_LOGS]: {
      [LOG_LEVELS.ERROR]: false
    }
  });

  useEffect(() => {
    const testLogs = activeLogLevels[LOG_TYPES.TEST_LOG];
    const textLogs = activeLogLevels[LOG_TYPES.TEST_LOG];
    const screenshotLogs = activeLogLevels[LOG_TYPES.TEST_SCREENSHOT];
    const consoleLogs = activeLogLevels[LOG_TYPES.DEVICE_LOGS];
    const networkLogs = activeLogLevels[LOG_TYPES.HTTP];
    const applicationLogs = activeLogLevels[LOG_TYPES.APPLICATION_LOGS];
    setLogsStatus({
      [LOG_TYPES.TEST_LOG]: {
        [LOG_LEVELS.FATAL]: testLogs.includes(LOG_LEVELS.FATAL),
        [LOG_LEVELS.ERROR]: testLogs.includes(LOG_LEVELS.ERROR),
        [LOG_LEVELS.WARNING]:
          testLogs.includes(LOG_LEVELS.WARNING) ||
          testLogs.includes(LOG_LEVELS.WARN),
        [LOG_LEVELS.DEBUG]: testLogs.includes(LOG_LEVELS.DEBUG),
        [LOG_LEVELS.TRACE]: testLogs.includes(LOG_LEVELS.TRACE),
        [LOG_LEVELS.INFO]: testLogs.includes(LOG_LEVELS.INFO)
      },
      [LOG_TYPES.TEXT_LOGS]: {
        [LOG_LEVELS.INFO]: textLogs.includes(LOG_LEVELS.INFO),
        [LOG_LEVELS.WARNING]:
          textLogs.includes(LOG_LEVELS.WARNING) ||
          textLogs.includes(LOG_LEVELS.WARN),
        [LOG_LEVELS.ERROR]: textLogs.includes(LOG_LEVELS.ERROR)
      },
      [LOG_TYPES.TEST_SCREENSHOT]: {
        [LOG_LEVELS.DEBUG]: screenshotLogs.includes(LOG_LEVELS.DEBUG)
      },
      [LOG_TYPES.CONSOLE_LOGS]: {
        [LOG_LEVELS.SEVERE]: consoleLogs.includes(LOG_LEVELS.SEVERE),
        [LOG_LEVELS.ERROR]: consoleLogs.includes(LOG_LEVELS.ERROR),
        [LOG_LEVELS.WARNING]:
          consoleLogs.includes(LOG_LEVELS.WARNING) ||
          consoleLogs.includes(LOG_LEVELS.WARN),
        [LOG_LEVELS.INFO]: consoleLogs.includes(LOG_LEVELS.INFO)
      },
      [LOG_TYPES.NETWORK_LOGS]: {
        [LOG_LEVELS.ERROR]: networkLogs.includes(LOG_LEVELS.ERROR),
        [LOG_LEVELS.WARNING]:
          networkLogs.includes(LOG_LEVELS.WARNING) ||
          networkLogs.includes(LOG_LEVELS.WARN)
      },
      [LOG_TYPES.APPLICATION_LOGS]: {
        [LOG_LEVELS.ERROR]: applicationLogs.includes(LOG_LEVELS.ERROR)
      }
    });
  }, [activeLogLevels]);

  const handleChangeLogType = (event) => {
    const targetElement = event.target;
    const { logtype, loglevel } = targetElement.dataset;

    setLogsStatus({
      ...logsStatus,
      [logtype]: {
        ...logsStatus[logtype],
        [loglevel]: targetElement.checked
      }
    });
  };

  const handleClose = () => {
    onClose();
  };

  const handleApplyFilter = () => {
    onClose();
    handleSetCurrentTime(-1);
    Object.keys(logsStatus).forEach((logTypeKey) => {
      const updatedLogs = [];
      Object.keys(logsStatus[logTypeKey]).forEach((logLevelKey) => {
        const logLevelStatus = logsStatus[logTypeKey][logLevelKey];
        if (logLevelStatus === true) {
          if (
            logTypeKey === LOG_TYPES.TEST_LOG &&
            logLevelKey === LOG_LEVELS.WARNING
          ) {
            updatedLogs.push(LOG_LEVELS.WARN);
          } else {
            updatedLogs.push(logLevelKey);
          }
        }
      });

      if (logTypeKey === LOG_TYPES.NETWORK_LOGS) {
        dispatch(
          setActiveLogLevels({
            logType: LOG_TYPES.HTTP,
            logLevels: updatedLogs
          })
        );
      } else if (logTypeKey === LOG_TYPES.CONSOLE_LOGS) {
        dispatch(
          setActiveLogLevels({
            logType: LOG_TYPES.DEVICE_LOGS,
            logLevels: updatedLogs
          })
        );
      } else {
        dispatch(
          setActiveLogLevels({
            logType: logTypeKey,
            logLevels: updatedLogs
          })
        );
      }
    });
    handleLogTDInteractionEvent({ interaction: 'filter_logs_applied' });
  };

  const renderCheckbox = (label, type, level) => (
    <O11yCheckbox
      border={false}
      checked={logsStatus[type][level]}
      onChange={handleChangeLogType}
      data={{
        label,
        value: `${type}-${level}`
      }}
      data-logType={type}
      data-logLevel={level}
    />
  );

  return (
    <>
      <O11yPopoverBody wrapperClassName="pb-8">
        <div className="flex gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-base-800 flex items-center gap-2 text-sm font-medium leading-4">
              <TerminalIcon className="fill-base-400" />
              Terminal
            </p>
            {renderCheckbox('Fatal', LOG_TYPES.TEST_LOG, LOG_LEVELS.FATAL)}
            {renderCheckbox('Error', LOG_TYPES.TEST_LOG, LOG_LEVELS.ERROR)}
            {renderCheckbox('Warning', LOG_TYPES.TEST_LOG, LOG_LEVELS.WARNING)}
            {renderCheckbox('Debug', LOG_TYPES.TEST_LOG, LOG_LEVELS.DEBUG)}
            {renderCheckbox('Trace', LOG_TYPES.TEST_LOG, LOG_LEVELS.TRACE)}
            {renderCheckbox('Info', LOG_TYPES.TEST_LOG, LOG_LEVELS.INFO)}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-base-800 flex items-center gap-2 text-sm font-medium leading-4">
              <SeleniumIcon className="fill-base-400" />
              Test Commands
            </p>
            {renderCheckbox('Info', LOG_TYPES.TEXT_LOGS, LOG_LEVELS.INFO)}
            {renderCheckbox('Warning', LOG_TYPES.TEXT_LOGS, LOG_LEVELS.WARNING)}
            {renderCheckbox('Error', LOG_TYPES.TEXT_LOGS, LOG_LEVELS.ERROR)}
            {renderCheckbox(
              'Debug (Screenshots)',
              LOG_TYPES.TEST_SCREENSHOT,
              LOG_LEVELS.DEBUG
            )}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-base-800 flex items-center gap-2 text-sm font-medium leading-4">
              <DeviceIcon className="fill-base-400" />
              Device logs
            </p>
            {renderCheckbox(
              'Severe',
              LOG_TYPES.CONSOLE_LOGS,
              LOG_LEVELS.SEVERE
            )}
            {renderCheckbox('Error', LOG_TYPES.CONSOLE_LOGS, LOG_LEVELS.ERROR)}
            {renderCheckbox(
              'Warning',
              LOG_TYPES.CONSOLE_LOGS,
              LOG_LEVELS.WARNING
            )}
            {renderCheckbox('Info', LOG_TYPES.CONSOLE_LOGS, LOG_LEVELS.INFO)}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-base-800 flex items-center gap-2 text-sm font-medium leading-4">
              <MdOutlineNetworkCheck className="text-base-400 h-4 w-4" />
              Network
            </p>
            {renderCheckbox('Error', LOG_TYPES.NETWORK_LOGS, LOG_LEVELS.ERROR)}
            {renderCheckbox(
              'Warning',
              LOG_TYPES.NETWORK_LOGS,
              LOG_LEVELS.WARNING
            )}
            <p className="text-base-800 flex items-center gap-2 pt-2 text-sm font-medium leading-4">
              <ApplicationIcon className="fill-base-400" />
              Application
            </p>
            {renderCheckbox(
              'Error',
              LOG_TYPES.APPLICATION_LOGS,
              LOG_LEVELS.ERROR
            )}
          </div>
        </div>
      </O11yPopoverBody>
      <O11yPopoverFooter>
        <div className="border-base-300 flex w-full items-center justify-end gap-3 border-t pt-4">
          <O11yButton colors="white" onClick={handleClose}>
            Cancel
          </O11yButton>
          <O11yButton onClick={handleApplyFilter}>Apply filters</O11yButton>
        </div>
      </O11yPopoverFooter>
    </>
  );
}

FilterPopoverContent.propTypes = {
  onClose: PropTypes.func.isRequired
};
