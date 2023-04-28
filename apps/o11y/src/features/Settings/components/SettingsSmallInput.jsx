import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { O11yInputField } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

function SettingsSmallInput({ errorText, widthClass, ...rest }) {
  return (
    <>
      <div className={twClassNames('w-32', widthClass)}>
        <O11yInputField
          {...rest}
          wrapperClassName={twClassNames(
            'w-full [&>input]:w-full',
            rest.wrapperClassName,
            {
              'text-danger-900 border-danger-500': errorText
            }
          )}
        />
      </div>
      <p
        className="text-danger-600 mt-2 text-sm"
        id="general-build-timeouterror-wrap"
      >
        {errorText}
      </p>
    </>
  );
}

SettingsSmallInput.propTypes = {
  errorText: PropTypes.string,
  widthClass: PropTypes.string
};

SettingsSmallInput.defaultProps = {
  errorText: '',
  widthClass: ''
};
export default SettingsSmallInput;
