import React, { useEffect, useState } from 'react';
import { TMSteps } from 'common/bifrostProxy';
import { arrayOf, shape, string } from 'prop-types';

const ImportSteps = (props) => {
  const { steps } = props;
  const [stepOptions, setStepOptions] = useState([...steps]);

  useEffect(() => {
    setStepOptions(steps);
  }, [steps]);

  const handleStepClick = () => {
    // console.log('step click', stepId, e);
  };

  return (
    <TMSteps
      steps={stepOptions}
      format="panels-with-borders"
      onClick={handleStepClick}
    />
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
