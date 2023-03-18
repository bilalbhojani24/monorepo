import React from 'react';
import { Button } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import O11yLoader from 'common/O11yLoader/components/O11yLoader';
import PropTypes from 'prop-types';

export default function PlaceHolder({
  illustration,
  size,
  text,
  metaText,
  type,
  ctaText,
  onClickCTA
}) {
  return (
    <div className="flex py-0 px-5">
      {type === 'error' && (
        <svg className="h-24 w-24">
          <use xlinkHref="#error" />
        </svg>
      )}
      {type === 'empty' && (
        <svg className="h-24 w-24">
          <use xlinkHref="#no-data-bar" />
        </svg>
      )}
      {type === 'loading' && <O11yLoader text="Fetching data" />}
      {!!illustration && (
        <>
          {React.cloneElement(illustration, {
            className: twClassNames(illustration.props.className, 'h-24 w-24')
          })}
        </>
      )}

      <div className="mt-5 flex flex-col items-center">
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
  size: PropTypes.oneOf(['default', 'small']),
  type: PropTypes.string,
  ctaText: PropTypes.string,
  onClickCTA: PropTypes.func
};
PlaceHolder.defaultProps = {
  size: 'default',
  text: '',
  metaText: '',
  type: '',
  ctaText: '',
  illustration: '',
  onClickCTA: () => {}
};
