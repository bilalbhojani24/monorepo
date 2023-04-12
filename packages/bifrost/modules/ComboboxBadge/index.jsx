/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox as HeadlessCombobox } from '@headlessui/react';

import Combobox from '../ComboBox';
import ComboboxAddNewItem from '../ComboboxAddNewItem';
import ComboboxBadgeTrigger from '../ComboboxBadgeTrigger';
import ComboboxOptionGroup from '../ComboboxOptionGroup';
import ComboboxOptionItem from '../ComboboxOptionItem';

const findLastActionItemHelper = (receivedValue, ourValue) => {
  const lastSelected = receivedValue.find((item) => !ourValue.includes(item));
  const lastDeselected = ourValue.find((item) => !receivedValue.includes(item));

  return lastSelected || lastDeselected;
};

const findUnqiueBetweenTwoArray = (options, ourValue) =>
  options.filter((o1) => !ourValue.some((o2) => o1.value === o2.value));

const ComboboxBadge = ({
  label,
  defaultValue,
  options,
  onInputChange,
  value,
  onChange,
  onBadgeCrossClick,
  deleteOnBackspace,
  onClearAll
}) => {
  const isControlledElement = !!value;
  const [visibleItems, setVisibleItems] = useState(options);
  const [currentSelected, setCurrentSelected] = useState(defaultValue || value);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (value) setCurrentSelected(value);
  }, [value]);

  useEffect(() => {
    if (isControlledElement) {
      const filteredArray = findUnqiueBetweenTwoArray(options, value);
      setVisibleItems(filteredArray);
    }
  }, [options, value, isControlledElement]);

  useEffect(() => {
    if (!isControlledElement) {
      const filteredArray = findUnqiueBetweenTwoArray(options, currentSelected);
      setVisibleItems(filteredArray);
    }
  }, [currentSelected, options, isControlledElement]);

  const handleChange = async (e) => {
    if (onInputChange) {
      const val = await onInputChange(e.target.value);
      setVisibleItems(val);
    } else {
      const q = e.target.value;
      const filtered = options.filter((fv) =>
        fv.label.toLowerCase().includes(q.toLowerCase())
      );
      setVisibleItems(filtered);
      setQuery(q);
    }
  };

  useEffect(() => {
    const handleBackspace = (event) => {
      if (event.keyCode === 8 && query.length <= 0 && currentSelected.length) {
        // When query.length <=0 and there is atleast 1 currentSelected value send callback to consumer with new value of selected items
        const filteredSelected = [...currentSelected];
        const removedItem = filteredSelected.pop();
        if (deleteOnBackspace) deleteOnBackspace(filteredSelected, removedItem);

        // uncontrolled component
        if (!isControlledElement) setCurrentSelected(filteredSelected);
      }
    };

    window.addEventListener('keydown', handleBackspace);

    return () => {
      window.removeEventListener('keydown', handleBackspace);
    };
  }, [
    query,
    currentSelected,
    setCurrentSelected,
    deleteOnBackspace,
    isControlledElement
  ]);

  return (
    <Combobox
      isBadge
      value={isControlledElement ? value : currentSelected}
      onChange={(val) => {
        if (isControlledElement && onChange) {
          const lastActionItemControlled = findLastActionItemHelper(val, value);
          onChange(lastActionItemControlled, val);
        } else {
          const lastActionItemControlled = findLastActionItemHelper(
            val,
            currentSelected
          );
          onChange(lastActionItemControlled, val);
          setCurrentSelected(val);
        }

        setQuery('');
      }}
    >
      {label}
      <ComboboxBadgeTrigger
        placeholder="Placeholder"
        onInputValueChange={handleChange}
        onBadgeClose={(removedItem) => {
          // Create new array of currentSelected excluding the current item and pass that array to consumer
          const filteredSelected = currentSelected.filter(
            (item) => item.value !== removedItem.value
          );

          if (onBadgeCrossClick)
            onBadgeCrossClick(filteredSelected, removedItem);
          if (!isControlledElement) {
            setCurrentSelected(filteredSelected);
          }
        }}
        currentSelected={currentSelected}
        onClearAll={() => {
          if (onClearAll) {
            onClearAll([]);
          }
          if (!isControlledElement) {
            setCurrentSelected([]);
          }
        }}
      />

      <ComboboxOptionGroup>
        {visibleItems.length > 0 ? (
          visibleItems.map((opt) => (
            <ComboboxOptionItem key={opt.value} option={opt} />
          ))
        ) : (
          <>
            <HeadlessCombobox.Option
              className={twClassNames(
                'text-base-500 group relative cursor-pointer select-none py-2 pr-9 pl-8'
              )}
              disabled
            >
              {query.length > 0 ? 'No results found' : 'No options available'}
            </HeadlessCombobox.Option>

            {query.length > 0 && (
              <ComboboxAddNewItem suffix="as a new option (↵)" prefix="Add" />
            )}
          </>
        )}
      </ComboboxOptionGroup>
    </Combobox>
  );
};

ComboboxBadge.propTypes = {};
ComboboxBadge.defaultProps = {};

export default ComboboxBadge;
