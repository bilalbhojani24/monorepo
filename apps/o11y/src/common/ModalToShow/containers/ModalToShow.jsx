import React from 'react';
import { useSelector } from 'react-redux';
import { MODAL_TYPES } from 'constants/modalTypes';
import AddAlertModal from 'features/Settings/components/AddAlertModal';

import { getModalVersion } from '../slices/selectors';

export default function ModalToShow() {
  const modalToShow = useSelector(getModalVersion);
  switch (modalToShow) {
    case MODAL_TYPES.add_alert:
      return <AddAlertModal />;
    case MODAL_TYPES.edit_alert:
      return <>Edit Alert</>;
    default:
      return null;
  }
}
