import React from 'react';
import { useSelector } from 'react-redux';
import { MODAL_TYPES } from 'constants/modalTypes';
import BulkTaggingModal from 'features/BulkTagging';
import AzureIntegrationModal from 'features/Integrations/components/AzureIntegrationModal';
import EmailPreferenceModal from 'features/Integrations/components/EmailPreferenceModal';
import JenkinsIntegrationModal from 'features/Integrations/components/JenkinsIntegrationModal';
import AddEditAlertModal from 'features/Settings/components/AddEditAlertModal';
import AddEditSubCategoryModal from 'features/Settings/components/AddEditSubCategoryModal';
import AddNotificationUserModal from 'features/Settings/components/AddNotificationUserModal';
import DeleteAlertModal from 'features/Settings/components/DeleteAlertModal';
import DeleteSubCatModal from 'features/Settings/components/DeleteSubCatModal';
import MuteUnmuteTestModal from 'features/TestList/components/MuteUnmuteTestModal';
import RerunTestsModal from 'features/TestList/components/RerunTestModal';

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
    case MODAL_TYPES.mute_unmute_test:
      return <MuteUnmuteTestModal />;
    case MODAL_TYPES.rerun_test_modal:
      return <RerunTestsModal />;
    case MODAL_TYPES.bulk_assign_issuetype:
      return <BulkTaggingModal />;
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
