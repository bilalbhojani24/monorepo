import React from 'react';
import {
  Button,
  MdBarChart,
  MdOutlineErrorOutline
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import O11yLoader from 'common/O11yLoader/components/O11yLoader';
import { API_STATUSES } from 'constants/common';
import PropTypes from 'prop-types';

export default function PlaceHolder({
  illustration,
  text,
  metaText,
  type,
  ctaText,
  onClickCTA
}) {
  return (
    <div className="mt-5 flex h-full flex-col items-center justify-center py-0 px-5">
      {type === API_STATUSES.ERROR && (
        <div className="bg-danger-100 flex h-28 w-28 items-center justify-center rounded-full">
          <MdOutlineErrorOutline className="text-danger-300 h-16 w-16" />{' '}
        </div>
      )}
      {type === API_STATUSES.EMPTY && (
        <div className="bg-base-100 flex h-28 w-28 items-center justify-center rounded-full">
          <MdBarChart className="text-base-300 h-16 w-16" />{' '}
        </div>
      )}
      {type === API_STATUSES.LOADING && (
        <O11yLoader
          text="Fetching data"
          wrapperClassName="py-6"
          loaderClass="text-base-200 fill-base-400 w-8 h-8"
        />
      )}
      {!!illustration && (
        <>
          {React.cloneElement(illustration, {
            className: twClassNames(illustration.props.className, 'h-24 w-24')
          })}
        </>
      )}

      <div className="mt-2 flex flex-col items-center">
        <p className="flex flex-col items-center text-xs">
          <span className="font-medium">{text}</span>
          {metaText && <span className="font-medium">{metaText}</span>}
        </p>
        {ctaText && (
          <Button
            onClick={onClickCTA}
            ariaLabel={ctaText}
            wrapperClassName="mt-1"
          >
            {ctaText}
          </Button>
        )}
      </div>
    </div>
  );
}

PlaceHolder.propTypes = {
  illustration: PropTypes.node,
  text: PropTypes.string,
  metaText: PropTypes.node,
  type: PropTypes.string,
  ctaText: PropTypes.string,
  onClickCTA: PropTypes.func
};
PlaceHolder.defaultProps = {
  text: '',
  metaText: '',
  type: '',
  ctaText: '',
  illustration: '',
  onClickCTA: () => {}
};
