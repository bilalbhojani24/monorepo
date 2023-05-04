import React, { forwardRef, useCallback, useEffect, useMemo } from 'react';
import {
  MdFileDownload,
  MdMoreVert,
  MediaPlayer,
  MediaPlayerLeftControls,
  MediaPlayerRightControls,
  MediaPlayerSeekbar,
  MediaPlayerStates
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yButton, O11yPopover } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';

import SessionTestToggle from './SessionTestToggle';

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
      isVideoPlayed,
      isVideoExpired,
      videoFullUrl
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

    const handleDownload = useCallback(() => {
      if (videoFullUrl) {
        const link = document.createElement('a');
        link.href = videoFullUrl;
        link.download = 'video.mp4';
        link.role = 'button';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        handleLogTDInteractionEvent({
          event: 'O11yTestDetailsVideoInteracted',
          interaction: 'downloaded'
        });
      }
    }, [handleLogTDInteractionEvent, videoFullUrl]);

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

    const VideoMoreOptions = useMemo(
      () => (
        <div className="flex items-center gap-4">
          <O11yButton
            isIconOnlyButton
            icon={<MdFileDownload className="text-base-500 h-full w-full" />}
            colors="white"
            onClick={handleDownload}
            wrapperClassName="p-0 border-0 shadow-transparent h-6 w-6"
          />
          <O11yPopover
            content={<SessionTestToggle />}
            theme="light"
            arrowWidth={0}
            arrowHeight={0}
            placementAlign="end"
            placementSide="top"
            sideOffset={10}
            wrapperClassName="py-2 w-64"
            defaultOpen
          >
            <O11yButton
              isIconOnlyButton
              icon={<MdMoreVert className="text-base-500 h-full w-full" />}
              colors="white"
              onClick={() => {}}
              wrapperClassName="p-0 border-0 shadow-transparent h-6 w-6"
            />
          </O11yPopover>
        </div>
      ),
      [handleDownload]
    );

    return (
      <div
        ref={containerRef}
        className="border-base-200 relative flex flex-col rounded border"
      >
        {isLoading && (
          <MediaPlayerStates
            variant="loading"
            wrapperClassName={twClassNames('h-full w-full z-30', {
              'relative h-80': isVideoExpired
            })}
          />
        )}
        {hasError && !isVideoExpired && !isLoading && (
          <MediaPlayerStates
            variant="errorState"
            wrapperClassName="h-80 w-full"
            onReloadClick={() => {}}
          />
        )}
        {isVideoExpired && !isLoading && (
          <MediaPlayerStates
            variant="errorAdditional"
            wrapperClassName="h-80 w-full"
          />
        )}
        <MediaPlayer
          ref={ref}
          url={videoUrl}
          onFirstReady={handleOnLoad}
          onVideoError={handleOnError}
          onPlayCallback={handlePlayCallback}
          onPauseCallback={handlePauseCallback}
          controlPanelWrapperClassName={twClassNames(
            'flex-1 overflow-hidden z-20',
            {
              'pointer-events-none': isLoading,
              hidden: hasError || isVideoExpired
            }
          )}
          controlPanelAtBottom={false}
          wrapperClassName={twClassNames(
            'rounded-t overflow-hidden [&_video]:object-cover transition-all duration-300 ease-in overflow-hidden',
            {
              hidden: hasError || isVideoExpired,
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
            showAdditionalSettings={false}
            showFullScreenOption
            showSpeedOption
            customSetting={VideoMoreOptions}
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
  isVideoExpired: PropTypes.bool.isRequired,
  onMetadataFailed: PropTypes.func.isRequired,
  onPlayCallback: PropTypes.func.isRequired,
  isVideoPlayed: PropTypes.bool.isRequired,
  videoFullUrl: PropTypes.string.isRequired
};

VideoPlayer.defaultProps = {
  containerRef: null,
  exceptions: []
};

export default VideoPlayer;
