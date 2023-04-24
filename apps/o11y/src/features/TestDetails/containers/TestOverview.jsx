import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineTimer } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yBadge } from 'common/bifrostProxy';
import DetailIcon from 'common/DetailIcon';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import isEmpty from 'lodash/isEmpty';
import {
  capitalize,
  getIconName,
  getOsIconName,
  getShortOSName
} from 'utils/common';
import { milliSecondsToTime } from 'utils/dateTime';

import { getTestOverviewData } from '../slices/dataSlice';
import { getCurrentTestRunId } from '../slices/selectors';

const TestOverview = () => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const currentTestRunId = useSelector(getCurrentTestRunId);
  const [isLoading, setIsLoading] = useState(true);
  const [testOverview, setTestOverview] = useState({});
  useEffect(() => {
    mounted.current = true;
    if (currentTestRunId) {
      setIsLoading(true);
      dispatch(getTestOverviewData({ testRunId: currentTestRunId }))
        .unwrap()
        .then((data) => {
          if (mounted.current) {
            setTestOverview(data);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (mounted.current) {
            setIsLoading(false);
          }
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, currentTestRunId]);

  if (isLoading) {
    return <O11yLoader wrapperClassName="py-6" />;
  }
  if (!isLoading && isEmpty(testOverview)) {
    return (
      <div className="h-full w-full">
        <EmptyPage text="No data found" />
      </div>
    );
  }

  return (
    <div className="bg-base-50 rounded-md p-6">
      {testOverview.userTags?.length > 0 && (
        <section
          className={twClassNames('flex flex-col gap-3', {
            'border-b border-base-200 pb-5':
              testOverview.bsTags?.length > 0 || !isEmpty(testOverview?.runInfo)
          })}
        >
          <p className="text-base-900 text-sm font-medium leading-5">
            Test tags
          </p>
          <div className="flex items-center gap-2">
            {testOverview.userTags.map((item) => (
              <O11yBadge
                text={item}
                key={item}
                wrapperClassName=""
                modifier="primary"
              />
            ))}
          </div>
        </section>
      )}
      {testOverview.bsTags?.length > 0 && (
        <section
          className={twClassNames('flex flex-col gap-3', {
            'border-b border-base-200 pb-5': !isEmpty(testOverview?.runInfo),
            'pt-5': testOverview.userTags?.length > 0
          })}
        >
          <p className="text-base-900 text-sm font-medium leading-5">
            Smart test info
          </p>
          <div className="flex flex-col gap-6">
            {testOverview.bsTags.map((item) => (
              <div className="flex flex-col gap-2" key={item.label}>
                <div>
                  <O11yBadge
                    text={item.label}
                    wrapperClassName=""
                    modifier={
                      item.label.toLowerCase().toString() === 'flaky'
                        ? 'warn'
                        : 'error'
                    }
                  />
                </div>
                {item.meta && (
                  <p className="text-base-500 text-sm font-normal leading-5">
                    {item.meta}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {!isEmpty(testOverview?.runInfo) && (
        <section
          className={twClassNames({
            'pt-5':
              testOverview.userTags?.length > 0 ||
              testOverview.bsTags?.length > 0
          })}
        >
          <p className="text-base-900 mb-3 text-sm font-medium leading-5">
            Run information
          </p>
          <div className="flex items-center">
            {!!testOverview.runInfo?.duration && (
              <section className="flex items-center gap-1">
                <MdOutlineTimer className="text-base-500 h-4 w-4" />
                <p className="text-base-500 text-sm font-normal leading-5">
                  {milliSecondsToTime(testOverview.runInfo.duration)}
                </p>
              </section>
            )}
            {testOverview.runInfo?.browser?.name && (
              <>
                {!!testOverview.runInfo?.duration && (
                  <div className="bg-base-400 mx-2 h-1 w-1 rounded-full" />
                )}
                <DetailIcon
                  icon={getIconName(
                    testOverview.runInfo.browser.name.toLowerCase(),
                    testOverview.runInfo.browser.name
                  )}
                  text={`${capitalize(testOverview.runInfo.browser.name)} ${
                    testOverview.runInfo.browser?.version
                  }`}
                  size="large"
                />
              </>
            )}
            {!!testOverview.runInfo?.os?.name && (
              <>
                {testOverview.runInfo?.browser?.name && (
                  <div className="bg-base-400 mx-2 h-1 w-1 rounded-full" />
                )}
                <DetailIcon
                  icon={`icon-${getOsIconName(testOverview.runInfo.os.name)}`}
                  text={
                    testOverview.runInfo.os.name
                      ? `${getShortOSName(testOverview.runInfo.os.name)} ${
                          testOverview.runInfo.os?.version
                        }`
                      : '-'
                  }
                  size="large"
                />
              </>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

TestOverview.propTypes = {};

export default TestOverview;
