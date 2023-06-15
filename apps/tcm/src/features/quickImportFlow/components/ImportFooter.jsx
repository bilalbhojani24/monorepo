import React from 'react';
import { TMButton } from 'common/bifrostProxy';

import useConfigureTool from './useConfigureTool';

const ImportFooter = () => {
  const {
    handleTestConnection,
    handleProceed,
    loggedInScreen,
    loggedInForTool,
    currentTestManagementTool,
    configureToolProceedLoading,
    configureToolTestConnectionLoading
  } = useConfigureTool();

  const alreadyLoggedIn =
    loggedInScreen && loggedInForTool === currentTestManagementTool;

  return (
    <>
      {!alreadyLoggedIn && (
        <TMButton
          colors="white"
          variant="primary"
          size="default"
          wrapperClassName="mr-3"
          onClick={handleTestConnection}
          isIconOnlyButton={configureToolTestConnectionLoading}
          loading={configureToolTestConnectionLoading}
        >
          Test Connection
        </TMButton>
      )}
      <TMButton
        colors="brand"
        variant="primary"
        size="default"
        onClick={handleProceed}
        isIconOnlyButton={configureToolProceedLoading}
        loading={configureToolProceedLoading}
      >
        Proceed
      </TMButton>
    </>
  );
};

export default ImportFooter;
