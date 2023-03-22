import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alerts,
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';

import { getCreateMeta, getProjectsThunk } from '../../../api';
import { LOADING_STATUS } from '../../slices/constants';
import {
  projectsErrorSelector,
  projectsLoadingSelector,
  projectsSelector
} from '../../slices/projectsSlice';

import { FIELD_KEYS } from './constants';
import DiscardIssue from './DiscardIssue';
import renderChild from './renderChild';

const IssueForm = ({
  mode,
  options,
  changeModeTo,
  integrations,
  continueEditing,
  isBeingDiscarded,
  confirmIssueDiscard,
  setIsWorkInProgress
}) => {
  const dispatch = useDispatch();
  const projects = useSelector(projectsSelector);
  const [fields, setFields] = useState([]);
  const projectsLoadingStatus = useSelector(projectsLoadingSelector);
  const areProjectsLoading = projectsLoadingStatus === LOADING_STATUS.PENDING;
  const projectsHaveError = Boolean(useSelector(projectsErrorSelector));
  const areProjectsLoaded = projectsLoadingStatus === LOADING_STATUS.SUCCEEDED;
  const [errorMessage, setErrorMessage] = useState(null);
  const clearErrorMessage = () => {
    setErrorMessage(null);
  };
  const toolOptions = integrations.reduce((acc, curr) => {
    const { key, label, icon } = curr;
    acc.push({
      value: key,
      label: `${label} issue`,
      image: `https://integrations.bsstag.com${icon}`,
      title: label
    });
    return acc;
  }, []);

  const cleanIssueType = ({ label, id, icon } = {}) => ({
    label,
    value: id,
    image: icon
  });

  const [fieldsData, setFieldsData] = useState({
    [FIELD_KEYS.INTEGRATON_TOOL]: toolOptions[0],
    [FIELD_KEYS.PROJECT]: [],
    [FIELD_KEYS.ISSUE_TYPE]: []
  });
  const integrationToolFieldData = fieldsData[FIELD_KEYS.INTEGRATON_TOOL];
  const projectFieldData = fieldsData[FIELD_KEYS.PROJECT];
  const issueTypeFieldData = fieldsData[FIELD_KEYS.ISSUE_TYPE];
  const metaData = options.metaData[integrationToolFieldData?.value];

  const selectTool = (item) => {
    setFieldsData({ ...fieldsData, [FIELD_KEYS.INTEGRATON_TOOL]: item });
  };

  const cleanedIssueTypes = useMemo(
    () =>
      (projectFieldData?.ticketTypes ?? []).map((issueType) =>
        cleanIssueType(issueType)
      ),
    [projectFieldData]
  );

  useEffect(() => {
    dispatch(getProjectsThunk(integrationToolFieldData?.value));
  }, [dispatch, integrationToolFieldData]);

  useEffect(() => {
    if (
      areProjectsLoaded &&
      integrationToolFieldData &&
      projectFieldData &&
      issueTypeFieldData
    ) {
      getCreateMeta(
        integrationToolFieldData.value,
        projectFieldData.value,
        issueTypeFieldData.value
      ).then((responseFields) => {
        setFields(responseFields.fields);
      });
    }
  }, [
    areProjectsLoaded,
    integrationToolFieldData,
    projectFieldData,
    issueTypeFieldData
  ]);

  const handleIssueTabChange = (tabSelected) => {
    if (tabSelected.mode !== mode) {
      changeModeTo(tabSelected.mode);
    }
  };

  const handleTryAgain = () => {
    dispatch(getProjectsThunk(integrationToolFieldData?.value));
  };

  useEffect(() => {
    if (areProjectsLoaded && (projects ?? []).length === 0) {
      setErrorMessage(
        `Create a project in your ${integrationToolFieldData?.title} in order to continue`
      );
    }
  }, [areProjectsLoaded, projects, integrationToolFieldData]);

  return (
    <>
      {isBeingDiscarded && (
        <DiscardIssue
          continueEditing={continueEditing}
          confirmIssueDiscard={confirmIssueDiscard}
        />
      )}
      <div className={''.concat(isBeingDiscarded ? 'hidden' : '')}>
        {errorMessage && (
          <div className="pb-6">
            <Alerts
              title=""
              description={errorMessage}
              modifier="error"
              linkText=""
            />
          </div>
        )}
        <SelectMenu
          onChange={(val) => selectTool(val)}
          value={integrationToolFieldData}
          disabled={!((toolOptions ?? []).length > 1)}
        >
          <div className="flex items-center">
            <SelectMenuLabel wrapperClassName="flex-1 mr-3 text-base-500 min-w-fit">
              CREATE A:
            </SelectMenuLabel>
            <SelectMenuTrigger placeholder="Select tool" />
          </div>
          <SelectMenuOptionGroup>
            {toolOptions.map((item) => (
              <SelectMenuOptionItem key={item.value} option={item} />
            ))}
          </SelectMenuOptionGroup>
        </SelectMenu>
        <div
          className={''.concat(
            areProjectsLoading || projectsHaveError
              ? 'flex justify-center items-center h-full flex-1'
              : ''
          )}
        >
          {renderChild({
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
            cleanedIssueTypes,
            clearErrorMessage,
            areProjectsLoading,
            issueTypeFieldData,
            setIsWorkInProgress,
            handleIssueTabChange,
            integrationToolFieldData
          })}
        </div>
      </div>
    </>
  );
};

export default IssueForm;
