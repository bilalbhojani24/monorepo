import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdSubdirectoryArrowLeft } from '@browserstack/bifrost';
import {
  O11yBadge,
  O11yButton,
  O11yCheckbox,
  O11yInputField,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { EMAIL_VERIFICATION_REGEX, NOTIFICATION_TYPES } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';
import uniqBy from 'lodash/uniqBy';
import { logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

import {
  getValidEmailsData,
  updateNotifiedUsers,
  updateUsersToNotificationList
} from '../slices/notificationsSettings';

function AddNotificationUserModal() {
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [emailInputText, setEmailInputText] = useState('');
  const [selectedNotificationTypes, setSelectedNotificationTypes] = useState({
    [NOTIFICATION_TYPES.dailySummary]: true,
    [NOTIFICATION_TYPES.buildInsights]: true
  });
  const [isCheckingMails, setIsCheckingMails] = useState(false);
  const [validUserMails, setValidUserMails] = useState([]);
  const [nonProductUsers, setNonProductUsers] = useState([]);
  const [inputErrorText, setInputErrorText] = useState('');
  const activeProject = useSelector(getActiveProject);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };

  const handleSubmit = () => {
    const payload = {
      notificationType: {
        ...selectedNotificationTypes
      },
      userIds: validUserMails.map((user) => user.userId)
    };
    setIsSubmittingData(true);
    dispatch(
      updateUsersToNotificationList({
        projectNormalisedName: activeProject.normalisedName,
        payload
      })
    )
      .unwrap()
      .then(() => {
        o11yNotify({
          type: 'success',
          title: 'Updated notification list successfully'
        });
        dispatch(
          updateNotifiedUsers(
            validUserMails.map((user) => ({
              ...user,
              notificationType: {
                ...selectedNotificationTypes
              }
            }))
          )
        );
        logOllyEvent({
          event: 'O11yProjectEmailNotificationsUsersChanged',
          data: {
            project_name: activeProject.name,
            project_id: activeProject.id,
            users_added: validUserMails.length,
            daily_summary_subscribed:
              selectedNotificationTypes[NOTIFICATION_TYPES.dailySummary],
            daily_summary_removed:
              !selectedNotificationTypes[NOTIFICATION_TYPES.dailySummary],
            build_insights_subscribed:
              selectedNotificationTypes[NOTIFICATION_TYPES.buildInsights],
            build_insights_removed:
              !selectedNotificationTypes[NOTIFICATION_TYPES.buildInsights]
          }
        });
        handleCloseModal();
      })
      .catch(() => {
        o11yNotify({
          type: 'error',
          title: 'Failed to add to notification list'
        });
      })
      .finally(() => {
        setIsSubmittingData(false);
      });
  };

  const handleEmailTextChange = ({ target: { value } }) => {
    setEmailInputText(value?.toLowerCase());
  };

  const handleEmailsSubmit = () => {
    const emails = emailInputText.split(',');
    const validEmails = [];
    emails.forEach((emailId) => {
      if (EMAIL_VERIFICATION_REGEX.test(emailId.trim())) {
        validEmails.push(emailId.trim());
      }
    });
    if (validEmails.length > 0) {
      setInputErrorText('');
      setIsCheckingMails(true);
      dispatch(
        getValidEmailsData({
          projectNormalisedName: activeProject.normalisedName,
          payload: {
            emails: validEmails
          }
        })
      )
        .unwrap()
        .then((res) => {
          if (res?.data?.length) {
            const nonUserEmails = validEmails.filter(
              (mail) => !res.data.find((user) => user.email === mail)
            );
            const updatedValidUserMails = [...validUserMails, ...res.data];
            setValidUserMails(uniqBy(updatedValidUserMails, 'email'));
            const updatedNonProductUsers = [
              ...nonProductUsers,
              ...nonUserEmails.map((mail) => ({
                email: mail,
                fullName: '',
                isNonUser: true
              }))
            ];
            setNonProductUsers(uniqBy(updatedNonProductUsers, 'email'));
          } else {
            const updatedNonProductUsers = [
              ...nonProductUsers,
              ...validEmails.map((mail) => ({
                email: mail,
                fullName: '',
                isNonUser: true
              }))
            ];
            setNonProductUsers(uniqBy(updatedNonProductUsers, 'email'));
          }
          setEmailInputText('');
        })
        .finally(() => {
          setIsCheckingMails(false);
        });
    } else {
      setInputErrorText('Please enter valid email addresses');
    }
  };

  const handleKeyDownOnInput = (e) => {
    if (e.key === 'Enter') {
      handleEmailsSubmit();
    }
  };

  const handleToggleNotificationTypes = (status, type) => {
    setSelectedNotificationTypes({
      ...selectedNotificationTypes,
      [type]: status
    });
  };

  const handleRemoveValidEmails = (email) => {
    setValidUserMails((prev) => prev.filter((user) => user.email !== email));
  };

  const handleRemoveNonUserEmails = (email) => {
    setNonProductUsers((prev) => prev.filter((user) => user.email !== email));
  };

  const isValid = useMemo(() => {
    if (
      !selectedNotificationTypes[NOTIFICATION_TYPES.dailySummary] &&
      !selectedNotificationTypes[NOTIFICATION_TYPES.buildInsights]
    ) {
      return false;
    }
    return !!validUserMails.length;
  }, [validUserMails, selectedNotificationTypes]);
  return (
    <O11yModal show size="xl" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading="Add email notification"
        handleDismissClick={handleCloseModal}
      />
      <O11yModalBody>
        <p className="mb-2.5 text-sm font-medium">Notification Type</p>
        <O11yCheckbox
          data={{
            label: 'Daily Summary',
            description:
              'Get notified daily of all builds ran through out the day.'
          }}
          description="block"
          border={false}
          wrapperClassName="mb-4"
          checked={selectedNotificationTypes[NOTIFICATION_TYPES.dailySummary]}
          onChange={(e) =>
            handleToggleNotificationTypes(
              e.target.checked,
              NOTIFICATION_TYPES.dailySummary
            )
          }
        />
        <O11yCheckbox
          data={{
            label: 'Build Insights',
            description:
              'Get notified about build insight on every build finish.'
          }}
          description="block"
          border={false}
          checked={selectedNotificationTypes[NOTIFICATION_TYPES.buildInsights]}
          onChange={(e) =>
            handleToggleNotificationTypes(
              e.target.checked,
              NOTIFICATION_TYPES.buildInsights
            )
          }
        />
        <div className="mt-4 flex items-start gap-4">
          <div className="flex-1">
            <O11yInputField
              label="Email address"
              isMandatory
              placeholder="Enter comma separated email addresses"
              trailingIcon={
                <MdSubdirectoryArrowLeft className="text-base-400" />
              }
              value={emailInputText}
              errorText={inputErrorText}
              onChange={handleEmailTextChange}
              onKeyDown={handleKeyDownOnInput}
            />
          </div>
          <O11yButton
            wrapperClassName="mt-6 py-2"
            variant="primary"
            colors="white"
            loading={isCheckingMails}
            isIconOnlyButton={isCheckingMails}
          >
            Add
          </O11yButton>
        </div>
        {(!!validUserMails?.length || !!nonProductUsers.length) && (
          <div className="mt-4 flex items-start gap-4">
            <p className="shrink-0 text-sm font-medium">
              Selected Users ({validUserMails.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {validUserMails.map((user) => (
                <O11yBadge
                  text={user.fullName || user.email}
                  key={user.email}
                  onClose={() => handleRemoveValidEmails(user.email)}
                  hasRemoveButton
                />
              ))}
              {nonProductUsers.map((user) => (
                <O11yBadge
                  text={user.email}
                  key={user.email}
                  modifier="error"
                  onClose={() => handleRemoveNonUserEmails(user.email)}
                  hasRemoveButton
                />
              ))}
            </div>
          </div>
        )}
      </O11yModalBody>
      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton
          disabled={!isValid}
          loading={isSubmittingData}
          isIconOnlyButton={isSubmittingData}
          onClick={handleSubmit}
          type="submit"
        >
          Confirm
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default AddNotificationUserModal;
