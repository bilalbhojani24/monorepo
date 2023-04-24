import React from 'react';
import { twClassNames } from '@browserstack/utils';
import bgIllustration from 'assets/illustrations/bg-illustration.png';
import PropTypes from 'prop-types';

function O11yFeatureCard({ children, wrapperClassName, childrenWrapperClass }) {
  return (
    <div
      className={twClassNames(
        'relative w-full max-w-7xl rounded-lg',
        wrapperClassName
      )}
    >
      <img
        src={bgIllustration}
        alt=""
        className="absolute top-0 left-0 h-full w-full"
      />
      <div className={twClassNames('relative', childrenWrapperClass)}>
        {children}
      </div>
    </div>
  );
}

O11yFeatureCard.propTypes = {
  children: PropTypes.node.isRequired,
  wrapperClassName: PropTypes.string,
  childrenWrapperClass: PropTypes.string
};
O11yFeatureCard.defaultProps = {
  wrapperClassName: '',
  childrenWrapperClass: ''
};

export default O11yFeatureCard;
