import React, { useState, useEffect } from 'react';
import { TMCheckBox } from 'bifrostProxy';
import useImport from './useImport';

const ConfigureDataList = (props) => {
  const { projects } = props;
  const [allProjectsArray, setAllProjectsArray] = useState([...projects]);
  const { setSelectedProjects } = useImport();
  const allChecked = allProjectsArray.every((project) => project.checked);

  useEffect(() => {
    setAllProjectsArray(projects);
  }, [projects]);

  const handleCheckBoxChange = (name) => (e) => {
    if (name === 'allProjects') {
      if (e.target.checked) {
        setAllProjectsArray(
          allProjectsArray.map((project) => {
            return { ...project, checked: true };
          }),
        );
        setSelectedProjects(allProjectsArray);
      } else {
        setAllProjectsArray(
          allProjectsArray.map((project) => {
            return { ...project, checked: false };
          }),
        );
        setSelectedProjects([]);
      }
    } else {
      const filteredProjects = allProjectsArray.map((project) => {
        if (project.name === name)
          return { ...project, checked: !project.checked };
        return { ...project };
      });
      setAllProjectsArray(filteredProjects);
      setSelectedProjects(filteredProjects);
    }
  };

  return (
    <>
      <TMCheckBox
        position="left"
        data={{
          label: `All Projects (${allProjectsArray.length})`,
          value: 'allProjects',
        }}
        onChange={handleCheckBoxChange('allProjects')}
        checked={allChecked}
      />
      {allProjectsArray.map((project) => {
        return (
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
        );
      })}
    </>
  );
};

export default ConfigureDataList;
