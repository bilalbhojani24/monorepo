import { useDispatch, useSelector } from 'react-redux';
import { folderPropertyUpdater } from 'utils/folderHelpers';

import { setAllFolders } from '../../slices/repositorySlice';

const useUpdateTCCountInFolders = () => {
  const dispatch = useDispatch();
  const allFolders = useSelector((state) => state.repository?.allFolders);

  const setAllFoldersHelper = (data) => {
    dispatch(setAllFolders(data));
  };

  const updateTCCount = ({ casesObj }) => {
    if (!casesObj) return;

    let newFoldersArray = [...allFolders];
    Object.keys(casesObj).forEach((key) => {
      newFoldersArray = folderPropertyUpdater(
        newFoldersArray,
        key,
        'cases_count',
        casesObj[key]
      );
    });

    setAllFoldersHelper(newFoldersArray);
  };

  return { updateTCCount };
};

export default useUpdateTCCountInFolders;
