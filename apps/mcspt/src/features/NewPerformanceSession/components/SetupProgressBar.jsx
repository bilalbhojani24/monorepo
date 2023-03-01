import React from 'react';
import {
  MdCheckCircle,
  MdOutlineCircle,
  MdRadioButtonChecked
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const SetupProgressBar = ({ currentStep, stepsDetails }) => (
  <div className="flex flex-col px-4 py-6">
    {stepsDetails.map((step) => (
      <div
        className={twClassNames('flex', {
          '-mt-1': step.stepNumber > 1
        })}
        key={step.stepNumber}
      >
        <div className="mr-4 flex flex-col items-center">
          <div
            className={twClassNames('  text-3xl', {
              '-mb-1': step.stepNumber < 3,
              'text-brand-600': step.stepNumber <= currentStep,
              'text-base-300': step.stepNumber > currentStep
            })}
          >
            {(() => {
              if (step.stepNumber < currentStep) {
                return <MdCheckCircle />;
              }

              if (step.stepNumber === currentStep) {
                return <MdRadioButtonChecked />;
              }

              return <MdOutlineCircle />;
            })()}
          </div>
          <div
            className={twClassNames('flex h-28 w-px', {
              hidden: step.stepNumber === 3,
              'bg-brand-600': step.stepNumber < currentStep,
              'bg-base-300': step.stepNumber >= currentStep
            })}
          />
        </div>

        <div>
          <div
            className={twClassNames(
              'text-xs font-semibold uppercase leading-4 tracking-wide ',
              {
                'text-brand-600': step.stepNumber === currentStep,
                'text-base-500': step.stepNumber > currentStep
              }
            )}
          >
            {step.stepTitle}
          </div>
          <div className="text-base-500 break-all text-sm font-normal leading-5">
            {step.stepDesc}
          </div>
        </div>
      </div>
    ))}
  </div>
);

SetupProgressBar.propTypes = {
  currentStep: PropTypes.number,
  stepsDetails: PropTypes.arrayOf(PropTypes.object)
};

SetupProgressBar.defaultProps = {
  currentStep: 0,
  stepsDetails: []
};

export default SetupProgressBar;
