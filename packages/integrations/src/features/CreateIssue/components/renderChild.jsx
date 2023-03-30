import React from 'react';
import { Loader, Tabs } from '@browserstack/bifrost';

import { GenericError, SingleValueSelect } from '../../../common/components';

import { FIELD_KEYS, ISSUE_MODES, TABS } from './constants';
import CreateIssueForm from './CreateIssueForm';
import UpdateIssueForm from './UpdateIssueForm';

const renderChild = ({
  mode,
  options,
  projects,
  fieldsData,
  attachments,
  createFields,
  updateFields,
  setFieldsData,
  setAttachments,
  issueFieldData,
  handleTryAgain,
  resetCreateMeta,
  resetUpdateMeta,
  projectFieldData,
  projectsHaveError,
  clearErrorMessage,
  cleanedIssueTypes,
  areProjectsLoading,
  issueTypeFieldData,
  setIsWorkInProgress,
  issueSearchFieldData,
  handleIssueTabChange,
  integrationToolFieldData,
  setIsFormBeingSubmitted
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
      <div className="pt-3">
        <SingleValueSelect
          fieldsData={fieldsData}
          fieldKey={FIELD_KEYS.PROJECT}
          setFieldsData={setFieldsData}
          label="Project"
          required
          placeholder="Select project"
          options={projects}
          selectFirstByDefault
        />
      </div>
      <Tabs
        tabsArray={TABS}
        onTabChange={handleIssueTabChange}
        defaultIndex={mode === ISSUE_MODES.CREATION ? 0 : 1}
      />

      {mode === ISSUE_MODES.CREATION ? (
        <CreateIssueForm
          options={options}
          fields={createFields}
          fieldsData={fieldsData}
          attachments={attachments}
          resetMeta={resetCreateMeta}
          setFieldsData={setFieldsData}
          setAttachments={setAttachments}
          projectFieldData={projectFieldData}
          clearErrorMessage={clearErrorMessage}
          cleanedIssueTypes={cleanedIssueTypes}
          issueTypeFieldData={issueTypeFieldData}
          setIsWorkInProgress={setIsWorkInProgress}
          integrationToolFieldData={integrationToolFieldData}
          setIsFormBeingSubmitted={setIsFormBeingSubmitted}
        />
      ) : (
        <UpdateIssueForm
          options={options}
          fields={updateFields}
          fieldsData={fieldsData}
          attachments={attachments}
          resetMeta={resetUpdateMeta}
          setFieldsData={setFieldsData}
          setAttachments={setAttachments}
          issueFieldData={issueFieldData}
          projectFieldData={projectFieldData}
          clearErrorMessage={clearErrorMessage}
          setIsWorkInProgress={setIsWorkInProgress}
          issueSearchFieldData={issueSearchFieldData}
          integrationToolFieldData={integrationToolFieldData}
          setIsFormBeingSubmitted={setIsFormBeingSubmitted}
        />
      )}
    </>
  );
};

export default renderChild;
