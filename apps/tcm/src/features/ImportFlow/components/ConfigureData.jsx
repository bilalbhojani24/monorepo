import React, { useEffect, useState } from 'react';
import { TMSectionHeadings } from 'bifrostProxy';
import { number, shape, string } from 'prop-types';

import ConfigureDataList from './ConfigureDataList';
import useImport from './useImport';

const ConfigureData = (props) => {
  const { projects } = props;
  const [projectsWithCheck, setProjectsWithCheck] = useState(projects);
  const { handleConfigureDataProceed } = useImport();

  useEffect(() => {
    setProjectsWithCheck(
      projects.map((project) => ({ ...project, checked: true })),
    );
  }, [projects]);

  return (
    <div className="flex justify-center">
      <div className="border-base-100 shadow-base-200 mt-4 w-3/4 rounded-md border-2 p-6">
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

ConfigureData.propTypes = {
  projects: shape({
    id: number,
    name: string,
    suite_mode: number,
  }),
};

ConfigureData.defaultProps = {
  projects: [],
};

export default ConfigureData;
