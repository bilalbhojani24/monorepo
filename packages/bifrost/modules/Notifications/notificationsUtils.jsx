import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { twClassNames } from '@browserstack/utils';
import { shape } from 'prop-types';

import { NotificationsContextData } from '../../shared/notificationsContext';

export const notify = (Layout, options) => {
  toast.custom(
    (toastData) => (
      <NotificationsContextData.Provider
        value={{
          toast: toastData
        }}
      >
        <div
          className={twClassNames(
            `w-full max-w-sm ${
              toastData.visible ? 'animate-enter' : 'animate-leave'
            } `,
            {
              'max-w-md': options.size === 'md',
              'max-w-lg': options.size === 'lg'
            }
          )}
        >
          {Layout}
        </div>
      </NotificationsContextData.Provider>
    ),
    {
      ...options,
      duration: !options.autoClose ? 2147483647 : options.duration,
      style: {
        display: 'block'
      }
    }
  );
};

notify.remove = toast.remove;
notify.dismiss = toast.dismiss;

export const NotificationsContainer = ({ containerStyle }) => (
  <Toaster
    position="top-right"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={containerStyle}
    toastOptions={{}}
  />
);

NotificationsContainer.propTypes = {
  containerStyle: shape({})
};

NotificationsContainer.defaultProps = {
  containerStyle: {}
};
