import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import O11yLoader from 'common/O11yLoader';

import { LOGS_CONTEXT } from '../contexts/LogsContext';
import { getTestMeta } from '../slices/selectors';

import TestsLogsInfoTabs from './TestsLogsInfoTabs';
import TestVideoPlayer from './TestVideoPlayer';
// import PropTypes from 'prop-types';

const SCROLL_OFFSET = 200;

const LogsTab = () => {
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const floatingVideoComponentRef = useRef(null);
  const testMeta = useSelector(getTestMeta);
  const [sessionTestToggle, setSessionTestToggle] = useState(false);
  const [videoSeekTime, setVideoSeekTime] = useState(-1);

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

  if (testMeta.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <O11yLoader />
      </div>
    );
  }

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-y-auto"
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
          handleLogDurationClick
        }}
      >
        <TestVideoPlayer
          videoRef={videoRef}
          floatingVideoRef={floatingVideoComponentRef}
        />
        <TestsLogsInfoTabs />
      </LOGS_CONTEXT.Provider>
    </div>
  );
};

LogsTab.propTypes = {};

export default LogsTab;
