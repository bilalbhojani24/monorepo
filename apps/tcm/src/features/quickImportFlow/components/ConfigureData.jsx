import React from 'react';
import { TMAlerts, TMButton, TMSectionHeadings } from 'common/bifrostProxy';
import { number, shape, string } from 'prop-types';

import ConfigureDataList from './ConfigureDataList';
import NoProjects from './NoProjects';
import useImport from './useImport';

const ConfigureData = (props) => {
  const { projects } = props;
  const { testManagementProjects, handleConfigureDataProceed } = useImport();
  let showError = false;
  if (!testManagementProjects.length) return <NoProjects />;
  if (testManagementProjects.length) {
    showError = testManagementProjects
      .map((project) => project.checked)
      .every((checked) => checked === false);
  }

  return (
    <>
      {showError && (
        <div className="mt-2 flex justify-center">
          <div className="w-3/4">
            <TMAlerts
              modifier="error"
              title="Select at least 1 project to proceed."
              linkText={null}
            />
          </div>
        </div>
      )}
      <div className="border-base-100 shadow-base-200 mt-4 w-3/4 rounded-md border-2 p-6">
        <TMSectionHeadings
          title="Select projects you would like to import"
          variant="buttons"
          trailingHeadNode={
            <TMButton onClick={handleConfigureDataProceed}>Proceed</TMButton>
          }
        />
        <ConfigureDataList projects={projects} />
      </div>
    </>
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
