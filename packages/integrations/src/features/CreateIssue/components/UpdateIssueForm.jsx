import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getTickets, updateIssue } from '../../../api';
import { addAttachment } from '../../../api/addAttachment';
import { FormBuilder, SingleValueSelect } from '../../../common/components';
import Attachments from '../../../common/components/Attachments';
import TextField from '../../../common/components/TextInput';
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
  issueSearchFieldData,
  setIsFormBeingSubmitted,
  integrationToolFieldData
}) => {
  const dispatch = useDispatch();
  const [issuesOptions, setIssueOptions] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const {
    description: descriptionMeta,
    successCallback,
    errorCallback
  } = options;
  const resetFieldErrors = () => {
    setFieldErrors({});
  };

  useEffect(() => {
    if (projectFieldData) {
      getTickets(
        integrationToolFieldData?.value,
        projectFieldData?.value,
        'single-value-select'
      ).then((response) => {
        setIssueOptions(response);
      });
    }
  }, [projectFieldData, integrationToolFieldData]);

  const handleSubmit = (formData) => {
    setIsFormBeingSubmitted(true);
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
        setIsFormBeingSubmitted(false);
        return Promise.reject(Error('update_failed'));
      })
      .then((response) => {
        if (response?.success) {
          // ticket creation was successful
          setIssueOptions([]);
          resetMeta();
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
          setIsFormBeingSubmitted(false);
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
          setIsFormBeingSubmitted(false);
        }
      });
  };

  return (
    <>
      <div className="pt-3">
        <SingleValueSelect
          required
          label="Search Issue to update"
          fieldsData={fieldsData}
          fieldKey={FIELD_KEYS.TICKET_ID_SEARCH}
          setFieldsData={setFieldsData}
          placeholder="Select with issues number, title or description"
          options={issuesOptions}
          searchPath={`/api/pm-tools/v1/tickets?integration_key=jira&project-id=${projectFieldData?.value}&format=single-value-select&query=`}
          disabled={!projectFieldData?.value}
        />
      </div>
      {!fields?.length && (
        <Attachments
          label="Attachment"
          attachments={attachments}
          setAttachments={setAttachments}
        />
      )}
      {issueFieldData && (
        <TextField disabled label="Issue" value={issueFieldData.label} />
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
