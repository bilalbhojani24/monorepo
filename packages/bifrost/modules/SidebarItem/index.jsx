import React from 'react';
import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
  MODIFIER_CLASSNAMES,
  SIDEBAR_MODIFIER,
} from './const/sidebarItemConstants';

import './styles.scss';

const printIcon = (Icon, classes) => <Icon className={classes} />;

const SidebarItem = ({ current, handleNavigationClick, nav, modifier }) => {
  const handleClick = (event, currentNav, parentNav = {}) => {
    event.preventDefault();
    handleNavigationClick(currentNav, parentNav);
  };

  return (
    <>
      {nav ? (
        <div className="mt-1">
          {nav.childrens && nav.childrens.length ? (
            <Disclosure as="div" key={nav.label} className="space-y-1">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classNames(
                      `group flex w-full items-center justify-between rounded-md bg-white py-2 pr-2 pl-2 text-left text-sm text-base-600 hover:bg-base-50 hover:text-base-900`,
                      {
                        [MODIFIER_CLASSNAMES[modifier].activeItemClass]:
                          current,
                        [MODIFIER_CLASSNAMES[modifier].inActiveItemClass]:
                          !current,
                      },
                    )}
                  >
                    <div className="flex items-center">
                      {nav.inActiveIcon && (
                        <>
                          {printIcon(
                            nav.inActiveIcon,
                            classNames(
                              'mr-3 flex-shrink-0 h-6 w-6 text-base-400 group-hover:text-base-500',
                              MODIFIER_CLASSNAMES[modifier].inActiveIconClass,
                            ),
                          )}
                        </>
                      )}
                      {nav.label}
                    </div>

                    <svg
                      className={classNames(
                        open ? 'rotate-90 text-base-400' : 'text-base-300',
                        'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-base-400',
                      )}
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                    </svg>
                  </Disclosure.Button>
                  <Disclosure.Panel className="space-y-1">
                    {nav.childrens.map((subNav) => (
                      <Disclosure.Button
                        key={`${subNav.label}`}
                        as="a"
                        href={subNav.path}
                        className={classNames(
                          'group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-base-600',
                          {
                            [MODIFIER_CLASSNAMES[modifier].activeItemClass]:
                              current,
                            [MODIFIER_CLASSNAMES[modifier].inActiveItemClass]:
                              !current,
                          },
                        )}
                        onClick={(e) => handleClick(e, subNav, nav)}
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
              className={classNames(
                `group flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-base-600 hover:bg-base-50 hover:text-base-900`,
                {
                  [MODIFIER_CLASSNAMES[modifier].activeItemClass]: current,
                  [MODIFIER_CLASSNAMES[modifier].inActiveItemClass]: !current,
                },
              )}
              onClick={(e) => handleClick(e, nav)}
            >
              <div className="flex items-center">
                {current ? (
                  <>
                    {printIcon(
                      nav.activeIcon,
                      `mr-3 flex-shrink-0 ${MODIFIER_CLASSNAMES[modifier].activeIconClass}`,
                    )}
                  </>
                ) : (
                  <>
                    {printIcon(
                      nav.inActiveIcon,
                      `mr-3 flex-shrink-0  ${MODIFIER_CLASSNAMES[modifier].inActiveIconClass}`,
                    )}
                  </>
                )}
                {nav.label}
              </div>
              {nav.badge ? nav.badge : null}
            </a>
          )}
        </div>
      ) : null}
    </>
  );
};

SidebarItem.propTypes = {
  current: PropTypes.bool,
  handleNavigationClick: PropTypes.func,
  modifier: PropTypes.string,
  nav: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    path: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    activeIcon: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    inActiveIcon: PropTypes.object,
    badge: PropTypes.node,
    childrens: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        path: PropTypes.string,
      }),
    ),
  }),
};

SidebarItem.defaultProps = {
  current: false,
  handleNavigationClick: () => {},
  modifier: SIDEBAR_MODIFIER[0],
  nav: null,
};

export default SidebarItem;
