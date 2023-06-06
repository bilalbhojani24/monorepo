import React from 'react';
import PropTypes from 'prop-types';

import { CheckCircleIcon } from '../../../Icon';
import { STEPS_STATUS } from '../stepsConstants';

const BulletAndTextListElement = ({ step, onClick }) => {
  const onClickHandler = (event, activeStep) => {
    onClick(event, activeStep);
  };

  return (
    <li key={step.name} className="cursor-pointer">
      {step.status === STEPS_STATUS[3] && (
        <a
          href={step.href}
          className="group"
          onClick={(e) => onClickHandler(e, step)}
          onKeyDown={(e) => onClickHandler(e, step)}
        >
          <span className="flex items-start">
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
              <CheckCircleIcon
                className="text-brand-600 group-hover:text-brand-800 h-full w-full"
                aria-hidden="true"
              />
            </span>
            <span className="text-brand-600 ml-3 text-sm font-medium">
              {step.name}
            </span>
          </span>
        </a>
      )}
      {step.status === STEPS_STATUS[0] && (
        <a
          href={step.href}
          className="group"
          onClick={(e) => onClickHandler(e, step)}
          onKeyDown={(e) => onClickHandler(e, step)}
        >
          <span className="flex items-start">
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
              <CheckCircleIcon
                className="text-brand-600 group-hover:text-brand-800 h-full w-full"
                aria-hidden="true"
              />
            </span>
            <span className="text-base-500 group-hover:text-base-900 ml-3 text-sm font-medium">
              {step.name}
            </span>
          </span>
        </a>
      )}
      {step.status === STEPS_STATUS[1] && (
        <a
          href={step.href}
          className="flex items-start"
          aria-current="step"
          onClick={(e) => onClickHandler(e, step)}
          onKeyDown={(e) => onClickHandler(e, step)}
        >
          <span
            className="relative flex h-5 w-5 shrink-0 items-center justify-center"
            aria-hidden="true"
          >
            <span className="bg-brand-200 absolute h-4 w-4 rounded-full" />
            <span className="bg-brand-600 relative block h-2 w-2 rounded-full" />
          </span>
          <span className="text-brand-600 ml-3 text-sm font-medium">
            {step.name}
          </span>
        </a>
      )}
      {step.status === STEPS_STATUS[2] && (
        <a
          href={step.href}
          className="group"
          onClick={(e) => onClickHandler(e, step)}
          onKeyDown={(e) => onClickHandler(e, step)}
        >
          <div className="flex items-start">
            <div
              className="relative flex h-5 w-5 shrink-0 items-center justify-center"
              aria-hidden="true"
            >
              <div className="bg-base-300 group-hover:bg-base-400 h-2 w-2 rounded-full" />
            </div>
            <p className="text-base-500 group-hover:text-base-900 ml-3 text-sm font-medium">
              {step.name}
            </p>
          </div>
        </a>
      )}
    </li>
  );
};

BulletAndTextListElement.propTypes = {
  step: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.oneOf(STEPS_STATUS)
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired
};

export default BulletAndTextListElement;
