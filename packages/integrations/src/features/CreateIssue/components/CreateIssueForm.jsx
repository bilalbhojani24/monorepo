import React from 'react';

import { createIssue } from '../../../api';
import { FormBuilder } from '../../../common/components';
import { parseFieldsForCreate } from '../helpers';

const CreateIssueForm = ({
  fields,
  metaData,
  fieldsData,
  setErrorMessage,
  projectFieldData,
  clearErrorMessage,
  issueTypeFieldData,
  setIsWorkInProgress,
  integrationToolFieldData
}) => {
  const handleSubmit = (formData) => {
    const data = { ...fieldsData, ...formData };
    if (metaData.description) {
      data.description =
        (data.description ? `${data.description}\n` : '') +
        metaData.description;
    }
    const parsed = parseFieldsForCreate(fields, data);
    parsed.project_id = projectFieldData.value;
    parsed.ticket_type_id = issueTypeFieldData.value;
    return createIssue(integrationToolFieldData?.value, parsed)
      .then((response) => {
        if (response?.success) {
          clearErrorMessage();
        }
        return response;
      })
      .catch((res) => {
        setErrorMessage('Error creating issue');
        return res;
      });
  };

  return (
    <FormBuilder
      fields={fields}
      metaData={metaData}
      handleSubmit={handleSubmit}
      setIsWorkInProgress={setIsWorkInProgress}
    />
  );
};

export default CreateIssueForm;
