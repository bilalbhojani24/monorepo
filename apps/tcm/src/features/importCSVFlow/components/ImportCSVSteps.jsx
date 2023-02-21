import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TMSteps } from 'common/bifrostProxy';
import { arrayOf, shape, string } from 'prop-types';

import {
  COMPLETE_STEP,
  CURRENT_COMPLETED_STEP,
  CURRENT_STEP
} from '../const/importCSVConstants';
import {
  setCSVCurrentScreen,
  setCSVImportSteps
} from '../slices/importCSVSlice';

const ImportCSVSteps = (props) => {
  const { steps } = props;
  const dispatch = useDispatch();
  const [stepOptions, setStepOptions] = useState([...steps]);
  const importCSVSteps = useSelector((state) => state.importCSV.importCSVSteps);

  useEffect(() => {
    setStepOptions(steps);
  }, [steps]);

  const redirectToScreen = (stepName) => {
    if (stepName === 'UPLOAD FILE') dispatch(setCSVCurrentScreen('uploadFile'));
    else if (stepName === 'MAP FIELDS')
      dispatch(setCSVCurrentScreen('mapFields'));
    else if (stepName === 'PREVIEW & CONFIRM IMPORT')
      dispatch(setCSVCurrentScreen('previewAndConfirmImport'));
  };

  const handleStepClick = (_, step) => {
    if (step.status === CURRENT_STEP) {
      const currentStepIndex = importCSVSteps.findIndex(
        (cStep) => cStep.name === step.name
      );
      const newSteps = importCSVSteps.map((currentStep, idx) => {
        if (idx < currentStepIndex)
          return { ...currentStep, status: COMPLETE_STEP };
        if (idx === currentStepIndex)
          return { ...currentStep, status: CURRENT_STEP };
        return currentStep;
      });
      dispatch(setCSVImportSteps(newSteps));
      redirectToScreen(step.name);
    } else if (step.status === COMPLETE_STEP) {
      const currentStepIndex = importCSVSteps.findIndex(
        (cStep) => cStep.name === step.name
      );
      const newSteps = importCSVSteps.map((currentStep, idx) => {
        if (idx === currentStepIndex)
          return { ...currentStep, status: CURRENT_COMPLETED_STEP };
        if (
          idx > currentStepIndex &&
          currentStep.status === CURRENT_COMPLETED_STEP
        )
          return { ...currentStep, status: COMPLETE_STEP };

        return currentStep;
      });
      dispatch(setCSVImportSteps(newSteps));
      redirectToScreen(step.name);
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
