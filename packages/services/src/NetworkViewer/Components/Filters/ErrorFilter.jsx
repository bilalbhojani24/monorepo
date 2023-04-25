import React from 'react';
import { Checkbox } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { NL_EVENTS } from '../../nlEvents';

const ErrorFilter = ({ isError, onChange }) => {
  const handleChange = () => {
    onChange(!isError);
    window.pubSub.publish(NL_EVENTS.NL_PUBSUB_EVENT_NAME, {
      event: NL_EVENTS.FILTER_CHANGED,
      data: {
        state: !isError,
        type: 'errors only'
      }
    });
  };

  return (
    <Checkbox
      checked={isError}
      border={false}
      onChange={handleChange}
      data={{
        label: 'Errors only',
        value: 'errors-only'
      }}
      name="Errors only"
    />
  );
};

ErrorFilter.propTypes = {
  isError: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ErrorFilter;
