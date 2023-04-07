import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { MdError, MdReplay } from '../Icon';

const MediaPlayerErrorState = ({ wrapperClassName }) => (
  <div
    className={twClassNames(
      'flex justify-center items-center bg-base-200 rounded gap-1',
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
          onClick={() => {}}
          type="button"
          variant="minimal"
        >
          Reload
        </Button>
      </div>
    </div>
  </div>
);

MediaPlayerErrorState.propTypes = {
  wrapperClassName: PropTypes.string
};
MediaPlayerErrorState.defaultProps = {
  wrapperClassName: ''
};

export default MediaPlayerErrorState;
