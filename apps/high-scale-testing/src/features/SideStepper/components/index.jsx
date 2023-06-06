import React from 'react';
import { CheckIcon } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const STEPS_FORMAT = [
  'simple',
  'bullets',
  'panels-with-borders',
  'circles',
  'bullets-and-text',
  'circles-with-text'
];
const STEPS_STATUS = ['complete', 'current', 'upcoming', 'current_completed'];

const SideStepperCircleWithText = ({
  label,
  onClick,
  steps,
  format,
  wrapperClassName
}) => {
  const onClickHandler = (event, step) => {
    onClick(event, step);
  };

  const renderCircleWithTextStep = (step, stepIdx) => (
    <li
      key={step.name}
      className={twClassNames(
        stepIdx !== steps.length - 1 ? 'mr-8 md: mb-8' : '',
        'relative cursor-pointer'
      )}
    >
      {step.status === STEPS_STATUS[3] && (
        <a
          className="flex"
          onClick={(e) => onClickHandler(e, step)}
          onKeyDown={(e) => onClickHandler(e, step)}
          href={step.href}
        >
          <span className="bg-brand-600 hover:bg-brand-900 relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
            <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
            <span className="sr-only">{step.name}</span>
          </span>
          <div className="ml-4">
            <p className="text-brand-600 text-xs font-semibold uppercase leading-4 tracking-wide">
              {step.name}
            </p>
            <p className="text-base-500 text-sm font-normal leading-5">
              {step.description}
            </p>
          </div>
        </a>
      )}
      {step.status === STEPS_STATUS[0] && (
        <a
          className="flex"
          onClick={(e) => onClickHandler(e, step)}
          onKeyDown={(e) => onClickHandler(e, step)}
          href={step.href}
        >
          <span className="bg-brand-600 hover:bg-brand-900 relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
            <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
            <span className="sr-only">{step.name}</span>
          </span>
          <div className="ml-4">
            <p className="text-base-900 text-xs font-semibold uppercase leading-4 tracking-wide">
              {step.name}
            </p>
            <p className="text-base-500 text-sm font-normal leading-5">
              {step.description}
            </p>
          </div>
        </a>
      )}
      {step.status === STEPS_STATUS[1] && (
        <a
          className="flex"
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
            <span className="sr-only">{step.name}</span>
          </span>
          <div className="ml-4">
            <p className="text-brand-600 text-xs font-semibold uppercase leading-4 tracking-wide">
              {step.name}
            </p>
            <p className="text-base-500 text-sm font-normal leading-5">
              {step.description}
            </p>
          </div>
        </a>
      )}
      {step.status === STEPS_STATUS[2] && (
        <a
          className="flex"
          onClick={(e) => onClickHandler(e, step)}
          onKeyDown={(e) => onClickHandler(e, step)}
          href={step.href}
        >
          <span className="border-base-300 hover:border-base-400 group relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white">
            <span
              className="group-hover:bg-base-300 h-2.5 w-2.5 rounded-full bg-transparent"
              aria-hidden="true"
            />
            <span className="sr-only">{step.name}</span>
          </span>
          <div className="ml-4">
            <p className="text-base-500 text-xs font-semibold uppercase leading-4 tracking-wide">
              {step.name}
            </p>
            <p className="text-base-500 text-sm font-normal leading-5">
              {step.description}
            </p>
          </div>
        </a>
      )}
    </li>
  );

  return (
    <div
      className={twClassNames(
        {
          'lg:border-t lg:border-b lg:border-base-200':
            format === STEPS_FORMAT[2],
          'py-12 px-4 sm:px-6 lg:px-8': format === STEPS_FORMAT[4]
        },
        wrapperClassName
      )}
    >
      <nav
        aria-label={label}
        className={twClassNames({
          'flex items-center justify-center': format === STEPS_FORMAT[1],
          'overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-base-200':
            format === STEPS_FORMAT[2],
          'flex justify-center': format === STEPS_FORMAT[4]
        })}
      >
        {format === STEPS_FORMAT[1] && (
          <p className="text-sm font-medium">
            Step{' '}
            {steps.findIndex((step) => step.status === STEPS_STATUS[1]) + 1} of{' '}
            {steps.length}
          </p>
        )}
        <ol
          className={twClassNames({
            'space-y-4 md:flex md:space-y-0 md:space-x-8':
              format === STEPS_FORMAT[0],
            'ml-8 flex items-center space-x-5': format === STEPS_FORMAT[1],
            'overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-base-200 w-full':
              format === STEPS_FORMAT[2],
            'flex items-center justify-center': format === STEPS_FORMAT[3],
            'space-y-6': format === STEPS_FORMAT[4],
            'md:flex items-start justify-center': format === STEPS_FORMAT[5]
          })}
        >
          {steps.map((step, stepIdx) =>
            renderCircleWithTextStep(step, stepIdx)
          )}
        </ol>
      </nav>
    </div>
  );
};

SideStepperCircleWithText.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.oneOf(STEPS_STATUS)
    })
  ).isRequired,
  format: PropTypes.string,
  wrapperClassName: PropTypes.string
};

SideStepperCircleWithText.defaultProps = {
  label: '',
  onClick: () => {},
  format: STEPS_FORMAT[0],
  wrapperClassName: ''
};

export default SideStepperCircleWithText;
