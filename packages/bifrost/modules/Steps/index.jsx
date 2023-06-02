import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import BulletAndTextListElement from './const/components/BulletAndTextListElement';
import BulletListElement from './const/components/BulletListElement';
import CircleListElement from './const/components/CircleListElement';
import CircleWithTextListElement from './const/components/CircleWithTextListElement';
import PanelListElement from './const/components/PanelListElement';
import SimpleListElement from './const/components/SimpleListElement';
import { STEPS_FORMAT, STEPS_STATUS } from './const/stepsConstants';

const Steps = ({ label, onClick, steps, format, wrapperClassName }) => (
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
        'flex justify-center':
          format === STEPS_FORMAT[4] || format === STEPS_FORMAT[5]
      })}
    >
      {format === STEPS_FORMAT[1] && (
        <p className="text-sm font-medium">
          Step {steps.findIndex((step) => step.status === STEPS_STATUS[1]) + 1}{' '}
          of {steps.length}
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
          'flex items-start justify-center flex-col': format === STEPS_FORMAT[5]
        })}
      >
        {steps.map((step, stepIdx) => {
          switch (format) {
            case STEPS_FORMAT[0]:
              return (
                <SimpleListElement
                  step={step}
                  stepIdx={stepIdx}
                  onClick={onClick}
                />
              );
            case STEPS_FORMAT[1]:
              return <BulletListElement step={step} onClick={onClick} />;
            case STEPS_FORMAT[2]:
              return (
                <PanelListElement
                  stepsLength={steps.length - 1}
                  step={step}
                  stepIdx={stepIdx}
                  onClick={onClick}
                />
              );
            case STEPS_FORMAT[3]:
              return (
                <CircleListElement
                  stepsLength={steps.length - 1}
                  step={step}
                  stepIdx={stepIdx}
                  onClick={onClick}
                />
              );
            case STEPS_FORMAT[4]:
              return <BulletAndTextListElement step={step} onClick={onClick} />;
            case STEPS_FORMAT[5]:
              return (
                <CircleWithTextListElement
                  stepsLength={steps.length - 1}
                  step={step}
                  stepIdx={stepIdx}
                  onClick={onClick}
                />
              );
            default:
              return <p>No steps variant selected</p>;
          }
        })}
      </ol>
    </nav>
  </div>
);

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
