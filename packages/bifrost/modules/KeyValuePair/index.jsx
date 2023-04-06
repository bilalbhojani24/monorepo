import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const KeyValue = ({ label, labelClassNames, value, valueClassNames }) => (
  <>
    <div
      className={twClassNames(
        'text-base-500 text-sm font-medium',
        labelClassNames
      )}
    >
      {label}
    </div>
    <div className={twClassNames('text-base-900 text-sm', valueClassNames)}>
      {value}
    </div>
  </>
);

KeyValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  labelClassNames: PropTypes.string,
  valueClassNames: PropTypes.string
};
KeyValue.defaultProps = {
  labelClassNames: '',
  valueClassNames: ''
};

export default KeyValue;
