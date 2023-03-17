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

import { createIssue, getCreateMeta, getProjectsThunk } from '../../../api';
import { FormBuilder } from '../../../common/components';
import SingleValueSelect from '../../../common/components/SingleValueSelect';
import { LOADING_STATUS } from '../../slices/constants';
import {
  projectsLoadingSelector,
  projectsSelector
} from '../../slices/projectsSlice';

import { FIELD_KEYS, TABS } from './constants';

const IssueForm = ({ integrations, options }) => {
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

  const helper = ({ $type, $items, $properties, $const }, fieldData) => {
    let val = null;
    switch ($type) {
      case 'string':
        if (typeof fieldData === 'string') val = fieldData;
        else val = fieldData.value;
        break;
      case 'array':
        val = fieldData.map((fieldItem) => helper($items, fieldItem));
        break;
      case 'object':
        val = Object.entries($properties).reduce((acc, curr) => {
          const [currItemKey, currItemVal] = curr;
          // eslint-disable-next-line no-param-reassign
          acc[currItemKey] = helper(currItemVal, fieldData);
          return acc;
        }, {});
        break;
      default:
        if ($const) {
          val = $const;
        } else {
          val = fieldData;
        }
    }
    // console.log('rajeev', item, fieldData);
    return val;
  };

  const handleSubmit = (formData) => {
    const data = { ...fieldsData, ...formData };
    const parsed = fields.reduce((acc, curr) => {
      if (curr.key in data) {
        // eslint-disable-next-line no-param-reassign
        acc[curr.key] = helper(curr.schema['data-format'], data[curr.key]);
      }
      return acc;
    }, {});
    parsed.projectId = projectFieldData.value;
    parsed.ticketTypeId = issueTypeFieldData.value;
    createIssue('jira', parsed);
  };

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
      ).then((responseFields) => setFields(responseFields.fields));
    }
  }, [
    areProjectsLoaded,
    integrationToolFieldData,
    projectFieldData,
    issueTypeFieldData
  ]);

  return (
    <div>
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
      <Tabs tabsArray={TABS} />
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

      <FormBuilder
        fields={fields}
        handleSubmit={handleSubmit}
        metaData={metaData}
      />
      <button type="submit" form="form-builder">
        submit
      </button>
    </div>
  );
};

export default IssueForm;
