import React, { useMemo } from 'react';
import { useLatestRef } from '@browserstack/hooks';
import { twClassNames } from '@browserstack/utils';
import { Combobox as HeadlessCombobox } from '@headlessui/react';
import {
  arrayOf,
  bool,
  func,
  node,
  number,
  oneOfType,
  shape,
  string
} from 'prop-types';

import Combobox from '../ComboBox';
import ComboboxBadgeTrigger from '../ComboboxBadgeTrigger';
import ComboboxOptionGroup from '../ComboboxOptionGroup';
import ComboboxOptionItem from '../ComboboxOptionItem';

import useComboboxBadge from './useCombobobxBadge';

const ComboboxBadge = ({
  addNewItemComponent,
  comboboxProps,
  comboboxItemProps,
  comboboxOptionGroupProps,
  comparator,
  debounceThreeshold,
  label,
  defaultValue,
  MenuContainer,
  noResultText,
  noOptionsText,
  options,
  onInputChange,
  value,
  onChange,
  onBadgeCrossClick,
  deleteOnBackspace,
  onClearAll,
  placeholder
}) => {
  const isControlledElement = !!value;
  const deleteOnBackspaceRef = useLatestRef(deleteOnBackspace);

  const {
    visibleItems,
    currentSelected,
    query,
    debouncedQueryChange,
    onChangeCombobox,
    onClearAllRef,
    onBadgeCloseRef,
    setQuery
  } = useComboboxBadge({
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
    comboboxProps,
    debounceThreeshold
  });

  const isExactMatch = useMemo(
    () => options.find((item) => item.label === query),
    [query, options]
  );

  return (
    <Combobox
      isBadge
      value={isControlledElement ? value : currentSelected}
      onChange={onChangeCombobox}
      {...comboboxProps}
      onOpenChange={(status) => {
        if (!status) {
          setQuery('');
          debouncedQueryChange('');
        }
      }}
    >
      {label}
      <ComboboxBadgeTrigger
        placeholder={placeholder}
        onInputValueChange={(e) => {
          debouncedQueryChange(e.target.value);
        }}
        onBadgeClose={onBadgeCloseRef}
        currentSelected={currentSelected}
        onClearAll={onClearAllRef}
      />

      <MenuContainer {...comboboxOptionGroupProps}>
        {visibleItems.length > 0 ? (
          visibleItems.map((opt) => (
            <ComboboxOptionItem
              key={opt.value}
              {...comboboxItemProps}
              option={opt}
            />
          ))
        ) : (
          <HeadlessCombobox.Option
            className={twClassNames(
              'text-base-500 group relative cursor-pointer select-none py-2 pr-9 pl-3 text-sm'
            )}
            disabled
          >
            {query.length > 0 ? noResultText : noOptionsText}
          </HeadlessCombobox.Option>
        )}

        {query.length > 0 && !isExactMatch && addNewItemComponent}
      </MenuContainer>
    </Combobox>
  );
};

ComboboxBadge.propTypes = {
  addNewItemComponent: node.isRequired,
  comboboxProps: shape({}),
  comboboxItemProps: shape({}),
  comboboxOptionGroupProps: shape({}),
  defaultValue: oneOfType([
    arrayOf(
      shape({
        value: oneOfType([string, number]).isRequired,
        label: string.isRequired,
        image: string
      })
    ),
    shape({
      value: oneOfType([string, number]).isRequired,
      label: string.isRequired,
      image: string
    })
  ]),
  debounceThreeshold: number,
  comparator: func,
  deleteOnBackspace: func,
  label: node,
  MenuContainer: func,
  noResultText: string,
  noOptionsText: string,
  onBadgeCrossClick: func,
  onChange: func,
  onClearAll: func,
  onInputChange: func,
  showNoResult: bool,
  options: arrayOf(
    shape({
      value: oneOfType([string, number]).isRequired,
      label: string.isRequired,
      image: string,
      visualLabel: node,
      isError: bool
    })
  ),
  value: oneOfType([
    arrayOf(
      shape({
        value: oneOfType([string, number]).isRequired,
        label: string.isRequired,
        image: string
      })
    ),
    shape({
      value: oneOfType([string, number]).isRequired,
      label: string.isRequired,
      image: string
    })
  ]),
  placeholder: string
};

ComboboxBadge.defaultProps = {
  comboboxItemProps: {},
  comboboxProps: {},
  comboboxOptionGroupProps: {},
  comparator: null,
  label: '',
  defaultValue: undefined,
  debounceThreeshold: 0,
  deleteOnBackspace: null,
  MenuContainer: ComboboxOptionGroup,
  noResultText: 'No results found',
  noOptionsText: 'No options available',
  showNoResult: false,
  onBadgeCrossClick: null,
  onChange: null,
  onClearAll: null,
  onInputChange: null,
  options: [],
  value: undefined,
  placeholder: 'Placeholder'
};

export default ComboboxBadge;
