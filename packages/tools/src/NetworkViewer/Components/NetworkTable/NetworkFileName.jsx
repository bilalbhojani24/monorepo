import React from 'react';
import { Badge, MdLock } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { getStatusClass } from '../../utils';

const NetworkFileName = ({ formattedValue, payload }) => (
  <section className="network-file-name">
    <section className="network-file-name__main">
      {/* <Tooltip description={payload.url} type="dark" direction="left"> */}
      <span className="har-network-cell-value">{formattedValue}</span>
      {/* </Tooltip> */}
    </section>
    <section className="network-file-name__sub">
      <Badge
        wrapperClassName="network-file-name__method"
        text={payload.method}
        modifier={getStatusClass(payload) === 'error' ? 'error' : 'base'}
        type="subtle"
      />
      {payload?.url?.indexOf('https') === 0 && (
        <span className="network-file-name__icon">
          <MdLock role="img" title="lock" aria-hidden="false" />
        </span>
      )}
      <span className="network-file-name__domain">{payload.domain}</span>
    </section>
  </section>
);

NetworkFileName.propTypes = {
  payload: PropTypes.object.isRequired,
  formattedValue: PropTypes.string.isRequired
};

export default NetworkFileName;
