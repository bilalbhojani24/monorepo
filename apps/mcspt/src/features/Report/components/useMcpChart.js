import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { updateLatestSeekTimeInSeconds } from '../slices/reportSlice';

const useMcpChart = () => {
  const dispatch = useDispatch();

  const chartGridClicked = useCallback(
    (chartEvent) => {
      dispatch(
        updateLatestSeekTimeInSeconds(
          chartEvent?.xAxis?.[0]?.value || chartEvent?.point?.category
        )
      );
    },
    [dispatch]
  );

  return { chartGridClicked };
};

export default useMcpChart;
