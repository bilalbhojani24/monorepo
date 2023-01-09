import { useDispatch, useSelector } from 'react-redux';

import { updateAllFolders } from '../slices/repositorySlice';

export default function useFolders() {
  const dispatch = useDispatch();
  const allFolders = useSelector((state) => state.repository.allFolders);

  const setAllFolders = (data) => {
    dispatch(updateAllFolders(data));
  };

  // const decrementCount = () => {
  //   dispatch(decrement());
  // };

  return { allFolders, setAllFolders };
}
