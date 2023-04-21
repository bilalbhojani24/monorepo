import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const parseRequestPayload = (text) => {
  let parsedJson = text;
  try {
    parsedJson = JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    parsedJson = text;
  }
  return parsedJson;
};

const RequestPayload = ({ data, isPayloadTransformed }) => {
  const payloadData = data.headers.postData.text;
  const parsedData = useMemo(
    () => parseRequestPayload(payloadData),
    [payloadData]
  );

  return (
    <div className="text-base-700 mt-2 text-sm">
      {isPayloadTransformed ? (
        <div className="bg-base-50 border-base-300 overflow-auto border py-3 px-4">
          <pre className="font-mono text-xs">{parsedData}</pre>
        </div>
      ) : (
        payloadData
      )}
    </div>
  );
};

RequestPayload.propTypes = {
  data: PropTypes.object,
  isPayloadTransformed: PropTypes.bool.isRequired
};

RequestPayload.defaultProps = {
  data: null
};

export default RequestPayload;
