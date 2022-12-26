import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import { ALERT_LINK_POSITION } from './const/alertConstants';
import { InformationCircleIcon } from '../Icon';

import './styles.scss';

const abc = 'asdasd';

const link = (alertLinkPosition, linkClass, handleLinkClick, linkUrl, linkText) => {
  return (
    <a
      href="/"
      className={classNames('', linkClass, {
        'underline ml-1': alertLinkPosition === ALERT_LINK_POSITION.inline,
      })}
      onClick={(event) => {
        event.preventDefault();
        if (handleLinkClick) handleLinkClick(linkUrl);
      }}
    >
      {linkText}
      <span aria-hidden="true"> &rarr;</span>
    </a>
  );
};

const Alerts = (props) => {
  const {
    accentBorder,
    AlertIcon,
    alertIconClassName,
    alertLinkPosition,
    handleLinkClick,
    linkClass,
    linkText,
    linkUrl,
    show,
    text,
    textColorClass,
    wrapperClass,
  } = props;

  return (
    <>
      <Transition
        show={show}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={classNames(
            `p-4`,
            {
              'border-l-4': accentBorder,
              'rounded-md ': !accentBorder,
            },
            wrapperClass
          )}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertIcon className={classNames('h-5 w-5 ', alertIconClassName)} aria-hidden="true" />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className={classNames(`text-sm ${textColorClass}`)}>
                {text}
                {alertLinkPosition === ALERT_LINK_POSITION.inline &&
                  link(alertLinkPosition, linkClass, handleLinkClick, linkUrl, linkText)}
              </p>
              <p className="mt-3 text-sm md:mt-0 md:ml-6">
                {alertLinkPosition === ALERT_LINK_POSITION.end &&
                  link(alertLinkPosition, linkClass, handleLinkClick, linkUrl, linkText)}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

Alerts.propTypes = {
  accentBorder: PropTypes.bool,
  AlertIcon: PropTypes.elementType,
  alertIconClassName: PropTypes.string,
  alertLinkPosition: PropTypes.oneOf(Object.values(ALERT_LINK_POSITION)),
  handleLinkClick: PropTypes.func,
  linkClass: PropTypes.string,
  linkText: PropTypes.string,
  linkUrl: PropTypes.string,
  show: PropTypes.bool,
  text: PropTypes.string,
  textColorClass: PropTypes.string,
  wrapperClass: PropTypes.string,
};
Alerts.defaultProps = {
  accentBorder: false,
  AlertIcon: InformationCircleIcon,
  alertIconClassName: 'text-yellow-400',
  alertLinkPosition: 'end',
  handleLinkClick: () => {},
  linkClass: 'text-yellow-700 hover:text-yellow-600',
  linkText: 'Details',
  linkUrl: '/',
  show: true,
  text: 'A new software update is available. See what’s new in version 2.0.4.',
  textColorClass: 'text-yellow-700',
  wrapperClass: 'border-yellow-400 bg-yellow-50',
};

export default Alerts;
