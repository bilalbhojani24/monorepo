import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdArrowDownward,
  MdArrowUpward,
  MdOutlineOpenInNew
} from '@browserstack/bifrost';
import {
  DoubleArrowDownIcon,
  DoubleArrowUpIcon
} from 'assets/icons/components';
import { O11yButton, O11yHyperlink } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';

import { LOGS_CONTEXT } from '../contexts/LogsContext';
import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';
import {
  getExceptions,
  getTestDetails,
  getTestMeta
} from '../slices/selectors';
import { setExceptions } from '../slices/uiSlice';

import TestsLogsInfoTabs from './TestsLogsInfoTabs';
import TestVideoPlayer from './TestVideoPlayer';

const SCROLL_OFFSET = 200;

export const LOGS_INFO_TAB_KEYS = {
  logs: 'logs',
  network: 'network'
};

const DebugTab = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const { handleLogTDInteractionEvent } = useTestDetailsContentContext();
  const floatingVideoComponentRef = useRef(null);
  const details = useSelector(getTestDetails);
  const testMeta = useSelector(getTestMeta);
  const testExceptions = useSelector(getExceptions);
  const [sessionTestToggle, setSessionTestToggle] = useState(false);
  const [videoSeekTime, setVideoSeekTime] = useState(-1);
  const [activeStep, setActiveStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [showStepNavigation, setShowStepNavigation] = useState(false);
  const [activeTab, setActiveTab] = useState({
    idx: 0,
    value: LOGS_INFO_TAB_KEYS.logs
  });
  const [showScrollToBottom, toggleShowScrollToBottom] = useState(false);

  useEffect(() => {
    if (activeTab.value === LOGS_INFO_TAB_KEYS.network) {
      setIsScrolledToBottom(false);
    }
  }, [activeTab.value]);

  useEffect(() => {
    const handleScroll = (event) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target;
      if (scrollTop > 50) {
        toggleShowScrollToBottom(true);
      }
      if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
        setIsScrolledToBottom(true);
      }
      if (showScrollToBottom && scrollTop === 0) {
        setIsScrolledToBottom(false);
      }
    };
    if (
      scrollRef.current &&
      activeTab.value === LOGS_INFO_TAB_KEYS.logs &&
      showStepNavigation
    ) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    } else if (activeTab.value === LOGS_INFO_TAB_KEYS.network) {
      scrollRef.current?.removeEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scrollRef.current?.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeTab.value, showScrollToBottom, showStepNavigation]);

  const handleLogDurationClick = useCallback((duration) => {
    const videoComponent = videoRef.current;
    const floatingVideoComponent = floatingVideoComponentRef.current;
    if (videoComponent && floatingVideoComponent) {
      videoComponent.currentTime = duration;
      floatingVideoComponent.currentTime = duration;
    }
  }, []);

  const handleScrollIntoView = useCallback((distance) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = distance - SCROLL_OFFSET;
    }
  }, []);

  const handleScrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
    }
  }, []);

  const handleSetCurrentTime = useCallback((time) => {
    setVideoSeekTime(time);
  }, []);

  const handleSessionToggle = useCallback(
    (status) => {
      handleSetCurrentTime(-1);
      setSessionTestToggle(status);
      if (testExceptions.length && details.data.videoLogs?.startOffset) {
        if (status) {
          dispatch(
            setExceptions(
              testExceptions.map((item) => ({
                ...item,
                startTime:
                  item.startTime + details.data.videoLogs?.startOffset / 1000
              }))
            )
          );
        } else {
          dispatch(
            setExceptions(
              testExceptions.map((item) => ({
                ...item,
                startTime:
                  item.startTime - details.data.videoLogs?.startOffset / 1000
              }))
            )
          );
        }
      }
    },
    [
      details.data.videoLogs?.startOffset,
      dispatch,
      handleSetCurrentTime,
      testExceptions
    ]
  );

  const highlightStep = useCallback((elem) => {
    elem.classList.add('animate-pulse-bg');
    setTimeout(() => {
      elem.classList.remove('animate-pulse-bg');
    }, 1000);
  }, []);

  const handleNextStep = useCallback(() => {
    if (activeStep < totalSteps) {
      const idxElem = document.querySelector(
        `[data-stepIdx="${activeStep + 1}"]`
      );
      if (idxElem) {
        handleScrollIntoView(idxElem?.offsetTop);
        highlightStep(idxElem);
        setActiveStep((step) => step + 1);
        handleLogTDInteractionEvent({ interaction: 'next_step_clicked' });
      }
    }
  }, [
    activeStep,
    handleLogTDInteractionEvent,
    handleScrollIntoView,
    highlightStep,
    totalSteps
  ]);
  const handlePrevStep = useCallback(() => {
    if (activeStep > 0) {
      const idxElem = document.querySelector(
        `[data-stepidx="${activeStep - 1}"]`
      );
      if (idxElem) {
        handleScrollIntoView(idxElem?.offsetTop);
        highlightStep(idxElem);
        setActiveStep((step) => step - 1);
        handleLogTDInteractionEvent({ interaction: 'previous_step_clicked' });
      }
    }
  }, [
    activeStep,
    handleLogTDInteractionEvent,
    handleScrollIntoView,
    highlightStep
  ]);

  const handleClickScrollButton = useCallback(() => {
    if (isScrolledToBottom) {
      handleScrollIntoView(0);
    } else {
      handleScrollToBottom();
    }
    handleLogTDInteractionEvent({ interaction: 'scroll_to_bottom_clicked' });
    setIsScrolledToBottom((t) => !t);
  }, [
    handleLogTDInteractionEvent,
    handleScrollIntoView,
    handleScrollToBottom,
    isScrolledToBottom
  ]);

  if (testMeta.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <O11yLoader />
      </div>
    );
  }

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-auto"
      ref={scrollRef}
    >
      <LOGS_CONTEXT.Provider
        value={{
          handleScrollToBottom,
          handleScrollIntoView,
          sessionTestToggle,
          setSessionTestToggle,
          videoSeekTime,
          handleSetCurrentTime,
          handleLogDurationClick,
          handleSessionToggle,
          setActiveStep,
          setTotalSteps,
          activeTab,
          setActiveTab,
          setShowStepNavigation
        }}
      >
        <TestVideoPlayer
          videoRef={videoRef}
          floatingVideoRef={floatingVideoComponentRef}
        />
        <TestsLogsInfoTabs />
        {activeTab.value === LOGS_INFO_TAB_KEYS.logs && (
          <>
            {showScrollToBottom && (
              <div className="sticky bottom-10 left-1/2 z-30 mb-2 w-max -translate-x-1/2">
                <O11yButton
                  variant="rounded"
                  wrapperClassName=""
                  icon={
                    isScrolledToBottom ? (
                      <DoubleArrowUpIcon className="h-4 w-4 fill-white" />
                    ) : (
                      <DoubleArrowDownIcon className="h-4 w-4 fill-white" />
                    )
                  }
                  onClick={handleClickScrollButton}
                  colors="brand"
                  iconPlacement="end"
                >
                  {isScrolledToBottom ? 'Scroll to top' : 'Scroll to bottom'}
                </O11yButton>
              </div>
            )}
            {showStepNavigation && (
              <div className="sticky bottom-0 z-20 flex w-full items-center justify-between bg-white p-2">
                <div className="flex items-center gap-6">
                  <O11yButton
                    variant="minimal"
                    wrapperClassName=""
                    icon={<MdArrowDownward className="h-4 w-4" />}
                    onClick={handleNextStep}
                    disabled={activeStep === totalSteps}
                    size="small"
                    colors="white"
                  >
                    <span className="text-xs font-medium leading-4">
                      Next step
                    </span>
                  </O11yButton>
                  <O11yButton
                    variant="minimal"
                    wrapperClassName=""
                    icon={<MdArrowUpward className="h-4 w-4" />}
                    onClick={handlePrevStep}
                    disabled={activeStep <= 0}
                    size="small"
                    colors="white"
                    iconPlacement="end"
                  >
                    <span className="text-xs font-medium leading-4">
                      Previous step
                    </span>
                  </O11yButton>
                </div>

                {details.data?.browserstackSessionUrl && (
                  <div>
                    <O11yHyperlink
                      href={details.data.browserstackSessionUrl}
                      target="_blank"
                      onClick={() =>
                        handleLogTDInteractionEvent({
                          interaction: 'browserstack_session_clicked'
                        })
                      }
                    >
                      <div className="flex gap-1">
                        <span className="text-base-700 text-xs font-medium leading-4">
                          BrowserStack session
                        </span>
                        <MdOutlineOpenInNew className="text-base-500 h-4 w-4" />
                      </div>
                    </O11yHyperlink>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </LOGS_CONTEXT.Provider>
    </div>
  );
};

DebugTab.propTypes = {};

export default DebugTab;
