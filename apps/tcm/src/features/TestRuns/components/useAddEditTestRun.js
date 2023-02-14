import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { imageUploadRTEHandlerAPI } from 'api/attachments.api';
import { getTestRuns } from 'api/testruns.api';

import { setAddTestRunForm } from '../slices/testRunsSlice';

const useAddEditTestRun = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const tagsArray = [];
  const issuesArray = [];
  const testRunFormData = useSelector(
    (state) => state.testRuns.testRunFormData
  );

  const imageUploadRTEHelper = (files) =>
    imageUploadRTEHandlerAPI({ files, projectId });

  const handleTestRunInputFieldChange = () => {};

  return {
    testRunFormData,
    tagsArray,
    issuesArray,
    handleTestRunInputFieldChange,
    imageUploadRTEHelper
  };
};

export default useAddEditTestRun;
