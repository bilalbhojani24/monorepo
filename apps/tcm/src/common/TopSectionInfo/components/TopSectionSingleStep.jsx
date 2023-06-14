import React from 'react';
import { MdCheckCircle } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const TopSectionSingleStep = ({
  title,
  description,
  ctaText,
  redirectTo,
  ctaCb
}) => (
  <div className="flex justify-between">
    <div>
      <div className="flex">
        <MdCheckCircle className="text-success-600 h-5 w-5" />
        <span className="text-base-800 ml-2 text-sm font-medium">{title}</span>
      </div>
      <div className="text-base-500 flex pl-7 text-sm font-normal">
        {description}
      </div>
    </div>
    <button
      className="text-brand-600 text-sm font-medium"
      type="button"
      onClick={() => {
        ctaCb?.(redirectTo);
      }}
    >
      {ctaText}
    </button>
  </div>
);

TopSectionSingleStep.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ctaText: PropTypes.string,
  redirectTo: PropTypes.string,
  ctaCb: PropTypes.func
};

TopSectionSingleStep.defaultProps = {
  title: '',
  description: '',
  ctaText: '',
  redirectTo: '',
  ctaCb: () => {}
};

export default TopSectionSingleStep;
