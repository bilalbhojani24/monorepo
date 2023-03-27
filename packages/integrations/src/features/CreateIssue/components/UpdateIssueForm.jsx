import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getTickets, updateIssue } from '../../../api';
import { addAttachment } from '../../../api/addAttachment';
import { FormBuilder, SingleValueSelect } from '../../../common/components';
import Attachments from '../../../common/components/Attachments';
import { setGlobalAlert } from '../../../common/slices/globalAlertSlice';
import { parseFieldsForCreate } from '../helpers';

import { FIELD_KEYS } from './constants';

const UpdateIssueForm = ({
  fields,
  options,
  resetMeta,
  fieldsData,
  attachments,
  setFieldsData,
  issueFieldData,
  setAttachments,
  projectFieldData,
  setIsWorkInProgress,
  integrationToolFieldData
}) => {
  const dispatch = useDispatch();
  const [issuesOptions, setIssueOptions] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [issueFieldValue, setIssueFieldValue] = useState(null);
  const {
    description: descriptionMeta,
    successCallback,
    errorCallback
  } = options;
  const resetFieldErrors = () => {
    setFieldErrors({});
  };

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
    if (descriptionMeta) {
      data.comment =
        (data.comment ? `${data.comment}\n` : '') + descriptionMeta;
    }
    const parsed = parseFieldsForCreate(fields, data);
    resetFieldErrors();
    return updateIssue(
      integrationToolFieldData?.value,
      issueFieldData.value,
      parsed
    )
      .catch((errorResponse) => {
        if (errorResponse?.field_errors) {
          setFieldErrors(errorResponse.field_errors);
        }
        dispatch(
          setGlobalAlert({ kind: 'error', message: 'Error updating issue' })
        );
        if (typeof errorCallback === 'function') {
          errorCallback({
            event: 'update',
            data: {
              error: errorResponse,
              integration: {
                key: integrationToolFieldData.value,
                label: integrationToolFieldData.title
              }
            }
          });
        }
        return Promise.reject(Error('update_failed'));
      })
      .then((response) => {
        if (response?.success) {
          // ticket creation was successful
          setIssueOptions([]);
          resetMeta();
          clearIssueField();
          if (attachments?.length) {
            // has attachments to add
            return addAttachment(
              attachments[0],
              integrationToolFieldData?.value,
              issueFieldData?.value
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
              message: 'Ticket updated successfully'
            })
          );
          if (typeof successCallback === 'function') {
            const payload = {
              event: 'update',
              data: {
                issueId: response?.data?.ticket_id,
                integration: {
                  key: integrationToolFieldData.value,
                  label: integrationToolFieldData.title
                }
              }
            };
            if (response?.data?.attachment) {
              payload.data.attachments = [response?.data?.attachment];
            }
            successCallback(payload);
          }
        }
      })
      .catch((res) => {
        if (res.message !== 'update_failed') {
          dispatch(
            setGlobalAlert({
              kind: 'warn',
              message:
                'Ticket updated successfully. Error in  uploading attachments'
            })
          );
          if (typeof successCallback === 'function') {
            const payload = {
              event: 'update',
              data: {
                issueId: res?.cause.ticket_id,
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
        }
      });
  };

  return (
    <>
      <div className="py-3">
        <SingleValueSelect
          required
          label="Search Issue to update"
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
      {!fields?.length && (
        <Attachments
          label="Attachment"
          attachments={attachments}
          setAttachments={setAttachments}
        />
      )}
      {issueFieldValue && (
        <SingleValueSelect label="Issue" disabled value={issueFieldValue} />
      )}
      <FormBuilder
        hideDescription
        fields={fields}
        attachments={attachments}
        fieldErrors={fieldErrors}
        handleSubmit={handleSubmit}
        setAttachments={setAttachments}
        descriptionMeta={descriptionMeta}
        setIsWorkInProgress={setIsWorkInProgress}
      />
    </>
  );
};

export default UpdateIssueForm;
