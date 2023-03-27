import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { O11yCheckbox, O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { NOTIFICATION_TYPES } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { o11yNotify } from 'utils/notification';

import {
  findAndUpdateUserNotificationTypePref,
  updateUsersToNotificationList
} from '../slices/notificationsSettings';

function NotificationRowItem({ user, areActionsDisabled }) {
  const activeProject = useSelector(getActiveProject);

  const [isSubmittingUpdates, setIsSubmittingUpdates] = useState(false);

  const dispatch = useDispatch();

  const handleChangeCheckbox = (e, type) => {
    if (!isSubmittingUpdates) {
      setIsSubmittingUpdates(true);
      const currentSettings = { ...user };
      const updatedUser = {
        ...user,
        notificationType: {
          ...user.notificationType,
          [type]: e.target.checked
        }
      };
      const payload = {
        userIds: [user.userId],
        notificationType: {
          ...user.notificationType,
          [type]: e.target.checked
        }
      };
      dispatch(findAndUpdateUserNotificationTypePref(updatedUser));
      dispatch(
        updateUsersToNotificationList({
          projectNormalisedName: activeProject.normalisedName,
          payload
        })
      )
        .unwrap()
        .then(() => {
          o11yNotify({
            title: 'Updated successfully',
            description: `Notification settings updated successfully for ${
              user.fullName || user.email
            }`,
            type: 'success'
          });
        })
        .catch(() => {
          o11yNotify({
            title: 'Something went wro',
            description: `There was a failure while updating notification settings for{' '}
            ${user.fullName || user.email}`,
            type: 'success'
          });

          dispatch(findAndUpdateUserNotificationTypePref(currentSettings));
        })
        .finally(() => {
          setIsSubmittingUpdates(false);
        });
    }
  };

  return (
    <O11yTableRow
      wrapperClassName={twClassNames('', {
        'bg-base-100 opacity-50': isSubmittingUpdates
      })}
    >
      <O11yTableCell wrapperClassName="font-medium text-base-900 break-words whitespace-normal">
        <p className="text-sm font-medium">{user.fullName}</p>
        <p className="text-base-500 text-sm">{user.email}</p>
      </O11yTableCell>
      <O11yTableCell wrapperClassName="text-center relative">
        <O11yCheckbox
          checked={user?.notificationType?.[NOTIFICATION_TYPES.dailySummary]}
          disabled={areActionsDisabled || isSubmittingUpdates}
          onChange={(status) =>
            handleChangeCheckbox(status, NOTIFICATION_TYPES.dailySummary)
          }
          border={false}
          wrapperClassName="flex justify-center"
        />
        {isSubmittingUpdates && (
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <O11yLoader
              wrapperClassName="flex-1"
              loaderClass="text-base-200 fill-base-400 w-6 h-6"
            />
          </div>
        )}
      </O11yTableCell>
      <O11yTableCell wrapperClassName="text-center">
        <O11yCheckbox
          checked={user?.notificationType?.[NOTIFICATION_TYPES.buildInsights]}
          disabled={areActionsDisabled || isSubmittingUpdates}
          onChange={(status) =>
            handleChangeCheckbox(status, NOTIFICATION_TYPES.buildInsights)
          }
          border={false}
          wrapperClassName="flex justify-center"
        />
      </O11yTableCell>
    </O11yTableRow>
  );
}

NotificationRowItem.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  areActionsDisabled: PropTypes.bool.isRequired
};

export default NotificationRowItem;
