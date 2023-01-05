import React from 'react';
import classNames from 'classnames';
import { Disclosure } from '@headlessui/react';

const PrintIcon = ({ Icon, classes }) => <Icon className={classes} />;

const SidebarItem = ({
  active,
  activeClass,
  activeIconClass,
  handleNavigationClick,
  inActiveClass,
  inActiveIconClass,
  nav,
  index
}) => {
  const isCurrent = (currentNav, index) => `${index}__${currentNav.id}` === `${index}__${active?.id}`;

  return (
    <div key={`${index}__${nav.id}`}>
      {nav.childrens && nav.childrens.length ? (
        <Disclosure as="div" key={nav.label} className="space-y-1">
          {({ open }) => (
            <>
              <Disclosure.Button
                className={classNames(
                  `group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-base-600 hover:bg-base-50 hover:text-base-900 pl-2`,
                  {
                    [`bg-base-100 text-base-900 ${activeClass}`]: isCurrent(nav, index),
                    [`${inActiveClass}`]: !isCurrent(nav, index)
                  }
                )}
              >
                {nav.inActiveIcon && (
                  <PrintIcon
                    Icon={nav.inActiveIcon}
                    classes={classNames(
                      'mr-3 flex-shrink-0 h-6 w-6 text-base-400 group-hover:text-base-500',
                      inActiveIconClass
                    )}
                  />
                )}
                {nav.label}
                <svg
                  className={classNames(
                    open ? 'text-base-400 rotate-90' : 'text-base-300',
                    'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-base-400'
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
                    className="group flex w-full items-center rounded-md py-2 pl-10 pr-2 text-sm font-medium text-base-600 hover:bg-base-50 hover:text-base-900"
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
            [`border-l-4 bg-indigo-50 border-indigo-600 text-indigo-600 ${activeClass}`]: isCurrent(nav, index),
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
                'mr-3 flex-shrink-0 h-6 w-6 text-base-400 group-hover:text-base-500',
                inActiveIconClass
              )}
            />
          )}
          {nav.label}
          {nav.badgeLabel && !!nav.badgeLabel.length && (
            <span className="bg-base-100 group-hover:bg-base-200 ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full">
              {nav.badgeLabel}
            </span>
          )}
        </a>
      )}
    </div>
  );
};

export default SidebarItem;
