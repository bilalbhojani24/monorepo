import React from 'react';
import { Loader, Tabs } from '@browserstack/bifrost';

import { GenericError, SingleValueSelect } from '../../../common/components';

import { FIELD_KEYS, ISSUE_MODES, TABS } from './constants';
import CreateIssueForm from './CreateIssueForm';
import UpdateIssueForm from './UpdateIssueForm';

const renderChild = ({
  mode,
  fields,
  metaData,
  projects,
  resetMeta,
  fieldsData,
  attachments,
  setFieldsData,
  setAttachments,
  issueFieldData,
  handleTryAgain,
  setErrorMessage,
  projectFieldData,
  projectsHaveError,
  clearErrorMessage,
  cleanedIssueTypes,
  areProjectsLoading,
  issueTypeFieldData,
  setIsWorkInProgress,
  handleIssueTabChange,
  integrationToolFieldData
}) => {
  if (areProjectsLoading) {
    return <Loader height="h-6" width="w-6" wrapperStyle="text-base-400" />;
  }
  if (projectsHaveError) {
    return (
      <GenericError
        errorMessage="Error loading projects"
        handleTryAgain={handleTryAgain}
      />
    );
  }

  return (
    <>
      <div className="py-3">
        <SingleValueSelect
          fieldsData={fieldsData}
          fieldKey={FIELD_KEYS.PROJECT}
          setFieldsData={setFieldsData}
          label="Project"
          required
          placeholder="Select project"
          options={projects}
        />
      </div>
      <Tabs
        tabsArray={TABS}
        onTabChange={handleIssueTabChange}
        defaultIndex={mode === ISSUE_MODES.CREATION ? 0 : 1}
      />

      {mode === ISSUE_MODES.CREATION ? (
        <CreateIssueForm
          fields={fields}
          metaData={metaData}
          fieldsData={fieldsData}
          attachments={attachments}
          setFieldsData={setFieldsData}
          setAttachments={setAttachments}
          setErrorMessage={setErrorMessage}
          projectFieldData={projectFieldData}
          clearErrorMessage={clearErrorMessage}
          cleanedIssueTypes={cleanedIssueTypes}
          issueTypeFieldData={issueTypeFieldData}
          setIsWorkInProgress={setIsWorkInProgress}
          integrationToolFieldData={integrationToolFieldData}
        />
      ) : (
        <UpdateIssueForm
          fields={fields}
          metaData={metaData}
          resetMeta={resetMeta}
          fieldsData={fieldsData}
          attachments={attachments}
          setFieldsData={setFieldsData}
          setAttachments={setAttachments}
          issueFieldData={issueFieldData}
          setErrorMessage={setErrorMessage}
          projectFieldData={projectFieldData}
          clearErrorMessage={clearErrorMessage}
          setIsWorkInProgress={setIsWorkInProgress}
          integrationToolFieldData={integrationToolFieldData}
        />
      )}
    </>
  );
};

export default renderChild;
