import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { shape } from 'prop-types';

import { NotificationsContextData } from '../../shared/notificationsContext';

export const notify = (Layout, options) =>
  toast.custom(
    (toastData) => (
      <NotificationsContextData.Provider
        value={{
          toast: toastData
        }}
      >
        <div
          className={`w-full max-w-sm ${
            toastData.visible ? 'animate-enter' : 'animate-leave'
          } `}
        >
          {Layout}
        </div>
      </NotificationsContextData.Provider>
    ),
    { ...options, duration: options.autoClose ? 2147483647 : options.duration }
  );

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
