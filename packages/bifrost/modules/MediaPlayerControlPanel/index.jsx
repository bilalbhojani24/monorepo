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
  stickToBottom,
  hoverSeekTime
}) => {
  const [draggingSeekbar, setDraggingSeekbar] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [hoverSeekPosition, setHoverSeekPosition] = useState(0);
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

  const handleHoverSeekbarMouseMove = useCallback((event) => {
    const offsetXRatio = getElementOffsetXRatio(event, seekbarRef?.current);
    setHoverSeekPosition(offsetXRatio * 100);
  }, []);

  const handleMouseEnter = (event) => {
    document.addEventListener('mousemove', handleHoverSeekbarMouseMove);
    setHoverState(true);
    const offsetXRatio = getElementOffsetXRatio(event, seekbarRef?.current);
    setHoverSeekPosition(offsetXRatio * 100);
  };

  useEffect(() => {
    if (!hoverState) {
      document.removeEventListener('mousemove', handleHoverSeekbarMouseMove);
    }
  }, [hoverState, handleHoverSeekbarMouseMove]);

  const handleMouseLeave = () => {
    setHoverState(false);
  };

  const handleSeekbarDrag = (event) => {
    const offsetXRatio = getElementOffsetXRatio(event, seekbarRef?.current);
    onSeekbarChange({ target: { value: offsetXRatio * duration } });
  };

  const handleSeekbarMouseMove = (event) => {
    handleSeekbarDrag(event);
  };

  const handleSeekbarMouseUp = (event) => {
    setDraggingSeekbar(false);
    handleSeekbarDrag(event);
    document.removeEventListener('mousemove', handleSeekbarMouseMove);
    document.removeEventListener('mouseup', handleSeekbarMouseUp);
  };

  const handleSeekbarMouseDown = () => {
    document.addEventListener('mousemove', handleSeekbarMouseMove);
    document.addEventListener('mouseup', handleSeekbarMouseUp);
    setDraggingSeekbar(true);
  };

  useEffect(() => {
    if (hoverSeekTime <= duration) {
      setHoverSeekPosition((hoverSeekTime / duration) * 100);
    }
  }, [duration, hoverSeekTime]);

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
            aria-label="play/pause"
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
          <div className={twClassNames('flex w-full')}>
            <div
              role="presentation"
              className={twClassNames(
                'rounded-full bg-base-300 h-2 w-full cursor-pointer'
              )}
              ref={seekbarRef}
              onMouseDown={handleSeekbarMouseDown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={twClassNames('h-2 rounded-l-full bg-[#0070f0]')}
                style={{ width: `calc(${progress}% - 6px)` }}
              />
              {!draggingSeekbar && (
                <div
                  className={twClassNames(
                    '-mt-3.5 ml-0.5 h-5 w-1 rounded-full bg-[#0070f0]'
                  )}
                  style={{
                    marginLeft: progress === 0 ? '' : `calc(${progress}% - 4px`
                  }}
                />
              )}
              {draggingSeekbar && (
                <div
                  className={twClassNames(
                    '-mt-3.5 ml-0.5 h-5 w-2.5 rounded-full bg-[#0070f0] flex flex-row flex-wrap justify-center items-center'
                  )}
                  style={{ marginLeft: `calc(${hoverSeekPosition}% - 4px` }}
                >
                  <div
                    className={twClassNames(
                      'mx-auto h-[1rem] w-1 rounded-full bg-white'
                    )}
                  />
                </div>
              )}
              {(hoverState && !draggingSeekbar) || hoverSeekTime ? (
                <div
                  className={twClassNames(
                    '-mt-5 h-5 w-2.5 rounded-full bg-base-400 flex flex-row flex-wrap justify-center items-center'
                  )}
                  style={{ marginLeft: `calc(${hoverSeekPosition}% - 4px` }}
                >
                  <div
                    className={twClassNames(
                      'mx-auto h-[1rem] w-1 rounded-full bg-white'
                    )}
                  />
                </div>
              ) : null}
            </div>
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
  stickToBottom: PropTypes.bool,
  hoverSeekTime: PropTypes.number
};
MediaPlayerControlPanel.defaultProps = {
  isPaused: false,
  currentTime: 0,
  duration: 0,
  onJumpXSeconds: () => {},
  showRewindForwardButtons: false,
  wrapperClassName: '',
  stickToBottom: true,
  hoverSeekTime: null
};

export default MediaPlayerControlPanel;
