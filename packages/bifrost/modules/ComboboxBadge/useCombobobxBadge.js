import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLatestRef } from '@browserstack/hooks';
import { makeDebounce } from '@browserstack/utils';

import { findLastActionItemHelper } from '../ComboBox/helper';

const findUniqueBetweenTwoArray = (options, ourValue) =>
  options.filter((o1) => !ourValue.some((o2) => o1.value === o2.value));

const useComboboxBadge = ({
  comboboxProps,
  defaultValue,
  deleteOnBackspaceRef,
  isControlledElement,
  value,
  options,
  onInputChange,
  onChange,
  onClearAll,
  onBadgeCrossClick,
  comparator,
  debounceThreeshold
}) => {
  const [visibleItems, setVisibleItems] = useState(options);
  const [currentSelected, setCurrentSelected] = useState(
    defaultValue || value || []
  );
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
      if (
        !comboboxProps.disabled &&
        event.keyCode === 8 &&
        query.length <= 0 &&
        currentSelected.length
      ) {
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
    isControlledElement,
    comboboxProps.disabled
  ]);

  const handleChange = (iv) => {
    let filtered;
    const inputValue = iv.trim();
    setQuery(inputValue);

    if (onInputChange) {
      onInputChange(inputValue);
    }

    const selectedValues = isControlledElement ? value : currentSelected;

    if (typeof comparator === 'function') {
      filtered = options.filter((option) =>
        comparator(option, inputValue, selectedValues)
      );
    } else {
      filtered = options.filter(
        (option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
          !selectedValues.some(
            (visibleOption) => visibleOption.value === option.value
          )
      );
    }

    setVisibleItems(filtered);
  };

  const handleChangeRef = useLatestRef(handleChange);

  const debouncedQueryChange = useMemo(
    () => makeDebounce((v) => handleChangeRef.current(v), debounceThreeshold),
    [debounceThreeshold, handleChangeRef]
  );

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
    debouncedQueryChange,
    onChangeCombobox,
    onClearAllRef,
    onBadgeCloseRef,
    setQuery
  };
};

export default useComboboxBadge;
