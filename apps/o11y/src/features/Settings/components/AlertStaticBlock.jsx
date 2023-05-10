import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

function AlertStaticBlock({
  label,
  icon,
  innerText,
  isMandatory,
  wrapperClass,
  boxClass
}) {
  return (
    <div className={twClassNames('flex flex-col', wrapperClass)}>
      <p className="text-base-700 text-sm font-medium leading-5">
        {label}
        {isMandatory && <span className="text-danger-600">*</span>}
      </p>
      <div
        className={twClassNames(
          'border-base-300 mt-1 flex gap-3 rounded-md border px-3 py-2 shadow-sm items-center',
          boxClass
        )}
      >
        {icon}
        <p className="text-sm font-normal leading-5">{innerText}</p>
      </div>
    </div>
  );
}
AlertStaticBlock.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  innerText: PropTypes.string.isRequired,
  isMandatory: PropTypes.bool,
  wrapperClass: PropTypes.string,
  boxClass: PropTypes.string
};
AlertStaticBlock.defaultProps = {
  icon: null,
  isMandatory: false,
  wrapperClass: '',
  boxClass: ''
};

export default AlertStaticBlock;
