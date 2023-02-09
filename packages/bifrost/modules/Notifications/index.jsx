import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { NotificationsContextData } from '../../shared/notificationsContext';
import { XMarkIcon } from '../Icon';

import './styles.scss';

const Notifications = (props) => {
  const {
    actionButtons,
    description,
    isCondensed,
    handleClose,
    headerIcon,
    title
  } = props;

  const toastCtx = useContext(NotificationsContextData);

  return (
    <div className="pointer-events-auto flex w-full max-w-sm items-start rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5">
      <div className="shrink-0 ">
        {!isCondensed && headerIcon && headerIcon}
      </div>
      <div
        className={twClassNames('w-0 flex-1 pt-0.5', {
          'ml-3': !isCondensed
        })}
      >
        <p className="text-base-900 text-sm font-medium">{title}</p>
        {!isCondensed && (
          <p className="text-base-500 mt-1 text-sm">{description}</p>
        )}
        {!isCondensed && (
          <div className={twClassNames('mt-3 flex space-x-4')}>
            {actionButtons?.(toastCtx?.toast || null)}
          </div>
        )}
      </div>
      <div className="flex shrink-0">
        {isCondensed && actionButtons?.(toastCtx?.toast || null)}
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
    </div>
  );
};

Notifications.propTypes = {
  actionButtons: PropTypes.func,
  description: PropTypes.string,
  isCondensed: PropTypes.bool,
  handleClose: PropTypes.func,
  headerIcon: PropTypes.node,
  title: PropTypes.string
};

Notifications.defaultProps = {
  actionButtons: null,
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.',
  isCondensed: false,
  handleClose: () => {},
  headerIcon: null,
  title: 'Discussion moved'
};

export default Notifications;
