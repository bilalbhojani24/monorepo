import React from 'react';
import { useSelector } from 'react-redux';
import { MODAL_TYPES } from 'constants/modalTypes';
import AddEditAlertModal from 'features/Settings/components/AddEditAlertModal';
import AddEditSubCategoryModal from 'features/Settings/components/AddEditSubCategoryModal';
import DeleteAlertModal from 'features/Settings/components/DeleteAlertModal';
import DeleteSubCatModal from 'features/Settings/components/DeleteSubCatModal';
import BulkTaggingModal from 'features/TestList/components/BulkTaggingModal';
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
    case MODAL_TYPES.mute_unmute_test:
      return <MuteUnmuteTestModal />;
    case MODAL_TYPES.rerun_test_modal:
      return <RerunTestsModal />;
    case MODAL_TYPES.bulk_assign_issuetype:
      return <BulkTaggingModal />;
    default:
      return null;
  }
}
