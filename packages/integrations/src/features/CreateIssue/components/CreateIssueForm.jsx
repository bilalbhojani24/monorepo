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
  options,
  resetMeta,
  fieldsData,
  attachments,
  setFieldsData,
  setAttachments,
  projectFieldData,
  cleanedIssueTypes,
  issueTypeFieldData,
  setIsWorkInProgress,
  integrationToolFieldData,
  setIsFormBeingSubmitted
}) => {
  const dispatch = useDispatch();
  const [fieldErrors, setFieldErrors] = useState({});
  const {
    description: descriptionMeta,
    successCallback,
    errorCallback
  } = options;
  const resetFieldErrors = () => {
    setFieldErrors({});
  };
  const handleSubmit = (formData) => {
    setIsFormBeingSubmitted(true);
    const data = { ...fieldsData, ...formData };
    if (descriptionMeta) {
      data.description =
        (data.description ? `${data.description}\n` : '') + descriptionMeta;
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
        if (typeof errorCallback === 'function') {
          errorCallback({
            event: 'create',
            data: {
              error: errorResponse,
              integration: {
                key: integrationToolFieldData.value,
                label: integrationToolFieldData.title
              }
            }
          });
        }
        setIsFormBeingSubmitted(false);
        return Promise.reject(Error('create_failed'));
      })
      .then((response) => {
        if (response?.success) {
          // ticket creation was successful
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
          if (typeof successCallback === 'function') {
            const payload = {
              event: 'create',
              data: {
                issueId: response?.data?.ticket_id,
                issureUrl: response?.data?.ticket_url,
                integration: {
                  key: integrationToolFieldData.value,
                  label: integrationToolFieldData.title
                }
              }
            };
            if (response?.data?.attachment) {
              payload.data.attachments = [response.data.attachment];
            }
            successCallback(payload);
          }
          setIsFormBeingSubmitted(false);
        }
      })
      .catch((res) => {
        if (res?.message !== 'create_failed' && res?.cause?.ticket_url) {
          dispatch(
            setGlobalAlert({
              kind: 'warn',
              message:
                'Ticket created successfully. Error in  uploading attachments',
              linkText: 'View',
              linkUrl: res.cause.ticket_url
            })
          );
          if (typeof successCallback === 'function') {
            const payload = {
              event: 'create',
              data: {
                issueId: res.cause.ticket_id,
                issureUrl: res.cause.ticket_url,
                integration: {
                  key: integrationToolFieldData.value,
                  label: integrationToolFieldData.title
                }
              }
            };
            if (res.cause.attachment) {
              payload.data.attachments = [res.cause.attachment];
            }
            successCallback(payload);
          }
          setIsFormBeingSubmitted(false);
        }
      });
  };

  return (
    <>
      <div className="pt-3">
        <SingleValueSelect
          fieldsData={fieldsData}
          fieldKey={FIELD_KEYS.ISSUE_TYPE}
          setFieldsData={setFieldsData}
          label="Issue type"
          placeholder="Select issue"
          required
          options={cleanedIssueTypes}
          selectFirstByDefault
          selectFirstOnOptionChange
        />
      </div>
      <FormBuilder
        fields={fields}
        fieldErrors={fieldErrors}
        attachments={attachments}
        handleSubmit={handleSubmit}
        setAttachments={setAttachments}
        descriptionMeta={descriptionMeta}
        setIsWorkInProgress={setIsWorkInProgress}
      />
    </>
  );
};

export default CreateIssueForm;
