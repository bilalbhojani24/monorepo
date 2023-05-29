import React from 'react';
import {
  MediaPlayer,
  MediaPlayerLeftControls,
  MediaPlayerSeekbar
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';

import useReportSidebar from './useReportSidebar';

const ReportSidebar = () => {
  const {
    sessionData,
    updateChartSeekerPosition,
    deviceVideoRef,
    pauseVideoOnManualSeek,
    onPauseClick,
    onPlayClick
  } = useReportSidebar();

  return (
    <div className="bg-base-100 h-full w-full p-2">
      <MediaPlayer
        ref={deviceVideoRef}
        wrapperClassName="rounded-lg overflow-hidden z-[9] h-full video-parent"
        url={`${IS_ELECTRON ? 'securefileprotocol://' : ''}${
          sessionData?.metadata?.video
        }`}
        controlPanelAtBottom
        controlPanelWrapperClassName={twClassNames('fixed z-[9] -ml-2', {
          'bottom-8': IS_ELECTRON
        })}
        timeUpdateCallBack={updateChartSeekerPosition}
        onPauseCallback={onPauseClick}
        onPlayCallback={onPlayClick}
      >
        <MediaPlayerLeftControls />
        <MediaPlayerSeekbar onSeekTime={pauseVideoOnManualSeek} />
      </MediaPlayer>
    </div>
  );
};

export default ReportSidebar;
