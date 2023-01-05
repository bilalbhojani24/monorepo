import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Bars3Icon, XMarkIcon } from '../Icon';
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
    wrapperClass
  } = props;
  const [active, setActive] = useState(primaryNavItems[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigationClick = (event, currentNav, parentNav = {}) => {
    event.preventDefault();
    handleClick(currentNav, parentNav);
    setActive(currentNav);
  };

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-base-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  {brandImage.length ? (
                    <div
                      className={classNames(
                        'flex flex-shrink-0 items-center space-y-5 px-4',
                        brandImageContainerClass,
                      )}
                    >
                      <img
                        className={classNames('h-8 w-auto', brandImageClass)}
                        src={brandImage}
                        alt="sidebar-nav-icon"
                      />
                    </div>
                  ) : null}

                  <nav className="mt-5 space-y-1 px-2">
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
                <div className="flex shrink-0 flex-col px-1">
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
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 shrink-0">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className={classNames('hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col py-2 ', wrapperClass)}>
        <div className="flex min-h-0 flex-1 flex-col border-r border-base-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pb-2">
            {brandImage.length ? (
              <div
                className={classNames(
                  'flex flex-shrink-0 items-center space-y-2 px-4',
                  brandImageContainerClass,
                )}
              >
                <img
                  className={classNames('h-8 w-auto', brandImageClass)}
                  src={brandImage}
                  alt="sidebar-nav-icon"
                />
              </div>
            ) : null}

            <nav className="mt-5 flex-1 space-y-2 bg-white px-2">
              {withSelect ? (
                <div className="mb-5">
                  <SelectMenu
                    options={selectOptions}
                    value={selectOptions[0]}
                  />
                </div>
              ) : null}

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
          <div className="flex shrink-0 flex-col px-1">
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
      </div>
      <div className="flex flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-base-500 hover:text-base-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
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
          path: PropTypes.string
        })
      )
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
          path: PropTypes.string
        })
      )
    })
  ),
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      image: PropTypes.string
    })
  ),
  withSelect: PropTypes.bool,
  wrapperClass: PropTypes.string
};
SidebarNavigation.defaultProps = {
  activeClass: '',
  activeIconClass: '',
  brandImage: '',
  brandImageContainerClass: '',
  brandImageClass: '',
  handleClick: () => {},
  inActiveClass: '',
  inActiveIconClass: '',
  primaryNavItems: [],
  secondaryNavItems: [],
  selectOptions: [],
  withSelect: false,
  wrapperClass: 'bg-white border-r border-base-200'
};

export default SidebarNavigation;
