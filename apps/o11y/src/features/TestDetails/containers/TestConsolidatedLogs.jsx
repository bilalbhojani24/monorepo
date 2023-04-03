import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import ConsoleLogItem from '../components/ConsoleLogItem';
import FailureLogItem from '../components/FailureLogItem';
import GenericLogItem from '../components/GenericLogItem';
import HTTPLogItem from '../components/HTTPLogItem';
import NetworkLogItem from '../components/NetworkLogItem';
import SnapshotLogItem from '../components/SnapshotLogItem';
import StepLogItem from '../components/StepLogItem';
import TestLogItem from '../components/TestLogItem';
import TextLogItem from '../components/TextLogItem';
import { LOG_LEVELS, LOG_TYPES } from '../constants';
import { useLogsContext } from '../contexts/LogsContext';
import { getConsolidatedLogsData } from '../slices/dataSlice';
import {
  getActiveLogLevels,
  getConsolidatedLogs,
  getCurrentTestRunId,
  getTestDetails
} from '../slices/selectors';
import { setExceptions } from '../slices/uiSlice';

import TestLogFilters from './TestLogFilters';

const TestConsolidatedLogs = ({ videoSeekTime }) => {
  const dispatch = useDispatch();
  const consolidatedLogsData = useSelector(getConsolidatedLogs);
  const currentTestRunId = useSelector(getCurrentTestRunId);
  const details = useSelector(getTestDetails);
  const activeLogLevels = useSelector(getActiveLogLevels);
  const {
    handleScrollIntoView,
    sessionTestToggle,
    setActiveStep,
    setTotalSteps
  } = useLogsContext();

  const [searchText, setSearchText] = useState('');
  const [logs, setLogs] = useState([]);
  const [steps, setSteps] = useState([]);

  const renderLogItem = (data) => {
    switch (data.logType) {
      case LOG_TYPES.TEXT_LOGS:
        return <TextLogItem data={data} searchText={searchText} />;
      case LOG_TYPES.NETWORK_LOGS:
        return <NetworkLogItem data={data} searchText={searchText} />;
      case LOG_TYPES.STEP:
        return <StepLogItem data={data} searchText={searchText} />;
      case LOG_TYPES.HTTP:
        return <HTTPLogItem data={data} searchText={searchText} />;
      case LOG_TYPES.FAILURE:
        return <FailureLogItem data={data} searchText={searchText} />;
      case LOG_TYPES.CONSOLE_LOGS:
      case LOG_TYPES.DEVICE_LOGS:
      case LOG_TYPES.APPLICATION_LOGS:
        return <ConsoleLogItem data={data} searchText={searchText} />;
      case LOG_TYPES.TEST_SCREENSHOT:
        return <SnapshotLogItem data={data} searchText={searchText} />;
      case LOG_TYPES.TEST_LOG:
        return <TestLogItem data={data} searchText={searchText} />;
      default:
        return <GenericLogItem data={data} searchText={searchText} />;
    }
  };

  const renderLogs = (data) => {
    const elements = [];
    data.forEach((item) => {
      elements.push(
        <React.Fragment key={item.key}>{renderLogItem(item)}</React.Fragment>
      );
    });
    return elements;
  };

  useEffect(() => {
    let promise;
    if (currentTestRunId) {
      promise = dispatch(
        getConsolidatedLogsData({ testRunId: currentTestRunId })
      );
    }
    return () => {
      if (promise) {
        promise?.abort();
      }
    };
  }, [dispatch, currentTestRunId]);

  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    if (!isEmpty(consolidatedLogsData.data.logs)) {
      const allLogs = [];
      const exceptions = [];
      const stepItems = [];
      let step = -1;
      consolidatedLogsData.data.logs.forEach((data, idx) => {
        if (data.logType === LOG_TYPES.STEP) {
          step += 1;
          const stepItem = { ...data, key: uuidv4(), idx, stepIdx: step };
          allLogs.push(stepItem);
          stepItems.push(stepItem);
        } else {
          allLogs.push({ ...data, key: uuidv4(), idx, stepIdx: -1 });
        }
        if (data?.startOffset) {
          const startTime = sessionTestToggle
            ? data?.startOffset / 1000 || 0
            : data?.startOffset / 1000 -
                details.data.videoLogs?.startOffset / 1000 || 0;
          if (
            data?.logLevel === LOG_LEVELS.ERROR ||
            data?.logLevel === LOG_LEVELS.SEVERE
          ) {
            exceptions.push({
              startTime,
              logLevel: 'error',
              id: uuidv4()
            });
          }
          if (data?.logLevel === LOG_LEVELS.WARNING) {
            exceptions.push({
              startTime,
              logLevel: 'warning',
              id: uuidv4()
            });
          }
        }
      });
      dispatch(setExceptions(exceptions));
      setTotalSteps(step);
      setLogs(allLogs);
      setSteps(stepItems);
    } else {
      setLogs([]);
      setSteps([]);
      setTotalSteps(0);
      setActiveStep(0);
      dispatch(setExceptions([]));
    }
  }, [
    consolidatedLogsData,
    details.data.videoLogs?.startOffset,
    dispatch,
    sessionTestToggle,
    setActiveStep,
    setTotalSteps
  ]);

  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    if (videoSeekTime !== -1 && logs.length) {
      let approxIdx = -1;
      let firstSeenAt = -1;
      const roundedSeekTime = Math.round(videoSeekTime);
      for (let index = 0; index < logs.length; index += 1) {
        const item = logs[index];
        const itemStart = Math.round(item?.startOffset / 1000);
        if (activeLogLevels[item.logType]) {
          if (
            activeLogLevels[item.logType]?.includes(item.logLevel) &&
            itemStart <= roundedSeekTime
          ) {
            if (itemStart !== firstSeenAt) {
              approxIdx = index;
              firstSeenAt = itemStart;
            }
          } else if (
            activeLogLevels[item.logType]?.includes(item.logLevel) &&
            itemStart < roundedSeekTime
          ) {
            break;
          }
        } else if (roundedSeekTime >= itemStart) {
          if (itemStart !== firstSeenAt) {
            approxIdx = index;
            firstSeenAt = itemStart;
          }
        } else {
          break;
        }
      }
      if (approxIdx !== -1) {
        if (
          !sessionTestToggle &&
          videoSeekTime === details.data.videoLogs?.startOffset / 1000
        ) {
          return;
        }
        const idxElem = document.querySelector(`[data-idx="${approxIdx}"]`);
        if (idxElem) {
          handleScrollIntoView(idxElem?.offsetTop);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSeekTime, logs, handleScrollIntoView, activeLogLevels]);

  const handleSearchChange = (value) => {
    setSearchText(value?.toLowerCase());
  };

  const handleClickStepItem = useCallback(
    (distance) => {
      handleScrollIntoView(distance);
    },
    [handleScrollIntoView]
  );

  if (details.isLoading) {
    return null;
  }

  if (consolidatedLogsData.isLoading) {
    /* TODO: replace with skeleton loader */
    return <O11yLoader wrapperClassName="py-6" />;
  }
  if (
    !consolidatedLogsData.isLoading &&
    isEmpty(consolidatedLogsData.data.logs)
  ) {
    return (
      <div className="h-full w-full">
        <EmptyPage text="No logs available" />
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div className="flex items-center justify-between pt-4">
        <TestLogFilters
          onSearchChange={handleSearchChange}
          searchText={searchText}
          steps={steps}
          onClickStepItem={handleClickStepItem}
        />
      </div>
      {!isEmpty(logs) && (
        <div className="flex w-full flex-col">{renderLogs(logs)}</div>
      )}
    </div>
  );
};

TestConsolidatedLogs.propTypes = {
  videoSeekTime: PropTypes.number.isRequired
};

TestConsolidatedLogs.defaultProps = {};

export default TestConsolidatedLogs;
