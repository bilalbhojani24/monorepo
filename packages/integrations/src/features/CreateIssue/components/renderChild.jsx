import React from 'react';
import { Loader, Tabs } from '@browserstack/bifrost';

import { GenericError } from '../../../common/components';
import SingleValueSelect from '../../../common/components/SingleValueSelect';

import { FIELD_KEYS, ISSUE_MODES, TABS } from './constants';
import CreateIssueForm from './CreateIssueForm';
import UpdateIssueForm from './UpdateIssueForm';

const renderChild = ({
  mode,
  fields,
  metaData,
  projects,
  fieldsData,
  setFieldsData,
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
          selectFirstByDefault
        />
      </div>
      <Tabs
        tabsArray={TABS}
        onTabChange={handleIssueTabChange}
        defaultIndex={mode === ISSUE_MODES.CREATION ? 0 : 1}
      />
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
      {mode === ISSUE_MODES.CREATION ? (
        <CreateIssueForm
          fields={fields}
          metaData={metaData}
          fieldsData={fieldsData}
          setErrorMessage={setErrorMessage}
          projectFieldData={projectFieldData}
          clearErrorMessage={clearErrorMessage}
          issueTypeFieldData={issueTypeFieldData}
          setIsWorkInProgress={setIsWorkInProgress}
          integrationToolFieldData={integrationToolFieldData}
        />
      ) : (
        <UpdateIssueForm />
      )}
    </>
  );
};

export default renderChild;
