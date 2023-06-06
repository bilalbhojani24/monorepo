import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { CheckIcon } from '../../../Icon';
import { STEPS_STATUS } from '../stepsConstants';

const CircleWithTextListElement = ({ step, stepIdx, onClick, stepsLength }) => {
  const onClickHandler = (event, activeStep) => {
    onClick(event, activeStep);
  };

  const connectorStyles = `absolute left-[15px] h-full w-0.5 ${
    stepIdx !== stepsLength ? '' : 'hidden'
  }`;

  const stepItemsStyles = `${
    step?.description ? 'items-start' : 'items-center'
  }`;

  return (
    <li
      key={step.name}
      className={twClassNames(
        {
          'pr-8 md: pb-8': stepIdx !== stepsLength
        },
        'relative cursor-pointer'
      )}
    >
      {step.status === STEPS_STATUS[3] && (
        <>
          <div className={twClassNames('bg-brand-600', connectorStyles)} />
          <a
            className={`flex items-start ${stepItemsStyles}`}
            onClick={(e) => onClickHandler(e, step)}
            onKeyDown={(e) => onClickHandler(e, step)}
            href={step.href}
          >
            <span className="bg-brand-600 hover:bg-brand-900 relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <div className="ml-4">
              {step.name && (
                <p className="text-brand-600 text-xs font-semibold uppercase leading-4 tracking-wide">
                  {step.name}
                </p>
              )}
              {step.description && (
                <p className="text-base-500 text-sm font-normal leading-5">
                  {step.description}
                </p>
              )}
            </div>
          </a>
        </>
      )}
      {step.status === STEPS_STATUS[0] && (
        <>
          <div className={twClassNames('bg-brand-600', connectorStyles)} />
          <a
            className={`flex items-start ${stepItemsStyles}`}
            onClick={(e) => onClickHandler(e, step)}
            onKeyDown={(e) => onClickHandler(e, step)}
            href={step.href}
          >
            <span className="bg-brand-600 hover:bg-brand-900 relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <div className="ml-4">
              <p className="text-base-900 text-xs font-semibold uppercase leading-4 tracking-wide">
                {step.name}
              </p>
              {step.description && (
                <p className="text-base-500 text-sm font-normal leading-5">
                  {step.description}
                </p>
              )}
            </div>
          </a>
        </>
      )}
      {step.status === STEPS_STATUS[1] && (
        <>
          <div className={twClassNames('bg-base-200', connectorStyles)} />

          <a
            className={`flex items-start ${stepItemsStyles}`}
            onClick={(e) => onClickHandler(e, step)}
            onKeyDown={(e) => onClickHandler(e, step)}
            href={step.href}
          >
            <span
              className="border-brand-600  relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white"
              aria-current="step"
            >
              <span
                className="bg-brand-600 h-2.5 w-2.5 rounded-full"
                aria-hidden="true"
              />
            </span>
            <div className="ml-4">
              <p className="text-brand-600 text-xs font-semibold uppercase leading-4 tracking-wide">
                {step.name}
              </p>
              {step.description && (
                <p className="text-base-500 text-sm font-normal leading-5">
                  {step.description}
                </p>
              )}
            </div>
          </a>
        </>
      )}
      {step.status === STEPS_STATUS[2] && (
        <>
          <div className={twClassNames('bg-base-200', connectorStyles)} />

          <a
            className={`flex items-start ${stepItemsStyles}`}
            onClick={(e) => onClickHandler(e, step)}
            onKeyDown={(e) => onClickHandler(e, step)}
            href={step.href}
          >
            <span className="border-base-300 hover:border-base-400 group relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white">
              <span
                className="group-hover:bg-base-300 h-2.5 w-2.5 rounded-full bg-transparent"
                aria-hidden="true"
              />
            </span>
            <div className="ml-4">
              <p className="text-base-500 text-xs font-semibold uppercase leading-4 tracking-wide">
                {step.name}
              </p>
              {step.description && (
                <p className="text-base-500 text-sm font-normal leading-5">
                  {step.description}
                </p>
              )}
            </div>
          </a>
        </>
      )}
    </li>
  );
};

CircleWithTextListElement.propTypes = {
  step: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.oneOf(STEPS_STATUS)
    })
  ),
  stepIdx: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  stepsLength: PropTypes.number.isRequired
};

CircleWithTextListElement.defaultProps = {
  step: []
};

export default CircleWithTextListElement;
