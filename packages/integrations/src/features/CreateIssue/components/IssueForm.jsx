import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import { makeDebounce } from '@browserstack/utils';

import { getCreateMeta, getProjectsThunk, getUpdateMeta } from '../../../api';
import { baseURLSelector } from '../../../common/slices/configSlice';
import { setGlobalAlert } from '../../../common/slices/globalAlertSlice';
import { LOADING_STATUS } from '../../slices/constants';
import {
  projectsErrorSelector,
  projectsLoadingSelector,
  projectsSelector
} from '../../slices/projectsSlice';

import { FIELD_KEYS, ISSUE_MODES } from './constants';
import DiscardIssue from './DiscardIssue';
import renderChild from './renderChild';

const IssueForm = ({
  mode,
  options,
  attachments,
  changeModeTo,
  integrations,
  continueEditing,
  isWorkInProgress,
  isBeingDiscarded,
  confirmIssueDiscard,
  setIsWorkInProgress,
  setIsFormBeingSubmitted
}) => {
  const dispatch = useDispatch();
  const projects = useSelector(projectsSelector);
  const [fields, setFields] = useState([]);
  const [files, setFiles] = useState(attachments);
  const projectsLoadingStatus = useSelector(projectsLoadingSelector);
  const baseURL = useSelector(baseURLSelector);
  const areProjectsLoading = projectsLoadingStatus === LOADING_STATUS.PENDING;
  const projectsHaveError = Boolean(useSelector(projectsErrorSelector));
  const areProjectsLoaded = projectsLoadingStatus === LOADING_STATUS.SUCCEEDED;
  const toolOptions = integrations.reduce((acc, curr) => {
    const { key, label, icon } = curr;
    acc.push({
      value: key,
      label: `${label} issue`,
      image: `${baseURL}${icon}`,
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
    [FIELD_KEYS.PROJECT]: null,
    [FIELD_KEYS.ISSUE_TYPE]: null
  });
  const integrationToolFieldData = fieldsData[FIELD_KEYS.INTEGRATON_TOOL];
  const projectFieldData = fieldsData[FIELD_KEYS.PROJECT];
  const issueTypeFieldData = fieldsData[FIELD_KEYS.ISSUE_TYPE];
  const issueFieldData = fieldsData[FIELD_KEYS.TICKET_ID];
  const issueSearchFieldData = fieldsData[FIELD_KEYS.TICKET_ID_SEARCH];

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

  const resetMeta = useCallback(() => {
    setFields([]);
  }, []);

  useEffect(() => {
    if (!isBeingDiscarded && !isWorkInProgress) {
      resetMeta();
    }
  }, [mode]);

  useEffect(() => {
    dispatch(getProjectsThunk(integrationToolFieldData?.value));
  }, []);

  const debouncedGetCreateMeta = makeDebounce(() => {
    getCreateMeta(
      integrationToolFieldData.value,
      projectFieldData.value,
      issueTypeFieldData.value
    ).then((responseFields) => {
      setFields(responseFields.fields);
    });
  }, 300);

  const debouncedGetUpdateMeta = makeDebounce((issue) => {
    getUpdateMeta(integrationToolFieldData.value, issue.value).then(
      ({ fields: responseFields }) => {
        setFields(responseFields);
      }
    );
  }, 300);

  useEffect(() => {
    if (
      areProjectsLoaded &&
      integrationToolFieldData &&
      projectFieldData &&
      issueTypeFieldData &&
      mode === ISSUE_MODES.CREATION
    ) {
      debouncedGetCreateMeta();
    }
  }, [
    mode,
    areProjectsLoaded,
    integrationToolFieldData,
    projectFieldData,
    issueTypeFieldData
    // debouncedGetCreateMeta
  ]);

  useEffect(() => {
    if (
      areProjectsLoaded &&
      integrationToolFieldData &&
      projectFieldData &&
      issueSearchFieldData?.value &&
      mode === ISSUE_MODES.UPDATION
    ) {
      debouncedGetUpdateMeta(issueSearchFieldData);
      setFieldsData({
        ...fieldsData,
        [FIELD_KEYS.TICKET_ID]: issueSearchFieldData,
        [FIELD_KEYS.TICKET_ID_SEARCH]: {}
      });
    }
  }, [
    mode,
    areProjectsLoaded,
    integrationToolFieldData,
    projectFieldData,
    issueSearchFieldData
    // debouncedGetUpdateMeta
  ]);

  const handleIssueTabChange = useCallback((tabSelected) => {
    if (tabSelected.mode !== mode) {
      changeModeTo(tabSelected.mode);
    }
  }, []);

  const handleTryAgain = useCallback(() => {
    dispatch(getProjectsThunk(integrationToolFieldData?.value));
  }, []);

  useEffect(() => {
    if (areProjectsLoaded && (projects ?? []).length === 0) {
      dispatch(
        setGlobalAlert({
          kind: 'error',
          message: `Create a project in your ${integrationToolFieldData?.title} in order to continue`
        })
      );
    }
  }, [areProjectsLoaded, projects, integrationToolFieldData, dispatch]);

  return (
    <>
      {isBeingDiscarded && (
        <DiscardIssue
          continueEditing={continueEditing}
          confirmIssueDiscard={confirmIssueDiscard}
          integrationName={integrationToolFieldData.title}
        />
      )}
      <div className={''.concat(isBeingDiscarded ? 'invisible h-0' : '')}>
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
            options,
            projects,
            resetMeta,
            fieldsData,
            setFieldsData,
            issueFieldData,
            handleTryAgain,
            projectFieldData,
            projectsHaveError,
            cleanedIssueTypes,
            attachments: files,
            areProjectsLoading,
            issueTypeFieldData,
            setIsWorkInProgress,
            handleIssueTabChange,
            issueSearchFieldData,
            setAttachments: setFiles,
            integrationToolFieldData,
            setIsFormBeingSubmitted
          })}
        </div>
      </div>
    </>
  );
};

export default IssueForm;
