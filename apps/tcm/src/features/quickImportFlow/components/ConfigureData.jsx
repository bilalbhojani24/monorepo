import React from 'react';
import { TMSectionHeadings } from 'common/bifrostProxy';
import Loader from 'common/Loader';
import { bool, number, shape, string } from 'prop-types';

import ConfigureDataList from './ConfigureDataList';
import NoProjects from './NoProjects';
import useImport from './useImport';

const ConfigureData = (props) => {
  const { projects, showLoader } = props;
  const {
    testManagementProjects,
    handleConfigureDataProceed,
    currentTestManagementTool,
    showErrorForConfigData
  } = useImport();

  if (!testManagementProjects.length) return <NoProjects />;
  const displayNameOfTestTool =
    currentTestManagementTool === 'zephyr' ? 'Zephyr Scale' : 'Testrails';

  return (
    <div className="border-base-300 shadow-base-200 mb-4 h-full w-3/4 max-w-7xl rounded-md border bg-white">
      {showLoader ? (
        <div className="flex h-full flex-col items-center justify-center">
          <Loader />
          <div className="text-base-600 mt-4 text-sm font-medium">
            We are fetching your projects, this may take a few seconds
          </div>
        </div>
      ) : (
        <>
          <div className="pt-6">
            <div className="px-6">
              <TMSectionHeadings
                title={`We’ve fetched ${projects.length} projects from ${displayNameOfTestTool}, select projects you would like to import`}
              />
            </div>
            <ConfigureDataList
              projects={projects}
              showError={showErrorForConfigData}
              handleConfigureDataProceed={handleConfigureDataProceed}
            />
          </div>
        </>
      )}
    </div>
  );
};

ConfigureData.propTypes = {
  projects: shape({
    id: number,
    name: string,
    suite_mode: number
  }),
  showLoader: bool
};

ConfigureData.defaultProps = {
  projects: [],
  showLoader: false
};

export default ConfigureData;
