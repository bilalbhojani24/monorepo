import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '../Icon';

import { ALERT_LINK_POSITION, ALERT_MODIFIER } from './const/alertConstants';

import './styles.scss';

const link = (
  alertLinkPosition,
  modifier,
  handleLinkClick,
  linkUrl,
  linkText,
) => {
  if (linkText?.length > 0)
    return (
      <a
        href="/"
        className={classNames('h-fit', {
          'ml-1 underline': alertLinkPosition === ALERT_LINK_POSITION[0],
          'text-gray-700 hover:text-gray-600': modifier === ALERT_MODIFIER[0],
          'text-blue-700 hover:text-blue-600': modifier === ALERT_MODIFIER[1],
          'text-green-700 hover:text-green-600': modifier === ALERT_MODIFIER[2],
          'text-red-700 hover:text-red-600': modifier === ALERT_MODIFIER[3],
          'text-yellow-700 hover:text-yellow-600':
            modifier === ALERT_MODIFIER[4],
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
  return null;
};

const Alerts = (props) => {
  const {
    accentBorder,
    alertLinkPosition,
    handleLinkClick,
    linkText,
    linkUrl,
    show,
    description,
    textColorClass,
    modifier,
    title,
    enableActions,
    alphaActionFn,
    betaActionFn,
    alphaActionTitle,
    betaActionTitle,
    dismissButton,
    dismissButtonFn,
  } = props;

  const iconClassTypes = classNames('h-5 w-5 ', {
    'text-gray-400': modifier === ALERT_MODIFIER[0],
    'text-blue-400': modifier === ALERT_MODIFIER[1],
    'text-green-400': modifier === ALERT_MODIFIER[2],
    'text-red-400': modifier === ALERT_MODIFIER[3],
    'text-yellow-400': modifier === ALERT_MODIFIER[4],
  });

  const renderAlertIcon = (mod) => {
    switch (mod) {
      case ALERT_MODIFIER[2]:
        return (
          <CheckCircleIcon className={iconClassTypes} aria-hidden="true" />
        );
      case ALERT_MODIFIER[3]:
        return <XCircleIcon className={iconClassTypes} aria-hidden="true" />;
      case ALERT_MODIFIER[4]:
        return (
          <ExclamationTriangleIcon
            className={iconClassTypes}
            aria-hidden="true"
          />
        );
      default:
        return (
          <InformationCircleIcon
            className={iconClassTypes}
            aria-hidden="true"
          />
        );
    }
  };

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
          className={classNames(`p-4`, {
            'rounded-md ': !accentBorder,

            'border-l-4 border-gray-400':
              accentBorder && modifier === ALERT_MODIFIER[0],
            'border-l-4 border-blue-400':
              accentBorder && modifier === ALERT_MODIFIER[1],
            'border-l-4 border-green-400':
              accentBorder && modifier === ALERT_MODIFIER[2],
            'border-l-4 border-red-400':
              accentBorder && modifier === ALERT_MODIFIER[3],
            'border-l-4 border-yellow-400':
              accentBorder && modifier === ALERT_MODIFIER[4],

            'bg-gray-50': modifier === ALERT_MODIFIER[0],
            'bg-blue-50': modifier === ALERT_MODIFIER[1],
            'bg-green-50': modifier === ALERT_MODIFIER[2],
            'bg-red-50': modifier === ALERT_MODIFIER[3],
            'bg-yellow-50': modifier === ALERT_MODIFIER[4],
          })}
        >
          <div className="flex">
            <div className="shrink-0">{renderAlertIcon(modifier)}</div>
            <div className="ml-3 flex-1 items-end md:flex md:justify-between">
              <div>
                {/* alert title */}

                {title?.length > 0 && (
                  <h3
                    className={classNames('text-sm font-medium', {
                      'text-gray-800': modifier === ALERT_MODIFIER[0],
                      'text-blue-800': modifier === ALERT_MODIFIER[1],
                      'text-green-800': modifier === ALERT_MODIFIER[2],
                      'text-red-800': modifier === ALERT_MODIFIER[3],
                      'text-yellow-800': modifier === ALERT_MODIFIER[4],
                    })}
                  >
                    {title}
                  </h3>
                )}
                <span
                  className={classNames(
                    `flex items-end text-sm ${textColorClass}`,
                    {
                      'text-gray-700': modifier === ALERT_MODIFIER[0],
                      'text-blue-700': modifier === ALERT_MODIFIER[1],
                      'text-green-700': modifier === ALERT_MODIFIER[2],
                      'text-red-700': modifier === ALERT_MODIFIER[3],
                      'text-yellow-700': modifier === ALERT_MODIFIER[4],
                    },
                  )}
                >
                  <div>
                    {/* alert description */}
                    {typeof description === 'object' ? (
                      <div className="mt-2 text-sm">
                        <ul className="list-disc space-y-1 pl-5">
                          {description?.map((descriptionItem) => (
                            <li key={`${descriptionItem}`}>
                              {descriptionItem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p>{description} </p>
                    )}

                    {/* alert actions */}

                    {enableActions === true && (
                      <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              if (alphaActionFn) alphaActionFn();
                            }}
                            type="button"
                            className={classNames(
                              'rounded-md px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
                              {
                                'bg-gray-50 text-gray-800 hover:bg-gray-100 focus:ring-gray-600 focus:ring-offset-gray-50':
                                  modifier === ALERT_MODIFIER[0],
                                'bg-blue-50 text-blue-800 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50':
                                  modifier === ALERT_MODIFIER[1],
                                'bg-green-50 text-green-800 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50':
                                  modifier === ALERT_MODIFIER[2],
                                'bg-red-50 text-red-800 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50':
                                  modifier === ALERT_MODIFIER[3],
                                'bg-yellow-50 text-yellow-800 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50':
                                  modifier === ALERT_MODIFIER[4],
                              },
                            )}
                          >
                            {alphaActionTitle}
                          </button>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              if (betaActionFn) betaActionFn();
                            }}
                            className={classNames(
                              'ml-3 rounded-md px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
                              {
                                'bg-gray-50 text-gray-800 hover:bg-gray-100 focus:ring-gray-600 focus:ring-offset-gray-50':
                                  modifier === ALERT_MODIFIER[0],
                                'bg-blue-50 text-blue-800 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50':
                                  modifier === ALERT_MODIFIER[1],
                                'bg-green-50 text-green-800 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50':
                                  modifier === ALERT_MODIFIER[2],
                                'bg-red-50 text-red-800 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50':
                                  modifier === ALERT_MODIFIER[3],
                                'bg-yellow-50 text-yellow-800 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50':
                                  modifier === ALERT_MODIFIER[4],
                              },
                            )}
                          >
                            {betaActionTitle}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {alertLinkPosition === ALERT_LINK_POSITION[0] &&
                    link(
                      alertLinkPosition,
                      modifier,
                      handleLinkClick,
                      linkUrl,
                      linkText,
                    )}
                </span>
              </div>
              <p className="mt-3 h-fit text-sm md:mt-0 md:ml-6">
                {alertLinkPosition === ALERT_LINK_POSITION[1] &&
                  link(
                    alertLinkPosition,
                    modifier,
                    handleLinkClick,
                    linkUrl,
                    linkText,
                  )}
              </p>
            </div>

            {/* Dismiss alert */}
            {dismissButton === true && (
              <div className="ml-auto pl-3">
                <div className="-m-1.5">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      if (dismissButtonFn) dismissButtonFn();
                    }}
                    type="button"
                    className={classNames(
                      'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                      {
                        'bg-gray-50 text-gray-500 hover:bg-gray-100 focus:ring-gray-600 focus:ring-offset-gray-50':
                          modifier === ALERT_MODIFIER[0],
                        'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50':
                          modifier === ALERT_MODIFIER[1],
                        'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50':
                          modifier === ALERT_MODIFIER[2],
                        'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50':
                          modifier === ALERT_MODIFIER[3],
                        'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50':
                          modifier === ALERT_MODIFIER[4],
                      },
                    )}
                  >
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </>
  );
};

Alerts.propTypes = {
  accentBorder: PropTypes.bool,
  alertLinkPosition: PropTypes.oneOf(Object.values(ALERT_LINK_POSITION)),
  handleLinkClick: PropTypes.func,
  linkText: PropTypes.string,
  linkUrl: PropTypes.string,
  show: PropTypes.bool,
  modifier: PropTypes.string,
  dismissButton: PropTypes.bool,
  enableActions: PropTypes.bool,
  alphaActionFn: PropTypes.func,
  betaActionFn: PropTypes.func,
  alphaActionTitle: PropTypes.string,
  betaActionTitle: PropTypes.string,
  description: (props, propName) => {
    const { title } = props;
    if (typeof propName !== 'string' && title === '') {
      return new Error(
        `'${propName}' can only be of type 'String' if no value is assigned to 'title' prop.`,
      );
    }
    return null;
  },
  title: (props, propName) => {
    const { title, dismissButton } = props;
    if (title && dismissButton) {
      return new Error(
        `'${propName}' prop and 'dismissButton' prop should not be passed together.`,
      );
    }
    return null;
  },
  dismissButtonFn: PropTypes.func,
  textColorClass: PropTypes.string,
};

Alerts.defaultProps = {
  accentBorder: false,
  alertLinkPosition: 'end',
  handleLinkClick: () => {},
  linkText: 'Details',
  linkUrl: '/',
  show: true,
  description: '',
  modifier: ALERT_MODIFIER[0],
  title: '',
  enableActions: false,
  alphaActionFn: () => {},
  betaActionFn: () => {},
  alphaActionTitle: '',
  betaActionTitle: '',
  dismissButton: false,
  dismissButtonFn: () => {},
  textColorClass: '',
};

export default Alerts;
