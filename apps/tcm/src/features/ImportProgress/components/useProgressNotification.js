import { useDispatch, useSelector } from 'react-redux';

import { setShowNotification } from '../slices/importProgressSlice';

const useProgressNotification = () => {
  const dispatch = useDispatch();
  const showNotification = useSelector(
    (state) => state.importProgress.showNotification
  );

  const removeNotification = (toastData, notify) => {
    dispatch(setShowNotification(false));
    notify.remove(toastData.id);
  };

  return { showNotification, removeNotification };
};

export default useProgressNotification;
