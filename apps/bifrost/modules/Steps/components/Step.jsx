import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CheckIcon } from '../../Icon';
import { STEPS_STATUS } from '../const/stepsConstants';

const Step = ({ step, stepIdx, totalSteps, onClick }) => {
  return (
    <li key={step.name} className={classNames(stepIdx !== totalSteps - 1 ? 'pb-10' : '', 'relative')}>
      {stepIdx !== totalSteps - 1 && (
        <div
          className={classNames('absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5', {
            'bg-gray-300': step.status === STEPS_STATUS[1] || step.status === STEPS_STATUS[2],
            'bg-indigo-600': step.status === STEPS_STATUS[0]
          })}
          aria-hidden="true"
        />
      )}
      <div
        onClick={onClick}
        tabIndex={0}
        className="group relative flex items-start cursor-pointer"
        {...(step.status === STEPS_STATUS[1] ? { 'aria-current': 'step' } : {})}
      >
        <span className="flex h-9 items-center" {...(step.status === STEPS_STATUS[2] ? {} : { 'aria-hidden': 'true' })}>
          <span
            className={classNames('relative z-10 flex h-8 w-8 items-center justify-center rounded-full', {
              'border-2 border-indigo-600 bg-white': step.status === STEPS_STATUS[1],
              'border-2 border-gray-300 bg-white group-hover:border-gray-400': step.status === STEPS_STATUS[2],
              'bg-indigo-600 group-hover:bg-indigo-800': step.status === STEPS_STATUS[0]
            })}
          >
            {step.status === STEPS_STATUS[0] ? (
              <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
            ) : (
              <span
                className={classNames('h-2.5 w-2.5 rounded-full', {
                  'bg-transparent group-hover:bg-gray-300':
                    step.status === STEPS_STATUS[0] || step.status === STEPS_STATUS[2],
                  'bg-indigo-600': step.status === STEPS_STATUS[1]
                })}
              />
            )}
          </span>
        </span>
        <span className="ml-4 flex min-w-0 flex-col">
          <span
            className={classNames('text-sm font-medium', {
              '': step.status === STEPS_STATUS[0],
              'text-indigo-600': step.status === STEPS_STATUS[1],
              'text-gray-500': step.status === STEPS_STATUS[2]
            })}
          >
            {step.name}
          </span>
          <span className="text-sm text-gray-500">{step.description}</span>
        </span>
      </div>
    </li>
  );
};

Step.propTypes = {
  step: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.oneOf(STEPS_STATUS)
  }),
  stepIdx: PropTypes.number,
  totalSteps: PropTypes.number,
  onClick: PropTypes.func
};

Step.defaultProps = { step: {}, stepIdx: 0, totalSteps: 0, onClick: () => {} };

export default Step;
