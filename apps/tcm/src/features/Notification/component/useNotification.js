import { useDispatch, useSelector } from 'react-redux';
import { removeNotificaton } from 'globalSlice';

const useNotification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.global.notification);

  const removeThisToast = (id) => {
    dispatch(removeNotificaton(id));
  };

  return { notification, removeThisToast };
};

export default useNotification;
