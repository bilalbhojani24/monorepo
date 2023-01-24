import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TMSteps } from 'common/bifrostProxy';
import { arrayOf, shape, string } from 'prop-types';

import { setCurrentScreen } from '../slices/importSlice';

const ImportSteps = (props) => {
  const { steps } = props;
  const dispatch = useDispatch();
  const [stepOptions, setStepOptions] = useState([...steps]);

  useEffect(() => {
    setStepOptions(steps);
  }, [steps]);

  const handleStepClick = (_, step) => {
    if (step.status === 'complete' || step.status === 'current') {
      if (step.name === 'CONFIGURE TOOL')
        dispatch(setCurrentScreen('configureTool'));
      else if (step.name === 'CONFIGURE DATA')
        dispatch(setCurrentScreen('configureData'));
      else if (step.name === 'CONFIRM IMPORT')
        dispatch(setCurrentScreen('confirmImport'));
    }
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
