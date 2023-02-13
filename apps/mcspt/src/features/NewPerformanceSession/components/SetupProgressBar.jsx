import React from 'react';
import {
  MdCheckCircle,
  MdOutlineCircle,
  MdRadioButtonChecked
} from '@browserstack/bifrost';

import { twClassNames } from '../../../utils/tailwindUtils';

const stepsDetails = [
  {
    stepNumber: 1,
    stepTitle: 'Select device',
    stepDesc: 'Google Pixel 7 Pro ∙ Android 12'
  },
  {
    stepNumber: 2,
    stepTitle: 'Select Application',
    stepDesc: 'Select an application to test'
  },
  {
    stepNumber: 3,
    stepTitle: 'Start Testing',
    stepDesc: 'Confirm details & start testing'
  }
];

export default function SetupProgressBar({ currentStep }) {
  return (
    <div className="flex flex-col px-4 py-6">
      {stepsDetails.map((x) => (
        <div
          className={twClassNames('flex', {
            '-mt-1': x.stepNumber > 1
          })}
          key={x.stepNumber}
        >
          <div className="mr-4 flex flex-col items-center">
            <div
              className={twClassNames('  text-3xl', {
                '-mb-1': x.stepNumber < 3,
                'text-brand-600': x.stepNumber <= currentStep,
                'text-base-300': x.stepNumber > currentStep
              })}
            >
              {(() => {
                if (x.stepNumber < currentStep) {
                  return <MdCheckCircle />;
                }

                if (x.stepNumber === currentStep) {
                  return <MdRadioButtonChecked />;
                }

                return <MdOutlineCircle />;
              })()}
            </div>
            <div
              className={twClassNames('flex h-28 w-px', {
                hidden: x.stepNumber === 3,
                'bg-brand-600': x.stepNumber < currentStep,
                'bg-base-300': x.stepNumber >= currentStep
              })}
            />
          </div>

          <div>
            <div
              className={twClassNames(
                'text-xs font-semibold uppercase leading-4 tracking-wide ',
                {
                  'text-brand-600': x.stepNumber === currentStep,
                  'text-base-500': x.stepNumber > currentStep
                }
              )}
            >
              {x.stepTitle}
            </div>
            <div className="text-base-500 text-sm font-normal leading-5">
              {x.stepDesc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
