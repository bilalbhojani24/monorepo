import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  MdContentPaste,
  MdLink,
  MdOpenInNew,
  MdOutlineTimer,
  MdSettings
} from '@browserstack/bifrost';
import { O11yBadge, O11yButton } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import PropagationBlocker from 'common/PropagationBlocker';
import StackTraceTooltip from 'common/StackTraceTooltip';
import StatusIcon from 'common/StatusIcon';
import { TEST_STATUS } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { LOG_TYPES } from 'features/TestList/constants';
import { TestListContext } from 'features/TestList/context/TestListContext';
import { getTestHistoryDetails } from 'features/TestList/slices/selectors';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { milliSecondsToTime } from 'utils/dateTime';

function TestListHistoryTooltip({ testRunId, status }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { o11yTestListingInteraction } = useContext(TestListContext);
  const mounted = useRef(false);
  const historyData = useSelector((state) =>
    getTestHistoryDetails(state, testRunId)
  );
  const [isLoading, setIsLoading] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleClickConfigureSmartTags = () => {
    navigate(ROUTES.smartTags);
  };

  const handleCopyLink = () => {
    copyToClipboard(`${window.location.href}&details=${historyData.serialId}`);
  };

  useEffect(() => {
    mounted.current = true;
    if (mounted.current && isEmpty(historyData)) {
      setIsLoading(true);
    } else if (mounted.current && !isEmpty(historyData)) {
      setIsLoading(false);
    }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, historyData]);

  useEffect(() => {
    o11yTestListingInteraction('history_hovered');
  }, [o11yTestListingInteraction]);

  return (
    <div>
      {isLoading ? (
        <div className="flex h-20 flex-col items-center justify-center">
          <O11yLoader />
          <p className="text-base-500 mt-1 text-center text-sm">
            {status === TEST_STATUS.PENDING
              ? 'Build is still running'
              : 'Fetching data'}
          </p>
        </div>
      ) : (
        <PropagationBlocker>
          <div className="flex flex-col p-4">
            <div className="flex justify-between">
              <p className="text-sm font-semibold">#{historyData?.serialId}</p>
              <span className="text-brand-600 text-xs font-medium">
                <O11yButton
                  icon={<MdLink className="cursor-pointer text-base" />}
                  variant="minimal"
                  iconPlacement="end"
                  wrapperClassName="text-xs"
                  onClick={handleCopyLink}
                >
                  Copy Link
                </O11yButton>
              </span>
            </div>
            <span className="border-b-base-300 my-3 border-b" />
            <div className="text-base-500 flex justify-between text-xs font-medium">
              <div className="flex">
                <div className="flex flex-col">
                  Test Status
                  <p className="mt-1 flex items-center gap-1">
                    <StatusIcon
                      status={historyData?.status}
                      customClass="text-base"
                    />
                    <span className="text-center">{historyData?.status}</span>
                  </p>
                </div>
                {!!historyData?.issueType && (
                  <>
                    <span className="border-r-base-300 mx-3 border-r" />
                    <div className="flex flex-col">
                      Failure Category
                      <span className="text-base-800 font-medium">
                        {historyData?.issueType?.name}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col">
                Duration
                <p className="flex items-center justify-end">
                  <MdOutlineTimer className="text-base-600" />
                  <span>{milliSecondsToTime(historyData?.duration)}</span>
                </p>
              </div>
            </div>
            {(historyData?.tags?.length ||
              historyData?.isFlaky ||
              historyData?.isAlwaysFailing ||
              historyData?.isNewFailure ||
              historyData?.isPerformanceAnomaly) && (
              <>
                <span className="border-b-base-300 my-3 border-b" />
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="text-base-500 text-xs font-medium">
                      Smart Tags
                    </p>
                    <span className="text-brand-600 text-xs font-medium">
                      <O11yButton
                        icon={
                          <MdOpenInNew className="cursor-pointer text-base" />
                        }
                        variant="minimal"
                        iconPlacement="end"
                        wrapperClassName="text-xs mr-2"
                      >
                        Learn More
                      </O11yButton>
                      <O11yButton
                        icon={
                          <MdSettings className="cursor-pointer text-base" />
                        }
                        variant="minimal"
                        iconPlacement="end"
                        wrapperClassName="text-xs"
                        onClick={handleClickConfigureSmartTags}
                      >
                        Configure
                      </O11yButton>
                    </span>
                  </div>
                </div>
                <div className="mt-2 inline shrink-0">
                  {historyData?.tags.map((singleTag) => (
                    <PropagationBlocker className="mr-1 inline" key={singleTag}>
                      <O11yBadge
                        text={singleTag}
                        wrapperClassName="mx-1"
                        hasRemoveButton={false}
                        onClick={() => {}}
                        modifier="base"
                        hasDot={false}
                      />
                    </PropagationBlocker>
                  ))}
                  {historyData?.isFlaky && (
                    <PropagationBlocker className="mr-1 inline">
                      <O11yBadge
                        text="Flaky"
                        modifier="warn"
                        onClick={() => {}}
                      />
                    </PropagationBlocker>
                  )}
                  {historyData?.isAlwaysFailing && (
                    <PropagationBlocker className="mr-1 inline">
                      <O11yBadge
                        text="Always Failing"
                        modifier="error"
                        onClick={() => {}}
                      />
                    </PropagationBlocker>
                  )}
                  {historyData?.isNewFailure && (
                    <PropagationBlocker className="mr-1 inline">
                      <O11yBadge
                        text="New Failures"
                        modifier="error"
                        onClick={() => {}}
                      />
                    </PropagationBlocker>
                  )}
                  {historyData?.isPerformanceAnomaly && (
                    <PropagationBlocker className="mr-1 inline">
                      <O11yBadge
                        text="Performance Anomaly"
                        modifier="error"
                        onClick={() => {}}
                      />
                    </PropagationBlocker>
                  )}
                </div>
                {historyData?.isFlaky && (
                  <p className="text-base-500 mt-3 text-xs font-medium">
                    <span className="text-base-800">Flaky reason:</span>{' '}
                    {historyData?.flaky?.flakyReason}
                  </p>
                )}
              </>
            )}
          </div>
          {!!historyData?.logs?.[LOG_TYPES.STACKTRACE]?.length && (
            <div className="flex flex-col">
              <div className="bg-base-100 flex h-8 items-center justify-between px-4">
                <p className="text-base-600 text-xs font-medium">Stacktrace</p>
                <O11yButton
                  icon={<MdContentPaste className="cursor-pointer text-base" />}
                  variant="minimal"
                  iconPlacement="end"
                  wrapperClassName="text-xs"
                  onClick={() => {
                    copyToClipboard(historyData?.logs[LOG_TYPES.STACKTRACE]);
                  }}
                >
                  Copy to Clipboard
                </O11yButton>
              </div>
              <StackTraceTooltip
                showOnlyTraceData
                traceLines={historyData?.logs[LOG_TYPES.STACKTRACE] || []}
                size="medium"
              />
            </div>
          )}
        </PropagationBlocker>
      )}
    </div>
  );
}

export default TestListHistoryTooltip;

TestListHistoryTooltip.propTypes = {
  testRunId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired
};
TestListHistoryTooltip.defaultProps = {};
