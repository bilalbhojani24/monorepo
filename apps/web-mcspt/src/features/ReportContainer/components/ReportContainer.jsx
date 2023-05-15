import React from 'react';
import { Report } from '@browserstack/mcp-shared';

const ReportContainer = () => (
  <div className="flex max-h-screen">
    <Report
      handleUrlViaConsumer={() => {}}
      handleFolderViaConsumer={() => {}}
    />
  </div>
);

export default ReportContainer;
