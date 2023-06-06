import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { CheckIcon } from '../../../Icon';
import { STEPS_STATUS } from '../stepsConstants';

const CircleListElement = ({ step, stepIdx, onClick, stepsLength }) => {
  const onClickHandler = (event, activeStep) => {
    onClick(event, activeStep);
  };

  return (
    <li
      key={step.name}
      className={twClassNames(
        {
          'pr-8 sm:pr-20': stepIdx !== stepsLength
        },
        'relative cursor-pointer'
      )}
    >
      {step.status === STEPS_STATUS[3] && (
        <>
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="bg-brand-600 h-0.5 w-full" />
          </div>
          <a
            onClick={(e) => onClickHandler(e, step)}
            onKeyDown={(e) => onClickHandler(e, step)}
            href={step.href}
            className="bg-brand-600 hover:bg-brand-900 relative flex h-8 w-8 items-center justify-center rounded-full"
          >
            <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
            <span className="sr-only">{step.name}</span>
          </a>
        </>
      )}
      {step.status === STEPS_STATUS[0] && (
        <>
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="bg-brand-600 h-0.5 w-full" />
          </div>
          <a
            onClick={(e) => onClickHandler(e, step)}
            onKeyDown={(e) => onClickHandler(e, step)}
            href={step.href}
            className="bg-brand-600 hover:bg-brand-900 relative flex h-8 w-8 items-center justify-center rounded-full"
          >
            <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
            <span className="sr-only">{step.name}</span>
          </a>
        </>
      )}
      {step.status === STEPS_STATUS[1] && (
        <>
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="bg-base-200 h-0.5 w-full" />
          </div>
          <a
            onClick={(e) => onClickHandler(e, step)}
            onKeyDown={(e) => onClickHandler(e, step)}
            href={step.href}
            className="border-brand-600 relative flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white"
            aria-current="step"
          >
            <span
              className="bg-brand-600 h-2.5 w-2.5 rounded-full"
              aria-hidden="true"
            />
            <span className="sr-only">{step.name}</span>
          </a>
        </>
      )}
      {step.status === STEPS_STATUS[2] && (
        <>
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="bg-base-200 h-0.5 w-full" />
          </div>
          <a
            onClick={(e) => onClickHandler(e, step)}
            onKeyDown={(e) => onClickHandler(e, step)}
            href={step.href}
            className="border-base-300 hover:border-base-400 group relative flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white"
          >
            <span
              className="group-hover:bg-base-300 h-2.5 w-2.5 rounded-full bg-transparent"
              aria-hidden="true"
            />
            <span className="sr-only">{step.name}</span>
          </a>
        </>
      )}
    </li>
  );
};

CircleListElement.propTypes = {
  step: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.oneOf(STEPS_STATUS)
    })
  ).isRequired,
  stepIdx: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  stepsLength: PropTypes.number.isRequired
};
export default CircleListElement;
