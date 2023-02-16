import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setIsLoadingProps } from '../slices/testRunDetailsSlice';

export default function useTRTCFolders() {
  const { projectId, testRunId } = useParams();
  const dispatch = useDispatch();

  const isFoldersLoading = useSelector(
    (state) => state.testRunsDetails.isLoading.isFoldersLoading
  );
  const selectedFolder = useSelector(
    (state) => state.testRunsDetails.selectedFolder
  );

  const onFoldersUpdate = () => {
    dispatch(setIsLoadingProps({ key: 'isFoldersLoading', value: false }));
  };

  return {
    selectedFolder,
    isFoldersLoading,
    projectId,
    testRunId,
    onFoldersUpdate
  };
}
