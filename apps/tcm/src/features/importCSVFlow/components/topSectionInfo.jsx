import React from 'react';
import { useDispatch } from 'react-redux';
import { MdCheckCircle } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { setCSVCurrentScreen } from '../slices/importCSVSlice';

const SingleStep = ({ title, description, ctaText, redirectTo }) => {
  const dispatch = useDispatch();
  const handleCtaClick = () => {
    dispatch(setCSVCurrentScreen(redirectTo));
  };

  return (
    <div className="flex justify-between">
      <div>
        <div className="flex">
          <MdCheckCircle className="text-success-600 h-5 w-5" />
          <span className="text-base-800 ml-2 text-sm font-medium">
            {title}
          </span>
        </div>
        <div className="text-base-500 flex pl-7 text-sm font-normal">
          {description}
        </div>
      </div>
      <button
        className="text-brand-600 text-sm font-medium"
        type="button"
        onClick={() => {
          handleCtaClick();
        }}
      >
        {ctaText}
      </button>
    </div>
  );
};

SingleStep.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ctaText: PropTypes.string,
  redirectTo: PropTypes.string
};

SingleStep.defaultProps = {
  title: '',
  description: '',
  ctaText: '',
  redirectTo: ''
};

const TopSectionInfo = ({ steps }) => (
  <div className="border-base-300 mb-4 w-4/5 max-w-7xl rounded-lg border bg-white p-4">
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
  )
};

TopSectionInfo.defaultProps = {
  steps: []
};

export default TopSectionInfo;
