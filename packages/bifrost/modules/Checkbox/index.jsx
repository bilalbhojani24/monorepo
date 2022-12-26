import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  CHECKBOX_DESCRIPTION_VARIANT,
  CHECKBOX_POSITION_VARIANT,
} from './const/checkboxConstants';

import './styles.scss';

const Checkbox = (props) => {
  const {
    border,
    data,
    description,
    indeterminate,
    isCard,
    name,
    onChange,
    position,
    wrapperClass,
  } = props;
  const [selectedData, setSelectedData] = useState([]);
  const [checkedItem, setCheckedItem] = useState([]);

  const handleChange = (event, selectedItem) => {
    let updatedList = [];
    if (checkedItem.includes(selectedItem.value)) {
      updatedList = selectedData.filter(
        (data) => data.value !== selectedItem.value
      );
      const filteredCheckItem = checkedItem.filter(
        (data) => data !== selectedItem.value
      );
      setSelectedData(updatedList);
      setCheckedItem(filteredCheckItem);
    } else {
      updatedList = [...selectedData, selectedItem];
      setSelectedData(updatedList);
      setCheckedItem([...checkedItem, selectedItem.value]);
    }
    if (onChange) onChange(selectedItem, updatedList, event);
  };

  return (
    <>
      <div
        className={classNames(
          'mt-4',
          {
            'border-t border-b border-gray-200 divide-y divide-gray-200':
              border && !isCard,
          },
          wrapperClass
        )}
      >
        {!!data.length &&
          data.map((item, itemIdx) => (
            <div
              key={itemIdx}
              className={classNames('relative flex items-start py-4', {
                'flex-row-reverse':
                  position === CHECKBOX_POSITION_VARIANT.right,
                'pl-2 mb-2': isCard,
              })}
            >
              <div
                className={classNames('flex h-5 items-center', {
                  indeterminate: indeterminate,
                })}
              >
                <input
                  id={`${name}-${item.value}`}
                  name={`${name}-${item.value}`}
                  type="checkbox"
                  className="checkbox h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={checkedItem.includes(item.value)}
                  onChange={(e) => handleChange(e, item)}
                />
              </div>
              <div
                className={classNames('min-w-0 flex-1 text-sm', {
                  'ml-3': position === CHECKBOX_POSITION_VARIANT.left,
                })}
              >
                <label
                  htmlFor={`${name}-${item.value}`}
                  className="select-none font-medium text-gray-700"
                >
                  {item.label}
                </label>
                <p
                  id={`${name}-${item.value}`}
                  className={classNames('text-gray-500', {
                    'inline ml-2':
                      description === CHECKBOX_DESCRIPTION_VARIANT.inline,
                    block: description === CHECKBOX_DESCRIPTION_VARIANT.block,
                    hidden: description === CHECKBOX_DESCRIPTION_VARIANT.none,
                  })}
                >
                  {item.description}
                </p>
              </div>

              <span
                className={classNames(
                  checkedItem.includes(item.value) ? 'border' : 'border-2',
                  checkedItem.includes(item.value)
                    ? 'border-indigo-500'
                    : 'border-transparent',
                  'pointer-events-none absolute -inset-px rounded-lg',
                  { hidden: !isCard }
                )}
                aria-hidden="true"
              />
            </div>
          ))}
      </div>
    </>
  );
};

Checkbox.propTypes = {
  border: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  description: PropTypes.oneOf(Object.values(CHECKBOX_DESCRIPTION_VARIANT)),
  indeterminate: PropTypes.bool,
  isCard: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  position: PropTypes.oneOf(Object.values(CHECKBOX_POSITION_VARIANT)),
  wrapperClass: PropTypes.string,
};

Checkbox.defaultProps = {
  border: true,
  data: [],
  description: CHECKBOX_DESCRIPTION_VARIANT.none,
  indeterminate: true,
  isCard: false,
  name: 'checkbox',
  onChange: () => {},
  position: CHECKBOX_POSITION_VARIANT.left,
  wrapperClass: '',
};

export default Checkbox;
