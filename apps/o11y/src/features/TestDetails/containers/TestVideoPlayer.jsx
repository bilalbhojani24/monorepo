import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLatestRef } from '@browserstack/hooks';
import { twClassNames } from '@browserstack/utils';
import O11yLoader from 'common/O11yLoader';
import { BSTACK_TOPNAV_ELEMENT_ID } from 'constants/common';
import isEmpty from 'lodash/isEmpty';

import DraggableComponent from '../components/DraggableComponent';
import VideoPlayer from '../components/VideoPlayer';
import { TEST_DETAILS_SLIDEOVER_ELEMENT_ID } from '../constants';
import { useLogsContext } from '../contexts/LogsContext';
import { clearTestDetails, getTestDetailsData } from '../slices/dataSlice';
import {
  getCurrentTestRunId,
  getExceptions,
  getTestDetails
} from '../slices/selectors';
import { clearExceptions } from '../slices/uiSlice';

const TestVideoPlayer = () => {
  const dispatch = useDispatch();
  const currentTestRunId = useSelector(getCurrentTestRunId);
  const details = useSelector(getTestDetails);
  const exceptions = useSelector(getExceptions);
  const { sessionTestToggle } = useLogsContext();

  const [videoSeekTime, setVideoSeekTime] = useState(-1);
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);
  const [isMainVideoPaused, setIsMainVideoPaused] = useState(true);
  const [isFloatingVideoPaused, setIsFloatingVideoPaused] = useState(true);
  const [isVideoMetaLoaded, setIsVideoMetaLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [floatingVideoRightOffset, setFloatingVideoRightOffset] = useState(700);
  const [floatingVideoTopOffset, setFloatingVideoTopOffset] = useState(0);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const floatingVideoComponentRef = useRef(null);

  useEffect(() => {
    if (currentTestRunId) {
      setVideoSeekTime(-1);
      dispatch(clearExceptions());
      dispatch(
        getTestDetailsData({
          testRunId: currentTestRunId
        })
      );
    }
    return () => {
      dispatch(clearTestDetails());
    };
  }, [dispatch, currentTestRunId]);

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

  const videoUrl = useMemo(
    () =>
      `${details.data.videoLogs?.url}${
        sessionTestToggle
          ? ''
          : `#t=${Math.floor(
              details.data.videoLogs?.startOffset / 1000
            )},${Math.ceil(details.data.videoLogs?.finishOffset / 1000)}`
      }`,
    [
      details.data.videoLogs?.finishOffset,
      details.data.videoLogs?.startOffset,
      details.data.videoLogs?.url,
      sessionTestToggle
    ]
  );

  const handleNormalVideoToPiPSync = () => {
    const videoComponent = videoRef.current;
    const floatingVideoComponent = floatingVideoComponentRef.current;
    if (videoComponent && floatingVideoComponent) {
      floatingVideoComponent.seekTo(videoComponent.getCurrentTime());
      if (isMainVideoPaused) {
        setIsFloatingVideoPaused(true);
      } else {
        setIsFloatingVideoPaused(false);
      }
      setIsMainVideoPaused(true);
    }
  };

  const handlePiPtoNormalVideoSync = () => {
    const videoComponent = videoRef.current;
    const floatingVideoComponent = floatingVideoComponentRef.current;
    if (videoComponent && floatingVideoComponent) {
      videoComponent.seekTo(floatingVideoComponent.getCurrentTime());
      if (isFloatingVideoPaused) {
        setIsMainVideoPaused(true);
      } else {
        setIsMainVideoPaused(false);
      }
      setIsFloatingVideoPaused(true);
    }
  };

  const hideOverlay = () => {
    setShowOverlay(false);
  };

  const handleMetadataLoaded = () => {
    setIsVideoMetaLoaded(true);
  };

  const handleFloatingVideoClose = () => {
    handlePiPtoNormalVideoSync();
    setShowFloatingWindow(false);
  };

  const handleFloatingVideoShow = () => {
    if (!isVideoMetaLoaded) {
      return;
    }
    handleNormalVideoToPiPSync();
    setShowFloatingWindow(true);
  };

  const observerCb = useLatestRef((entries) => {
    const fullscreenElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    // isIntersecting is true when element and viewport are overlapping
    // isIntersecting is false when element and viewport don't overlap
    if (
      entries[0].isIntersecting === true &&
      !fullscreenElement &&
      showFloatingWindow
    ) {
      handleFloatingVideoClose();
    } else if (entries[0].isIntersecting !== true && !fullscreenElement) {
      handleFloatingVideoShow();
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => observerCb.current(entries),
      { threshold: [0] }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [observerCb, containerRef, videoUrl]);

  if (details.isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <O11yLoader />
      </div>
    );
  }

  if (isEmpty(details.data?.videoLogs)) {
    return null;
  }

  return (
    <div>
      <VideoPlayer
        ref={videoRef}
        containerRef={containerRef}
        videoUrl={videoUrl}
        videoSeekTime={videoSeekTime}
        onMetadataLoaded={handleMetadataLoaded}
        isPaused={isMainVideoPaused}
        setIsPaused={setIsMainVideoPaused}
        showOverlay={showOverlay}
        hideOverlay={hideOverlay}
        exceptions={exceptions}
        isVideoMetaLoaded={isVideoMetaLoaded}
      />
      <DraggableComponent
        closeFloatingVideo={handleFloatingVideoClose}
        className={twClassNames('w-auto', {
          hidden: !showFloatingWindow || !isVideoMetaLoaded
        })}
        style={{
          right: floatingVideoRightOffset,
          top: floatingVideoTopOffset,
          width: window.innerWidth - floatingVideoRightOffset
        }}
      >
        <VideoPlayer
          ref={floatingVideoComponentRef}
          videoUrl={videoUrl}
          videoSeekTime={videoSeekTime}
          onMetadataLoaded={() => {}}
          isPaused={isFloatingVideoPaused}
          setIsPaused={setIsFloatingVideoPaused}
          showOverlay={showOverlay}
          hideOverlay={hideOverlay}
          exceptions={exceptions}
          isVideoMetaLoaded={isVideoMetaLoaded}
        />
      </DraggableComponent>
    </div>
  );
};

export default TestVideoPlayer;
