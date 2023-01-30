import React from 'react';
// import { useLocation } from 'react-router-dom';
import { TMSectionHeadings } from 'common/bifrostProxy';
import { number, shape, string } from 'prop-types';

// import { retryImport } from 'api/import.api';
import ConfigureDataList from './ConfigureDataList';
import useImport from './useImport';

const ConfigureData = (props) => {
  const { projects } = props;
  // const { state } = useLocation();
  const { handleConfigureDataProceed } = useImport();

  // useEffect(() => {
  // console.log('hello from use effect', state);
  // let myTool;
  // if (state?.tool === 'testrail_quick') myTool = 'testrail';
  // else if (state?.tool === 'zephyr_quick') myTool = 'zephyr';
  // console.log('use effect me ', state?.importId, myTool);
  // if (state?.importId && myTool) {
  //   retryImport(state?.importId, myTool).then((data) => {
  //     console.log('inside retry', data);
  //   });
  // }
  // }, [state?.importId, state?.too]);

  return (
    <div className="flex justify-center">
      <div className="border-base-100 shadow-base-200 mt-4 w-3/4 rounded-md border-2 p-6">
        <TMSectionHeadings
          title="Select projects you would like to import"
          variant="buttons"
          primaryButtonProps={{
            children: 'Proceed',
            size: 'default',
            onClick: handleConfigureDataProceed
          }}
        />
        <ConfigureDataList projects={projects} />
      </div>
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
