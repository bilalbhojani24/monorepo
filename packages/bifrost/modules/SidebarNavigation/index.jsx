import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { navs } from './const/sidebarNavigationConstants';
import { Disclosure } from '@headlessui/react';

import './styles.scss';

const PrintIcon = ({ Icon, classes }) => <Icon className={classes} />;

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
    navItems,
    wrapperClass
  } = props;
  const [active, setActive] = useState(navs[0]);

  const handleNavigationClick = (event, currentNav, parentNav = {}) => {
    event.preventDefault();
    handleClick(currentNav, parentNav);
    setActive(currentNav);
  };

  const isCurrent = (currentNav, index) => `${index}__${currentNav.id}` === `${index}__${active.id}`;

  return (
    <>
      <div className={classNames('flex flex-grow flex-col overflow-y-auto pt-5 pb-4 px-1', wrapperClass)}>
        <div className={classNames('flex flex-shrink-0 items-center space-y-5 px-4', brandImageContainerClass)}>
          <img className={classNames('h-8 w-auto', brandImageClass)} src={brandImage} alt="sidebar-nav-icon" />
        </div>
        <div className="mt-5 flex flex-grow flex-col">
          <nav className="flex-1 space-y-1 bg-white" aria-label="Sidebar">
            {navItems.map((nav, index) => (
              <div key={`${index}__${nav.id}`}>
                {nav.childrens && nav.childrens.length ? (
                  <Disclosure as="div" key={nav.label} className="space-y-1">
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={classNames(
                            `group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 pl-2`,
                            {
                              [`bg-gray-100 text-gray-900 ${activeClass}`]: isCurrent(nav, index),
                              [`${inActiveClass}`]: !isCurrent(nav, index)
                            }
                          )}
                        >
                          {nav.inActiveIcon && (
                            <PrintIcon
                              Icon={nav.inActiveIcon}
                              classes={classNames(
                                'mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500',
                                inActiveIconClass
                              )}
                            />
                          )}
                          {nav.label}
                          <svg
                            className={classNames(
                              open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                              'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400'
                            )}
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                          </svg>
                        </Disclosure.Button>
                        <Disclosure.Panel className="space-y-1">
                          {nav.childrens.map((subNav, subIndex) => (
                            <Disclosure.Button
                              key={`${index}__${subIndex}__${subNav.label}`}
                              as="a"
                              href={subNav.path}
                              className="group flex w-full items-center rounded-md py-2 pl-10 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              onClick={(e) => handleNavigationClick(e, subNav, nav)}
                            >
                              {subNav.label}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ) : (
                  <a
                    href={nav.path}
                    className={classNames(`group flex items-center px-3 py-2 text-sm font-medium`, {
                      [`border-l-4 bg-indigo-50 border-indigo-600 text-indigo-600 ${activeClass}`]: isCurrent(
                        nav,
                        index
                      ),
                      [`${inActiveClass}`]: !isCurrent(nav, index)
                    })}
                    onClick={(e) => handleNavigationClick(e, nav)}
                  >
                    {isCurrent(nav, index) ? (
                      <PrintIcon
                        Icon={nav.activeIcon}
                        classes={classNames('mr-3 flex-shrink-0 h-6 w-6 text-indigo-500', activeIconClass)}
                      />
                    ) : (
                      <PrintIcon
                        Icon={nav.inActiveIcon}
                        classes={classNames(
                          'mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500',
                          inActiveIconClass
                        )}
                      />
                    )}
                    {nav.label}
                    {nav.badgeLabel && !!nav.badgeLabel.length && (
                      <span className="bg-gray-100 group-hover:bg-gray-200 ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full">
                        {nav.badgeLabel}
                      </span>
                    )}
                  </a>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
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
  navItems: PropTypes.arrayOf(
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
          path: PropTypes.string
        })
      )
    })
  ),
  wrapperClass: PropTypes.string
};
SidebarNavigation.defaultProps = {
  activeClass: '',
  activeIconClass: '',
  brandImage: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
  brandImageContainerClass: '',
  brandImageClass: '',
  handleClick: () => {},
  inActiveClass: '',
  navItems: navs,
  wrapperClass: 'bg-white border-r border-gray-200'
};

export default SidebarNavigation;
