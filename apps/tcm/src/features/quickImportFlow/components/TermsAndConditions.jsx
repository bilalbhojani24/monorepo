import React from 'react';
import { ArrowForwardIcon } from 'assets/icons';

const TermsAndConditions = () => (
  <div className="text-base-500 mt-6 text-xs">
    <div>
      By continuing, you agree to our{' '}
      <span className="text-base-700">Terms and Conditions</span> &
      <span className="text-base-700"> Privacy Policy</span>
    </div>
    <div>
      Learn more about importing your data{' '}
      <span className="text-base-700">
        Read Documentation
        <ArrowForwardIcon fontSize="inherit" />
      </span>
    </div>
  </div>
);

export default TermsAndConditions;
