import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { MediaPlayerContextData } from '../../shared/mediaPlayerContext';
import Tooltip from '../Tooltip';
import TooltipBody from '../TooltipBody';

import Marker from './components/Marker';
import convertSecondsToTimeFormat from './utils/convertSecondsToTimeFormat';
import { getElementOffsetXRatio } from './utils/getElementOffsetXRatio';
import useMediaPlayerSeekbar from './useMediaPlayerSeekbar';

const MediaPlayerSeekbar = forwardRef(
  (
    { exceptions, showMarkers, onMarkerClick, onSeekTime, wrapperClassName },
    ref
  ) => {
    const { duration, currentTime, bufferedTime, startTime } = useContext(
      MediaPlayerContextData
    );
    const [draggingSeekbar, setDraggingSeekbar] = useState(false);
    const [hoverState, setHoverState] = useState(false);
    const [hoverSeekPosition, setHoverSeekPosition] = useState(0);
    const [hoverTime, setHoverTime] = useState(0);
    const [hoverOnWarningMarker, setHoverOnWarningMarker] = useState(false);
    const [hoverOnErrorMarker, setHoverOnErrorMarker] = useState(false);
    const durationInTimeFormat = convertSecondsToTimeFormat(duration);
    const currentTimeInTimeFormat = convertSecondsToTimeFormat(
      currentTime >= duration ? duration : currentTime
    );
    const seekbarRef = useRef(null);
    const bufferedRatio = bufferedTime / duration;
    const bufferProgress = bufferedRatio > 1 ? 100 : bufferedRatio * 100;
    const progressRatio = currentTime / duration;
    const progress = progressRatio > 1 ? 100 : progressRatio * 100;
    const { warningProgress, errorProgress } = useMediaPlayerSeekbar(
      exceptions,
      currentTime
    );

    const handleHoverSeekbarMouseMove = useCallback(
      (event) => {
        const offsetXRatio = getElementOffsetXRatio(event, seekbarRef?.current);
        setHoverSeekPosition(offsetXRatio * 100);
        setHoverTime(convertSecondsToTimeFormat(offsetXRatio * duration));
      },
      [duration]
    );

    const handleMouseEnter = (event) => {
      document.addEventListener('mousemove', handleHoverSeekbarMouseMove);
      setHoverState(true);
      const offsetXRatio = getElementOffsetXRatio(event, seekbarRef?.current);
      setHoverSeekPosition(offsetXRatio * 100);
      setHoverTime(convertSecondsToTimeFormat(offsetXRatio * duration));
    };

    useEffect(() => {
      if (!hoverState)
        document.removeEventListener('mousemove', handleHoverSeekbarMouseMove);
    }, [hoverState, handleHoverSeekbarMouseMove]);

    const handleMouseLeave = () => {
      setHoverState(false);
    };

    const handleSeekbarDrag = (event) => {
      const offsetXRatio = getElementOffsetXRatio(event, seekbarRef?.current);
      const timeStampDefault = offsetXRatio * duration;
      let finalTimeStamp = timeStampDefault;
      if (startTime) {
        finalTimeStamp = timeStampDefault + startTime;
      }
      ref.current.seekTo(finalTimeStamp);
      onSeekTime?.();
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

    const handleMarkerMouseEvent = (event, IsEntering) => {
      const markerType = event.target.dataset.markertype;
      if (markerType === 'warning') {
        setHoverOnWarningMarker(IsEntering);
      } else if (markerType === 'error') {
        setHoverOnErrorMarker(IsEntering);
      }
    };

    return (
      <div
        className={twClassNames(
          'flex flex-row items-center p-4 gap-4 h-[62px] w-full bg-white',
          wrapperClassName
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
                'relative rounded-full bg-base-200 h-2 w-full cursor-pointer'
              )}
              ref={seekbarRef}
              onMouseDown={handleSeekbarMouseDown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={twClassNames('h-2 rounded-full bg-base-300')}
                style={{ width: `calc(${bufferProgress}%)` }}
              />
              <div
                className={twClassNames(
                  'absolute top-0 h-2 rounded-l-full bg-brand-600'
                )}
                style={{ width: `calc(${progress}% - 2px)` }}
              />
              {showMarkers && (
                <div className={twClassNames('absolute top-0 w-full h-2')}>
                  {exceptions?.map(
                    (exception) =>
                      exception.startTime <= duration && (
                        <Marker
                          key={`marker_${exception.id}`}
                          startTime={exception.startTime}
                          duration={duration}
                          type={exception.type}
                          onMarkerMouseEnter={(e) =>
                            handleMarkerMouseEvent(e, true)
                          }
                          onMarkerMouseLeave={(e) =>
                            handleMarkerMouseEvent(e, false)
                          }
                          onMarkerClick={onMarkerClick}
                        />
                      )
                  )}
                </div>
              )}
              {!draggingSeekbar && (
                <div
                  className={twClassNames(
                    'absolute top-0 -mt-1.5 ml-0.5 h-5 w-1 rounded-full bg-brand-600',
                    {
                      'bg-attention-400': warningProgress,
                      'bg-danger-600': errorProgress
                    }
                  )}
                  style={{
                    marginLeft: progress === 0 ? '' : `calc(${progress}% - 2px)`
                  }}
                />
              )}
              {draggingSeekbar && (
                <div
                  className={twClassNames(
                    '-mt-3.5 ml-0.5 h-5 w-2.5 rounded-full bg-brand-600 flex flex-row flex-wrap justify-center items-center'
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
              {hoverState && !draggingSeekbar ? (
                <div
                  className={twClassNames(
                    'absolute -mt-3.5 h-5 w-2.5 rounded-full bg-base-400 flex flex-row flex-wrap justify-center items-center',
                    {
                      'bg-attention-400': hoverOnWarningMarker,
                      'bg-danger-600': hoverOnErrorMarker
                    }
                  )}
                  style={{ marginLeft: `calc(${hoverSeekPosition}% - 4px` }}
                >
                  <Tooltip
                    show
                    content={
                      <TooltipBody wrapperClassName="px-1 mb-0 text-xs">
                        {hoverTime}
                      </TooltipBody>
                    }
                    wrapperClassName="py-1 px-1.5"
                    arrowClassName="w-0 h-0"
                    size="xs"
                    placementSide="top"
                    triggerWrapperClassName="block"
                    triggerAriaLabel="seekbar time"
                    theme="dark"
                  >
                    <div
                      className={twClassNames(
                        'mx-auto h-[1rem] w-1 rounded-full bg-white'
                      )}
                    />
                  </Tooltip>
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
    );
  }
);

MediaPlayerSeekbar.propTypes = {
  exceptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      startTime: PropTypes.number,
      type: PropTypes.oneOf(['warning', 'error'])
    })
  ),
  onMarkerClick: PropTypes.func,
  onSeekTime: PropTypes.func,
  showMarkers: PropTypes.bool,
  wrapperClassName: PropTypes.string
};
MediaPlayerSeekbar.defaultProps = {
  exceptions: [],
  onMarkerClick: () => {},
  onSeekTime: () => {},
  showMarkers: true,
  wrapperClassName: ''
};

export default MediaPlayerSeekbar;
