import React, { useRef } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import MediaPlayerLeftControls from '../MediaPlayerLeftControls';
import MediaPlayerRightControls from '../MediaPlayerRightControls';
import MediaPlayerSeekbar from '../MediaPlayerSeekbar';

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
      defaultValue:
        'https://app-automate.browserstack.com/s3-upload/bs-video-logs-aps/s3.ap-south-1/22028ca3dc54910bc630b841f1336b4a9ad49083/video-22028ca3dc54910bc630b841f1336b4a9ad49083.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2XUQHUQMLGDEA5FL%2F20230403%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230403T182818Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=63da7b07800296eaaf0f9997481ef7af16714e61045beb963c46430eed1c2c72#t=10,150'
    },
    wrapperClassName: {
      option: { type: 'string' },
      defaultValue: 'w-[640px] h-[360px]'
    }
  },
  controls: {}
};

export const Primary = (args) => (
  <MediaPlayer {...args}>
    <MediaPlayerLeftControls
      showRewindForwardButtons
      onTimeJumpClick={() => {}}
      wrapperClassName=""
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
      wrapperClassName=""
    />
    <MediaPlayerRightControls
      onDownloadClick={() => {}}
      onFullScreen={() => {}}
      onPlaybackSpeedClick={() => {}}
      wrapperClassName=""
    />
  </MediaPlayer>
);

export const ControlsFromOutsideExample = (args) => {
  const playerRef = useRef(null);
  return (
    <>
      <MediaPlayer ref={playerRef} {...args}>
        <MediaPlayerLeftControls
          showRewindForwardButtons
          onTimeJumpClick={() => {}}
          wrapperClassName=""
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
          wrapperClassName=""
        />
        <MediaPlayerRightControls
          onDownloadClick={() => {}}
          onFullScreen={() => {}}
          onPlaybackSpeedClick={() => {}}
          wrapperClassName=""
        />
      </MediaPlayer>
      <div className="relative top-16 flex flex-row">
        <button
          type="button"
          onClick={() => playerRef.current.seekTo(10)}
          className="m-3"
        >
          seek to 10
        </button>
        <button
          type="button"
          onClick={() => playerRef.current.seekTo(20)}
          className="m-3"
        >
          seek to 20
        </button>
        <button
          type="button"
          onClick={() => playerRef.current.play()}
          className="m-3"
        >
          play
        </button>
        <button
          type="button"
          onClick={() => playerRef.current.pause()}
          className="m-3"
        >
          pause
        </button>
      </div>
    </>
  );
};

export default defaultConfig;
