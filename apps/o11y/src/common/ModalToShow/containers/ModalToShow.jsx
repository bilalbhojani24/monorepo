import React from 'react';
import { useSelector } from 'react-redux';
import { MODAL_TYPES } from 'constants/modalTypes';
import AddEditAlertModal from 'features/Settings/components/AddEditAlertModal';
import AddEditSubCategoryModal from 'features/Settings/components/AddEditSubCategoryModal';
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
    default:
      return null;
  }
}