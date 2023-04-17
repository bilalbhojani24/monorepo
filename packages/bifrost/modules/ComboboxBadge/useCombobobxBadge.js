import { useCallback, useEffect, useState } from 'react';

import { findLastActionItemHelper } from '../ComboBox/helper';

const findUniqueBetweenTwoArray = (options, ourValue) =>
  options.filter((o1) => !ourValue.some((o2) => o1.value === o2.value));

const useComboboxBadge = ({
  defaultValue,
  deleteOnBackspaceRef,
  isControlledElement,
  value,
  options,
  onInputChange,
  onChange,
  onClearAll,
  onBadgeCrossClick
}) => {
  const [visibleItems, setVisibleItems] = useState(options);
  const [currentSelected, setCurrentSelected] = useState(defaultValue || value);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (value) setCurrentSelected(value);
  }, [value]);

  useEffect(() => {
    const filteredArray = findUniqueBetweenTwoArray(
      options,
      isControlledElement ? value : currentSelected
    );

    setVisibleItems(filteredArray);
  }, [options, value, currentSelected, isControlledElement]);

  useEffect(() => {
    const handleBackspace = (event) => {
      if (event.keyCode === 8 && query.length <= 0 && currentSelected.length) {
        // When query.length <=0 and there is atleast 1 currentSelected value send callback to consumer with new value of selected items
        const filteredSelected = [...currentSelected];
        const removedItem = filteredSelected.pop();

        if (deleteOnBackspaceRef)
          deleteOnBackspaceRef.current?.(filteredSelected, removedItem);

        if (!isControlledElement) {
          setCurrentSelected(filteredSelected);
        }
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
    deleteOnBackspaceRef,
    isControlledElement
  ]);

  const handleChange = async (inputValue) => {
    if (onInputChange) {
      const val = await onInputChange(inputValue);
      setVisibleItems(val);
    } else {
      const selectedValues = isControlledElement ? value : currentSelected;

      const q = inputValue.toLowerCase();

      const filtered = options.filter(
        (option) =>
          option.label.toLowerCase().includes(q) &&
          !selectedValues.some(
            (visibleOption) => visibleOption.value === option.value
          )
      );

      setVisibleItems(filtered);
    }
    setQuery(inputValue);
  };

  const onChangeCombobox = useCallback(
    (val) => {
      const lastActionItemControlled = findLastActionItemHelper(
        val,
        isControlledElement ? value : currentSelected
      );
      onChange(lastActionItemControlled, val);
      setCurrentSelected(isControlledElement ? currentSelected : val);
      setQuery('');
    },
    [currentSelected, isControlledElement, onChange, value]
  );

  const onClearAllRef = useCallback(() => {
    if (onClearAll) {
      onClearAll([]);
    }
    if (!isControlledElement) {
      setCurrentSelected([]);
    }
  }, [isControlledElement, onClearAll]);

  const onBadgeCloseRef = useCallback(
    (removedItem) => {
      // Create new array of currentSelected excluding the current item and pass that array to consumer
      const filteredSelected = currentSelected.filter(
        (item) => item.value !== removedItem.value
      );

      if (!isControlledElement) {
        setCurrentSelected(filteredSelected);
      }

      if (onBadgeCrossClick) onBadgeCrossClick(filteredSelected, removedItem);
    },
    [isControlledElement, onBadgeCrossClick, currentSelected]
  );

  return {
    visibleItems,
    currentSelected,
    query,
    handleChange,
    onChangeCombobox,
    onClearAllRef,
    onBadgeCloseRef,
    setQuery
  };
};

export default useComboboxBadge;
