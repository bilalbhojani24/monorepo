import React from 'react';
import { RadioGroup } from '@headlessui/react';
import PropTypes from 'prop-types';

import './styles.scss';

function twClassNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const RadioSmallCards = (props) => {
  const {
    heading,
    label,
    options,
    onChange,
    wrapperClassName,
    cardWrapperClassName,
    value,
    columnWrapperClassName,
    defaultValue
  } = props;

  const handleChange = (e) => {
    onChange(e);
  };

  const effectiveChildren = (
    <>
      {label && (
        <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
      )}
      <div
        className={twClassNames(
          'grid grid-cols-3 gap-3 sm:grid-cols-6',
          columnWrapperClassName
        )}
      >
        {options.map((option) => (
          <RadioGroup.Option
            key={option.name}
            value={option}
            className={({ active, checked }) =>
              twClassNames(
                option.disabled
                  ? 'opacity-25 cursor-not-allowed'
                  : 'cursor-pointer focus:outline-none',
                active ? 'ring-2 ring-offset-2 ring-brand-500' : '',
                checked
                  ? 'bg-brand-600 border-transparent text-white hover:bg-brand-700'
                  : 'bg-white border-base-200 text-base-900 hover:bg-base-50',
                'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1',
                cardWrapperClassName
              )
            }
            disabled={option.disabled}
          >
            <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </>
  );

  return (
    <div className={wrapperClassName}>
      <div className="flex items-center justify-between">
        {heading && (
          <h2 className="text-base-900 text-sm font-medium">{heading}</h2>
        )}
      </div>

      {value ? (
        <RadioGroup onChange={handleChange} className="mt-2" value={value}>
          {effectiveChildren}
        </RadioGroup>
      ) : (
        <RadioGroup
          onChange={handleChange}
          className="mt-2"
          defaultValue={defaultValue}
        >
          {effectiveChildren}
        </RadioGroup>
      )}
    </div>
  );
};

RadioSmallCards.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      disabled: PropTypes.bool,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  cardWrapperClassName: PropTypes.string,
  value: PropTypes.shape({
    name: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired
  }),
  defaultValue: PropTypes.shape({
    name: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired
  }),
  columnWrapperClassName: PropTypes.string
};
RadioSmallCards.defaultProps = {
  heading: '',
  label: '',
  onChange: () => {},
  wrapperClassName: '',
  cardWrapperClassName: '',
  value: null,
  columnWrapperClassName: '',
  defaultValue: null
};

export default RadioSmallCards;
