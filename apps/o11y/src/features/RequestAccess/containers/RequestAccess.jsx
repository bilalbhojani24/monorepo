import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  MdOutlineAutoAwesome,
  MdOutlineDashboard,
  MdOutlineRunningWithErrors,
  MdOutlineStackedLineChart
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { requestO11yAccess } from 'api/global';
import heroUnit from 'assets/illustrations/hero-unit-o11y.png';
import { O11yButton, O11yHyperlink } from 'common/bifrostProxy';
import O11yFeatureCard from 'common/O11yFeatureCard';
import { DOC_KEY_MAPPING, WRAPPER_GAP_CLASS } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { setHasAcceptedTnC } from 'globalSlice/index';
import { getInitData } from 'globalSlice/selectors';
import { getDocUrl, logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

function RequestAccess() {
  const initData = useSelector(getInitData);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  if (!initData.isLoading && initData.data?.hasAcceptedTnC) {
    return <Navigate to={ROUTES.get_started} />;
  }

  const handleRequestAccess = async () => {
    logOllyEvent({ event: 'O11yGetAccessClicked' });
    setIsLoading(true);
    try {
      await requestO11yAccess();
      dispatch(setHasAcceptedTnC(true));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      o11yNotify({
        title: 'Something went wrong!',
        description: `Please retry in some time.`,
        type: 'error'
      });
    }
  };

  return (
    <div
      className={twClassNames(
        'bg-base-50 flex overflow-auto w-screen flex-col items-center justify-center p-14',
        WRAPPER_GAP_CLASS
      )}
    >
      <O11yFeatureCard
        wrapperClassName="p-10"
        childrenWrapperClass="flex items-center justify-between gap-4"
      >
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold leading-10">
            Welcome to Test Observability!
          </h1>
          <p className="text-base-500 pt-2 pb-6 text-base">
            Test Observability is a precision debugger, a test suite health
            dashboard, a collaborative tool & more. Works with all automation
            tests, even if they don&apos;t run on the BrowserStack Cloud!
          </p>
          <ul className="flex flex-col gap-5">
            <li className="flex gap-3">
              <MdOutlineStackedLineChart className="text-brand-600 mt-1 shrink-0 text-xl" />{' '}
              <span className="text-base-700 text-sm font-medium leading-5">
                Insightful test reports with identification of flaky tests, new
                failures, unique errors & performance anomalies
              </span>
            </li>
            <li className="flex gap-3">
              <MdOutlineAutoAwesome className="text-brand-600 shrink-0 text-xl" />{' '}
              <span className="text-base-700 text-sm font-medium leading-5">
                Machine Learning powered automatic classification of test
                failures
              </span>
            </li>
            <li className="flex gap-3">
              <MdOutlineRunningWithErrors className="text-brand-600 mt-1 shrink-0 text-xl" />{' '}
              <span className="text-base-700 text-sm font-medium leading-5">
                Timeline Debugging with every type of log in one single view -
                including videos, screenshots, test framework logs, app logs &
                more
              </span>
            </li>
            <li className="flex gap-3">
              <MdOutlineDashboard className="text-brand-600 mt-1 shrink-0 text-xl" />{' '}
              <span className="text-base-700 text-sm font-medium leading-5">
                Test Suite Health dashboards highlighting the top issues in your
                suite, like unique errors and most failure prone test cases
              </span>
            </li>
          </ul>
          <div className="mt-9 flex w-full flex-col">
            <O11yButton
              size="default"
              loading={isLoading}
              onClick={handleRequestAccess}
              isIconOnlyButton={isLoading}
            >
              Get Started
            </O11yButton>
            <p className="text-base-500 mt-2 text-xs">
              By clicking on Get Started, I agree to have read and understood
              the{' '}
              <O11yHyperlink
                target="_blank"
                wrapperClassName="inline font-normal text-xs underline text-base-800 hover:text-brand-600"
                href={getDocUrl({ path: DOC_KEY_MAPPING.tnc })}
              >
                terms & conditions
              </O11yHyperlink>
            </p>
          </div>
        </div>
        <img src={heroUnit} alt="" className="w-2/4" />
      </O11yFeatureCard>
    </div>
  );
}

export default RequestAccess;
