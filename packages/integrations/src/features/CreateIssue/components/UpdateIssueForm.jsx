import React, { useEffect, useState } from 'react';

import { getTickets, updateIssue } from '../../../api';
import { addAttachment } from '../../../api/addAttachment';
import { FormBuilder, SingleValueSelect } from '../../../common/components';
import { parseFieldsForCreate } from '../helpers';

import { FIELD_KEYS } from './constants';

const UpdateIssueForm = ({
  fields,
  metaData,
  resetMeta,
  fieldsData,
  attachments,
  setFieldsData,
  issueFieldData,
  setAttachments,
  setErrorMessage,
  projectFieldData,
  clearErrorMessage,
  setIsWorkInProgress,
  integrationToolFieldData
}) => {
  const [issuesOptions, setIssueOptions] = useState([]);
  const [issueFieldValue, setIssueFieldValue] = useState(null);

  const clearIssueField = () => {
    setIssueFieldValue({});
  };

  useEffect(() => {
    if (projectFieldData) {
      getTickets(
        integrationToolFieldData?.value,
        projectFieldData?.value,
        'single-value-select'
      ).then((response) => {
        console.log(response);
      });
    }
  }, [projectFieldData, integrationToolFieldData]);

  const handleSubmit = (formData) => {
    const data = { ...fieldsData, ...formData };
    if (metaData.description) {
      data.comment =
        (data.comment ? `${data.comment}\n` : '') + metaData.description;
    }
    const parsed = parseFieldsForCreate(fields, data);
    return updateIssue(
      integrationToolFieldData?.value,
      issueFieldData.value,
      parsed
    )
      .then((response) => {
        if (response?.success) {
          clearErrorMessage();
          setIssueOptions([]);
          resetMeta();
          clearIssueField();
          if (attachments?.length) {
            addAttachment(
              attachments[0],
              integrationToolFieldData?.value,
              issueFieldData?.value
            );
          }
        }
        return response;
      })
      .catch((res) => {
        setErrorMessage('Error updating issue');
        throw res;
      });
  };

  return (
    <>
      <div className="py-3">
        <SingleValueSelect
          required
          label="Issue"
          fieldsData={fieldsData}
          fieldKey={FIELD_KEYS.TICKET_ID}
          setFieldsData={setFieldsData}
          placeholder="Select with issues number, title or description"
          optionsPath="/api/pm-tools/v1/tickets?integration_key=jira&format=single-value-select"
          options={issuesOptions}
          searchPath={`/api/pm-tools/v1/tickets?integration_key=jira&project-id=${projectFieldData?.value}&format=single-value-select&query=`}
          disabled={!projectFieldData?.value}
          value={issueFieldValue}
        />
      </div>
      <FormBuilder
        hideDescription
        fields={fields}
        metaData={metaData}
        attachments={attachments}
        showDescriptionMetaIn="comment"
        handleSubmit={handleSubmit}
        setAttachments={setAttachments}
        setIsWorkInProgress={setIsWorkInProgress}
      />
    </>
  );
};

export default UpdateIssueForm;
