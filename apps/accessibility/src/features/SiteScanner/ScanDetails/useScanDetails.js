import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import {
  runInstantScan,
  stopRecurringScans
} from '../../../api/siteScannerScanConfigs';
import { getUser } from '../../Dashboard/slices/selectors';
import {
  clearScanOverviewData,
  getScanOverview,
  getScanRuns
} from '../slices/dataSlice';
import {
  getScanOverviewData,
  getScanRunCommonData,
  getScanRunData
} from '../slices/selector';

const tabsOptions = {
  OVERVIEW: { name: 'Overview', id: 'OVERVIEW', index: 0 },
  SCANRUNS: { name: 'Scan runs', id: 'SCANRUNS', index: 1 }
};

export default function useScanDetails() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStopState, setloadingStopState] = useState(false);
  const dispatch = useDispatch();
  const scanRunData = useSelector(getScanRunData);
  const scanRunDataCommon = useSelector(getScanRunCommonData);
  const scanOverviewData = useSelector(getScanOverviewData);
  const userInfo = useSelector(getUser);
  const [showModal, setStopModal] = useState(false);
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  useEffect(() => {
    const tab = searchParams.get('tab') || tabsOptions.OVERVIEW.id;
    setActiveTab(tab);
    setActiveTabIndex(tabsOptions[tab]?.index || 0);
  }, [searchParams]);

  useEffect(() => {
    // const tab = searchParams.get('tab');
    setIsLoading(true);
    dispatch(clearScanOverviewData());
    dispatch(getScanOverview(id));
    dispatch(getScanRuns(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (scanRunData?.data) {
      setIsLoading(false);
    }
  }, [scanRunData]);

  const tabChangeHandler = (tab) => {
    setActiveTab(tab.id);
    navigate({
      search: `?tab=${tab.id}`
    });
    setActiveTabIndex(tab.index);
  };

  const handleNewScanRun = () => {
    runInstantScan(id)
      .then((data) => {
        navigate('/site-scanner');
        // alert('Stopped Recurring scan');
      })
      .catch((err) => console.log(err));
  };

  const handleStopRecurringScan = () => {
    setloadingStopState(true);
    stopRecurringScans(id)
      .then((data) => {
        setloadingStopState(false);
        navigate('/site-scanner');
        // alert('Stopped Recurring scan');
      })
      .catch((err) => console.log(err));
  };

  return {
    tabChangeHandler,
    activeTab,
    scanRunData,
    isLoading,
    scanRunDataCommon,
    scanOverviewData,
    activeTabIndex,
    handleNewScanRun,
    handleStopRecurringScan,
    setStopModal,
    showModal,
    loadingStopState,
    userInfo
  };
}
