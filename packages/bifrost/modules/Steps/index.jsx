import React from 'react';
import PropTypes from 'prop-types';
import Step from './components/Step';
import './styles.scss';
import { STEPS_STATUS } from './const/stepsConstants';

const Steps = ({ label, onClick, steps }) => {
  const onClickHandler = (event, step) => {
    onClick(step, event);
  };

  return (
    <nav aria-label={label}>
      <ol className="overflow-hidden">
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
    </nav>
  );
};

Steps.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.oneOf(STEPS_STATUS)
    })
  )
};
Steps.defaultProps = {
  label: '',
  onClick: () => {}
};

export default Steps;
