import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { STEPS_STATUS, STEPS_FORMAT } from './const/stepsConstants';
import classNames from 'classnames';
import { CheckIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const Steps = ({ label, onClick, steps, format }) => {
  const onClickHandler = (event, step) => {
    onClick(step.id, event);
  };

  const renderSimpleListStep = (step) => {
    return (
      <li key={step.id} className="md:flex-1 cursor-pointer" onClick={(e) => onClickHandler(e, step)}>
        <a
          href={step.href}
          className={classNames('flex flex-col border-l-4 py-2 pl-4', {
            'group border-indigo-600 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0':
              step.status === STEPS_STATUS[0],
            'border-indigo-600 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0': step.status === STEPS_STATUS[1],
            'group border-gray-200 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0':
              step.status === STEPS_STATUS[2],
          })}
        >
          <span
            className={classNames('text-sm font-medium', {
              'text-indigo-600 group-hover:text-indigo-800': step.status === STEPS_STATUS[0],
              'text-indigo-600': step.status === STEPS_STATUS[1],
              'text-gray-500 group-hover:text-gray-700': step.status === STEPS_STATUS[2],
            })}
          >
            Step - {step.id}
          </span>
          <span className="text-sm font-medium">{step.name}</span>
        </a>
      </li>
    );
  };

  const renderBulletListStep = (step) => {
    return (
      <li key={step.name} className="cursor-pointer" onClick={(e) => onClickHandler(e, step)}>
        <a
          href={step.href}
          className={classNames({
            'block h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900': step.status === STEPS_STATUS[0],
            'relative flex items-center justify-center': step.status === STEPS_STATUS[1],
            'block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400': step.status === STEPS_STATUS[2],
          })}
          aria-current="step"
        >
          {step.status === STEPS_STATUS[1] && (
            <>
              <span className="absolute flex h-5 w-5 p-px" aria-hidden="true">
                <span className="h-full w-full rounded-full bg-indigo-200" />
              </span>
              <span className="relative block h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
            </>
          )}
          <span className="sr-only">{step.name}</span>
        </a>
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
      <li
        key={step.name}
        className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative', 'cursor-pointer')}
        onClick={(e) => onClickHandler(e, step)}
      >
        {step.status === 'complete' ? (
          <>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="h-0.5 w-full bg-indigo-600" />
            </div>
            <a
              href={step.href}
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
              href={step.href}
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
              href={step.href}
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

  const renderBulletAndTextListStep = (step) => {
    return (
      <li key={step.name} className="cursor-pointer" onClick={(e) => onClickHandler(e, step)}>
        {step.status === 'complete' ? (
          <a href={step.href} className="group">
            <span className="flex items-start">
              <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                <CheckCircleIcon
                  className="h-full w-full text-indigo-600 group-hover:text-indigo-800"
                  aria-hidden="true"
                />
              </span>
              <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>
            </span>
          </a>
        ) : step.status === 'current' ? (
          <a href={step.href} className="flex items-start" aria-current="step">
            <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center" aria-hidden="true">
              <span className="absolute h-4 w-4 rounded-full bg-indigo-200" />
              <span className="relative block h-2 w-2 rounded-full bg-indigo-600" />
            </span>
            <span className="ml-3 text-sm font-medium text-indigo-600">{step.name}</span>
          </a>
        ) : (
          <a href={step.href} className="group">
            <div className="flex items-start">
              <div className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center" aria-hidden="true">
                <div className="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400" />
              </div>
              <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</p>
            </div>
          </a>
        )}
      </li>
    );
  };

  return (
    <div
      className={classNames({
        'lg:border-t lg:border-b lg:border-gray-200': format === STEPS_FORMAT[2],
        'py-12 px-4 sm:px-6 lg:px-8': format === STEPS_FORMAT[4],
      })}
    >
      <nav
        aria-label={label}
        className={classNames({
          'flex items-center justify-center': format === STEPS_FORMAT[1],
          'overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200':
            format === STEPS_FORMAT[2],
          'flex justify-center': format === STEPS_FORMAT[4],
        })}
      >
        {format === STEPS_FORMAT[1] && (
          <p className="text-sm font-medium">
            Step {steps.findIndex((step) => step.status === 'current') + 1} of {steps.length}
          </p>
        )}
        <ol
          role="list"
          className={classNames({
            'space-y-4 md:flex md:space-y-0 md:space-x-8': format === STEPS_FORMAT[0],
            'ml-8 flex items-center space-x-5': format === STEPS_FORMAT[1],
            'overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200':
              format === STEPS_FORMAT[2],
            'flex items-center justify-center': format === STEPS_FORMAT[3],
            'space-y-6': format === STEPS_FORMAT[4],
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
              case STEPS_FORMAT[4]:
                return renderBulletAndTextListStep(step, stepIdx);
              // case STEPS_FORMAT[5]:
              //     return renderBulletAndTestListStep(step, stepIdx);
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
