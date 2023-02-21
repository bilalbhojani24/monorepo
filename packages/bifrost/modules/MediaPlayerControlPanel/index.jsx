import React, { useCallback, useEffect, useRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { MdForward10, MdPause, MdPlayArrow, MdReplay10 } from '../Icon';

import convertSecondsToTimeFormat from './utils/convertSecondsToTimeFormat';
import { getElementOffsetXRatio } from './utils/getElementOffsetXRatio';

const MediaPlayerControlPanel = ({
  isPaused,
  currentTime,
  duration,
  onPlayClick,
  onSeekbarChange,
  onJumpXSeconds,
  showRewindForwardButtons,
  wrapperClassName,
  stickToBottom
}) => {
  const [draggingSeekbar, setDraggingSeekbar] = useState(false);
  const durationInTimeFormat = convertSecondsToTimeFormat(duration);
  const currentTimeInTimeFormat = convertSecondsToTimeFormat(currentTime);
  const seekbarRef = useRef(null);
  const progress = (currentTime / duration) * 100;

  const handleRewindClick = () => {
    onJumpXSeconds(-10);
  };
  const handleForwardClick = () => {
    onJumpXSeconds(10);
  };

  const handleSeekbarDrag = useCallback(
    (event) => {
      const offsetXRatio = getElementOffsetXRatio(event, seekbarRef?.current);
      onSeekbarChange({ target: { value: offsetXRatio * duration } });
    },
    [duration, onSeekbarChange]
  );

  const handleSeekbarMouseMove = useCallback(
    (event) => {
      handleSeekbarDrag(event);
    },
    [handleSeekbarDrag]
  );

  const handleSeekbarMouseUp = useCallback(
    (event) => {
      setDraggingSeekbar(false);
      handleSeekbarDrag(event);
    },
    [handleSeekbarDrag]
  );

  const handleSeekbarMouseDown = () => {
    document.addEventListener('mousemove', handleSeekbarMouseMove);
    document.addEventListener('mouseup', handleSeekbarMouseUp);
    setDraggingSeekbar(true);
  };

  useEffect(() => {
    if (!draggingSeekbar) {
      document.removeEventListener('mousemove', handleSeekbarMouseMove);
      document.removeEventListener('mouseup', handleSeekbarMouseUp);
    }
  }, [draggingSeekbar, handleSeekbarMouseMove, handleSeekbarMouseUp]);

  return (
    <div
      className={twClassNames(
        'box-border flex flex-row items-start p-0 h-[62px] w-full',
        {
          'sticky bottom-0': stickToBottom
        },
        wrapperClassName
      )}
    >
      <div
        className={twClassNames(
          'flex flex-row items-center h-[62px] bg-white py-2.5 px-4 gap-4 border-r border-solid border-[#d1d5db]'
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
              icon={<MdReplay10 className="text-base-500 h-5 w-5" />}
              onClick={handleRewindClick}
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
            onClick={onPlayClick}
            className={twClassNames(
              'flex flex-row justify-center items-center p-[9px] w-[42px] h-[42px] rounded-3xl bg-base-900 shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
            )}
          >
            {isPaused ? (
              <MdPlayArrow className="text-white" />
            ) : (
              <MdPause className="text-white" />
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
              icon={<MdForward10 className="text-base-500 h-5 w-5" />}
              onClick={handleForwardClick}
            />
          </div>
        )}
      </div>
      <div
        className={twClassNames(
          'flex flex-row items-center p-4 gap-4 h-[62px] w-full bg-white'
        )}
      >
        <div
          className={twClassNames(
            'flex flex-row items-start p-0 h-3.5 gap-4 w-full'
          )}
        >
          <p
            className={twClassNames(
              'h-3 not-italic font-normal text-xs leading-3 text-black'
            )}
          >
            {currentTimeInTimeFormat}
          </p>
          <div
            role="presentation"
            className={twClassNames(
              'flex flex-auto rounded-full bg-base-300 h-2 w-max cursor-pointer'
            )}
            ref={seekbarRef}
            onMouseDown={handleSeekbarMouseDown}
          >
            <div
              className={twClassNames(
                'h-2 flex-none rounded-l-full bg-[#0070f0]'
              )}
              style={{ width: `calc(${progress}% - 6px)` }}
            />
            <div
              className={twClassNames(
                '-my-[0.3125rem] ml-0.5 h-[1.125rem] w-1 rounded-full bg-[#0070f0]'
              )}
            />
          </div>
          <p
            className={twClassNames(
              'h-3 not-italic font-normal text-xs leading-3 text-black'
            )}
          >
            {durationInTimeFormat}
          </p>
        </div>
      </div>
    </div>
  );
};

MediaPlayerControlPanel.propTypes = {
  isPaused: PropTypes.bool,
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  onPlayClick: PropTypes.func.isRequired,
  onSeekbarChange: PropTypes.func.isRequired,
  onJumpXSeconds: PropTypes.func,
  showRewindForwardButtons: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  stickToBottom: PropTypes.bool
};
MediaPlayerControlPanel.defaultProps = {
  isPaused: false,
  currentTime: 0,
  duration: 0,
  onJumpXSeconds: () => {},
  showRewindForwardButtons: false,
  wrapperClassName: '',
  stickToBottom: true
};

export default MediaPlayerControlPanel;
