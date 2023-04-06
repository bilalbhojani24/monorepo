import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import { usePrevious } from '@browserstack/hooks';
import { makeDebounce } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { getCreateMeta, getProjectsThunk, getUpdateMeta } from '../../../api';
import { baseURLSelector } from '../../../common/slices/configSlice';
import { setGlobalAlert } from '../../../common/slices/globalAlertSlice';
import { LOADING_STATUS } from '../../slices/constants';
import {
  projectsErrorSelector,
  projectsLoadingSelector,
  projectsSelector
} from '../../slices/projectsSlice';
import { CreateIssueOptionsType } from '../types';

import { FIELD_KEYS, ISSUE_MODES } from './constants';
import DiscardIssue from './DiscardIssue';
import renderChild from './renderChild';

const IssueForm = ({
  tab,
  mode,
  options,
  attachments,
  changeTabTo,
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
  const [createFields, setCreateFields] = useState([]);
  const [updateFields, setUpdateFields] = useState([]);
  const [isCreateMetaLoading, setIsCreateMetaLoading] = useState(false);
  const [isUpdateMetaLoading, setIsUpdateMetaLoading] = useState(false);
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
  const previousProjectId = usePrevious(projectFieldData?.value ?? null);
  const issueTypeFieldData = fieldsData[FIELD_KEYS.ISSUE_TYPE];
  const previousIssueType = usePrevious(issueTypeFieldData?.value ?? null);
  const issueFieldData = fieldsData[FIELD_KEYS.TICKET_ID];
  const issueSearchFieldData = fieldsData[FIELD_KEYS.TICKET_ID_SEARCH];
  const previousIssueSearchFieldData = usePrevious(
    issueSearchFieldData?.value ?? null
  );

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

  const resetCreateMeta = useCallback(() => {
    setCreateFields([]);
  }, []);

  const resetUpdateMeta = useCallback(() => {
    setUpdateFields([]);
  }, []);

  useEffect(() => {
    if (!isBeingDiscarded && !isWorkInProgress) {
      if (mode === ISSUE_MODES.CREATION) resetCreateMeta();
      else resetUpdateMeta();
    }
  }, [mode]);

  useEffect(() => {
    dispatch(getProjectsThunk(integrationToolFieldData?.value));
  }, []);

  const debouncedGetCreateMeta = makeDebounce(() => {
    setIsCreateMetaLoading(true);
    getCreateMeta(
      integrationToolFieldData.value,
      projectFieldData.value,
      issueTypeFieldData.value
    )
      .then(({ fields: responseFields }) => {
        setCreateFields(responseFields);
        setIsCreateMetaLoading(false);
      })
      .catch(() => {
        setIsCreateMetaLoading(false);
      });
  }, 300);

  const debouncedGetUpdateMeta = makeDebounce((issue) => {
    setIsUpdateMetaLoading(true);
    getUpdateMeta(integrationToolFieldData.value, issue.value)
      .then(({ fields: responseFields }) => {
        setUpdateFields(responseFields);
        setIsUpdateMetaLoading(false);
      })
      .catch(() => {
        setIsUpdateMetaLoading(false);
      });
  }, 300);

  useEffect(() => {
    if (
      areProjectsLoaded &&
      integrationToolFieldData &&
      projectFieldData?.value &&
      issueTypeFieldData?.value &&
      mode === ISSUE_MODES.CREATION &&
      (previousProjectId !== projectFieldData.value ||
        previousIssueType !== issueTypeFieldData.value ||
        !isWorkInProgress)
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
      projectFieldData?.value &&
      issueSearchFieldData?.value &&
      mode === ISSUE_MODES.UPDATION &&
      (previousProjectId !== projectFieldData.value ||
        previousIssueSearchFieldData !== issueSearchFieldData.value ||
        !isWorkInProgress)
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

  const handleIssueTabChange = useCallback(
    (tabSelected) => {
      if (tabSelected.mode !== tab) {
        changeTabTo(tabSelected.mode);
      }
    },
    [mode, changeTabTo]
  );

  const handleTryAgain = useCallback(() => {
    dispatch(getProjectsThunk(integrationToolFieldData?.value));
  }, [dispatch, integrationToolFieldData]);

  useEffect(() => {
    if (areProjectsLoaded && (projects ?? []).length === 0) {
      dispatch(
        setGlobalAlert({
          kind: 'error',
          message: `Create a project in your ${integrationToolFieldData?.title} in order to continue`,
          autoDismiss: true
        })
      );
    }
  }, [areProjectsLoaded, projects, integrationToolFieldData, dispatch]);

  useEffect(() => {
    setFieldsData({ ...fieldsData, [FIELD_KEYS.ISSUE_TYPE]: {} });
    if (mode === ISSUE_MODES.UPDATION) {
      setUpdateFields([]);
    }
  }, [projectFieldData]);

  return (
    <>
      {isBeingDiscarded && (
        <DiscardIssue
          continueEditing={continueEditing}
          confirmIssueDiscard={confirmIssueDiscard}
          integrationName={integrationToolFieldData.title}
        />
      )}
      <div
        className={'bg-white h-full '.concat(
          isBeingDiscarded ? 'invisible h-0' : ''
        )}
      >
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
              ? 'flex flex-col justify-center h-full'
              : ''
          )}
        >
          {renderChild({
            tab,
            mode,
            options,
            projects,
            fieldsData,
            createFields,
            updateFields,
            setFieldsData,
            issueFieldData,
            handleTryAgain,
            resetCreateMeta,
            resetUpdateMeta,
            projectFieldData,
            projectsHaveError,
            cleanedIssueTypes,
            attachments: files,
            areProjectsLoading,
            issueTypeFieldData,
            setIsWorkInProgress,
            isCreateMetaLoading,
            isUpdateMetaLoading,
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

IssueForm.propTypes = {
  tab: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  changeTabTo: PropTypes.func.isRequired,
  confirmIssueDiscard: PropTypes.isRequired,
  options: CreateIssueOptionsType.isRequired,
  continueEditing: PropTypes.func.isRequired,
  isBeingDiscarded: PropTypes.bool.isRequired,
  isWorkInProgress: PropTypes.bool.isRequired,
  setIsWorkInProgress: PropTypes.func.isRequired,
  setIsFormBeingSubmitted: PropTypes.func.isRequired,
  integrations: PropTypes.arrayOf({}).isRequired,
  attachments: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default IssueForm;
