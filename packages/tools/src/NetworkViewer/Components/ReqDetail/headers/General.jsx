import React from 'react';
import PropTypes from 'prop-types';

import { GENERAL_HEADERS } from '../../../constants';

const General = ({ data }) => (
  <div className="header-detail">
    {Object.entries(GENERAL_HEADERS)
      .filter(([, { key }]) => !!data[key])
      .map(([dataKey, { key, name }]) => (
        <p key={dataKey} className="info-row">
          <span className="info-caption">{`${name}:`}</span>
          <span>{data[key]}</span>
        </p>
      ))}
  </div>
);

General.propTypes = {
  data: PropTypes.object
};

General.defaultProps = {
  data: null
};

export default General;
