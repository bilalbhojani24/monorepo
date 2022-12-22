import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';
import { DIRECTIONS } from './const/radioGroupConstants';

const RadioGroup = (props) => {
  const { direction, options, onChange, inlineDescription, rightAligned } = props;
  const [selectedId, setSelectedId] = useState(options[0]?.id);

  const handleChange = (id) => (e) => {
    setSelectedId(id);
    onChange(e, id);
  };

  return (
    <div
      className={classNames('flex', {
        'space-x-5': direction === DIRECTIONS[0],
        'space-y-5 flex-col': direction === DIRECTIONS[1]
      })}
    >
      {options.map((option) => (
        <div key={option.id} className="flex items-start">
          <div className={classNames('flex h-5 items-center', { 'order-last mx-3': rightAligned })}>
            <input
              id={option.id}
              aria-describedby={`${option.id}-description`}
              name="plan"
              type="radio"
              defaultChecked={option.id === selectedId}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              onChange={handleChange(option.id)}
            />
          </div>
          <div className={classNames({ 'flex-col': !inlineDescription, 'flex-1': rightAligned }, 'flex ml-3 text-sm')}>
            {option.name && (
              <label htmlFor={option.id} className="font-medium text-gray-700">
                {option.name}
              </label>
            )}
            {option.description && (
              <div
                id={`${option.id}-description`}
                className={classNames({ 'ml-2': inlineDescription }, 'text-gray-500')}
              >
                {option.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

RadioGroup.propTypes = {
  direction: PropTypes.oneOf(DIRECTIONS),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      disabled: PropTypes.bool
    })
  ).isRequired,
  onChange: PropTypes.func,
  inlineDescription: PropTypes.bool,
  rightAligned: PropTypes.bool
};
RadioGroup.defaultProps = {
  direction: DIRECTIONS[0],
  options: [
    {
      id: 'radio-1 ',
      name: 'Radio 1 and it can grow longer and much more longer',
      description: 'It is the description of Radio 1',
      disabled: false
    },
    {
      id: 'radio-2',
      name: 'Radio 2 and it can grow longer',
      description: 'It is the description of Radio 2',
      disabled: false
    },
    {
      id: 'radio-3',
      name: 'Radio 3 and it can grow longer',
      description: 'It is the description of Radio 3',
      disabled: false
    }
  ],
  onChange: () => {},
  inlineDescription: false,
  rightAligned: false
};

export default RadioGroup;
