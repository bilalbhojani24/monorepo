import React, { useRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import MediaPlayerLeftControls from '../MediaPlayerLeftControls';
import MediaPlayerRightControls from '../MediaPlayerRightControls';
import MediaPlayerSeekbar from '../MediaPlayerSeekbar';
import MediaPlayerStates from '../MediaPlayerStates';

import MediaPlayer from './index';

const defaultConfig = {
  title: 'Application/Components/MediaPlayer',
  component: MediaPlayer,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import MediaPlayer from 'bifrost/MediaPlayer'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/branch/4avyN0jVykJmh8eeWtrKIF/Tailwind-UI-Library?node-id=5522-83971&t=ZP89dseGupG2GMKE-0'
    }
  },
  argTypes: {
    controlPanelWrapperClassName: {
      option: { type: 'string' },
      defaultValue: ''
    },
    onPauseCallback: {
      description: 'video on pause',
      defaultValue: () => {}
    },
    onPlayCallback: {
      description: 'video on play',
      defaultValue: () => {}
    },
    onVideoError: {
      description: 'video error',
      defaultValue: () => {}
    },
    controlPanelAtBottom: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    url: {
      option: { type: 'string' },
      defaultValue: ''
    },
    wrapperClassName: {
      option: { type: 'string' },
      defaultValue: 'w-[640px] h-[360px]'
    }
  },
  controls: {}
};

export const Primary = (args) => (
  <MediaPlayer
    {...args}
    onFirstReady={(e) => console.log(e.duration, e.videoHeight, e.videoWidth)}
  >
    <MediaPlayerLeftControls
      showRewindForwardButtons
      onTimeJumpClick={() => {}}
    />
    <MediaPlayerSeekbar
      exceptions={[
        {
          id: 'marker-test',
          startTime: 2,
          type: 'warning'
        },
        {
          id: 'marker-test-2',
          startTime: 3,
          type: 'error'
        }
      ]}
      showMarkers
      onMarkerClick={() => {}}
      onSeekTime={() => {}}
    />
    <MediaPlayerRightControls
      onDownloadClick={() => {}}
      onFullScreen={() => {}}
      onPlaybackSpeedClick={() => {}}
    />
  </MediaPlayer>
);

export const WithLoadingState = (args) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && (
        <MediaPlayerStates
          variant="loading"
          wrapperClassName="w-[640px] h-[360px]"
        />
      )}
      <MediaPlayer
        {...args}
        onFirstReady={() => setIsLoading(false)}
        wrapperClassName={twClassNames({ hidden: isLoading })}
      >
        <MediaPlayerLeftControls
          showRewindForwardButtons
          onTimeJumpClick={() => {}}
        />
        <MediaPlayerSeekbar
          exceptions={[
            {
              id: 'marker-test',
              startTime: 200,
              type: 'warning'
            },
            {
              id: 'marker-test-2',
              startTime: 250,
              type: 'error'
            }
          ]}
          showMarkers
          onMarkerClick={() => {}}
          onSeekTime={() => {}}
        />
        <MediaPlayerRightControls
          onDownloadClick={() => {}}
          onFullScreen={() => {}}
          onPlaybackSpeedClick={() => {}}
        />
      </MediaPlayer>
    </>
  );
};

export const ControlsFromOutsideExample = (args) => {
  const playerRef = useRef(null);
  return (
    <>
      <MediaPlayer ref={playerRef} {...args}>
        <MediaPlayerLeftControls
          showRewindForwardButtons
          onTimeJumpClick={() => {}}
        />
        <MediaPlayerSeekbar
          showMarkers
          onMarkerClick={() => {}}
          onSeekTime={() => {}}
        />
        <MediaPlayerRightControls
          onDownloadClick={() => {}}
          onFullScreen={() => {}}
          onPlaybackSpeedClick={() => {}}
        />
      </MediaPlayer>
      <div className="relative top-16 flex flex-row">
        <Button
          type="button"
          onClick={() => playerRef.current.seekTo(10)}
          className="m-3"
        >
          seek to 10
        </Button>
        <Button
          type="button"
          onClick={() => playerRef.current.seekTo(20)}
          className="m-3"
        >
          seek to 20
        </Button>
        <Button
          type="button"
          onClick={() => playerRef.current.play()}
          className="m-3"
        >
          play
        </Button>
        <Button
          type="button"
          onClick={() => playerRef.current.pause()}
          className="m-3"
        >
          pause
        </Button>
        <Button
          type="button"
          onClick={() => console.log(playerRef.current.getCurrentTime())}
          className="m-3"
        >
          getCurrentTime
        </Button>
      </div>
    </>
  );
};

export const UsingMediaPlayerStates = (args) => {
  const [errored, setErrored] = useState(false);
  return (
    <>
      {errored ? (
        <MediaPlayerStates variant="errorState" />
      ) : (
        <MediaPlayer {...args} onVideoError={() => setErrored(true)} url="">
          <MediaPlayerLeftControls
            showRewindForwardButtons
            onTimeJumpClick={() => {}}
          />
          <MediaPlayerSeekbar
            showMarkers
            onMarkerClick={() => {}}
            onSeekTime={() => {}}
          />
          <MediaPlayerRightControls
            onDownloadClick={() => {}}
            onFullScreen={() => {}}
            onPlaybackSpeedClick={() => {}}
          />
        </MediaPlayer>
      )}
    </>
  );
};

export default defaultConfig;
