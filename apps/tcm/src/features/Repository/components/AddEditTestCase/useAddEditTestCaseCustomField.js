import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCustomFieldsAPI } from 'api/projects.api';

import { setCustomFieldsData } from '../../slices/repositorySlice';

const useAddEditTestCaseCustomField = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const customFieldData = useSelector(
    (state) => state.repository.customFieldData
  );

  const initCustomFormFields = useCallback(() => {
    if (customFieldData?.projectId !== projectId) {
      getCustomFieldsAPI(projectId).then((res) => {
        dispatch(
          setCustomFieldsData({
            projectId,
            fields: res?.custom_fields || []
          })
        );
      });
    }
  }, [customFieldData?.projectId, dispatch, projectId]);

  useEffect(() => {
    initCustomFormFields();
  }, [initCustomFormFields]);

  return { customFields: customFieldData?.fields || [] };
};

export default useAddEditTestCaseCustomField;
