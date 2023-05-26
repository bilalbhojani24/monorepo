import React from 'react';
import { TMButton, TMSectionHeadings } from 'common/bifrostProxy';
import Loader from 'common/Loader';
import { bool, number, shape, string } from 'prop-types';

import ConfigureDataList from './ConfigureDataList';
import NoProjects from './NoProjects';
import useImport from './useImport';

const ConfigureData = (props) => {
  const { projects, showLoader } = props;
  const {
    testManagementProjects,
    handleBeginImport,
    showErrorForConfigData,
    beginImportLoading
  } = useImport();

  if (!testManagementProjects.length) return <NoProjects />;

  return (
    <div className="border-base-300 mb-4 h-full w-3/4 max-w-7xl rounded-lg border bg-white">
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
                title="Select projects that you would like to import"
                trailingHeadNode={
                  <TMButton
                    onClick={handleBeginImport}
                    loading={beginImportLoading}
                    isIconOnlyButton={beginImportLoading}
                  >
                    Begin Import
                  </TMButton>
                }
              />
            </div>
            <ConfigureDataList
              projects={projects}
              showError={showErrorForConfigData}
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
