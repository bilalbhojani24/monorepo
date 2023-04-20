import React, { forwardRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import Dropdown from '../Dropdown';
import DropdownOptionGroup from '../DropdownOptionGroup';
import DropdownOptionItem from '../DropdownOptionItem';
import DropdownTrigger from '../DropdownTrigger';
import { EllipsisVerticalIcon, MdFullscreen } from '../Icon';

import {
  ADDITIONAL_SETTINGS_OPTIONS,
  PLAYBACK_SPEED_OPTIONS
} from './const/rightControlsConstants';

const MediaPlayerRightControls = forwardRef(
  (
    {
      customSetting,
      onDownloadClick,
      onFullScreen,
      onPlaybackSpeedClick,
      showAdditionalSettings,
      showFullScreenOption,
      showSpeedOption,
      wrapperClassName
    },
    ref
  ) => {
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const handlePlaybackOptionClick = (option) => {
      const newSpeed = option.value;
      setPlaybackSpeed(newSpeed);
      // no immediate solution to this eslint error
      // will pick this up later
      // eslint-disable-next-line no-param-reassign
      ref.current.getInternalPlayer().playbackRate = newSpeed;
      onPlaybackSpeedClick?.(newSpeed);
    };

    const handleFullScreenClick = () => {
      ref.current.getInternalPlayer().requestFullscreen();
      onFullScreen?.();
    };

    const handleAdditionalSettingClick = (option) => {
      if (option.body === 'Download') {
        const videoUrl = ref.current.getInternalPlayer().currentSrc;
        const link = document.createElement('a');
        link.href = videoUrl;
        link.download = 'video.mp4';
        link.role = 'button';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onDownloadClick?.();
      }
    };

    return (
      <div
        className={twClassNames(
          'flex flex-row items-center h-[62px] bg-white p-4 gap-4',
          wrapperClassName
        )}
      >
        {showSpeedOption && (
          <div className={twClassNames('p-0 w-8')}>
            <Dropdown onClick={(option) => handlePlaybackOptionClick(option)}>
              <DropdownTrigger wrapperClassName="p-0 border-0 shadow-transparent">
                {playbackSpeed}x
              </DropdownTrigger>
              <DropdownOptionGroup>
                {PLAYBACK_SPEED_OPTIONS.map((speedOption) => (
                  <DropdownOptionItem
                    option={speedOption}
                    key={speedOption.id}
                  />
                ))}
              </DropdownOptionGroup>
            </Dropdown>
          </div>
        )}
        {showFullScreenOption && (
          <div className={twClassNames('w-6 h-6')}>
            <Button
              variant="minimal"
              wrapperClassName={twClassNames('p-0 w-6 h-6')}
              isIconOnlyButton
              icon={<MdFullscreen className="text-base-500 h-6 w-6" />}
              onClick={handleFullScreenClick}
              aria-label="full screen video"
              size="large"
            />
          </div>
        )}
        {showAdditionalSettings && (
          <div className={twClassNames('w-6 h-6')}>
            <Dropdown
              onClick={(option) => handleAdditionalSettingClick(option)}
            >
              <DropdownTrigger
                wrapperClassName="p-0 border-0 shadow-transparent"
                triggerAriaLabel="additional settings"
              >
                <EllipsisVerticalIcon className="h-6 w-6" />
              </DropdownTrigger>
              <DropdownOptionGroup>
                {ADDITIONAL_SETTINGS_OPTIONS.map((settingsOption) => (
                  <DropdownOptionItem
                    option={settingsOption}
                    key={settingsOption.id}
                  />
                ))}
              </DropdownOptionGroup>
            </Dropdown>
          </div>
        )}
        {customSetting && <>{customSetting}</>}
      </div>
    );
  }
);

MediaPlayerRightControls.propTypes = {
  customSetting: PropTypes.node,
  onDownloadClick: PropTypes.func,
  onFullScreen: PropTypes.func,
  onPlaybackSpeedClick: PropTypes.func,
  showAdditionalSettings: PropTypes.bool,
  showFullScreenOption: PropTypes.bool,
  showSpeedOption: PropTypes.bool,
  wrapperClassName: PropTypes.string
};
MediaPlayerRightControls.defaultProps = {
  customSetting: null,
  onDownloadClick: () => {},
  onFullScreen: () => {},
  onPlaybackSpeedClick: () => {},
  showAdditionalSettings: true,
  showFullScreenOption: true,
  showSpeedOption: true,
  wrapperClassName: ''
};

export default MediaPlayerRightControls;