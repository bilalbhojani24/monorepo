import React, { forwardRef, useEffect, useState } from 'react';
import { O11yMediaPlayerControlPanel } from 'common/bifrostProxy';
// import O11yLoader from 'common/O11yLoader';
import PropTypes from 'prop-types';

const VideoPlayer = forwardRef(
  (
    {
      videoSeekTime,
      videoUrl,
      onMetadataLoaded,
      containerRef,
      isPaused,
      setIsPaused
      // showOverlay,
      // hideOverlay,
      // isVideoMetaLoaded
    },
    ref
  ) => {
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
      if (ref.current) {
        if (isPaused) {
          ref.current.pause();
        } else {
          ref.current.play();
        }
      }
    }, [isPaused, ref]);

    const handleOnLoad = () => {
      setDuration(ref.current.duration);
      onMetadataLoaded();
    };

    const handleTimeUpdate = () => {
      setCurrentTime(ref.current.currentTime);
      if (ref.current.currentTime >= duration) {
        setIsPaused(true);
      }
      // timeUpdateCallBack?.(videoRef.current);
    };

    const handlePlaybackClick = () => {
      if (isPaused) {
        setIsPaused(false);
        ref.current?.play();
      } else {
        setIsPaused(true);
        ref.current?.pause();
      }
    };
    const handleSliderChange = ({ target: { value } }) => {
      if (ref.current) {
        // eslint-disable-next-line no-param-reassign
        ref.current.currentTime = value;
      }
    };

    const handleMoveXSeconds = () => {};

    return (
      <>
        <div ref={containerRef} className="relative flex flex-col">
          {/* {!isVideoMetaLoaded && (
            <div className="bg-base-800 absolute top-0 left-0 z-30 h-full w-full">
              <O11yLoader isOverlayed wrapperClassName="h-full" />
            </div>
          )} */}
          {/* {isVideoMetaLoaded && showOverlay && (
            <div className="bg-base-900 absolute top-0 left-0 z-30 h-full w-full opacity-60">
              <button
                type="button"
                onClick={hideOverlay}
                className="h-full w-full"
              >
                overlay
              </button>
            </div>
          )} */}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src={videoUrl}
            ref={ref}
            onLoadedMetadata={handleOnLoad}
            onTimeUpdate={handleTimeUpdate}
            className="h-80 w-full object-fill"
          />

          <O11yMediaPlayerControlPanel
            isPaused={isPaused}
            onPlayClick={handlePlaybackClick}
            duration={Math.round(duration)}
            currentTime={Math.round(currentTime)}
            onSeekbarChange={handleSliderChange}
            onJumpXSeconds={handleMoveXSeconds}
            stickToBottom
            wrapperClassName=""
            showRewindForwardButtons={false}
            hoverSeekTime={videoSeekTime}
          />
        </div>
      </>
    );
  }
);

VideoPlayer.propTypes = {
  videoSeekTime: PropTypes.number.isRequired,
  videoUrl: PropTypes.string.isRequired,
  onMetadataLoaded: PropTypes.func.isRequired,
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  isPaused: PropTypes.bool.isRequired,
  setIsPaused: PropTypes.func.isRequired
  // showOverlay: PropTypes.bool.isRequired,
  // hideOverlay: PropTypes.func.isRequired,
  // isVideoMetaLoaded: PropTypes.bool.isRequired
};

VideoPlayer.defaultProps = {
  containerRef: null
};

export default VideoPlayer;
