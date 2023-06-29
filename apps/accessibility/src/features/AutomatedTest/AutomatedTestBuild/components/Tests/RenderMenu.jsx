import React from 'react';
import {
  MdKeyboardArrowDown,
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

export default function RenderMenu({
  data,
  onFilterSearch,
  filterStatus,
  placeholder,
  name
}) {
  const items = data?.map((state) => ({
    value: state,
    label: state
  }));

  return (
    <div className="w-28">
      <SelectMenu
        onChange={(obj) => onFilterSearch(obj, name)}
        value={filterStatus[name]}
        isMulti
        disabled={items.length === 0}
      >
        <SelectMenuTrigger
          placeholder={placeholder}
          triggerIcon={<MdKeyboardArrowDown className="text-xl" />}
        />
        <SelectMenuOptionGroup>
          {items?.map((item) => (
            <SelectMenuOptionItem
              key={item.label}
              option={item}
              wrapperClassName="text-sm font-semibold text-base-900 px-4 py-2"
            />
          ))}
        </SelectMenuOptionGroup>
      </SelectMenu>
    </div>
  );
}

RenderMenu.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  onFilterSearch: PropTypes.func.isRequired,
  filterStatus: PropTypes.instanceOf(Object).isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
