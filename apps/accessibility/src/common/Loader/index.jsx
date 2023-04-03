import React, { useEffect, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import LoaderImage from 'assets/blue-spinner.svg';
import PropTypes from 'prop-types';

export default function Loader({
  wrapperClassName,
  shouldShowText = false,
  waitText
}) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (shouldShowText) {
      const id = setTimeout(() => {
        setShowText(true);
        clearTimeout(id);
      }, 5000);
    }
  }, [shouldShowText]);
  return (
    <div
      className={twClassNames('flex h-screen flex-col justify-center items-center', wrapperClassName)}
    >
      <img src={LoaderImage} alt="loading" />
      {showText ? (
        <p className="justify-center text-base-500 mt-2 text-sm font-medium">{waitText}</p>
      ) : <div />}
    </div>
  );
}

Loader.propTypes = {
  wrapperClassName: PropTypes.string,
  shouldShowText: PropTypes.bool,
  waitText: PropTypes.string
};

Loader.defaultProps = {
  wrapperClassName: '',
  shouldShowText: false,
  waitText: ''
};
