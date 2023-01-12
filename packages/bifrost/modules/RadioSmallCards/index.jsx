import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import PropTypes from 'prop-types';
import './styles.scss';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const RadioSmallCards = (props) => {
  const { heading, label, options, onChange } = props;
  const [mem, setMem] = useState(options[2]);

  const handleChange = (e) => {
    setMem(e);
    onChange(e);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        {heading && <h2 className="text-sm font-medium text-base-900">{heading}</h2>}
        {/* <a href="#" className="text-sm font-medium text-brand-600 hover:text-brand-500">
          See performance specs
        </a> */}
      </div>

      <RadioGroup value={mem} onChange={handleChange} className="mt-2">
        {label && <RadioGroup.Label className="sr-only"> {label} </RadioGroup.Label>}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {options.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  option.disabled ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer focus:outline-none',
                  active ? 'ring-2 ring-offset-2 ring-brand-500' : '',
                  checked
                    ? 'bg-brand-600 border-transparent text-white hover:bg-brand-700'
                    : 'bg-white border-base-200 text-base-900 hover:bg-base-50',
                  'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                )
              }
              disabled={option.disabled}
            >
              <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

RadioSmallCards.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      disabled: PropTypes.bool
    })
  ).isRequired,
  onChange: PropTypes.func
};
RadioSmallCards.defaultProps = {
  heading: 'RAM',
  label: 'Choose a memory option',
  options: [
    { name: '4 GB', disabled: false },
    { name: '8 GB', disabled: false },
    { name: '16 GB', disabled: false },
    { name: '32 GB', disabled: false },
    { name: '64 GB', disabled: false },
    { name: '128 GB', disabled: true }
  ],
  onChange: () => {}
};

export default RadioSmallCards;
