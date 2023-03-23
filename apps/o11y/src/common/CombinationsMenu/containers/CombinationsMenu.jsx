import React from 'react';
import { twClassNames } from '@browserstack/utils';
import {
  O11ySelectMenu,
  O11ySelectMenuOptionGroup,
  O11ySelectMenuOptionItem,
  O11ySelectMenuTrigger
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const CombinationsMenu = ({
  defaultValue,
  isLoading,
  menuOptions,
  onCombinationChange
}) => (
  <O11ySelectMenu defaultValue={defaultValue} onChange={onCombinationChange}>
    <O11ySelectMenuTrigger
      placeholder="Select.."
      wrapperClassName={twClassNames('max-w-[300px]', {
        'pointer-events-none opacity-50': isLoading
      })}
    />
    <O11ySelectMenuOptionGroup>
      {menuOptions.map((item) => (
        <O11ySelectMenuOptionItem
          key={item.value}
          option={item}
          wrapperClassName="text-xs"
        />
      ))}
    </O11ySelectMenuOptionGroup>
  </O11ySelectMenu>
);

CombinationsMenu.propTypes = {
  isLoading: PropTypes.bool,
  defaultValue: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    data: PropTypes.objectOf(PropTypes.any)
  }).isRequired,
  onCombinationChange: PropTypes.func.isRequired,
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      data: PropTypes.objectOf(PropTypes.any)
    })
  ).isRequired
};

CombinationsMenu.defaultProps = {
  isLoading: false
};

export default CombinationsMenu;
