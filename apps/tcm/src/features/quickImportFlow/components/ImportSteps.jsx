// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { TMSteps } from 'common/bifrostProxy';
// import { arrayOf, shape, string } from 'prop-types';

// import {
//   COMPLETE_STEP,
//   CONFIGURE_DATA,
//   CONFIGURE_TOOL,
//   CONFIRM_IMPORT,
//   CURRENT_COMPLETED_STEP,
//   CURRENT_STEP,
//   SCREEN_1,
//   SCREEN_2,
//   SCREEN_3
// } from '../const/importSteps';
// import { setCurrentScreen, setImportSteps } from '../slices/importSlice';

// const ImportSteps = (props) => {
//   const { steps } = props;
//   const dispatch = useDispatch();

//   const redirectToScreen = (stepName) => {
//     if (stepName === CONFIGURE_TOOL) dispatch(setCurrentScreen(SCREEN_1));
//     else if (stepName === CONFIGURE_DATA) dispatch(setCurrentScreen(SCREEN_2));
//     else if (stepName === CONFIRM_IMPORT) dispatch(setCurrentScreen(SCREEN_3));
//   };

//   // eslint-disable-next-line sonarjs/cognitive-complexity
//   const handleStepClick = (_, step) => {
//     if (step.status === CURRENT_STEP) {
//       const currentStepIndex = steps.findIndex(
//         (cStep) => cStep.name === step.name
//       );
//       const newSteps = steps.map((currentStep, idx) => {
//         if (idx < currentStepIndex)
//           return { ...currentStep, status: COMPLETE_STEP };
//         if (idx === currentStepIndex)
//           return { ...currentStep, status: CURRENT_STEP };
//         return currentStep;
//       });
//       dispatch(setImportSteps(newSteps));
//       redirectToScreen(step.name);
//     } else if (step.status === COMPLETE_STEP) {
//       const currentStepIndex = steps.findIndex(
//         (cStep) => cStep.name === step.name
//       );
//       const newSteps = steps.map((currentStep, idx) => {
//         if (idx === currentStepIndex)
//           return { ...currentStep, status: CURRENT_COMPLETED_STEP };
//         if (
//           (idx > currentStepIndex || idx < currentStepIndex) &&
//           currentStep.status === CURRENT_COMPLETED_STEP
//         )
//           return { ...currentStep, status: COMPLETE_STEP };

//         return currentStep;
//       });
//       dispatch(setImportSteps(newSteps));
//       redirectToScreen(step.name);
//     }
//   };

//   return (
//     <div className="bg-white">
//       <TMSteps
//         steps={steps}
//         format="panels-with-borders"
//         onClick={handleStepClick}
//       />
//     </div>
//   );
// };

// ImportSteps.propTypes = {
//   steps: arrayOf(
//     shape({
//       name: string
//     })
//   )
// };

// ImportSteps.defaultProps = {
//   steps: []
// };

// export default ImportSteps;
