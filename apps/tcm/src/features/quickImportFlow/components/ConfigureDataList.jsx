import React from 'react';
import { useDispatch } from 'react-redux';
import { TMAlerts, TMCheckBox } from 'common/bifrostProxy';
import { bool, number, shape, string } from 'prop-types';

import {
  setErrorForConfigureData,
  setProjectForTestManagementImport
} from '../slices/importSlice';

const ConfigureDataList = (props) => {
  const { projects, showError } = props;
  const dispatch = useDispatch();
  const allChecked = projects.every((project) => project.checked);
  const someChecked = projects.some((project) => project.checked);

  const handleCheckBoxChange = (name) => (e) => {
    if (name === 'allProjects') {
      if (e.target.checked) {
        dispatch(
          setProjectForTestManagementImport(
            projects.map((project) => ({
              ...project,
              checked: true
            }))
          )
        );
        dispatch(setErrorForConfigureData(false));
      } else {
        dispatch(
          setProjectForTestManagementImport(
            projects.map((project) => ({ ...project, checked: false }))
          )
        );
      }
    } else {
      if (e.target.checked) dispatch(setErrorForConfigureData(false));
      const filteredProjects = projects.map((project) => {
        if (project.name === name)
          return { ...project, checked: !project.checked };
        return { ...project };
      });
      dispatch(setProjectForTestManagementImport(filteredProjects));
    }
  };

  return (
    <>
      {showError && (
        <div className="my-4">
          <TMAlerts
            modifier="error"
            title="Select at least 1 project to proceed."
            linkText={null}
          />
        </div>
      )}
      <TMCheckBox
        position="left"
        data={{
          description: `All Projects (${projects.length})`,
          value: 'allProjects'
        }}
        onChange={handleCheckBoxChange('allProjects')}
        checked={allChecked}
        indeterminate={someChecked && !allChecked}
        description="block"
      />
      {projects.map((project) => (
        <TMCheckBox
          position="left"
          data={{
            label: project.name,
            value: project.name,
            description: project.description
          }}
          onChange={handleCheckBoxChange(project.name)}
          checked={project.checked}
        />
      ))}
    </>
  );
};
ConfigureDataList.propTypes = {
  projects: shape({
    id: number,
    name: string,
    suite_mode: number
  }),
  showError: bool
};

ConfigureDataList.defaultProps = {
  projects: [],
  showError: false
};

export default ConfigureDataList;
