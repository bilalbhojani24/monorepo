import React from 'react';

import ConfigureData from './ConfigureData';
import ConfigureTool from './ConfigureTool';
import ImportHeader from './ImportHeader';
import Steps from './ImportSteps';
import useImport from './useImport';

const Import = () => {
  const { currentScreen, testRailProjects } = useImport();

  const getCurrentScreen = () => (
    // if (currentScreen === 'configureTool') return <ConfigureTool />;
    // if (currentScreen === 'configureData')
    //   return <ConfigureData projects={testRailProjects} />;
    // return <>Something went wrong!</>;
    <ConfigureData projects={testRailProjects} />
  );
  return (
    <>
      <ImportHeader
        heading="Quick Import"
        actionsData={[
          {
            id: 'change-setup',
            actionFn: () => {
              console.log('Change Setup');
            },
            variant: 'white',
            colors: 'white',
          },
          {
            id: 'skip-for-now',
            actionFn: () => {
              console.log('skip for now');
            },
            variant: 'white',
            colors: 'white',
          },
        ]}
      />
      <Steps
        steps={[
          { name: 'CONFIGURE PLATFORM' },
          { name: 'CONFIGURE DATA' },
          { name: 'CONFIRM IMPORT' },
        ]}
      />
      {getCurrentScreen()}
    </>
  );
};

export default Import;
