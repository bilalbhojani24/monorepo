import React from 'react';
import Proptypes from 'prop-types';

import DatePickerCore from '../DatepickerCore';

const Datepicker = (props) => {
  const { wrapperClassName, onChange } = props;

  const handleChange = (dateObj) => {
    onChange(dateObj);
  };
  return (
    <div className={wrapperClassName}>
      <DatePickerCore {...props} onChange={handleChange} />
    </div>
  );
};

Datepicker.propTypes = {
  wrapperClassName: Proptypes.string,
  errorMessage: Proptypes.string,
  disabled: Proptypes.bool,
  onChange: Proptypes.func,
  disabledMessage: Proptypes.string,
  isDateUnavailable: Proptypes.func,
  offset: Proptypes.number,
  crossOffset: Proptypes.number,
  placement: Proptypes.string
};
Datepicker.defaultProps = {
  wrapperClassName: '',
  errorMessage: null,
  disabled: false,
  onChange: () => {},
  disabledMessage: 'Datepicker has been disabled',
  isDateUnavailable: () => {},
  offset: 0,
  crossOffset: 0,
  placement: 'bottom end'
};

export default Datepicker;
