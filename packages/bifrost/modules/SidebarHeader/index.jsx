import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import SelectMenu from '../SelectMenu';

import './styles.scss';

const SidebarHeader = ({
  brandImage,
  brandImageClass,
  brandImageContainerClass,
  onDropdownValueChange,
  dropdownOptions,
  dropdownValue,
  dropdownDefaultValue
}) => (
  <>
    {brandImage?.length ? (
      <div
        className={twClassNames(
          'flex flex-shrink-0 items-center px-2',
          brandImageContainerClass
        )}
      >
        <img
          className={twClassNames('h-8 w-auto', brandImageClass)}
          src={brandImage}
          alt="sidebar-nav-icon"
        />
      </div>
    ) : null}

    {dropdownOptions.length ? (
      <div className="px-1">
        <SelectMenu
          options={dropdownOptions}
          value={dropdownValue || dropdownOptions[0]}
          defaultValue={dropdownDefaultValue}
          onChange={onDropdownValueChange}
        />
      </div>
    ) : null}
  </>
);

SidebarHeader.propTypes = {
  brandImage: PropTypes.string,
  brandImageClass: PropTypes.string,
  brandImageContainerClass: PropTypes.string,
  dropdownOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string,
      image: PropTypes.string
    })
  ),
  dropdownValue: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
    image: PropTypes.string
  }),
  dropdownDefaultValue: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
    image: PropTypes.string
  }),
  onDropdownValueChange: PropTypes.func
};

SidebarHeader.defaultProps = {
  brandImage: '',
  brandImageClass: '',
  brandImageContainerClass: '',
  dropdownValue: null,
  dropdownDefaultValue: null,
  dropdownOptions: [],
  onDropdownValueChange: () => {}
};

export default SidebarHeader;
