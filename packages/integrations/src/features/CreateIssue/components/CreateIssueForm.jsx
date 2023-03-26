import React from 'react';

import { createIssue } from '../../../api';
import { addAttachment } from '../../../api/addAttachment';
import { FormBuilder, SingleValueSelect } from '../../../common/components';
import { parseFieldsForCreate } from '../helpers';

import { FIELD_KEYS } from './constants';

const CreateIssueForm = ({
  fields,
  metaData,
  fieldsData,
  attachments,
  setFieldsData,
  setAttachments,
  setErrorMessage,
  projectFieldData,
  clearErrorMessage,
  cleanedIssueTypes,
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
          if (attachments?.length) {
            addAttachment(
              attachments[0],
              integrationToolFieldData?.value,
              response.data.ticket_id
            );
          }
        }
        return response;
      })
      .catch((res) => {
        setErrorMessage('Error creating issue');
        throw res;
      });
  };

  return (
    <>
      <div className="py-3">
        <SingleValueSelect
          fieldsData={fieldsData}
          fieldKey={FIELD_KEYS.ISSUE_TYPE}
          setFieldsData={setFieldsData}
          label="Issue type"
          placeholder="Select issue"
          required
          options={cleanedIssueTypes}
          selectFirstByDefault
        />
      </div>
      <FormBuilder
        fields={fields}
        metaData={metaData}
        attachments={attachments}
        handleSubmit={handleSubmit}
        setAttachments={setAttachments}
        setIsWorkInProgress={setIsWorkInProgress}
      />
    </>
  );
};

export default CreateIssueForm;
