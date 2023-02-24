import React from 'react';
import { useDispatch } from 'react-redux';
import { TMSteps } from 'common/bifrostProxy';
import { arrayOf, shape, string } from 'prop-types';

import {
  COMPLETE_STEP,
  CURRENT_COMPLETED_STEP,
  CURRENT_STEP
} from '../const/importSteps';
import { setCurrentScreen, setImportSteps } from '../slices/importSlice';

const ImportSteps = (props) => {
  const { steps } = props;
  const dispatch = useDispatch();

  const redirectToScreen = (stepName) => {
    if (stepName === 'CONFIGURE TOOL')
      dispatch(setCurrentScreen('configureTool'));
    else if (stepName === 'CONFIGURE DATA')
      dispatch(setCurrentScreen('configureData'));
    else if (stepName === 'CONFIRM IMPORT')
      dispatch(setCurrentScreen('confirmImport'));
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleStepClick = (_, step) => {
    if (step.status === CURRENT_STEP) {
      const currentStepIndex = steps.findIndex(
        (cStep) => cStep.name === step.name
      );
      const newSteps = steps.map((currentStep, idx) => {
        if (idx < currentStepIndex)
          return { ...currentStep, status: COMPLETE_STEP };
        if (idx === currentStepIndex)
          return { ...currentStep, status: CURRENT_STEP };
        return currentStep;
      });
      dispatch(setImportSteps(newSteps));
      redirectToScreen(step.name);
    } else if (step.status === COMPLETE_STEP) {
      const currentStepIndex = steps.findIndex(
        (cStep) => cStep.name === step.name
      );
      const newSteps = steps.map((currentStep, idx) => {
        if (idx === currentStepIndex)
          return { ...currentStep, status: CURRENT_COMPLETED_STEP };
        if (
          (idx > currentStepIndex || idx < currentStepIndex) &&
          currentStep.status === CURRENT_COMPLETED_STEP
        )
          return { ...currentStep, status: COMPLETE_STEP };

        return currentStep;
      });
      dispatch(setImportSteps(newSteps));
      redirectToScreen(step.name);
    }
  };

  return (
    <div className="bg-white">
      <TMSteps
        steps={steps}
        format="panels-with-borders"
        onClick={handleStepClick}
      />
    </div>
  );
};

ImportSteps.propTypes = {
  steps: arrayOf(
    shape({
      name: string
    })
  )
};

ImportSteps.defaultProps = {
  steps: []
};

export default ImportSteps;
