import React from 'react';
import PropTypes from 'prop-types';
import Step from './components/Step';
import './styles.scss';
import { STEPS_STATUS, STEPS_FORMAT } from './const/stepsConstants';
import classNames from 'classnames';
import { CheckIcon } from '@heroicons/react/24/solid';

const Steps = ({ label, onClick, steps, format }) => {
  const onClickHandler = (event, step) => {
    onClick(step, event);
  };

  const renderSimpleListStep = (step) => {
    return (
      <li key={step.id} className="md:flex-1 cursor-pointer" onClick={(e) => onClickHandler(e, step)}>
        {step.status === 'complete' ? (
          <a
            href={step.href}
            className="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
          >
            <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">{step.id}</span>
            <span className="text-sm font-medium">{step.name}</span>
          </a>
        ) : step.status === 'current' ? (
          <a
            href={step.href}
            className="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
            aria-current="step"
          >
            <span className="text-sm font-medium text-indigo-600">{step.id}</span>
            <span className="text-sm font-medium">{step.name}</span>
          </a>
        ) : (
          <a
            href={step.href}
            className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
          >
            <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{step.id}</span>
            <span className="text-sm font-medium">{step.name}</span>
          </a>
        )}
      </li>
    );
  };

  const renderBulletListStep = (step) => {
    return (
      <li key={step.name} className="cursor-pointer" onClick={(e) => onClickHandler(e, step)}>
        {step.status === 'complete' ? (
          <a href={step.href} className="block h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900">
            <span className="sr-only">{step.name}</span>
          </a>
        ) : step.status === 'current' ? (
          <a href={step.href} className="relative flex items-center justify-center" aria-current="step">
            <span className="absolute flex h-5 w-5 p-px" aria-hidden="true">
              <span className="h-full w-full rounded-full bg-indigo-200" />
            </span>
            <span className="relative block h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
            <span className="sr-only">{step.name}</span>
          </a>
        ) : (
          <a href={step.href} className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400">
            <span className="sr-only">{step.name}</span>
          </a>
        )}
      </li>
    );
  };

  const renderPanelListStep = (step, stepIdx) => {
    return (
      <li
        key={step.id}
        className="relative overflow-hidden lg:flex-1 cursor-pointer"
        onClick={(e) => onClickHandler(e, step)}
      >
        <div
          className={classNames(
            stepIdx === 0 ? 'border-b-0 rounded-t-md' : '',
            stepIdx === steps.length - 1 ? 'border-t-0 rounded-b-md' : '',
            'border border-gray-200 overflow-hidden lg:border-0'
          )}
        >
          {step.status === 'complete' ? (
            <a href={step.href} className="group">
              <span
                className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                aria-hidden="true"
              />
              <span
                className={classNames(stepIdx !== 0 ? 'lg:pl-9' : '', 'px-6 py-5 flex items-start text-sm font-medium')}
              >
                <span className="flex-shrink-0">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                    <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </span>
                <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                  <span className="text-sm font-medium">{step.name}</span>
                  <span className="text-sm font-medium text-gray-500">{step.description}</span>
                </span>
              </span>
            </a>
          ) : step.status === 'current' ? (
            <a href={step.href} aria-current="step">
              <span
                className="absolute top-0 left-0 h-full w-1 bg-indigo-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                aria-hidden="true"
              />
              <span
                className={classNames(stepIdx !== 0 ? 'lg:pl-9' : '', 'px-6 py-5 flex items-start text-sm font-medium')}
              >
                <span className="flex-shrink-0">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600">
                    <span className="text-indigo-600">{step.id}</span>
                  </span>
                </span>
                <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                  <span className="text-sm font-medium text-indigo-600">{step.name}</span>
                  <span className="text-sm font-medium text-gray-500">{step.description}</span>
                </span>
              </span>
            </a>
          ) : (
            <a href={step.href} className="group">
              <span
                className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                aria-hidden="true"
              />
              <span
                className={classNames(stepIdx !== 0 ? 'lg:pl-9' : '', 'px-6 py-5 flex items-start text-sm font-medium')}
              >
                <span className="flex-shrink-0">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                    <span className="text-gray-500">{step.id}</span>
                  </span>
                </span>
                <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                  <span className="text-sm font-medium text-gray-500">{step.name}</span>
                  <span className="text-sm font-medium text-gray-500">{step.description}</span>
                </span>
              </span>
            </a>
          )}

          {stepIdx !== 0 ? (
            <>
              {/* Separator */}
              <div className="absolute inset-0 top-0 left-0 hidden w-3 lg:block" aria-hidden="true">
                <svg className="h-full w-full text-gray-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
                  <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            </>
          ) : null}
        </div>
      </li>
    );
  };

  const renderCircleListStep = (step, stepIdx) => {
    return (
      <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
        {step.status === 'complete' ? (
          <>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="h-0.5 w-full bg-indigo-600" />
            </div>
            <a
              href="#"
              className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900"
            >
              <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
              <span className="sr-only">{step.name}</span>
            </a>
          </>
        ) : step.status === 'current' ? (
          <>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="h-0.5 w-full bg-gray-200" />
            </div>
            <a
              href="#"
              className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
              aria-current="step"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
              <span className="sr-only">{step.name}</span>
            </a>
          </>
        ) : (
          <>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="h-0.5 w-full bg-gray-200" />
            </div>
            <a
              href="#"
              className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" aria-hidden="true" />
              <span className="sr-only">{step.name}</span>
            </a>
          </>
        )}
      </li>
    );
  };

  return (
    <div
      className={classNames({
        'lg:border-t lg:border-b lg:border-gray-200': format === STEPS_FORMAT[2],
      })}
    >
      <nav
        aria-label={label}
        className={classNames({
          'flex items-center justify-center': format === STEPS_FORMAT[1],
          'overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200':
            format === STEPS_FORMAT[2],
        })}
      >
        {format === STEPS_FORMAT[1] && (
          <p className="text-sm font-medium">
            Step {steps.findIndex((step) => step.status === 'current') + 1} of {steps.length}
          </p>
        )}

        {/* <ol className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <Step
            step={step}
            key={stepIdx}
            stepIdx={stepIdx}
            totalSteps={steps.length}
            onClick={(e) => onClickHandler(e, step)}
          />
        ))}
      </ol>
       */}
        <ol
          role="list"
          className={classNames({
            'space-y-4 md:flex md:space-y-0 md:space-x-8': format === STEPS_FORMAT[0],
            'ml-8 flex items-center space-x-5': format === STEPS_FORMAT[1],
            'overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200':
              format === STEPS_FORMAT[2],
            'flex items-center': format === STEPS_FORMAT[3],
          })}
        >
          {steps.map((step, stepIdx) => {
            switch (format) {
              case STEPS_FORMAT[0]:
                return renderSimpleListStep(step);
              case STEPS_FORMAT[1]:
                return renderBulletListStep(step);
              case STEPS_FORMAT[2]:
                return renderPanelListStep(step, stepIdx);
              case STEPS_FORMAT[3]:
                return renderCircleListStep(step, stepIdx);

              default:
                return renderSimpleListStep(step);
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
      status: PropTypes.oneOf(STEPS_STATUS),
    })
  ),
  format: PropTypes.string,
};
Steps.defaultProps = {
  label: '',
  onClick: () => {},
  format: STEPS_FORMAT[0],
};

export default Steps;
