import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { CheckIcon } from '../../../Icon';
import { STEPS_STATUS } from '../stepsConstants';

const PanelListElement = ({ step, stepIdx, onClick, stepsLength }) => {
  const onClickHandler = (event, activeStep) => {
    onClick(event, activeStep);
  };

  return (
    <li
      key={step.id}
      className="relative cursor-pointer overflow-hidden lg:flex-1"
    >
      <div
        className={twClassNames(
          stepIdx === 0 || stepIdx === 3 ? 'border-b-0 rounded-t-md' : '',
          stepIdx === stepsLength ? 'border-t-0 rounded-b-md' : '',
          'border border-base-200 overflow-hidden lg:border-0'
        )}
        onClick={(e) => onClickHandler(e, step)}
        onKeyDown={(e) => onClickHandler(e, step)}
        aria-hidden="true"
      >
        {step.status === STEPS_STATUS[3] && (
          <a href={step.href} className="group">
            <span
              className="bg-brand-600 absolute left-0 top-0 h-full w-1 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
              aria-hidden="true"
            />
            <span
              className={twClassNames(
                stepIdx !== 0 ? 'lg:pl-9' : '',
                'py-5 px-6 flex items-start text-sm font-medium'
              )}
            >
              <span className="shrink-0">
                <span className="bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full">
                  <CheckIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
              </span>
              <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                <span className="text-brand-600 text-sm font-medium">
                  {step.name}
                </span>
                <span className="text-base-500 text-sm font-medium">
                  {step.description}
                </span>
              </span>
            </span>
          </a>
        )}
        {step.status === STEPS_STATUS[0] && (
          <a href={step.href} className="group">
            <span
              className="group-hover:bg-base-200 absolute left-0 top-0 h-full w-1 bg-transparent lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
              aria-hidden="true"
            />
            <span
              className={twClassNames(
                stepIdx !== 0 ? 'lg:pl-9' : '',
                'py-5 px-6 flex items-start text-sm font-medium'
              )}
            >
              <span className="shrink-0">
                <span className="bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full">
                  <CheckIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
              </span>
              <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                <span className="text-sm font-medium">{step.name}</span>
                <span className="text-base-500 text-sm font-medium">
                  {step.description}
                </span>
              </span>
            </span>
          </a>
        )}
        {step.status === STEPS_STATUS[1] && (
          <a href={step.href} aria-current="step">
            <span
              className="bg-brand-600 absolute left-0 top-0 h-full w-1 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
              aria-hidden="true"
            />
            <span
              className={twClassNames(
                stepIdx !== 0 ? 'lg:pl-9' : '',
                'px-6 py-5 flex items-start text-sm font-medium'
              )}
            >
              <span className="shrink-0">
                <span className="border-brand-600 flex h-10 w-10 items-center justify-center rounded-full border-2">
                  <span className="text-brand-600">{stepIdx + 1}</span>
                </span>
              </span>
              <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                <span className="text-brand-600 text-sm font-medium">
                  {step.name}
                </span>
                <span className="text-base-500 text-sm font-medium">
                  {step.description}
                </span>
              </span>
            </span>
          </a>
        )}
        {step.status === STEPS_STATUS[2] && (
          <a href={step.href} className="group">
            <span
              className="group-hover:bg-base-200 absolute left-0 top-0 h-full w-1 bg-transparent lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
              aria-hidden="true"
            />
            <span
              className={twClassNames(
                stepIdx !== 0 ? 'lg:pl-9' : '',
                'px-6 py-5 flex items-start text-sm font-medium'
              )}
            >
              <span className="shrink-0">
                <span className="border-base-300 flex h-10 w-10 items-center justify-center rounded-full border-2">
                  <span className="text-base-500">{stepIdx + 1}</span>
                </span>
              </span>
              <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                <span className="text-base-500 text-sm font-medium">
                  {step.name}
                </span>
                <span className="text-base-500 text-sm font-medium">
                  {step.description}
                </span>
              </span>
            </span>
          </a>
        )}

        {stepIdx !== 0 ? (
          <>
            {/* Separator */}
            <div
              className="absolute inset-0 hidden w-3 lg:block"
              aria-hidden="true"
            >
              <svg
                className="text-base-300 h-full w-full"
                viewBox="0 0 12 82"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0.5 0V31L10.5 41L0.5 51V82"
                  stroke="currentcolor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </>
        ) : null}
      </div>
    </li>
  );
};

PanelListElement.propTypes = {
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
export default PanelListElement;
