import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '@browserstack/bifrost';
import { usePrevious } from '@browserstack/hooks';
import PropTypes from 'prop-types';

import { getTickets, updateIssue } from '../../../api';
import { addAttachment } from '../../../api/addAttachment';
import { FormBuilder, SingleValueSelect } from '../../../common/components';
import Attachments from '../../../common/components/Attachments';
import { SingleValueSelectOptionType } from '../../../common/components/types';
import { setGlobalAlert } from '../../../common/slices/globalAlertSlice';
import { parseFieldsForCreate } from '../helpers';
import { CreateIssueOptionsType } from '../types';

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
  isWorkInProgress,
  projectFieldData,
  scrollWidgetToTop,
  isUpdateMetaLoading,
  setIsWorkInProgress,
  setIsFormBeingSubmitted,
  integrationToolFieldData
}) => {
  const dispatch = useDispatch();
  const prevProject = usePrevious(projectFieldData);
  const [issuesOptions, setIssueOptions] = useState([]);
  const [areIssueOptionsLoading, setAreIssueOptionsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const {
    description: descriptionMeta,
    successCallback,
    errorCallback
  } = options;
  const resetFieldErrors = () => {
    setFieldErrors({});
  };
  const getTicketForProject = () => {
    setAreIssueOptionsLoading(true);
    getTickets(
      integrationToolFieldData?.value,
      projectFieldData?.value,
      'single-value-select'
    )
      .then((response) => {
        setIssueOptions(response);
        setAreIssueOptionsLoading(false);
      })
      .catch((err) => {
        setAreIssueOptionsLoading(false);
        throw err;
      });
  };

  useEffect(() => {
    if (projectFieldData?.value !== prevProject?.value) {
      getTicketForProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectFieldData, integrationToolFieldData]);

  const handleSubmit = useCallback(
    // eslint-disable-next-line sonarjs/cognitive-complexity
    (formData) => {
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
          scrollWidgetToTop();
          return Promise.reject(Error('update_failed'));
        })
        .then((response) => {
          if (response?.success) {
            // ticket updation was successful
            getTicketForProject(); // renew ticket data
            if (attachments?.length) {
              // has attachments to add
              return addAttachment(
                attachments[0],
                integrationToolFieldData?.value,
                issueFieldData?.value,
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
            dispatch(
              setGlobalAlert({
                kind: 'success',
                message: 'Ticket updated successfully.',
                linkUrl: response?.data?.ticket_url,
                linkText: 'View'
              })
            );
            if (typeof successCallback === 'function') {
              const payload = {
                event: 'update',
                data: {
                  issueId: response?.data?.ticket_id,
                  issureUrl: response?.data?.ticket_url,
                  issueKey: response?.data?.ticket_key,
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
            setIsWorkInProgress(false);
            setIsFormBeingSubmitted(false);
            scrollWidgetToTop();
          }
        })
        .catch((res) => {
          if (res?.message !== 'update_failed') {
            resetMeta();
            dispatch(
              setGlobalAlert({
                kind: 'warn',
                message:
                  'Ticket updated successfully. Error in  uploading attachments',
                linkText: 'View',
                linkUrl: res.cause.ticket_url
              })
            );
            if (typeof successCallback === 'function') {
              const payload = {
                event: 'update',
                data: {
                  issueId: res?.cause.ticket_id,
                  issureUrl: res.cause.ticket_url,
                  issueKey: res?.cause?.ticket_key,
                  integration: {
                    key: integrationToolFieldData.value,
                    label: integrationToolFieldData.title
                  }
                }
              };
              if (res?.cause?.attachment) {
                payload.data.attachments = [res?.cause?.attachment];
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
      issueFieldData,
      resetMeta,
      setIsFormBeingSubmitted,
      successCallback
    ]
  );

  const searchPath = projectFieldData?.value
    ? `/api/pm-tools/v1/tickets?integration_key=jira&project_id=${projectFieldData?.value}&format=single-value-select&query=`
    : null;

  return (
    <>
      <div className="pt-3">
        <SingleValueSelect
          required
          label="Issue"
          fieldsData={fieldsData}
          options={issuesOptions}
          searchPath={searchPath}
          setFieldsData={setFieldsData}
          fieldKey={FIELD_KEYS.TICKET_ID}
          disabled={!projectFieldData?.value}
          areOptionsLoading={areIssueOptionsLoading}
          placeholder="Select Issue Number or Description"
        />
      </div>
      {!fields?.length && (
        <Attachments
          label="Attachment"
          attachments={attachments}
          setAttachments={setAttachments}
        />
      )}
      {isUpdateMetaLoading && (
        <div className="flex flex-col items-center py-6">
          <Loader height="h-6" width="w-6" wrapperStyle="text-base-400" />
          <p className="text-base-500 mt-6 text-center">Loading...</p>
        </div>
      )}
      {!isUpdateMetaLoading && (
        <FormBuilder
          hideDescription
          fields={fields}
          attachments={attachments}
          fieldErrors={fieldErrors}
          handleSubmit={handleSubmit}
          setAttachments={setAttachments}
          descriptionMeta={descriptionMeta}
          isWorkInProgress={isWorkInProgress}
          scrollWidgetToTop={scrollWidgetToTop}
          setIsWorkInProgress={setIsWorkInProgress}
        />
      )}
    </>
  );
};

UpdateIssueForm.propTypes = {
  resetMeta: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf({}).isRequired,
  setFieldsData: PropTypes.func.isRequired,
  setAttachments: PropTypes.func.isRequired,
  fieldsData: PropTypes.shape({}).isRequired,
  options: CreateIssueOptionsType.isRequired,
  isWorkInProgress: PropTypes.bool.isRequired,
  scrollWidgetToTop: PropTypes.func.isRequired,
  setIsWorkInProgress: PropTypes.func.isRequired,
  isUpdateMetaLoading: PropTypes.bool.isRequired,
  setIsFormBeingSubmitted: PropTypes.func.isRequired,
  issueFieldData: SingleValueSelectOptionType.isRequired,
  projectFieldData: SingleValueSelectOptionType.isRequired,
  attachments: PropTypes.arrayOf(PropTypes.string).isRequired,
  integrationToolFieldData: SingleValueSelectOptionType.isRequired
};

export default UpdateIssueForm;
