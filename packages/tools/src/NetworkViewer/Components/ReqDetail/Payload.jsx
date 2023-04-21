import React from 'react';
import PropTypes from 'prop-types';

import FormData from './headers/FormData';
import HeaderInfo from './headers/HeaderInfo';
import QueryString from './headers/QueryString';
import RequestPayload from './headers/RequestPayload';

const Payload = ({ data }) => (
  <section>
    {!!data.headers.queryString?.length && (
      <HeaderInfo
        component={QueryString}
        data={data}
        eventKey="queryString"
        isEncodeEnabled
      />
    )}
    {!!data.headers.postData?.params && (
      <HeaderInfo
        component={FormData}
        data={data}
        eventKey="formData"
        isEncodeEnabled
      />
    )}
    {!!data.headers.postData?.text && (
      <HeaderInfo
        component={RequestPayload}
        data={data}
        eventKey="requestPayload"
        isParseEnabled
      />
    )}
  </section>
);

Payload.propTypes = {
  data: PropTypes.object.isRequired
};

export default Payload;
