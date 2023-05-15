import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { O11yCheckbox, O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { NOTIFICATION_TYPES } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

import {
  findAndUpdateUserNotificationTypePref,
  updateUsersToNotificationList
} from '../slices/notificationsSettings';

const TABLE_CLASSES = {
  ROW_CLASSES:
    'overflow-hidden border-b border-base-300 whitespace-normal classic-break-words'
};
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
          logOllyEvent({
            event: 'O11yProjectEmailNotificationsUsersChanged',
            data: {
              project_name: activeProject.name,
              project_id: activeProject.id,
              daily_summary_subscribed:
                payload.notificationType[NOTIFICATION_TYPES.dailySummary],
              daily_summary_removed:
                !payload.notificationType[NOTIFICATION_TYPES.dailySummary],
              build_insights_subscribed:
                payload.notificationType[NOTIFICATION_TYPES.buildInsights],
              build_insights_removed:
                !payload.notificationType[NOTIFICATION_TYPES.buildInsights]
            }
          });
        })
        .catch(() => {
          o11yNotify({
            title: 'Something went wrong',
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
      <O11yTableCell
        wrapperClassName={twClassNames(
          'font-medium text-base-900 border-l border-l-base-300',
          TABLE_CLASSES.ROW_CLASSES
        )}
      >
        <p className="text-sm font-medium">{user.fullName}</p>
        <p className="text-base-500 text-sm">{user.email}</p>
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          'text-center relative',
          TABLE_CLASSES.ROW_CLASSES
        )}
      >
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
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <O11yLoader
              wrapperClassName="flex-1"
              loaderClass="text-base-200 fill-base-400 w-6 h-6"
            />
          </div>
        )}
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          'text-center border-r border-r-base-300',
          TABLE_CLASSES.ROW_CLASSES
        )}
      >
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
