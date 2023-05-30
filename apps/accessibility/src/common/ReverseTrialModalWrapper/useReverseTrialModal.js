import { useDispatch, useSelector } from 'react-redux';
import { setModalShow } from 'features/Dashboard/slices/appSlice';
import {
  getModalName,
  getModalShow
} from 'features/Dashboard/slices/selectors';

export default function useReverseTrialModal() {
  const showModal = useSelector(getModalShow);
  const modalName = useSelector(getModalName);
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch(setModalShow(false));
  };

  return {
    showModal,
    handleModalClose,
    modalName
  };
}
