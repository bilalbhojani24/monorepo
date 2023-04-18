import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { MdError, MdReplay, MdVideocamOff } from '../Icon';
import Loader from '../Loader';

import { VARIANTS } from './const/variantConstant';

const MediaPlayerStates = ({ onReloadClick, variant, wrapperClassName }) => (
  <>
    {variant === VARIANTS[0] && (
      <div
        className={twClassNames(
          'flex justify-center items-center bg-base-100 rounded gap-1',
          wrapperClassName
        )}
      >
        <div className={twClassNames('flex flex-col items-center p-0 gap-2')}>
          <div className={twClassNames('flex flex-col items-center p-0')}>
            <MdError className="text-base-500 h-9 w-9" />
            <p
              className={twClassNames(
                'not-italic font-semibold text-base leading-5 text-center text-base-800'
              )}
            >
              Something went wrong
            </p>
          </div>
          <p
            className={twClassNames(
              'not-italic font-normal text-base leading-6 text-center text-base-600'
            )}
          >
            Something went wrong while fetching data
          </p>
          <div className={twClassNames('flex flex-row items-start p-0 gap-4')}>
            <Button
              icon={<MdReplay />}
              iconPlacement="end"
              onClick={onReloadClick}
              type="button"
              variant="minimal"
            >
              Reload
            </Button>
          </div>
        </div>
      </div>
    )}
    {variant === VARIANTS[1] && (
      <div
        className={twClassNames(
          'absolute top-0 left-0 w-full h-full bg-base-100 opacity-50 z-10 block',
          wrapperClassName
        )}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader wrapperClassName="w-9 h-9 text-base-300 fill-base-400" />
        </div>
      </div>
    )}
    {variant === VARIANTS[2] && (
      <div
        className={twClassNames(
          'flex justify-center items-center bg-base-100 rounded gap-1',
          wrapperClassName
        )}
      >
        <div
          className={twClassNames('flex flex-col items-center p-0 gap-2 w-80')}
        >
          <div className={twClassNames('flex flex-col items-center p-0')}>
            <MdVideocamOff className="text-base-500 h-9 w-9" />
            <p
              className={twClassNames(
                'not-italic font-semibold text-base leading-5 text-center text-base-800'
              )}
            >
              Video not available
            </p>
          </div>
          <p
            className={twClassNames(
              'not-italic font-normal text-base leading-6 text-center text-base-600'
            )}
          >
            This session is older than 30 days, and therefore video recording
            isn&#39;t available.
          </p>
        </div>
      </div>
    )}
  </>
);

MediaPlayerStates.propTypes = {
  onReloadClick: PropTypes.func,
  variant: PropTypes.oneOf(VARIANTS),
  wrapperClassName: PropTypes.string
};
MediaPlayerStates.defaultProps = {
  onReloadClick: () => {},
  variant: VARIANTS[0],
  wrapperClassName: ''
};

export default MediaPlayerStates;
