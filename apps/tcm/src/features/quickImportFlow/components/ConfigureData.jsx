import React from 'react';
import { TMButton, TMSectionHeadings } from 'common/bifrostProxy';
import { number, shape, string } from 'prop-types';

import ConfigureDataList from './ConfigureDataList';
import NoProjects from './NoProjects';
import useImport from './useImport';

const ConfigureData = (props) => {
  const { projects } = props;
  const {
    testManagementProjects,
    handleConfigureDataProceed,
    showErrorForConfigData
  } = useImport();
  if (!testManagementProjects.length) return <NoProjects />;

  return (
    <div className="border-base-100 shadow-base-200 mt-4 h-max w-3/4 max-w-7xl rounded-md border-2 bg-white p-6">
      <TMSectionHeadings
        title="Select projects you would like to import"
        variant="buttons"
        trailingHeadNode={
          <TMButton onClick={handleConfigureDataProceed}>Proceed</TMButton>
        }
      />
      <ConfigureDataList
        projects={projects}
        showError={showErrorForConfigData}
      />
    </div>
  );
};

ConfigureData.propTypes = {
  projects: shape({
    id: number,
    name: string,
    suite_mode: number
  })
};

ConfigureData.defaultProps = {
  projects: []
};

export default ConfigureData;
