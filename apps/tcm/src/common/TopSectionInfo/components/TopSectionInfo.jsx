import React from 'react';
import { MdCheckCircle } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const SingleStep = ({ title, description, ctaText, redirectTo, ctaCb }) => (
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

SingleStep.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ctaText: PropTypes.string,
  redirectTo: PropTypes.string,
  ctaCb: PropTypes.func
};

SingleStep.defaultProps = {
  title: '',
  description: '',
  ctaText: '',
  redirectTo: '',
  ctaCb: () => {}
};

const TopSectionInfo = ({ steps, wrapperClassName, ctaCb }) => (
  <div
    className={twClassNames(
      'border-base-200 mb-3 w-4/5 max-w-7xl rounded-lg border bg-white p-4',
      wrapperClassName
    )}
  >
    {steps.length &&
      steps.map((step, idx) => (
        <div key={step.title}>
          <div
            className={twClassNames({
              'border-t border-base-300 my-3': idx > 0
            })}
          />
          <SingleStep
            title={step.title}
            icon={step.icon}
            description={step.description}
            ctaText={step.ctaText}
            redirectTo={step.redirectTo}
            ctaCb={ctaCb}
          />
        </div>
      ))}
  </div>
);

TopSectionInfo.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      title: PropTypes.string,
      description: PropTypes.string,
      node: PropTypes.node
    })
  ),
  wrapperClassName: PropTypes.string,
  ctaCb: PropTypes.func
};

TopSectionInfo.defaultProps = {
  steps: [],
  wrapperClassName: '',
  ctaCb: () => {}
};

export default TopSectionInfo;
