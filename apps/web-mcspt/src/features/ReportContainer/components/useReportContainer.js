import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

import {
  getIsReportErrored,
  getIsReportLoading
} from '../slices/reportContainerSlice';
import { getReportData } from '../slices/reportContainerThunks';

const useReportContainer = () => {
  const isReportLoading = useSelector(getIsReportLoading);
  const isReportErrored = useSelector(getIsReportErrored);

  const [queryParams] = useSearchParams();

  const dispatch = useDispatch();

  const { reportId } = useParams();

  const openUrlInNewTab = (diagnosticUrl) => {
    window.open(diagnosticUrl, '_blank');
  };

  useEffect(() => {
    dispatch(getReportData(reportId, queryParams.get('auth_token')));
  }, [reportId, queryParams, dispatch]);

  return {
    isReportLoading,
    isReportErrored,
    openUrlInNewTab
  };
};

export default useReportContainer;
