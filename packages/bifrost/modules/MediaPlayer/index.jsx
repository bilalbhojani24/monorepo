import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import MediaPlayerControlPanel from '../MediaPlayerControlPanel';

const MediaPlayer = ({
  url,
  wrapperClassName,
  controlPanelClassName,
  controlPanelStickToBottom
}) => {
  const [isPaused, setIsPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  const handlePlaybackClick = () => {
    if (isPaused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };
  const handleMoveXSeconds = (timeJump) => {
    videoRef.current.currentTime += timeJump;
  };
  const handleOnLoad = () => {
    setDuration(videoRef.current.duration);
  };
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };
  const handleSliderChange = ({ target: { value } }) => {
    videoRef.current.currentTime = value;
  };

  return (
    <div className={wrapperClassName}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={url}
        ref={videoRef}
        onLoadedMetadata={handleOnLoad}
        onTimeUpdate={handleTimeUpdate}
      />
      <MediaPlayerControlPanel
        isPaused={isPaused}
        onPlayClick={handlePlaybackClick}
        duration={Math.round(duration)}
        currentTime={Math.round(currentTime)}
        onSeekbarChange={handleSliderChange}
        onJumpXSeconds={handleMoveXSeconds}
        stickToBottom={controlPanelStickToBottom}
        wrapperClassName={controlPanelClassName}
      />
    </div>
  );
};

MediaPlayer.propTypes = {
  url: PropTypes.string,
  wrapperClassName: PropTypes.string,
  controlPanelStickToBottom: PropTypes.bool,
  controlPanelClassName: PropTypes.string
};
MediaPlayer.defaultProps = {
  url: '',
  wrapperClassName: '',
  controlPanelStickToBottom: false,
  controlPanelClassName: ''
};

export default MediaPlayer;
