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
        <div>
          {nav.childrens && nav.childrens.length ? (
            <Disclosure as="div" key={nav.label} className="space-y-1">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classNames(
                      `group flex w-full items-center rounded-md bg-white py-2 pr-2 pl-2 text-left text-sm font-medium text-base-600 hover:bg-base-50 hover:text-base-900`,
                      {
                        [MODIFIER_CLASSNAMES[modifier].activeItemClass]:
                          current,
                        [MODIFIER_CLASSNAMES[modifier].inActiveItemClass]:
                          !current,
                      },
                    )}
                  >
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
                          'group flex w-full items-center rounded-md py-2 pl-10 pr-2 text-sm font-medium text-base-600',
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
                `group flex items-center rounded-md px-2 py-2 text-sm font-medium`,
                {
                  [MODIFIER_CLASSNAMES[modifier].activeItemClass]: current,
                  [MODIFIER_CLASSNAMES[modifier].inActiveItemClass]: !current,
                },
              )}
              onClick={(e) => handleClick(e, nav)}
            >
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
              {nav.badgeLabel && !!nav.badgeLabel.length && (
                <span
                  className={classNames(
                    'ml-3 inline-block rounded-full bg-base-100 py-0.5 px-3 text-xs font-medium group-hover:bg-base-200',
                    {
                      'bg-brand-700 text-white group-hover:bg-brand-200':
                        modifier === SIDEBAR_MODIFIER[1],
                    },
                  )}
                >
                  {nav.badgeLabel}
                </span>
              )}
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
    activeIcon: PropTypes.object,
    inActiveIcon: PropTypes.object,
    badgeLabel: PropTypes.string,
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
