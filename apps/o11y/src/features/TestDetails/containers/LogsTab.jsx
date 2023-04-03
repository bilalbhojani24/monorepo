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
import { BSTACK_TOPNAV_ELEMENT_ID } from 'constants/common';

import { TEST_DETAILS_SLIDEOVER_ELEMENT_ID } from '../constants';
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

const LogsTab = () => {
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
  const [floatingVideoRightOffset, setFloatingVideoRightOffset] = useState(700);
  const [floatingVideoTopOffset, setFloatingVideoTopOffset] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    const slideOverElement = document.getElementById(
      TEST_DETAILS_SLIDEOVER_ELEMENT_ID
    );
    const bstackHeaderElement = document.getElementById(
      BSTACK_TOPNAV_ELEMENT_ID
    );
    if (slideOverElement) {
      setFloatingVideoRightOffset(slideOverElement.offsetWidth);
    }
    if (bstackHeaderElement) {
      setFloatingVideoTopOffset(bstackHeaderElement.offsetHeight);
    }
  }, []);

  const handleLogDurationClick = (duration) => {
    const videoComponent = videoRef.current;
    const floatingVideoComponent = floatingVideoComponentRef.current;
    if (videoComponent && floatingVideoComponent) {
      videoComponent.currentTime = duration;
      floatingVideoComponent.currentTime = duration;
    }
  };

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

  const highlightStep = (elem) => {
    elem.classList.add('animateBg');
    setTimeout(() => {
      elem.classList.remove('animateBg');
    }, 1000);
  };

  const handleNextStep = () => {
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
  };
  const handlePrevStep = () => {
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
  };

  const handleClickScrollButton = () => {
    if (isScrolledToBottom) {
      handleScrollIntoView(0);
    } else {
      handleScrollToBottom();
    }
    handleLogTDInteractionEvent({ interaction: 'scroll_to_bottom_clicked' });
    setIsScrolledToBottom((t) => !t);
  };

  if (testMeta.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <O11yLoader />
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col" ref={scrollRef}>
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
          floatingVideoTopOffset,
          floatingVideoRightOffset,
          setActiveStep,
          setTotalSteps
        }}
      >
        <TestVideoPlayer
          videoRef={videoRef}
          floatingVideoRef={floatingVideoComponentRef}
        />
        <TestsLogsInfoTabs />
        <div className="sticky bottom-0 z-20 w-full">
          <div className="mb-2 flex items-center justify-center">
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
              disabled={activeStep === totalSteps}
              colors="brand"
              iconPlacement="end"
            >
              {isScrolledToBottom ? 'Scroll to top' : 'Scroll to bottom'}
            </O11yButton>
          </div>
          <div className="flex items-center justify-between bg-white pt-2">
            <div className="flex items-center gap-6">
              <O11yButton
                variant="minimal"
                wrapperClassName=""
                icon={<MdArrowDownward className="text-base-700 h-4 w-4" />}
                onClick={handleNextStep}
                disabled={activeStep === totalSteps}
                size="small"
                colors="white"
              >
                <span className="text-base-700 text-xs font-medium leading-4">
                  Next step
                </span>
              </O11yButton>
              <O11yButton
                variant="minimal"
                wrapperClassName=""
                icon={<MdArrowUpward className="text-base-700 h-4 w-4" />}
                onClick={handlePrevStep}
                disabled={activeStep <= 0}
                size="small"
                colors="white"
                iconPlacement="end"
              >
                <span className="text-base-700 text-xs font-medium leading-4">
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
                      Automate session
                    </span>
                    <MdOutlineOpenInNew className="text-base-500 h-4 w-4" />
                  </div>
                </O11yHyperlink>
              </div>
            )}
          </div>
        </div>
      </LOGS_CONTEXT.Provider>
    </div>
  );
};

LogsTab.propTypes = {};

export default LogsTab;
