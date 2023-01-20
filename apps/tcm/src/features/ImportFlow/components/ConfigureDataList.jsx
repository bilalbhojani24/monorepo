import React from 'react';
import { useDispatch } from 'react-redux';
import { TMCheckBox } from 'common/bifrostProxy';
import { number, shape, string } from 'prop-types';

import { setProjectForTestManagementImport } from '../slices/importSlice';

const ConfigureDataList = (props) => {
  const { projects } = props;
  const dispatch = useDispatch();
  const allChecked = projects.every((project) => project.checked);

  const handleCheckBoxChange = (name) => (e) => {
    if (name === 'allProjects') {
      if (e.target.checked) {
        dispatch(
          setProjectForTestManagementImport(
            projects.map((project) => ({
              ...project,
              checked: true,
            })),
          ),
        );
      } else {
        dispatch(
          setProjectForTestManagementImport(
            projects.map((project) => ({ ...project, checked: false })),
          ),
        );
      }
    } else {
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
      <TMCheckBox
        position="left"
        data={{
          label: `All Projects (${projects.length})`,
          value: 'allProjects',
        }}
        onChange={handleCheckBoxChange('allProjects')}
        checked={allChecked}
      />
      {projects.map((project) => (
        <TMCheckBox
          position="left"
          data={{
            label: project.name,
            value: project.name,
            description: project.description,
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
    suite_mode: number,
  }),
};

ConfigureDataList.defaultProps = {
  projects: [],
};

export default ConfigureDataList;
