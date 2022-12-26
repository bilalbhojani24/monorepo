import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import classNames from 'classnames';

const ProgressBar = ({ title, label, percentage, steps, currentStep }) => {
  return (
    <div>
      <h4 className="sr-only">{label}</h4>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <div className="mt-6" aria-hidden="true">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${percentage}%` }} />
        </div>
        <div className={`mt-6 hidden grid-cols-${steps.length} text-sm font-medium text-gray-600 sm:grid`}>
          {steps.map((step, stepIndex) => {
            if (stepIndex === 0) return <div className="text-indigo-600">{step}</div>;
            else if (stepIndex === steps?.length - 1) return <div className={classNames('text-right', {
              'text-indigo-600': stepIndex < currentStep,
            })}>{step}</div>;
            else
              return (
                <div
                  className={classNames('text-center', {
                    'text-indigo-600': stepIndex < currentStep,
                  })}
                >
                  {step}
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  percentage: PropTypes.number,
  currentStep: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.string),
};
ProgressBar.defaultProps = {
  label: '',
  title: '',
  percentage: 0.0,
  currentStep: 0,
  steps: [],
};

export default ProgressBar;
