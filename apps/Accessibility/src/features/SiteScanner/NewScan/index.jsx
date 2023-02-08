import React from 'react';
import { Dropdown, InputField, Slideover } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { wcagVersions } from './constants';

const NewScan = ({ show, closeSlideover }) => (
  <div>
    <Slideover
      show={show}
      slideoverWidth="max-w-screen-md w-screen"
      onOverlayClick={closeSlideover}
      backgroundOverlay
      onClose={closeSlideover}
    >
      <div className="flex w-1/2 justify-between p-6">
        <div>
          <h1 className="mb-2 text-lg font-bold">New website scan</h1>
          <h3 className="text-base-500 mb-4 text-sm font-medium">
            Setup your new website scan
          </h3>
        </div>
      </div>
      <div>
        <div className="flex">
          <InputField label="Scan Name" onChange={() => {}} id="scan-name" />
          <Dropdown
            triggerTitle="Select a WCAG Version"
            options={wcagVersions}
            heading="WCAG Version"
            onClick={() => {}}
          />
        </div>
      </div>
    </Slideover>
  </div>
);

NewScan.defaultProps = {
  show: false,
  closeSlideover: () => {}
};

NewScan.propTypes = {
  show: PropTypes.bool,
  closeSlideover: PropTypes.func
};

export default NewScan;
