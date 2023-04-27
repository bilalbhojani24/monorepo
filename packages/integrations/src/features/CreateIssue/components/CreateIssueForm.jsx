import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { createIssue } from '../../../api';
import { addAttachment } from '../../../api/addAttachment';
import { FormBuilder, SingleValueSelect } from '../../../common/components';
import {
  SingleValueSelectOptionType,
  SingleValueSelectRawOptionType
} from '../../../common/components/types';
import { setGlobalAlert } from '../../../common/slices/globalAlertSlice';
import { parseFieldsForCreate } from '../helpers';
import { CreateIssueOptionsType } from '../types';

import { FIELD_KEYS, VALIDATION_FAILURE_ERROR_MESSAGE } from './constants';

const CreateIssueForm = ({
  fields,
  options,
  resetMeta,
  fieldsData,
  attachments,
  setFieldsData,
  setAttachments,
  isWorkInProgress,
  projectFieldData,
  deselectIssueType,
  scrollWidgetToTop,
  cleanedIssueTypes,
  issueTypeFieldData,
  isCreateMetaLoading,
  setIsWorkInProgress,
  isFormBeingSubmitted,
  setIsFormBeingSubmitted,
  integrationToolFieldData
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
  const handleSubmit = useCallback(
    // eslint-disable-next-line sonarjs/cognitive-complexity
    (formData) => {
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
            setGlobalAlert({ kind: 'error', message: 'Error creating issue.' })
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
          scrollWidgetToTop();
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
                response.data.ticket_url,
                response.data.ticket_key
              );
            }
            // no attachment, just form success
            return response;
          }
          return null;
        })
        .then((response) => {
          if (response?.success) {
            resetMeta();
            deselectIssueType();
            dispatch(
              setGlobalAlert({
                kind: 'success',
                message: 'Ticket created successfully.',
                linkUrl: response?.data?.ticket_url,
                linkText: 'View'
              })
            );
            if (typeof successCallback === 'function') {
              const payload = {
                event: 'create',
                data: {
                  issueId: response?.data?.ticket_id,
                  issueUrl: response?.data?.ticket_url,
                  issueKey: response?.data?.ticket_key,
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
            setIsWorkInProgress(false);
            setIsFormBeingSubmitted(false);
            scrollWidgetToTop();
            return response;
          }
          return null;
        })
        .catch((res) => {
          if (res?.message !== 'create_failed' && res?.cause?.ticket_url) {
            resetMeta();
            deselectIssueType();
            dispatch(
              setGlobalAlert({
                kind: 'warn',
                message:
                  'Ticket created successfully. Error in  uploading attachments.',
                linkText: 'View',
                linkUrl: res.cause.ticket_url
              })
            );
            if (typeof successCallback === 'function') {
              const payload = {
                event: 'create',
                data: {
                  issueId: res.cause.ticket_id,
                  issueUrl: res.cause.ticket_url,
                  issueKey: res?.cause?.ticket_key,
                  integration: {
                    key: integrationToolFieldData.value,
                    label: integrationToolFieldData.title
                  }
                }
              };
              if (res.cause?.attachment) {
                payload.data.attachments = [res.cause?.attachment];
              }
              successCallback(payload);
            }
            setIsWorkInProgress(false);
            setIsFormBeingSubmitted(false);
            scrollWidgetToTop();
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      attachments,
      descriptionMeta,
      dispatch,
      errorCallback,
      fields,
      fieldsData,
      integrationToolFieldData,
      issueTypeFieldData,
      projectFieldData,
      setIsFormBeingSubmitted,
      successCallback
    ]
  );

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
          disabled={!projectFieldData}
        />
      </div>
      {isCreateMetaLoading && (
        <div className="flex flex-col items-center py-6">
          <Loader height="h-6" width="w-6" wrapperStyle="text-base-400" />
          <p className="text-base-500 mt-6 text-center">Loading...</p>
        </div>
      )}
      {!isCreateMetaLoading && (
        <FormBuilder
          fields={fields}
          fieldErrors={fieldErrors}
          attachments={attachments}
          handleSubmit={handleSubmit}
          setAttachments={setAttachments}
          descriptionMeta={descriptionMeta}
          isWorkInProgress={isWorkInProgress}
          scrollWidgetToTop={scrollWidgetToTop}
          setIsWorkInProgress={setIsWorkInProgress}
          isFormBeingSubmitted={isFormBeingSubmitted}
          validationFailureErrorMessage={
            VALIDATION_FAILURE_ERROR_MESSAGE.CREATE
          }
        />
      )}
    </>
  );
};
CreateIssueForm.propTypes = {
  resetMeta: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf({}).isRequired,
  setFieldsData: PropTypes.func.isRequired,
  setAttachments: PropTypes.func.isRequired,
  fieldsData: PropTypes.shape({}).isRequired,
  options: CreateIssueOptionsType.isRequired,
  isWorkInProgress: PropTypes.bool.isRequired,
  scrollWidgetToTop: PropTypes.func.isRequired,
  deselectIssueType: PropTypes.func.isRequired,
  setIsWorkInProgress: PropTypes.func.isRequired,
  isCreateMetaLoading: PropTypes.bool.isRequired,
  isFormBeingSubmitted: PropTypes.bool.isRequired,
  setIsFormBeingSubmitted: PropTypes.func.isRequired,
  issueTypeFieldData: SingleValueSelectOptionType.isRequired,
  projectFieldData: SingleValueSelectOptionType.isRequired,
  attachments: PropTypes.arrayOf(PropTypes.string).isRequired,
  integrationToolFieldData: SingleValueSelectOptionType.isRequired,
  cleanedIssueTypes: PropTypes.arrayOf(SingleValueSelectRawOptionType)
    .isRequired
};

export default CreateIssueForm;
