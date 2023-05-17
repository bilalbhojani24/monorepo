import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppRoute from 'const/routes';

import { setCancelModal, setDetailsModal } from '../slices/importProgressSlice';

const useCancelModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const testTool = useSelector(
    (state) => state.import.currentTestManagementTool
  );

  const closeCancelModal = () => {
    dispatch(setCancelModal(false));
    dispatch(setDetailsModal(true));
  };

  const handleCancelQuickImport = () => {
    // we will have to make an api call and redirect to root page.
    // an api call to cancel the import
    dispatch(setCancelModal(false));
    navigate(AppRoute.ROOT);
  };

  return { closeCancelModal, handleCancelQuickImport, testTool };
};

export default useCancelModal;
