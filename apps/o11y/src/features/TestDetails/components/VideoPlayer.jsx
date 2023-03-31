import React, { forwardRef, useEffect, useState } from 'react';
import { O11yMediaPlayerControlPanel } from 'common/bifrostProxy';
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
      <div ref={containerRef}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src={videoUrl}
          ref={ref}
          onLoadedMetadata={handleOnLoad}
          onTimeUpdate={handleTimeUpdate}
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
};

VideoPlayer.defaultProps = {
  containerRef: null
};

export default VideoPlayer;
