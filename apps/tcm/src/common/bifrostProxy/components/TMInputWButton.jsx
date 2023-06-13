/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import { TMButton, TMInputField } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const TMInputWButton = forwardRef((props, ref) => (
  <div className="relative z-0 flex basis-full items-end justify-end">
    {props?.label && (
      <div className="text-base-700 mb-2 block w-full text-sm font-medium">
        {props.label}
      </div>
    )}
    <div className="basis-11/12">
      <TMInputField
        {...props}
        label={null}
        ref={ref}
        wrapperClassName={twClassNames(
          'flex-1 [&_*]:rounded-none [&_*]:rounded-l-md',
          props.wrapperClassName
        )}
      />
    </div>
    <TMButton
      onClick={props?.onButtonClick}
      colors="white"
      wrapperClassName={twClassNames(
        'basis-1/12 whitespace-nowrap inline-flex bg-base-50 text-base-700 rounded-none rounded-r-md border border-l-0 focus:ring-offset-0 focus:outline-none focus:z-10'
      )}
    >
      {props.buttonElement}
    </TMButton>
  </div>
));

// space-x-2 rounded-r-md border px-4 py-2 text-sm font-medium focus:outline-none focus:ring-1

TMInputWButton.propTypes = {
  wrapperClassName: PropTypes.string,
  label: PropTypes.string,
  onButtonClick: PropTypes.func,
  buttonElement: PropTypes.node
};

TMInputWButton.defaultProps = {
  wrapperClassName: '',
  label: '',
  onButtonClick: () => {},
  buttonElement: null
};

export default TMInputWButton;
