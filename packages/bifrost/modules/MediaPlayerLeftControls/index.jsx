import React, { forwardRef, useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { MediaPlayerContextData } from '../../shared/mediaPlayerContext';
import Button from '../Button';
import { MdForward10, MdPause, MdPlayArrow, MdReplay10 } from '../Icon';

const MediaPlayerLeftControls = forwardRef(
  (
    {
      showRewindForwardButtons,
      onForwardClick,
      onRewindClick,
      wrapperClassName
    },
    ref
  ) => {
    const { currentTime, duration, endTime, startTime } = useContext(
      MediaPlayerContextData
    );
    const handlePlayPauseClick = () => {
      if (ref.current?.player?.isPlaying) {
        ref.current.getInternalPlayer().pause();
      } else {
        ref.current.getInternalPlayer().play();
      }
    };

    const handleRewindClick = (timeJump) => {
      if (startTime && currentTime - timeJump < startTime) {
        ref.current.seekTo(startTime);
      } else if (currentTime - timeJump < 0) {
        ref.current.seekTo(0);
      } else {
        ref.current.seekTo(currentTime - timeJump);
      }
      onRewindClick?.();
    };

    const handleForwardClick = (timeJump) => {
      if (endTime && currentTime + timeJump > endTime) {
        ref.current.seekTo(endTime);
      } else if (currentTime + timeJump > duration) {
        ref.current.seekTo(duration);
      } else {
        ref.current.seekTo(currentTime + timeJump);
      }
      onForwardClick?.();
    };

    return (
      <div
        className={twClassNames(
          'flex flex-row items-center h-[62px] bg-white py-2.5 px-4 gap-4 border-r border-solid border-[#d1d5db]',
          wrapperClassName
        )}
      >
        {showRewindForwardButtons && (
          <div
            className={twClassNames('flex flex-row items-start p-0 w-6 h-6')}
          >
            <Button
              variant="minimal"
              wrapperClassName={twClassNames(
                'flex flex-row justify-center items-center p-0 w-6 h-6'
              )}
              isIconOnlyButton
              icon={<MdReplay10 className="text-base-500 h-6 w-6" />}
              onClick={() => handleRewindClick(10)}
              aria-label="rewind 10 sec"
              size="large"
            />
          </div>
        )}
        <div
          className={twClassNames(
            'flex flex-row justify-center items-center h-[42px] p-0'
          )}
        >
          <button
            type="button"
            onClick={handlePlayPauseClick}
            className={twClassNames(
              'flex flex-row justify-center items-center p-[9px] w-[42px] h-[42px] rounded-3xl bg-base-900 shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
            )}
            aria-label="toggle play pause video"
          >
            {ref?.current?.player?.isPlaying ? (
              <MdPause className="text-white" />
            ) : (
              <MdPlayArrow className="text-white" />
            )}
          </button>
        </div>
        {showRewindForwardButtons && (
          <div
            className={twClassNames('flex flex-row items-start p-0 w-6 h-6')}
          >
            <Button
              variant="minimal"
              wrapperClassName={twClassNames(
                'flex flex-row justify-center items-center p-0 w-6 h-6'
              )}
              isIconOnlyButton
              icon={<MdForward10 className="text-base-500 h-6 w-6" />}
              onClick={() => handleForwardClick(10)}
              aria-label="forward 10 sec"
              size="large"
            />
          </div>
        )}
      </div>
    );
  }
);

MediaPlayerLeftControls.propTypes = {
  showRewindForwardButtons: PropTypes.bool,
  onForwardClick: PropTypes.func,
  onRewindClick: PropTypes.func,
  wrapperClassName: PropTypes.string
};
MediaPlayerLeftControls.defaultProps = {
  showRewindForwardButtons: false,
  onForwardClick: () => {},
  onRewindClick: () => {},
  wrapperClassName: ''
};

export default MediaPlayerLeftControls;
