import React from 'react';
import {
  Button,
  MdBarChart,
  MdOutlineErrorOutline
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import O11yLoader from 'common/O11yLoader/components/O11yLoader';
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
    <div className="flex flex-col py-0 px-5">
      {type === 'error' && (
        <div className="h-28 w-28 rounded-full">
          <MdOutlineErrorOutline className="text-danger-300 bg-danger-100 ml-2 h-24 w-24" />{' '}
        </div>
      )}
      {type === 'empty' && (
        <div className="h-28 w-28 rounded-full">
          <MdBarChart className="text-base-300 bg-base-100 ml-2 h-24 w-24" />{' '}
        </div>
      )}
      {type === 'loading' && <O11yLoader text="Fetching data" />}
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
            size="small"
            text={ctaText}
            type="subtle"
            className="mt-1"
          />
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
