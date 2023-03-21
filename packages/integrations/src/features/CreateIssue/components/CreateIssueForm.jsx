import React from 'react';

import { createIssue } from '../../../api';
import { FormBuilder } from '../../../common/components';
import { parseFieldsForCreate } from '../helpers';

const CreateIssueForm = ({
  fields,
  metaData,
  fieldsData,
  projectFieldData,
  issueTypeFieldData,
  setIsWorkInProgress,
  integrationToolFieldData
}) => {
  const handleSubmit = (formData) => {
    // if (!areAllRequiredFieldsNonEmpty(allRequiredFields, formData)) {
    //   return;
    // }
    const data = { ...fieldsData, ...formData };
    if (metaData.description) {
      data.description =
        (data.description ? `${data.description}\n` : '') +
        metaData.description;
    }
    const parsed = parseFieldsForCreate(fields, data);
    parsed.projectId = projectFieldData.value;
    parsed.ticketTypeId = issueTypeFieldData.value;
    createIssue(integrationToolFieldData?.value, parsed);
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
