import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const ProgressBar = ({
  title,
  label,
  percentage,
  steps,
  currentStep,
  wrapperClassName
}) => (
  <div>
    <h4 className="sr-only">{label}</h4>
    {title && <p className="text-base-900 text-sm font-medium">{title}</p>}
    <div className={twClassNames('mt-6', wrapperClassName)} aria-hidden="true">
      <div className="bg-base-200 overflow-hidden rounded-full">
        <div
          className="bg-brand-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {steps && steps.length > 0 && (
        <div className="text-base-600 mt-6 hidden grid-flow-col text-sm font-medium sm:grid">
          {steps.map((step, stepIndex) => {
            if (stepIndex === 0)
              return <div className="text-brand-600">{step}</div>;
            if (stepIndex === steps?.length - 1)
              return (
                <div
                  className={twClassNames('text-right', {
                    'text-brand-600': stepIndex < currentStep
                  })}
                >
                  {step}
                </div>
              );
            return (
              <div
                className={twClassNames('text-center', {
                  'text-brand-600': stepIndex < currentStep
                })}
              >
                {step}
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

ProgressBar.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  percentage: PropTypes.number,
  currentStep: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.string),
  wrapperClassName: PropTypes.string
};
ProgressBar.defaultProps = {
  label: '',
  title: '',
  percentage: 0.0,
  currentStep: 0,
  steps: [],
  wrapperClassName: ''
};

export default ProgressBar;
