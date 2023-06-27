import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { STEPS_STATUS } from '../stepsConstants';

const SimpleListElement = ({ step, stepIdx, onClick }) => {
  const onClickHandler = (event, activeStep) => {
    onClick(event, activeStep);
  };

  return (
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
};

SimpleListElement.propTypes = {
  step: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.oneOf(STEPS_STATUS)
    })
  ).isRequired,
  stepIdx: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default SimpleListElement;
