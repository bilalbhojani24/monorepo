import React from 'react';
import { ArrowForwardIcon } from 'assets/icons';

const TermsAndConditions = () => (
  <div className="text-base-500 mt-6 text-xs">
    <div>
      Learn more about importing your data{' '}
      <a
        className="text-base-700"
        href="https://www.browserstack.com/docs/test-management/quick-start/quick-import"
      >
        Read Documentation
        <ArrowForwardIcon fontSize="inherit" />
      </a>
    </div>
  </div>
);

export default TermsAndConditions;
