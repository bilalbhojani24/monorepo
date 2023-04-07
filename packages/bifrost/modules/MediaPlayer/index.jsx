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
import Loader from '../Loader';

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
    const [isBuffering, setIsBuffering] = useState(false);
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

    const handleBuffering = () => {
      setIsBuffering(true);
    };
    const handleReady = () => {
      setIsBuffering(false);
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
      <div className={twClassNames('relative', wrapperClassName)}>
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          ref={videoRef}
          playing={isPlaying}
          onPlay={handleOnPlay}
          onPause={handleOnPause}
          onBuffer={handleBuffering}
          onReady={handleReady}
          onError={() => onVideoError()}
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
        {isBuffering && (
          <div
            className={twClassNames(
              'absolute top-0 left-0 w-full h-full bg-base-400 opacity-50 z-10 block'
            )}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader wrapperClassName="w-6 h-6" />
            </div>
          </div>
        )}
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
