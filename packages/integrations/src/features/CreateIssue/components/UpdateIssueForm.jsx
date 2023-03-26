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
  metaData,
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
    if (metaData.description) {
      data.comment =
        (data.comment ? `${data.comment}\n` : '') + metaData.description;
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
        }
      })
      .catch((res) => {
        if (res.message !== 'update_failed')
          dispatch(
            setGlobalAlert({
              kind: 'warn',
              message:
                'Ticket updated successfully. Error in  uploading attachments'
            })
          );
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
      {/* {issueFieldValue && (
        <SingleValueSelect label="Issue" disabled value={issueFieldValue} />
      )} */}
      <FormBuilder
        hideDescription
        fields={fields}
        metaData={metaData}
        attachments={attachments}
        fieldErrors={fieldErrors}
        handleSubmit={handleSubmit}
        setAttachments={setAttachments}
        setIsWorkInProgress={setIsWorkInProgress}
      />
    </>
  );
};

export default UpdateIssueForm;
