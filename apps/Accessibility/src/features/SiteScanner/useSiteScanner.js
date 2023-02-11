import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getScanConfigs } from './slices/dataSlice';
import { getScanConfigData } from './slices/selector';

export default function useSiteScanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [scanConfigStateData, setScanConfigStateData] = useState({});
  const dispatch = useDispatch();
  const scanConfigsData = useSelector(getScanConfigData);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getScanConfigs());
  }, [dispatch]);

  useEffect(() => {
    if (scanConfigsData.data) {
      setIsLoading(false);
      setScanConfigStateData(scanConfigsData);
    }
  }, [scanConfigsData]);

  const handleSearch = (e) => {
    if (scanConfigsData?.data?.reports) {
      const searchTerm = e.target.value.toLowerCase();
      const searchedResults = scanConfigsData?.data?.reports.filter(
        (row) =>
          row.createdBy.name.toLowerCase().includes(searchTerm) ||
          row.name.toLowerCase().includes(searchTerm)
      );
      const completeInfoSet = {
        ...scanConfigsData,
        data: {
          reports: [...searchedResults]
        }
      };
      setScanConfigStateData(completeInfoSet);
    }
  };

  return {
    scanConfigStateData,
    isLoading,
    handleSearch
  };
}
