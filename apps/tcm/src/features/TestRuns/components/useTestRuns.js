import { useDispatch, useSelector } from 'react-redux';

import { setAddTestRunsModalVisibility } from '../slices/testRunsSlice';

const useTestRunss = () => {
  const dispatch = useDispatch();
  const activeTestRunss = [];
  const showAddModal = useSelector(
    (state) => state.testRuns.showAddTestRunsModal,
  );

  const addingTestRuns = () => {
    dispatch(setAddTestRunsModalVisibility(true));
  };

  return {
    activeTestRunss,
    showAddModal,
    addingTestRuns,
  };
};

export default useTestRunss;
