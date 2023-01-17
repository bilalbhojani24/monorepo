import React from 'react';
import { TMButton } from 'bifrostProxy';

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

export default ImportSteps;
