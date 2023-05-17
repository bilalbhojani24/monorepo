import React, { Fragment } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '../Icon';

import { ALERT_LINK_POSITION, ALERT_MODIFIER } from './const/alertConstants';

import './styles.scss';

const link = (
  alertLinkPosition,
  modifier,
  handleLinkClick,
  linkUrl,
  detailsNode
) => {
  if (detailsNode)
    return (
      <a
        href="/"
        className={twClassNames('h-fit', {
          'ml-1 underline': alertLinkPosition === ALERT_LINK_POSITION[0],
          'text-base-700 hover:text-base-600': modifier === ALERT_MODIFIER[0],
          'text-brand-700 hover:text-brand-600': modifier === ALERT_MODIFIER[1],
          'text-success-700 hover:text-success-600':
            modifier === ALERT_MODIFIER[2],
          'text-danger-700 hover:text-danger-600':
            modifier === ALERT_MODIFIER[3],
          'text-attention-700 hover:text-attention-600':
            modifier === ALERT_MODIFIER[4],
          'text-info-700 hover:text-info-600': modifier === ALERT_MODIFIER[5]
        })}
        onClick={(event) => {
          event.preventDefault();
          if (handleLinkClick) handleLinkClick(linkUrl);
        }}
      >
        <div className="inline-flex items-center text-sm">{detailsNode}</div>
      </a>
    );
  return null;
};

const Alerts = (props) => {
  const {
    alertIcon,
    accentBorder,
    alertLinkPosition,
    handleLinkClick,
    detailsNode,
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
    dismissButtonFn
  } = props;

  const iconClassTypes = twClassNames('h-5 w-5 ', {
    'text-base-400': modifier === ALERT_MODIFIER[0],
    'text-brand-400': modifier === ALERT_MODIFIER[1],
    'text-success-400': modifier === ALERT_MODIFIER[2],
    'text-danger-400': modifier === ALERT_MODIFIER[3],
    'text-attention-400': modifier === ALERT_MODIFIER[4],
    'text-info-700': modifier === ALERT_MODIFIER[5]
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
          className={twClassNames(`p-4`, {
            'rounded-md ': !accentBorder,

            'border-l-4 border-base-400':
              accentBorder && modifier === ALERT_MODIFIER[0],
            'border-l-4 border-brand-400':
              accentBorder && modifier === ALERT_MODIFIER[1],
            'border-l-4 border-success-400':
              accentBorder && modifier === ALERT_MODIFIER[2],
            'border-l-4 border-danger-400':
              accentBorder && modifier === ALERT_MODIFIER[3],
            'border-l-4 border-attention-400':
              accentBorder && modifier === ALERT_MODIFIER[4],
            'border-info-400 border-l-4':
              accentBorder && modifier === ALERT_MODIFIER[5],

            'bg-base-50': modifier === ALERT_MODIFIER[0],
            'bg-brand-50': modifier === ALERT_MODIFIER[1],
            'bg-success-50': modifier === ALERT_MODIFIER[2],
            'bg-danger-50': modifier === ALERT_MODIFIER[3],
            'bg-attention-50': modifier === ALERT_MODIFIER[4],
            'bg-info-50': modifier === ALERT_MODIFIER[5]
          })}
        >
          <div className="flex">
            <div className="shrink-0">
              {alertIcon || renderAlertIcon(modifier)}
            </div>
            <div className="ml-3 flex-1 items-end md:flex md:justify-between">
              <div className="w-full">
                {/* alert title */}

                {title?.length > 0 && (
                  <h3
                    className={twClassNames('text-sm font-medium', {
                      'text-base-800': modifier === ALERT_MODIFIER[0],
                      'text-brand-800': modifier === ALERT_MODIFIER[1],
                      'text-success-800': modifier === ALERT_MODIFIER[2],
                      'text-danger-800': modifier === ALERT_MODIFIER[3],
                      'text-attention-800': modifier === ALERT_MODIFIER[4],
                      'text-info-800': modifier === ALERT_MODIFIER[5]
                    })}
                  >
                    {title}
                  </h3>
                )}
                <span
                  className={twClassNames(
                    `flex items-end text-sm ${textColorClass}`,
                    {
                      'text-base-700': modifier === ALERT_MODIFIER[0],
                      'text-brand-700': modifier === ALERT_MODIFIER[1],
                      'text-success-700': modifier === ALERT_MODIFIER[2],
                      'text-danger-700': modifier === ALERT_MODIFIER[3],
                      'text-attention-700': modifier === ALERT_MODIFIER[4],
                      'text-info-700': modifier === ALERT_MODIFIER[5]
                    }
                  )}
                >
                  <div>
                    {/* alert description */}
                    {typeof description === 'object' ? (
                      <div className="mt-2 text-sm">
                        <ul className="list-disc space-y-1 pl-5">
                          {description?.map((descriptionItem) => (
                            <li key={descriptionItem}>{descriptionItem}</li>
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
                            className={twClassNames(
                              'rounded-md px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
                              {
                                'bg-base-50 text-base-800 hover:bg-base-100 focus:ring-base-600 focus:ring-offset-base-50':
                                  modifier === ALERT_MODIFIER[0],
                                'bg-brand-50 text-brand-800 hover:bg-brand-100 focus:ring-brand-600 focus:ring-offset-brand-50':
                                  modifier === ALERT_MODIFIER[1],
                                'bg-success-50 text-success-800 hover:bg-success-100 focus:ring-success-600 focus:ring-offset-success-50':
                                  modifier === ALERT_MODIFIER[2],
                                'bg-danger-50 text-danger-800 hover:bg-danger-100 focus:ring-danger-600 focus:ring-offset-danger-50':
                                  modifier === ALERT_MODIFIER[3],
                                'bg-attention-50 text-attention-800 hover:bg-attention-100 focus:ring-attention-600 focus:ring-offset-attention-50':
                                  modifier === ALERT_MODIFIER[4],
                                'bg-info-50 text-info-800 hover:bg-info-100 focus:ring-info-600 focus:ring-offset-info-50':
                                  modifier === ALERT_MODIFIER[5]
                              }
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
                            className={twClassNames(
                              'ml-3 rounded-md px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
                              {
                                'bg-base-50 text-base-800 hover:bg-base-100 focus:ring-base-600 focus:ring-offset-base-50':
                                  modifier === ALERT_MODIFIER[0],
                                'bg-brand-50 text-brand-800 hover:bg-brand-100 focus:ring-brand-600 focus:ring-offset-brand-50':
                                  modifier === ALERT_MODIFIER[1],
                                'bg-success-50 text-success-800 hover:bg-success-100 focus:ring-success-600 focus:ring-offset-success-50':
                                  modifier === ALERT_MODIFIER[2],
                                'bg-danger-50 text-danger-800 hover:bg-danger-100 focus:ring-danger-600 focus:ring-offset-danger-50':
                                  modifier === ALERT_MODIFIER[3],
                                'bg-attention-50 text-attention-800 hover:bg-attention-100 focus:ring-attention-600 focus:ring-offset-attention-50':
                                  modifier === ALERT_MODIFIER[4],
                                'bg-info-50 text-info-800 hover:bg-info-100 focus:ring-info-600 focus:ring-offset-info-50':
                                  modifier === ALERT_MODIFIER[5]
                              }
                            )}
                          >
                            {betaActionTitle}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {alertLinkPosition === ALERT_LINK_POSITION[0] &&
                    detailsNode &&
                    link(
                      alertLinkPosition,
                      modifier,
                      handleLinkClick,
                      linkUrl,
                      detailsNode
                    )}
                </span>
              </div>

              {alertLinkPosition === ALERT_LINK_POSITION[1] && detailsNode && (
                <p className="mt-3 h-fit text-sm md:ml-6 md:mt-0">
                  {link(
                    alertLinkPosition,
                    modifier,
                    handleLinkClick,
                    linkUrl,
                    detailsNode
                  )}
                </p>
              )}
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
                    className={twClassNames(
                      'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                      {
                        'bg-base-50 text-base-500 hover:bg-base-100 focus:ring-base-600 focus:ring-offset-base-50':
                          modifier === ALERT_MODIFIER[0],
                        'bg-brand-50 text-brand-500 hover:bg-brand-100 focus:ring-brand-600 focus:ring-offset-brand-50':
                          modifier === ALERT_MODIFIER[1],
                        'bg-success-50 text-success-500 hover:bg-success-100 focus:ring-success-600 focus:ring-offset-success-50':
                          modifier === ALERT_MODIFIER[2],
                        'bg-danger-50 text-danger-500 hover:bg-danger-100 focus:ring-danger-600 focus:ring-offset-danger-50':
                          modifier === ALERT_MODIFIER[3],
                        'bg-attention-50 text-attention-500 hover:bg-attention-100 focus:ring-attention-600 focus:ring-offset-attention-50':
                          modifier === ALERT_MODIFIER[4],
                        'bg-info-50 text-info-500 hover:bg-info-100 focus:ring-info-600 focus:ring-offset-info-50':
                          modifier === ALERT_MODIFIER[5]
                      }
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
  alertIcon: PropTypes.node,
  accentBorder: PropTypes.bool,
  alertLinkPosition: PropTypes.oneOf(Object.values(ALERT_LINK_POSITION)),
  handleLinkClick: PropTypes.func,
  detailsNode: PropTypes.node,
  linkUrl: PropTypes.string,
  show: PropTypes.bool,
  modifier: PropTypes.string,
  dismissButton: PropTypes.bool,
  enableActions: PropTypes.bool,
  alphaActionFn: PropTypes.func,
  betaActionFn: PropTypes.func,
  alphaActionTitle: PropTypes.string,
  betaActionTitle: PropTypes.string,
  description: (props, pName) => {
    const { propName, title } = props;
    if (typeof propName !== 'string' && title === '') {
      return new Error(
        `'${pName}' can only be of type 'String' if no value is assigned to 'title' prop.`
      );
    }
    return null;
  },
  title: (props, propName) => {
    const { title, dismissButton } = props;
    if (title && dismissButton) {
      return new Error(
        `'${propName}' prop and 'dismissButton' prop should not be passed together.`
      );
    }
    return null;
  },
  dismissButtonFn: PropTypes.func,
  textColorClass: PropTypes.string
};

Alerts.defaultProps = {
  alertIcon: null,
  accentBorder: false,
  alertLinkPosition: 'end',
  handleLinkClick: () => {},
  detailsNode: null,
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
  textColorClass: ''
};

export default Alerts;
