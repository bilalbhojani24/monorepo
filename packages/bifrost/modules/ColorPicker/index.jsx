import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import PropTypes from 'prop-types';

import './styles.scss';

function twClassNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ColorPicker = (props) => {
  const { label, options, onChange } = props;
  const [selectedColor, setSelectedColor] = useState(options[1]);

  const handleChange = (e) => {
    setSelectedColor(e);
    onChange?.(e);
  };
  return (
    <RadioGroup value={selectedColor} onChange={handleChange}>
      {label && (
        <RadioGroup.Label className="text-base-700 block text-sm font-medium">
          {label}
        </RadioGroup.Label>
      )}
      <div className="mt-4 flex items-center space-x-3">
        {options.map((option) => (
          <RadioGroup.Option
            key={option.name}
            value={option}
            className={({ active, checked }) =>
              twClassNames(
                option.selectedColor,
                active && checked ? 'ring ring-offset-1' : '',
                !active && checked ? 'ring-2' : '',
                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
              )
            }
          >
            <RadioGroup.Label as="span" className="sr-only">
              {option.name}
            </RadioGroup.Label>
            <span
              aria-hidden="true"
              className={twClassNames(
                option.bgColor,
                'h-8 w-8 border border-black border-opacity-10 rounded-full'
              )}
            />
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

ColorPicker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      bgColor: PropTypes.string,
      selectColor: PropTypes.string
    })
  ).isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func
};

ColorPicker.defaultProps = {
  label: 'Pick a color',
  onChange: null
};

export default ColorPicker;
