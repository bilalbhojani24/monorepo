import React from 'react';
import { useSelector } from 'react-redux';
import { MODAL_TYPES } from 'constants/modalTypes';
import AzureIntegrationModal from 'features/Integrations/components/AzureIntegrationModal';
import EmailPreferenceModal from 'features/Integrations/components/EmailPreferenceModal';
import JenkinsIntegrationModal from 'features/Integrations/components/JenkinsIntegrationModal';
import AddEditAlertModal from 'features/Settings/components/AddEditAlertModal';
import AddEditSubCategoryModal from 'features/Settings/components/AddEditSubCategoryModal';
import AddNotificationUserModal from 'features/Settings/components/AddNotificationUserModal';
import DeleteAlertModal from 'features/Settings/components/DeleteAlertModal';
import DeleteSubCatModal from 'features/Settings/components/DeleteSubCatModal';

import { getModalVersion } from '../slices/selectors';

export default function ModalToShow() {
  const modalToShow = useSelector(getModalVersion);
  switch (modalToShow) {
    case MODAL_TYPES.add_edit_alert:
      return <AddEditAlertModal />;
    case MODAL_TYPES.delete_alert:
      return <DeleteAlertModal />;
    case MODAL_TYPES.add_edit_sub_category:
      return <AddEditSubCategoryModal />;
    case MODAL_TYPES.delete_sub_cat:
      return <DeleteSubCatModal />;
    case MODAL_TYPES.add_notifications_users:
      return <AddNotificationUserModal />;
    case MODAL_TYPES.email_preference:
      return <EmailPreferenceModal />;
    case MODAL_TYPES.jenkins_connect_modal:
      return <JenkinsIntegrationModal />;
    case MODAL_TYPES.azure_connect_modal:
      return <AzureIntegrationModal />;
    default:
      return null;
  }
}
