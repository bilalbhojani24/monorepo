import React from 'react';
import Proptypes from 'prop-types';

import DatePickerBody from '../DatepickerBody';

const Datepicker = (props) => {
  const { wrapperClassName } = props;
  return (
    <div className={wrapperClassName}>
      <DatePickerBody {...props} />
    </div>
  );
};

Datepicker.propTypes = {
  wrapperClassName: Proptypes.string
};
Datepicker.defaultProps = {
  wrapperClassName: ''
};

export default Datepicker;
