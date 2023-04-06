import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import ReactPlayer from 'react-player';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { MediaPlayerContextData } from '../../shared/mediaPlayerContext';

const MediaPlayer = forwardRef(
  (
    {
      children,
      controlPanelWrapperClassName,
      onPauseCallback,
      onPlayCallback,
      onVideoError,
      controlPanelAtBottom,
      url,
      wrapperClassName
    },
    ref
  ) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [bufferedTime, setBufferedTime] = useState(0);
    const videoRef = useRef(null);

    const handleDuration = (videoDuration) => {
      setDuration(videoDuration);
    };

    const handleProgress = () => {
      setCurrentTime(videoRef.current.getCurrentTime());
      const { buffered } = videoRef.current.getInternalPlayer();
      if (buffered.length) {
        setBufferedTime(buffered.end(buffered.length - 1));
      }
    };

    const handleOnPlay = () => {
      if (!isPlaying) setIsPlaying(true);
      onPlayCallback?.();
    };

    const handleOnPause = () => {
      if (isPlaying) setIsPlaying(false);
      onPauseCallback?.();
    };

    useImperativeHandle(ref, () => ({
      seekTo(timeStamp) {
        if (timeStamp <= duration) {
          videoRef.current.seekTo(timeStamp);
        }
      },
      play() {
        setIsPlaying(true);
      },
      pause() {
        setIsPlaying(false);
      }
    }));

    const modifiedChildren = React.Children.map(children, (child) => {
      // If child is not a DOM element, return it as-is
      if (!React.isValidElement(child)) {
        return child;
      }

      // Clone the child element and add the ref to it
      return React.cloneElement(child, { ref: videoRef });
    });

    return (
      <div className={wrapperClassName}>
        <ReactPlayer
          url={url}
          ref={videoRef}
          playing={isPlaying}
          onPlay={handleOnPlay}
          onPause={handleOnPause}
          // onBuffer={}
          // onSeek={}
          onError={() => onVideoError()}
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
        <MediaPlayerContextData.Provider
          value={{ duration, currentTime, bufferedTime }}
        >
          <div
            className={twClassNames(
              'box-border flex flex-row items-start p-0 h-[62px] w-full',
              {
                'fixed bottom-0': controlPanelAtBottom
              },
              controlPanelWrapperClassName
            )}
          >
            {modifiedChildren}
          </div>
        </MediaPlayerContextData.Provider>
      </div>
    );
  }
);

MediaPlayer.propTypes = {
  children: PropTypes.node,
  controlPanelWrapperClassName: PropTypes.string,
  onPauseCallback: PropTypes.func,
  onPlayCallback: PropTypes.func,
  onVideoError: PropTypes.func,
  controlPanelAtBottom: PropTypes.bool,
  url: PropTypes.string,
  wrapperClassName: PropTypes.string
};
MediaPlayer.defaultProps = {
  children: null,
  controlPanelWrapperClassName: '',
  onPauseCallback: null,
  onPlayCallback: null,
  onVideoError: null,
  controlPanelAtBottom: true,
  url: '',
  wrapperClassName: ''
};

export default MediaPlayer;
