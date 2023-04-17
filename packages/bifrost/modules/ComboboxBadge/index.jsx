import React, { useMemo } from 'react';
import { useLatestRef } from '@browserstack/hooks';
import { twClassNames } from '@browserstack/utils';
import { Combobox as HeadlessCombobox } from '@headlessui/react';
import {
  arrayOf,
  func,
  node,
  number,
  oneOfType,
  shape,
  string
} from 'prop-types';

import Combobox from '../ComboBox';
import ComboboxAddNewItem from '../ComboboxAddNewItem';
import ComboboxBadgeTrigger from '../ComboboxBadgeTrigger';
import ComboboxOptionGroup from '../ComboboxOptionGroup';
import ComboboxOptionItem from '../ComboboxOptionItem';

import useComboboxBadge from './useCombobobxBadge';

const ComboboxBadge = ({
  comboboxProps,
  comboboxItemProps,
  label,
  defaultValue,
  MenuContainer,
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
    onBadgeCrossClick
  });

  const isExactMatch = useMemo(
    () =>
      [...visibleItems, ...value, ...currentSelected].find(
        (item) => item.label === query
      ),
    [query, visibleItems, value, currentSelected]
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
              'text-base-500 group relative cursor-pointer select-none py-2 pr-9 pl-8'
            )}
            disabled
          >
            {query.length > 0 ? 'No results found' : 'No options available'}
          </HeadlessCombobox.Option>
        )}
        {query.length > 0 && !isExactMatch && (
          <ComboboxAddNewItem suffix="as a new option (↵)" prefix="Add" />
        )}
      </MenuContainer>
    </Combobox>
  );
};

ComboboxBadge.propTypes = {
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
  onBadgeCrossClick: func,
  onChange: func,
  onClearAll: func,
  onInputChange: func,
  options: arrayOf(
    shape({
      value: oneOfType([string, number]).isRequired,
      label: string.isRequired,
      image: string,
      visualLabel: node
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
  onBadgeCrossClick: null,
  onChange: null,
  onClearAll: null,
  onInputChange: null,
  options: [],
  value: undefined
};

export default ComboboxBadge;
