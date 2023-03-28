import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import StatusIcon from 'common/StatusIcon';
import isEmpty from 'lodash/isEmpty';

import { getBehaviourData } from '../slices/dataSlice';
import { getCurrentTestRunId } from '../slices/selectors';

const TestBehaviour = () => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const currentTestRunId = useSelector(getCurrentTestRunId);
  const [isLoading, setIsLoading] = useState(true);
  const [behaviour, setBehaviour] = useState({});
  useEffect(() => {
    mounted.current = true;
    if (currentTestRunId) {
      setIsLoading(true);
      dispatch(getBehaviourData({ testRunId: currentTestRunId }))
        .unwrap()
        .then((data) => {
          if (mounted.current) {
            setBehaviour(data);
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
  if (!isLoading && isEmpty(behaviour)) {
    return (
      <div className="h-full w-full">
        <EmptyPage text="No data found" />
      </div>
    );
  }
  return (
    <div className="bg-base-50 rounded-md p-6">
      {!isEmpty(behaviour?.feature) && (
        <section
          className={twClassNames('flex flex-col gap-3', {
            'border-b border-base-200 pb-5':
              !isEmpty(behaviour?.scenario) || behaviour?.steps?.length > 0
          })}
        >
          <p className="text-base-900 text-sm font-medium leading-5">
            Feature: {behaviour.feature.name}
          </p>
          {!!behaviour.feature?.description && (
            <p className="text-base-500 text-sm font-normal leading-5">
              {behaviour.feature?.description}
            </p>
          )}
        </section>
      )}
      {!isEmpty(behaviour?.scenario) && (
        <section
          className={twClassNames('flex flex-col gap-3', {
            'border-b border-base-200 pb-5': behaviour?.steps?.length > 0,
            'pt-5': !isEmpty(behaviour?.feature)
          })}
        >
          <p className="text-base-900 text-sm font-medium leading-5">
            Scenario: {behaviour.scenario.name}
          </p>
          {!!behaviour.scenario?.description && (
            <p className="text-base-500 text-sm font-normal leading-5">
              {behaviour.scenario?.description}
            </p>
          )}
        </section>
      )}
      {!!behaviour?.steps?.length && (
        <section
          className={twClassNames('flex flex-col gap-5', {
            'pt-5': !isEmpty(behaviour?.scenario)
          })}
        >
          {behaviour.steps.map((item) => (
            <div className="flex flex-col gap-3" key={item.id}>
              <div className="flex items-center gap-1">
                <StatusIcon status={item?.result?.toLowerCase()} />
                <span className="text-base-900 text-sm font-medium leading-5">
                  {item?.keyword}
                </span>
              </div>
              <p className="text-base-500 text-sm font-normal leading-5">
                {item?.text}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

TestBehaviour.propTypes = {};

export default TestBehaviour;
