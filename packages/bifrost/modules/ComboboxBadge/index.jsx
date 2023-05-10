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
  onClearAll
}) => {
  const isControlledElement = !!value;
  const deleteOnBackspaceRef = useLatestRef(deleteOnBackspace);

  const {
    visibleItems,
    currentSelected,
    query,
    handleChange,
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
    comboboxProps
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
        if (!status) setQuery('');
        handleChange('');
      }}
    >
      {label}
      <ComboboxBadgeTrigger
        placeholder="Placeholder"
        onInputValueChange={(e) => {
          handleChange(e.target.value);
        }}
        onBadgeClose={onBadgeCloseRef}
        currentSelected={currentSelected}
        onClearAll={onClearAllRef}
      />

      <MenuContainer>
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
  ])
};

ComboboxBadge.defaultProps = {
  comboboxItemProps: {},
  comboboxProps: {},
  label: '',
  defaultValue: undefined,
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
  value: undefined
};

export default ComboboxBadge;
