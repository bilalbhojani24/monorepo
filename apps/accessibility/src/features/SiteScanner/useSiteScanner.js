import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logEvent } from '@browserstack/utils';
import cloneDeep from 'lodash/cloneDeep';

import { getUser } from '../Dashboard/slices/selectors';

import { getScanConfigs } from './slices/dataSlice';
import { getScanConfigData } from './slices/selector';

export default function useSiteScanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [scanConfigStateData, setScanConfigStateData] = useState({});
  const [rowMenuOpen, setRowMenuOpen] = useState(false);
  const [dataFilter, setDataFilter] = useState('allScans');
  const [preConfigData, setPreConfigData] = useState(false);
  const dispatch = useDispatch();
  const scanConfigsData = useSelector(getScanConfigData);
  const userInfo = useSelector(getUser);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getScanConfigs());
  }, [dispatch]);

  useEffect(() => {
    logEvent(['EDS'], 'accessibility_dashboard_web_events', 'OnWSHomepageView');
  }, []);

  useEffect(() => {
    if (scanConfigsData?.data) {
      setIsLoading(false);
      setScanConfigStateData(scanConfigsData);
    }
  }, [scanConfigsData]);

  const handleSearch = (e) => {
    if (scanConfigsData?.data?.scanConfigs) {
      const searchTerm = e.target.value.toLowerCase();
      const searchedResults = scanConfigsData?.data?.scanConfigs?.filter(
        (row) =>
          row.createdBy.name.toLowerCase().includes(searchTerm) ||
          row.name.toLowerCase().includes(searchTerm)
      );
      const completeInfoSet = {
        ...scanConfigsData,
        data: {
          scanConfigs: [...searchedResults]
        }
      };
      console.log(completeInfoSet, scanConfigsData);
      setScanConfigStateData(completeInfoSet);
    }
  };

  const handleSearchFilter = (e) => {
    /*
        TODO
    */
    if (e.id === 'yourScans') {
      console.log(userInfo);
      const filteredScanConfigData = cloneDeep(scanConfigStateData);
      filteredScanConfigData.data.scanConfigs =
        filteredScanConfigData.data.scanConfigs.filter(
          (item) => item.createdBy.id === userInfo.user_id
        );
      setScanConfigStateData(filteredScanConfigData);
    } else {
      setScanConfigStateData(scanConfigsData);
    }
    // switch (e.id) {
    //   case 'yourScans':
    //     break;
    //   default:
    //     setScanConfigStateData(scanConfigsData);
    //     break;
    // }
    setDataFilter(e.id);
  };

  return {
    scanConfigStateData,
    isLoading,
    handleSearch,
    rowMenuOpen,
    setRowMenuOpen,
    setPreConfigData,
    preConfigData,
    handleSearchFilter,
    dataFilter,
    setIsLoading,
    dispatch,
    userInfo
  };
}
