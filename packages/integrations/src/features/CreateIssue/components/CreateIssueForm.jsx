import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createIssue } from '../../../api';
import { addAttachment } from '../../../api/addAttachment';
import { FormBuilder, SingleValueSelect } from '../../../common/components';
import { setGlobalAlert } from '../../../common/slices/globalAlertSlice';
import { parseFieldsForCreate } from '../helpers';

import { FIELD_KEYS } from './constants';

const CreateIssueForm = ({
  fields,
  metaData,
  resetMeta,
  fieldsData,
  attachments,
  setFieldsData,
  setAttachments,
  projectFieldData,
  cleanedIssueTypes,
  issueTypeFieldData,
  setIsWorkInProgress,
  integrationToolFieldData
}) => {
  const dispatch = useDispatch();
  const [fieldErrors, setFieldErrors] = useState({});
  const resetFieldErrors = () => {
    setFieldErrors({});
  };
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
    resetFieldErrors();
    return createIssue(integrationToolFieldData?.value, parsed)
      .catch((errorResponse) => {
        if (errorResponse?.field_errors) {
          setFieldErrors(errorResponse.field_errors);
        }
        dispatch(
          setGlobalAlert({ kind: 'error', message: 'Error creating issue' })
        );
        return Promise.reject(Error('create_failed'));
      })
      .then((response) => {
        if (response?.success) {
          // ticket creation was successful
          resetMeta();
          if (attachments?.length) {
            // has attachments to add
            return addAttachment(
              attachments[0],
              integrationToolFieldData?.value,
              response.data.ticket_id,
              response.data.ticket_url
            );
          }
          // no attachment, just form success
          return response;
        }
        return null;
      })
      .then((response) => {
        if (response?.success) {
          dispatch(
            setGlobalAlert({
              kind: 'success',
              message: 'Ticket added successfully'
            })
          );
        }
      })
      .catch((res) => {
        if (res.message !== 'create_failed' && res.cause.ticket_url)
          dispatch(
            setGlobalAlert({
              kind: 'warn',
              message:
                'Ticket created successfully. Error in  uploading attachments',
              linkText: 'View',
              linkUrl: res.cause.ticket_url
            })
          );
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
        fieldErrors={fieldErrors}
        attachments={attachments}
        handleSubmit={handleSubmit}
        setAttachments={setAttachments}
        setIsWorkInProgress={setIsWorkInProgress}
      />
    </>
  );
};

export default CreateIssueForm;
