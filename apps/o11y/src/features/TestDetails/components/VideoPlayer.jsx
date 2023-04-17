import React, { forwardRef, useEffect } from 'react';
import {
  MediaPlayer,
  MediaPlayerLeftControls,
  MediaPlayerRightControls,
  MediaPlayerSeekbar,
  MediaPlayerStates
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';

const VideoPlayer = forwardRef(
  (
    {
      videoUrl,
      onMetadataLoaded,
      containerRef,
      isPaused,
      setIsPaused,
      exceptions,
      isLoading,
      hasError,
      onMetadataFailed,
      onPlayCallback,
      isVideoPlayed
    },
    ref
  ) => {
    const { handleLogTDInteractionEvent } = useTestDetailsContentContext();

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
      onMetadataLoaded();
    };

    const handleOnError = () => {
      onMetadataFailed();
    };

    const handleDownload = () => {
      handleLogTDInteractionEvent({
        event: 'O11yTestDetailsVideoInteracted',
        interaction: 'downloaded'
      });
    };

    const handlePlayCallback = () => {
      onPlayCallback();
      setIsPaused(false);
      handleLogTDInteractionEvent({
        event: 'O11yTestDetailsVideoInteracted',
        interaction: 'played'
      });
    };

    const handlePauseCallback = () => {
      setIsPaused(true);
      handleLogTDInteractionEvent({
        event: 'O11yTestDetailsVideoInteracted',
        interaction: 'stopped'
      });
    };

    const handleSeekChange = () => {
      handleLogTDInteractionEvent({
        event: 'O11yTestDetailsVideoInteracted',
        interaction: 'seeked'
      });
    };

    const handleSpeedChange = () => {
      handleLogTDInteractionEvent({
        event: 'O11yTestDetailsVideoInteracted',
        interaction: 'speed_changed'
      });
    };

    const handleFullscreen = () => {
      handleLogTDInteractionEvent({
        event: 'O11yTestDetailsVideoInteracted',
        interaction: 'full_size_clicked'
      });
    };

    return (
      <div ref={containerRef} className="relative flex flex-col">
        {isLoading && (
          <MediaPlayerStates
            variant="loading"
            wrapperClassName="h-full w-full"
          />
        )}
        {hasError && (
          <MediaPlayerStates
            variant="errorState"
            wrapperClassName="h-96 w-full"
            onReloadClick={() => {}}
          />
        )}
        {/* {
          isExpired && <MediaPlayerStates
          
          variant="errorAdditional"
          wrapperClassName="h-full w-full"
          />
        } */}
        <MediaPlayer
          ref={ref}
          // url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          url={videoUrl}
          onFirstReady={handleOnLoad}
          onVideoError={handleOnError}
          onPlayCallback={handlePlayCallback}
          onPauseCallback={handlePauseCallback}
          controlPanelWrapperClassName={twClassNames(
            'border border-base-200 flex-1 rounded-b overflow-hidden z-20',
            {
              'pointer-events-none': isLoading,
              hidden: hasError
            }
          )}
          controlPanelAtBottom={false}
          wrapperClassName={twClassNames(
            'rounded-t overflow-hidden [&_video]:object-cover transition-all duration-1000 ease-in overflow-hidden',
            {
              hidden: hasError,

              [`h-auto max-h-[70vh] min-h-[256px]`]: isVideoPlayed,
              'max-h-64': !isVideoPlayed
            }
          )}
        >
          <MediaPlayerLeftControls wrapperClassName="" />
          <MediaPlayerSeekbar
            exceptions={exceptions}
            showMarkers
            onMarkerClick={() => {}}
            onSeekTime={handleSeekChange}
            wrapperClassName=""
          />
          <MediaPlayerRightControls
            onDownloadClick={handleDownload}
            onFullScreen={handleFullscreen}
            onPlaybackSpeedClick={handleSpeedChange}
            wrapperClassName=""
            showAdditionalSettings
            showFullScreenOption
            showSpeedOption
          />
        </MediaPlayer>
      </div>
    );
  }
);

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  onMetadataLoaded: PropTypes.func.isRequired,
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  isPaused: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsPaused: PropTypes.func.isRequired,
  exceptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      startTime: PropTypes.number,
      type: PropTypes.string
    })
  ),
  hasError: PropTypes.bool.isRequired,
  onMetadataFailed: PropTypes.func.isRequired,
  onPlayCallback: PropTypes.func.isRequired,
  isVideoPlayed: PropTypes.bool.isRequired
};

VideoPlayer.defaultProps = {
  containerRef: null,
  exceptions: []
};

export default VideoPlayer;
