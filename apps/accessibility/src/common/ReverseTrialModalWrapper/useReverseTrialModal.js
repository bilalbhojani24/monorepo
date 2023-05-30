import { useDispatch, useSelector } from 'react-redux';
import { setModalShow } from 'features/Dashboard/slices/appSlice';
import { getModalShow } from 'features/Dashboard/slices/selectors';

export default function useReverseTrialModal() {
  const showModal = useSelector(getModalShow);
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch(setModalShow(false));
  };

  return {
    showModal,
    handleModalClose
  };
}
