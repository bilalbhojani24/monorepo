import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import PropTypes from 'prop-types';

import MediaPlayerControlPanel from '../MediaPlayerControlPanel';

const MediaPlayer = forwardRef(
  (
    {
      controlPanelClassName,
      controlPanelStickToBottom,
      hoverSeekTime,
      showRewindForwardControls,
      timeUpdateCallBack,
      url,
      wrapperClassName
    },
    ref
  ) => {
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
      if (videoRef.current.currentTime >= duration) {
        setIsPaused(true);
      }
      timeUpdateCallBack?.(videoRef.current);
    };
    const handleSliderChange = ({ target: { value } }) => {
      if (videoRef.current) {
        videoRef.current.currentTime = value;
      }
    };
    useImperativeHandle(ref, () => ({
      seekToTimeStampCallBack(seekToTimeStamp) {
        if (seekToTimeStamp <= duration) {
          videoRef.current.currentTime = seekToTimeStamp;
          videoRef.current.pause();
          setIsPaused(true);
        }
      },
      play() {
        videoRef.current.play();
        setIsPaused(false);
      },
      pause() {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }));

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
          showRewindForwardButtons={showRewindForwardControls}
          hoverSeekTime={hoverSeekTime}
        />
      </div>
    );
  }
);

MediaPlayer.propTypes = {
  controlPanelStickToBottom: PropTypes.bool,
  controlPanelClassName: PropTypes.string,
  hoverSeekTime: PropTypes.number,
  showRewindForwardControls: PropTypes.bool,
  timeUpdateCallBack: PropTypes.func,
  url: PropTypes.string,
  wrapperClassName: PropTypes.string
};
MediaPlayer.defaultProps = {
  controlPanelStickToBottom: false,
  controlPanelClassName: '',
  hoverSeekTime: null,
  showRewindForwardControls: true,
  timeUpdateCallBack: () => {},
  url: '',
  wrapperClassName: ''
};

export default MediaPlayer;
