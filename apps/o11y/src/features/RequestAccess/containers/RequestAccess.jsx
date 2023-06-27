import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  MdOutlineAutoAwesome,
  MdOutlineDashboard,
  MdOutlineRunningWithErrors,
  MdOutlineStackedLineChart,
  MdPlayArrow
} from '@browserstack/bifrost';
import { requestO11yAccess } from 'api/global';
import o11yIllustration from 'assets/illustrations/o11y-illustration.png';
import o11yDemoVideo from 'assets/videos/o11y-demo.mp4';
import { O11yButton, O11yHyperlink } from 'common/bifrostProxy';
import O11yFeatureCard from 'common/O11yFeatureCard';
import { DOC_KEY_MAPPING } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { setHasAcceptedTnC } from 'globalSlice/index';
import { getHeaderSize, getInitData } from 'globalSlice/selectors';
import {
  getDocUrl,
  getFullScreenChangeEventName,
  logOllyEvent
} from 'utils/common';

function RequestAccess() {
  const headerSize = useSelector(getHeaderSize);
  const initData = useSelector(getInitData);
  const videRef = useRef(null);
  const [hasClickedPlay, setHasClickedPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    logOllyEvent({ event: 'O11yGetAccessPageVisited' });
  }, []);

  const logInteractionEvent = useCallback((interaction) => {
    logOllyEvent({
      event: 'O11yGetAccessPageInteracted',
      data: {
        interaction
      }
    });
  }, []);

  const onFullScreen = useCallback(() => {
    const fullscreenElement =
      document.fullscreenElement /* Standard syntax */ ||
      document.webkitFullscreenElement /* Chrome, Safari and Opera syntax */ ||
      document.mozFullScreenElement /* Firefox syntax */ ||
      document.msFullscreenElement;
    if (fullscreenElement) {
      logInteractionEvent('full_screen_clicked');
    } else {
      logInteractionEvent('exit_full_screen_clicked');
    }
  }, [logInteractionEvent]);

  useEffect(() => {
    const fullscreenChangeEvent = getFullScreenChangeEventName();
    window.addEventListener(fullscreenChangeEvent, onFullScreen, false);
    return () => {
      window.removeEventListener(fullscreenChangeEvent, onFullScreen, false);
    };
  }, [onFullScreen]);

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
    }
  };

  const handleClickPlay = () => {
    if (videRef.current) {
      videRef.current?.play();
      logInteractionEvent('first_unmute');
      setHasClickedPlay(true);
    }
  };

  return (
    <div
      className="bg-base-50 flex w-screen flex-col items-center justify-center p-14"
      style={{
        height: `calc(100vh - ${headerSize}px)`
      }}
    >
      <O11yFeatureCard
        wrapperClassName="p-10"
        childrenWrapperClass="flex items-center justify-between gap-8"
      >
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold leading-10">
            Welcome to Test Observability!
          </h1>
          <p className="text-base-500 pb-6 pt-2 text-base">
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
                onClick={() => logInteractionEvent('t&c_viewed')}
              >
                terms & conditions
              </O11yHyperlink>
            </p>
          </div>
        </div>
        <div className="relative w-2/4 shrink-0">
          {/*  eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            // key={hasClickedPlay}
            ref={videRef}
            width="100%"
            controls={hasClickedPlay ? 'controls' : ''}
            poster={o11yIllustration}
            className="rounded shadow-lg"
            autoPlay
            muted={!hasClickedPlay}
            playsinline
            loop
            onRateChange={() => logInteractionEvent('speed_changed')}
            onPause={() => logInteractionEvent('stopped')}
            onSeeked={() => logInteractionEvent('seeked')}
          >
            <source src={o11yDemoVideo} type="video/mp4" />
          </video>
          {!hasClickedPlay && (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
              <O11yButton
                variant="rounded"
                size="large"
                icon={<MdPlayArrow className="" />}
                wrapperClassName="hover:shadow-lg"
                onClick={handleClickPlay}
              >
                Watch demo (5 min)
              </O11yButton>
            </div>
          )}
        </div>
      </O11yFeatureCard>
    </div>
  );
}

export default RequestAccess;
