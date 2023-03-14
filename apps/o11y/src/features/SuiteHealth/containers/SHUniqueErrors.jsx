import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';

const SnPUniqueErrors = () => {
  const activeProject = useSelector(getActiveProject);
  useEffect(() => {
    logOllyEvent({
      event: 'O11ySuiteHealthErrorsVisited',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id
      }
    });
  }, [activeProject.name, activeProject.id]);
  return <div>SnPUniqueErrors</div>;
};

export default SnPUniqueErrors;
