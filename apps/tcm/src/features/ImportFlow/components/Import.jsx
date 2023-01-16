import React from 'react';

import ImportHeader from './ImportHeader';
import Steps from './ImportSteps';

const Import = () => (
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
  </>
);

export default Import;
