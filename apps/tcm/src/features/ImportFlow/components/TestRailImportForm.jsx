import React from 'react';
import { TMInputField } from 'bifrostProxy';

const TestRailImportForm = () => (
  <div className="mt-12">
    <div className="space-around flex">
      <div className="mr-6 w-full">
        <TMInputField id="email" label="TestRail Email Address" />
      </div>
      <div className="w-full">
        <TMInputField id="host-name" label="TestRail Host Name" />
      </div>
    </div>
    <div className="mt-4 w-1/2">
      <TMInputField id="api-key" label="TestRail API Key" />
    </div>
  </div>
);

export default TestRailImportForm;
