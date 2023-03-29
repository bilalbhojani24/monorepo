import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineAdd } from '@browserstack/bifrost';
import {
  O11yButton,
  O11ySwitcher,
  O11yTable,
  O11yTableBody,
  O11yTableCell,
  O11yTableHead,
  O11yTableRow
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import O11yLoader from 'common/O11yLoader';
import { MODAL_TYPES } from 'constants/modalTypes';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

import NotificationRowItem from '../components/NotificationRowItem';
import SettingsCard from '../components/SettingsCard';
import {
  getNotificationDetailsData,
  toggleProjectNotificationStatus
} from '../slices/notificationsSettings';
import {
  getNotificationsStatus,
  getNotifiedUsersState
} from '../slices/selectors';

function NotificationsSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [switchingNotificationsStatus, setSwitchingNotificationsStatus] =
    useState(false);
  const status = useSelector(getNotificationsStatus);
  const activeProject = useSelector(getActiveProject);
  const notifiedUsers = useSelector(getNotifiedUsersState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeProject.normalisedName) {
      dispatch(
        getNotificationDetailsData({
          projectNormalisedName: activeProject.normalisedName
        })
      )
        .unwrap()
        .then((res) => {
          setNotificationsEnabled(res?.isNotificationsEnabled);
        });
    }
  }, [activeProject.normalisedName, dispatch]);

  const handleToggleNotificationsSwitch = () => {
    if (!switchingNotificationsStatus) {
      const currentStatus = notificationsEnabled;
      setNotificationsEnabled(!currentStatus);
      setSwitchingNotificationsStatus(true);
      dispatch(
        toggleProjectNotificationStatus({
          projectNormalisedName: activeProject.normalisedName,
          payload: {
            status: !notificationsEnabled
          }
        })
      )
        .unwrap()
        .then(() => {
          o11yNotify({
            title: 'Updated successfully',
            description: 'Notifications status toggled successfully',
            type: 'success'
          });
          logOllyEvent({
            event: 'O11yProjectEmailNotificationsToggled',
            data: {
              project_name: activeProject.name,
              project_id: activeProject.id,
              email_settings: !notificationsEnabled
            }
          });
        })
        .catch(() => {
          o11yNotify({
            title: 'Something went wrong!',
            description: 'Failed to toggle notification status',
            type: 'error'
          });
          setNotificationsEnabled(currentStatus);
        })
        .finally(() => {
          setSwitchingNotificationsStatus(false);
        });
    }
  };

  const handleClickAddUsers = () => {
    logOllyEvent({
      event: 'O11yProjectEmailNotificationsAddUsersClicked',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id,
        email_settings: notificationsEnabled
      }
    });
    dispatch(
      toggleModal({
        version: MODAL_TYPES.add_notifications_users
      })
    );
  };

  const areActionsDisabled = useMemo(
    () => !!(switchingNotificationsStatus || !notificationsEnabled),
    [notificationsEnabled, switchingNotificationsStatus]
  );

  if (status.isLoading) {
    return (
      <SettingsCard>
        <div className="m-auto flex h-72 w-72 flex-col items-center justify-center p-6">
          <O11yLoader
            wrapperClassName="flex-1"
            text="Fetching details..."
            textClass="text-sm"
          />
        </div>
      </SettingsCard>
    );
  }

  return (
    <SettingsCard>
      <section className="p-6">
        <div className="flex justify-between">
          <h1 className="flex flex-col">
            <span className="text-lg font-medium">Notifications</span>
            <span className="text-base-500 text-sm">
              Set up email notifications for this project.
            </span>
          </h1>
          <O11ySwitcher
            checked={notificationsEnabled}
            disabled={switchingNotificationsStatus}
            loading={switchingNotificationsStatus}
            onChange={handleToggleNotificationsSwitch}
          />
        </div>
        <div className="flex items-center justify-between pt-6">
          <p className="flex flex-col">
            <span className="text-sm font-medium">Email notifications</span>
            <span className="text-base-500 text-sm">
              Setup email addresses to receive notifications when builds events
              are triggered.
            </span>
          </p>
          <O11yButton
            icon={<MdOutlineAdd className="text-lg" />}
            onClick={handleClickAddUsers}
            disabled={!notificationsEnabled || switchingNotificationsStatus}
          >
            Add Users
          </O11yButton>
        </div>
        {!!notifiedUsers.length && (
          <div className="mt-6">
            <O11yTable containerWrapperClass="overflow-visible overflow-x-visible">
              <O11yTableHead wrapperClassName="bg-white sticky top-0">
                <O11yTableRow>
                  <O11yTableCell
                    wrapperClassName="md:rounded-lg w-2/5 text-base-900 font-medium py-3"
                    variant="header"
                  >
                    Username
                  </O11yTableCell>
                  <O11yTableCell
                    wrapperClassName="md:rounded-lg text-xs leading-4 font-medium tracking-wider uppercase text-base-500 text-center py-3"
                    variant="header"
                  >
                    Daily Summary
                  </O11yTableCell>
                  <O11yTableCell
                    wrapperClassName="md:rounded-lg text-xs leading-4 font-medium tracking-wider uppercase text-base-500 text-center py-3"
                    variant="header"
                  >
                    Build Insights
                  </O11yTableCell>
                </O11yTableRow>
              </O11yTableHead>
              <O11yTableBody>
                {notifiedUsers.map((user) => (
                  <NotificationRowItem
                    key={user.email}
                    user={user}
                    areActionsDisabled={areActionsDisabled}
                  />
                ))}
              </O11yTableBody>
            </O11yTable>
          </div>
        )}
      </section>
    </SettingsCard>
  );
}

export default NotificationsSettings;
