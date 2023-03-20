import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger,
  Tabs
} from '@browserstack/bifrost';

import { getCreateMeta, getProjectsThunk } from '../../../api';
import { FormBuilder } from '../../../common/components';
import SingleValueSelect from '../../../common/components/SingleValueSelect';
import { LOADING_STATUS } from '../../slices/constants';
import {
  projectsLoadingSelector,
  projectsSelector
} from '../../slices/projectsSlice';

import { FIELD_KEYS, ISSUE_MODES, TABS } from './constants';
import CreateIssueForm from './CreateIssueForm';
import DiscardIssue from './DiscardIssue';
import UpdateIssueForm from './UpdateIssueForm';

const IssueForm = ({
  mode,
  options,
  changeModeTo,
  integrations,
  isBeingDiscarded,
  continueEditing,
  confirmIssueDiscard
}) => {
  const dispatch = useDispatch();
  const projects = useSelector(projectsSelector);
  const [fields, setFields] = useState([]);
  const projectsLoadingStatus = useSelector(projectsLoadingSelector);
  const areProjectsLoaded = projectsLoadingStatus === LOADING_STATUS.SUCCEEDED;
  const toolOptions = integrations.reduce((acc, curr) => {
    const { key, label, icon } = curr;
    acc.push({
      value: key,
      label: `${label} issue`,
      image: `https://integrations.bsstag.com${icon}`
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

  // const allRequiredFields = useMemo(
  //   () =>
  //     fields.reduce((acc, curr) => {
  //       if (curr.required) acc.push(curr.key);
  //       return acc;
  //     }, []),
  //   [fields]
  // );

  // const areAllRequiredFieldsNonEmptyHelper = (stateValue) => {
  //   if (Array.isArray(stateValue)) return Boolean(stateValue.length);
  //   if (typeof stateValue === 'string') return Boolean(stateValue);
  //   if (typeof stateValue === 'object') return Boolean(stateValue.value);
  //   return false;
  // };

  // const areAllRequiredFieldsNonEmpty = (requiredFields, stateOfFields) =>
  //   requiredFields.some((requiredField) => {
  //     if (!(requiredField in stateOfFields)) return false;
  //     const stateValue = stateOfFields[requiredField];
  //     return areAllRequiredFieldsNonEmptyHelper(stateValue);
  //   });

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

  return (
    <>
      {isBeingDiscarded && (
        <DiscardIssue
          continueEditing={continueEditing}
          confirmIssueDiscard={confirmIssueDiscard}
        />
      )}
      <div className={''.concat(isBeingDiscarded ? 'hidden' : '')}>
        <SelectMenu
          onChange={(val) => selectTool(val)}
          value={integrationToolFieldData}
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
            projectFieldData={projectFieldData}
            issueTypeFieldData={issueTypeFieldData}
            integrationToolFieldData={integrationToolFieldData}
          />
        ) : (
          <UpdateIssueForm />
        )}
      </div>
    </>
  );
};

export default IssueForm;
