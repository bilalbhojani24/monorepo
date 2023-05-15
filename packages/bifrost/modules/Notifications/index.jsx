import React, { forwardRef, useContext, useEffect } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { NotificationsContextData } from '../../shared/notificationsContext';
import { XMarkIcon } from '../Icon';

const Notifications = forwardRef((props, ref) => {
  const {
    actionButtons,
    body,
    bodyClassName,
    description,
    footer,
    footerClassName,
    isCondensed,
    handleClose,
    headerIcon,
    title
  } = props;

  const toastCtx = useContext(NotificationsContextData);

  useEffect(() => {
    if (ref && ref.current !== null) ref.current.focus();
  }, [ref]);

  console.log(title);
  console.log(body);

  return (
    <div
      className={twClassNames(
        'pointer-events-auto rounded-lg bg-white shadow-lg ring-1 ring-black/5'
      )}
    >
      <div className="flex w-full items-start p-4 ">
        {!isCondensed && headerIcon && (
          <div className="mr-3 shrink-0">{headerIcon}</div>
        )}

        <div className={twClassNames('w-0 flex-1 pt-0.5')}>
          <p className="text-base-900 line-clamp-2 break-words text-sm font-medium">
            {title} Tiel
          </p>

          {!isCondensed && description && (
            <p className="text-base-500 mt-1 break-keep text-sm">
              {description}
            </p>
          )}

          {!isCondensed && actionButtons && (
            <div className={twClassNames('mt-3 flex space-x-3')}>
              {actionButtons?.(toastCtx?.toast || null)}
            </div>
          )}
        </div>

        {isCondensed && actionButtons && (
          <div className="ml-3 flex shrink-0">
            {actionButtons?.(toastCtx?.toast || null)}
          </div>
        )}

        <button
          type="button"
          className="text-base-400 hover:text-base-500 focus:ring-brand-500 ml-4 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={() => {
            if (handleClose) handleClose(toastCtx?.toast || null);
          }}
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {body && (
        <div
          className={twClassNames(
            'p-4 ',
            {
              'rounded-md': !footer
            },
            bodyClassName
          )}
        >
          {body}
        </div>
      )}
      {footer && (
        <div className={twClassNames('p-4 rounded-b-md', footerClassName)}>
          {footer}
        </div>
      )}
    </div>
  );
});

Notifications.propTypes = {
  actionButtons: PropTypes.func,
  body: PropTypes.node,
  bodyClassName: PropTypes.string,
  description: PropTypes.string,
  footer: PropTypes.node,
  footerClassName: PropTypes.string,
  isCondensed: PropTypes.bool,
  handleClose: PropTypes.func,
  headerIcon: PropTypes.node,
  title: PropTypes.string
};

Notifications.defaultProps = {
  actionButtons: null,
  body: null,
  bodyClassName: '',
  footer: null,
  footerClassName: '',
  description: '',
  isCondensed: false,
  handleClose: () => {},
  headerIcon: null,
  title: ''
};

export default Notifications;
