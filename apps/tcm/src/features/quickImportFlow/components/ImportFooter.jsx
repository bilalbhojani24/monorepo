import React from 'react';
import { TMButton } from 'common/bifrostProxy';

import useImport from './useImport';

const ImportFooter = () => {
  const {
    handleTestConnection,
    handleProceed
    // configureToolProceedLoading,
    // configureToolTestConnectionLoading
  } = useImport();

  return (
    <>
      <TMButton
        colors="white"
        variant="primary"
        size="default"
        wrapperClassName="mr-3"
        onClick={handleTestConnection}
        // loading={configureToolTestConnectionLoading}
      >
        Test Connection
      </TMButton>
      <TMButton
        colors="brand"
        variant="primary"
        size="default"
        onClick={handleProceed}
        // loading={configureToolProceedLoading}
      >
        Proceed
      </TMButton>
    </>
  );
};

export default ImportFooter;
