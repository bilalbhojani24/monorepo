import React from 'react';
import { twClassNames } from '@browserstack/utils';
import bgIllustration from 'assets/illustrations/bg-illustration.png';
import PropTypes from 'prop-types';

function O11yFeatureCard({
  children,
  wrapperClassName,
  childrenWrapperClass,
  showBg
}) {
  return (
    <div
      className={twClassNames(
        'relative w-full max-w-7xl rounded-lg',
        wrapperClassName
      )}
    >
      {showBg && (
        <img
          src={bgIllustration}
          alt=""
          className="absolute left-0 top-0 h-full w-full"
        />
      )}
      <div className={twClassNames('relative', childrenWrapperClass)}>
        {children}
      </div>
    </div>
  );
}

O11yFeatureCard.propTypes = {
  children: PropTypes.node.isRequired,
  wrapperClassName: PropTypes.string,
  childrenWrapperClass: PropTypes.string,
  showBg: PropTypes.bool
};
O11yFeatureCard.defaultProps = {
  wrapperClassName: '',
  childrenWrapperClass: '',
  showBg: true
};

export default O11yFeatureCard;
