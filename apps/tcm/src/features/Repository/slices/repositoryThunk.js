// [NOTE: This is to fix the bug we are facing with RTE].
import { htmlRegex } from '../const/testCaseConst';

import { setUnsavedDataExists } from './repositorySlice';

// eslint-disable-next-line sonarjs/cognitive-complexity
const beforeEditingIsEqualAfterEditing = (
  beforeEditing,
  afterEditing,
  template
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const allKeys = Object?.keys(beforeEditing);

  for (let i = 0; i < allKeys.length; i += 1) {
    if (
      // simple RTE case
      (allKeys[i] === 'expected_result' ||
        allKeys[i] === 'description' ||
        allKeys[i] === 'preconditions') &&
      beforeEditing[allKeys[i]]?.replace(htmlRegex, '') !==
        afterEditing[allKeys[i]]?.replace(htmlRegex, '')
    ) {
      return false;
    }
    if (allKeys[i] === 'steps' && template === 'test_case_steps') {
      // RTE steps
      const beforeSteps = beforeEditing[allKeys[i]];
      const afterSteps = afterEditing[allKeys[i]];

      for (let j = 0; j < beforeSteps.length; j += 1) {
        if (
          beforeSteps[j]?.expected_result?.replace(htmlRegex, '') !==
            afterSteps[j]?.expected_result?.replace(htmlRegex, '') ||
          beforeSteps[j]?.step?.replace(htmlRegex, '') !==
            afterSteps[j]?.step?.replace(htmlRegex, '')
        ) {
          return false;
        }
      }
    }
    if (
      allKeys[i] === 'steps' &&
      template === 'test_case_text' &&
      beforeEditing[allKeys[i]]?.[0]?.replace(htmlRegex, '') !==
        afterEditing[allKeys[i]]?.[0].replace(htmlRegex, '')
    ) {
      // RTE steps and text
      return false;
    }
    if (
      beforeEditing[allKeys[i]] !== afterEditing[allKeys[i]] &&
      allKeys[i] !== 'steps' &&
      allKeys[i] !== 'expected_result' &&
      allKeys[i] !== 'description' &&
      allKeys[i] !== 'preconditions'
    ) {
      return false;
    }
  }
  return true;
};

export const handleUnsavedData = () => (dispatch, getState) => {
  const { repository } = getState();
  const { currentEditedTestCaseData, testCaseFormData } = repository;

  if (
    !beforeEditingIsEqualAfterEditing(
      currentEditedTestCaseData,
      testCaseFormData,
      currentEditedTestCaseData?.template
    )
  ) {
    dispatch(setUnsavedDataExists(true));
  }
};
