import React from 'react';
import { Loader, Tabs } from '@browserstack/bifrost';

import { GenericError, SingleValueSelect } from '../../../common/components';

import { FIELD_KEYS, ISSUE_MODES, TABS } from './constants';
import CreateIssueForm from './CreateIssueForm';
import UpdateIssueForm from './UpdateIssueForm';

const renderChild = ({
  tab,
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
  isWorkInProgress,
  projectsHaveError,
  scrollWidgetToTop,
  clearErrorMessage,
  cleanedIssueTypes,
  areProjectsLoading,
  issueTypeFieldData,
  isCreateMetaLoading,
  isUpdateMetaLoading,
  setIsWorkInProgress,
  issueSearchFieldData,
  handleIssueTabChange,
  setIsFormBeingSubmitted,
  integrationToolFieldData
}) => {
  if (areProjectsLoading) {
    return (
      <div className="flex flex-col items-center py-6">
        <Loader height="h-6" width="w-6" wrapperStyle="text-base-400" />
        <p className="text-base-500 mt-6 text-center">Loading...</p>
      </div>
    );
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
        />
      </div>
      <Tabs
        tabsArray={TABS}
        onTabChange={handleIssueTabChange}
        defaultIndex={tab === ISSUE_MODES.CREATION ? 0 : 1}
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
          isWorkInProgress={isWorkInProgress}
          scrollWidgetToTop={scrollWidgetToTop}
          clearErrorMessage={clearErrorMessage}
          cleanedIssueTypes={cleanedIssueTypes}
          issueTypeFieldData={issueTypeFieldData}
          setIsWorkInProgress={setIsWorkInProgress}
          isCreateMetaLoading={isCreateMetaLoading}
          setIsFormBeingSubmitted={setIsFormBeingSubmitted}
          integrationToolFieldData={integrationToolFieldData}
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
          isWorkInProgress={isWorkInProgress}
          scrollWidgetToTop={scrollWidgetToTop}
          clearErrorMessage={clearErrorMessage}
          isUpdateMetaLoading={isUpdateMetaLoading}
          setIsWorkInProgress={setIsWorkInProgress}
          issueSearchFieldData={issueSearchFieldData}
          setIsFormBeingSubmitted={setIsFormBeingSubmitted}
          integrationToolFieldData={integrationToolFieldData}
        />
      )}
    </>
  );
};

export default renderChild;
