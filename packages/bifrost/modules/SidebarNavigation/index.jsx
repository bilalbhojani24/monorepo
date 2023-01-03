import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SelectMenu from '../SelectMenu';
import SidebarItem from './component/SidebarItem';

import './styles.scss';

const SidebarNavigation = (props) => {
  const {
    activeClass,
    activeIconClass,
    brandImage,
    brandImageContainerClass,
    brandImageClass,
    handleClick,
    inActiveClass,
    inActiveIconClass,
    primaryNavItems,
    secondaryNavItems,
    selectOptions,
    withSelect,
    wrapperClass,
  } = props;
  const [active, setActive] = useState(primaryNavItems[0]);

  const handleNavigationClick = (event, currentNav, parentNav = {}) => {
    event.preventDefault();
    handleClick(currentNav, parentNav);
    setActive(currentNav);
  };

  return (
    <div className={classNames('flex flex-col overflow-y-auto pt-5 pb-4 px-1', wrapperClass)}>
      {!!brandImage.length ? (
        <div className={classNames('flex flex-shrink-0 items-center space-y-5 px-4', brandImageContainerClass)}>
          <img className={classNames('h-8 w-auto', brandImageClass)} src={brandImage} alt="sidebar-nav-icon" />
        </div>
      ) : null}

      {withSelect ? <SelectMenu options={selectOptions} value={selectOptions[0]} /> : null}

      <div className="mt-5 flex flex-grow flex-col">
        <nav className="flex-1 space-y-1 bg-white" aria-label="Sidebar">
          {primaryNavItems.map((nav, index) => (
            <SidebarItem
              active={active}
              activeClass={activeClass}
              activeIconClass={activeIconClass}
              handleNavigationClick={handleNavigationClick}
              inActiveClass={inActiveClass}
              inActiveIconClass={inActiveIconClass}
              index={index}
              nav={nav}
            />
          ))}
        </nav>
      </div>
      <div className="flex  flex-col flex-shrink-0">
        {secondaryNavItems.map((nav, index) => (
          <SidebarItem
            active={active}
            activeClass={activeClass}
            activeIconClass={activeIconClass}
            handleNavigationClick={handleNavigationClick}
            inActiveClass={inActiveClass}
            inActiveIconClass={inActiveIconClass}
            nav={nav}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

SidebarNavigation.propTypes = {
  activeClass: PropTypes.string,
  activeIconClass: PropTypes.string,
  brandImage: PropTypes.string,
  brandImageContainerClass: PropTypes.string,
  brandImageClass: PropTypes.string,
  handleClick: PropTypes.func,
  inActiveClass: PropTypes.string,
  inActiveIconClass: PropTypes.string,
  primaryNavItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      path: PropTypes.string,
      activeIcon: PropTypes.object,
      inActiveIcon: PropTypes.object,
      badgeLabel: PropTypes.string,
      childrens: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          label: PropTypes.string,
          path: PropTypes.string,
        })
      ),
    })
  ),
  secondaryNavItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      path: PropTypes.string,
      activeIcon: PropTypes.object,
      inActiveIcon: PropTypes.object,
      badgeLabel: PropTypes.string,
      childrens: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          label: PropTypes.string,
          path: PropTypes.string,
        })
      ),
    })
  ),
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      image: PropTypes.string,
    })
  ),
  withSelect: PropTypes.bool,
  wrapperClass: PropTypes.string,
};
SidebarNavigation.defaultProps = {
  activeClass: '',
  activeIconClass: '',
  brandImage: '',
  brandImageContainerClass: '',
  brandImageClass: '',
  handleClick: () => {},
  inActiveClass: '',
  primaryNavItems: [],
  secondaryNavItems: [],
  selectOptions: [],
  withSelect: false,
  wrapperClass: 'bg-white border-r border-gray-200',
};

export default SidebarNavigation;
