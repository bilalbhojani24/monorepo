import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yComboBox } from 'common/bifrostProxy';
import { setActiveProject } from 'globalSlice';
import { getProjects } from 'globalSlice/selectors';

export default function ProjectSelector() {
  const projects = useSelector(getProjects);
  const dispatch = useDispatch();

  const menuOptions = useMemo(
    () =>
      projects?.list?.map((item) => ({
        label: item.name,
        value: item.id,
        normalisedName: item.normalisedName
      })),
    [projects.list]
  );

  const handleProjectChange = (item) => {
    dispatch(
      setActiveProject({
        id: item.value,
        name: item.label,
        normalisedName: item.normalisedName
      })
    );
  };

  return (
    <O11yComboBox
      checkPosition="right"
      label=""
      placeholder="Select a project"
      value={{
        label: projects.active?.name,
        value: projects.active?.id
      }}
      options={menuOptions}
      onChange={handleProjectChange}
    />
  );
}
