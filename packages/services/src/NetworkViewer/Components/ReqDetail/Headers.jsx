import React from 'react';
import PropTypes from 'prop-types';

import General from './headers/General';
import HeaderInfo from './headers/HeaderInfo';
import Request from './headers/Request';
import Response from './headers/Response';

const Headers = ({ data }) => (
  <section>
    <HeaderInfo component={General} data={data} eventKey="general" />
    {!!data.headers.response?.length && (
      <HeaderInfo component={Response} data={data} eventKey="response" />
    )}
    {!!data.headers.request?.length && (
      <HeaderInfo component={Request} data={data} eventKey="request" />
    )}
  </section>
);

Headers.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Headers;
