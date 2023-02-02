import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TMSteps } from 'common/bifrostProxy';
import { arrayOf, shape, string } from 'prop-types';

import { setCSVCurrentScreen } from '../slices/importCSVSlice';

const ImportCSVSteps = (props) => {
  const { steps } = props;
  const dispatch = useDispatch();
  const [stepOptions, setStepOptions] = useState([...steps]);

  useEffect(() => {
    setStepOptions(steps);
  }, [steps]);

  const handleStepClick = (_, step) => {
    if (step.status === 'complete' || step.status === 'current') {
      if (step.name === 'UPLOAD FILE')
        dispatch(setCSVCurrentScreen('uploadFile'));
      else if (step.name === 'MAP FIELDS')
        dispatch(setCSVCurrentScreen('mapFields'));
      else if (step.name === 'REVIEW & CONFIRM IMPORT')
        dispatch(setCSVCurrentScreen('reviewAndConfirmImport'));
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

ImportCSVSteps.propTypes = {
  steps: arrayOf(
    shape({
      name: string
    })
  )
};

ImportCSVSteps.defaultProps = {
  steps: []
};

export default ImportCSVSteps;
