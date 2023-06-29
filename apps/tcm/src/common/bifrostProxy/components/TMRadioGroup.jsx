import React from 'react';
import { RadioGroup, RadioItem } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const TMRadioGroup = ({
  value,
  defaultValue,
  onChange,
  isMandatory,
  errorText,
  radioGroupLabel,
  radioGroupDescription,
  radioGroupId,
  columnWrapperClassName,
  wrapperClassName,
  radioItemWrapperClass,
  direction,
  type,
  options,
  withDescription,
  rightAligned,
  radioItemInlineDescription
}) => (
  <RadioGroup
    id={radioGroupId}
    label={radioGroupLabel}
    description={radioGroupDescription}
    type={type}
    direction={direction}
    isMandatory={isMandatory}
    defaultValue={defaultValue}
    value={value}
    onChange={onChange}
    columnWrapperClassName={twClassNames(columnWrapperClassName)}
    wrapperClassName={twClassNames(wrapperClassName)}
    errorText={errorText}
  >
    {options?.map((option) => (
      <RadioItem
        key={option.value}
        option={option}
        disabled={option.disabled}
        rightAligned={rightAligned}
        wrapperClassName={twClassNames(radioItemWrapperClass)}
        withDescription={withDescription}
        inlineDescription={radioItemInlineDescription}
      />
    ))}
  </RadioGroup>
);

TMRadioGroup.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  isMandatory: PropTypes.bool,
  errorText: PropTypes.string,
  radioGroupLabel: PropTypes.string,
  radioGroupDescription: PropTypes.string,
  radioGroupId: PropTypes.string.isRequired,
  columnWrapperClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  radioItemWrapperClass: PropTypes.string,
  direction: PropTypes.oneOf(['inline', 'block']),
  type: PropTypes.oneOf(['inline', 'block']),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
      disabled: PropTypes.bool
    })
  ),
  withDescription: PropTypes.bool,
  rightAligned: PropTypes.bool,
  radioItemInlineDescription: PropTypes.bool
};

TMRadioGroup.defaultProps = {
  value: undefined,
  defaultValue: undefined,
  onChange: null,
  isMandatory: false,
  errorText: '',
  radioGroupLabel: '',
  radioGroupDescription: '',
  columnWrapperClassName: '',
  wrapperClassName: '',
  radioItemWrapperClass: '',
  direction: 'inline',
  type: 'default',
  options: [],
  withDescription: false,
  rightAligned: false,
  radioItemInlineDescription: false
};
export default TMRadioGroup;
