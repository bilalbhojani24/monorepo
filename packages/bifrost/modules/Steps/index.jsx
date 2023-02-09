import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { CheckCircleIcon, CheckIcon } from '../Icon';

import { STEPS_FORMAT, STEPS_STATUS } from './const/stepsConstants';

import './styles.scss';

const Steps = ({ label, onClick, steps, format, wrapperClassName }) => {
  const onClickHandler = (event, step) => {
    onClick(event, step);
  };

  const renderSimpleListStep = (step, stepIdx) => (
    <li key={step.id} className="cursor-pointer md:flex-1">
      <a
        onClick={(e) => onClickHandler(e, step)}
        onKeyDown={(e) => onClickHandler(e, step)}
        href={step.href}
        className={twClassNames('flex flex-col border-l-4 py-2 pl-4', {
          'group border-brand-600 hover:border-brand-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0':
            step.status === STEPS_STATUS[0] || step.status === STEPS_STATUS[3],
          'border-brand-600 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0':
            step.status === STEPS_STATUS[1],
          'group border-base-200 hover:border-base-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0':
            step.status === STEPS_STATUS[2]
        })}
      >
        <span
          className={twClassNames('text-sm font-medium', {
            'text-brand-600 group-hover:text-brand-800':
              step.status === STEPS_STATUS[0] ||
              step.status === STEPS_STATUS[3],
            'text-brand-600': step.status === STEPS_STATUS[1],
            'text-base-500 group-hover:text-base-700':
              step.status === STEPS_STATUS[2]
          })}
        >
          Step - {stepIdx + 1}
        </span>
        <span className="text-sm font-medium">{step.name}</span>
      </a>
    </li>
  );

  const renderBulletListStep = (step) => (
    <li key={step.id} className="cursor-pointer">
      <a
        onClick={(e) => onClickHandler(e, step)}
        onKeyDown={(e) => onClickHandler(e, step)}
        href={step.href}
        className={twClassNames({
          'block h-2.5 w-2.5 rounded-full bg-brand-600 hover:bg-brand-900':
            step.status === STEPS_STATUS[0],
          'relative flex items-center justify-center':
            step.status === STEPS_STATUS[1] || step.status === STEPS_STATUS[3],
          'block h-2.5 w-2.5 rounded-full bg-base-200 hover:bg-base-400':
            step.status === STEPS_STATUS[2]
        })}
        aria-current="step"
      >
        {(step.status === STEPS_STATUS[1] ||
          step.status === STEPS_STATUS[3]) && (
          <>
            <span className="absolute flex h-5 w-5 p-px" aria-hidden="true">
              <span className="bg-brand-200 h-full w-full rounded-full" />
            </span>
            <span
              className="bg-brand-600 relative block h-2.5 w-2.5 rounded-full"
              aria-hidden="true"
            />
          </>
        )}
        <span className="sr-only">{step.name}</span>
      </a>
    </li>
  );

  const renderPanelListStep = (step, stepIdx) => (
    <li
      key={step.id}
      className="relative cursor-pointer overflow-hidden lg:flex-1"
    >
      <div
        className={twClassNames(
          stepIdx === 0 || stepIdx === 3 ? 'border-b-0 rounded-t-md' : '',
          stepIdx === steps.length - 1 ? 'border-t-0 rounded-b-md' : '',
          'border border-base-200 overflow-hidden lg:border-0'
        )}
        onClick={(e) => onClickHandler(e, step)}
        onKeyDown={(e) => onClickHandler(e, step)}
        aria-hidden="true"
      >
        {step.status === STEPS_STATUS[3] && (
          <a href={step.href} className="group">
            <span
              className="bg-brand-600 absolute top-0 left-0 h-full w-1 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
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
              <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
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
        {step.status === 'complete' && (
          <a href={step.href} className="group">
            <span
              className="group-hover:bg-base-200 absolute top-0 left-0 h-full w-1 bg-transparent lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
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
              <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                <span className="text-sm font-medium">{step.name}</span>
                <span className="text-base-500 text-sm font-medium">
                  {step.description}
                </span>
              </span>
            </span>
          </a>
        )}
        {step.status === 'current' && (
          <a href={step.href} aria-current="step">
            <span
              className="bg-brand-600 absolute top-0 left-0 h-full w-1 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
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
              <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
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
        {step.status === 'upcoming' && (
          <a href={step.href} className="group">
            <span
              className="group-hover:bg-base-200 absolute top-0 left-0 h-full w-1 bg-transparent lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
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
              <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
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

  const renderCircleListStep = (step, stepIdx) => (
    <li
      key={step.name}
      className={twClassNames(
        stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '',
        'relative',
        'cursor-pointer'
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
      {step.status === 'complete' && (
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
      {step.status === 'current' && (
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
      {step.status === 'upcoming' && (
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

  const renderBulletAndTextListStep = (step) => (
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
      {step.status === 'complete' && (
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
      {step.status === 'current' && (
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
      {step.status === 'upcoming' && (
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
            Step {steps.findIndex((step) => step.status === 'current') + 1} of{' '}
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
            'space-y-6': format === STEPS_FORMAT[4]
          })}
        >
          {steps.map((step, stepIdx) => {
            switch (format) {
              case STEPS_FORMAT[0]:
                return renderSimpleListStep(step, stepIdx);
              case STEPS_FORMAT[1]:
                return renderBulletListStep(step);
              case STEPS_FORMAT[2]:
                return renderPanelListStep(step, stepIdx);
              case STEPS_FORMAT[3]:
                return renderCircleListStep(step, stepIdx);
              case STEPS_FORMAT[4]:
                return renderBulletAndTextListStep(step);
              default:
                return <p>No steps variant selected</p>;
            }
          })}
        </ol>
      </nav>
    </div>
  );
};

Steps.propTypes = {
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
Steps.defaultProps = {
  label: '',
  onClick: () => {},
  format: STEPS_FORMAT[0],
  wrapperClassName: ''
};

export default Steps;
