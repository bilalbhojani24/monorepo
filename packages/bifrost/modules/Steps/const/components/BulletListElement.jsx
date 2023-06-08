import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { STEPS_STATUS } from '../stepsConstants';

const BulletListElement = ({ step, onClick }) => {
  const onClickHandler = (event, activeStep) => {
    onClick(event, activeStep);
  };

  return (
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
};

BulletListElement.propTypes = {
  step: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.oneOf(STEPS_STATUS)
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired
};

export default BulletListElement;
