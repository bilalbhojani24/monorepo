import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  checkForSampleReports,
  getSampleReports,
  nevigateToSampleReport
} from 'features/TestHistory';

const useSampleReports = () => {
  const sampleReports = useSelector(getSampleReports);

  const navigateToPath = useNavigate();

  const dispatch = useDispatch();

  const sampleReportSelected = (row) => {
    dispatch(nevigateToSampleReport(row?.uuid, navigateToPath));
  };

  useEffect(() => {
    dispatch(checkForSampleReports());
  }, [dispatch]);

  return {
    sampleReports,
    sampleReportSelected
  };
};

export default useSampleReports;
