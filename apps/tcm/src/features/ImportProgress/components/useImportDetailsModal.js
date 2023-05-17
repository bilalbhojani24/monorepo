import { useDispatch, useSelector } from 'react-redux';

import { setCancelModal, setDetailsModal } from '../slices/importProgressSlice';

const useImportDetailsModal = () => {
  const dispatch = useDispatch();
  const importDetails = useSelector(
    (state) => state.importProgress.importDetails
  );

  const closeDetailsModal = () => {
    dispatch(setDetailsModal(false));
  };

  const cancelClickHandler = () => {
    dispatch(setCancelModal(true));
    dispatch(setDetailsModal(false));
  };
  return { closeDetailsModal, cancelClickHandler, importDetails };
};

export default useImportDetailsModal;
