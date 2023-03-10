import { setUnsavedDataExists } from './repositorySlice';

export const handleUnsavedData =
  ({ value, isRTE }) =>
  (dispatch, getState) => {
    const { repository } = getState();
    const { testCaseFormData } = repository;
    const { description } = testCaseFormData;

    if (isRTE && value.replace(/<[^>]*>/g, '').trim() === description.trim()) {
      // something may come up here
    } else dispatch(setUnsavedDataExists(true));
  };
