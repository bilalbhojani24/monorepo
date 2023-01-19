import React from 'react';
import { TMButton } from 'common/bifrostProxy';
import { arrayOf, shape, string } from 'prop-types';

const ImportSteps = (props) => {
  const { steps } = props;

  return (
    <>
      <div className="mt-4 flex justify-around">
        {steps.map((step) => (
          <TMButton>{step.name}</TMButton>
        ))}
      </div>
    </>
  );
};

ImportSteps.propTypes = {
  steps: arrayOf(
    shape({
      name: string,
    }),
  ),
};

ImportSteps.defaultProps = {
  steps: [],
};

export default ImportSteps;
