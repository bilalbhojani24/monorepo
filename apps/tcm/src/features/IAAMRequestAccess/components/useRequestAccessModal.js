import { useDispatch, useSelector } from 'react-redux';
import { addNotificaton } from 'globalSlice';

const useRequestAccessModal = () => {
  const dispatch = useDispatch();
  const requestAccessConfig = useSelector(
    (state) => state.global.requestAccessConfig
  );

  const handleRequestClick = () => {
    dispatch(addNotificaton(true));
  };

  const { isAdmin, userHasAccess, accessRequested } = requestAccessConfig;
  return { isAdmin, userHasAccess, accessRequested, handleRequestClick };
};

export default useRequestAccessModal;
