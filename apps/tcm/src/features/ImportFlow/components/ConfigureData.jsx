import React, { useState, useEffect } from 'react';
import { TMSectionHeadings } from 'bifrostProxy';
import ConfigureDataList from './ConfigureDataList';
import useImport from './useImport';

const ConfigureData = (props) => {
  const { projects } = props;
  const [projectsWithCheck, setProjectsWithCheck] = useState(projects);
  const { handleConfigureDataProceed } = useImport();

  useEffect(() => {
    setProjectsWithCheck(
      projects.map((project) => {
        return { ...project, checked: true };
      }),
    );
  }, [projects]);

  return (
    <div className="flex justify-center">
      <div className="shadow-gray-200 mt-4 w-3/4 rounded-md border-2 border-base-100 p-6">
        <TMSectionHeadings
          title="Select Projects you would like to import:"
          variant="buttons"
          primaryButtonProps={{
            children: 'Proceed',
            size: 'default',
            onClick: handleConfigureDataProceed,
          }}
        />
        <ConfigureDataList projects={projectsWithCheck} />
      </div>
    </div>
  );
};
export default ConfigureData;
