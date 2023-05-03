import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuildData } from 'api/fetchTestAutomationData';

import { setBuildData } from './slices/dataSlice';
import { getBuildData } from './slices/selector';

export default function useAutomatedTestBuild() {
  // const [buildData, setBuildData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const dispatch = useDispatch();
  const buildData = useSelector(getBuildData);

  const onTabChange = (option, event) => {
    // event.preventDefault();
    console.log('option: ', option);
    setActiveTab(option.value);
    console.log('Hi');
  };
  // const [activeTab, setActiveTab] = useState();

  useEffect(() => {
    fetchBuildData().then((response) => dispatch(setBuildData(response)));
  }, []);

  const actionType = '';
  const eventName = 'Sample event name...';
  const issueSummary = {
    critical: 100,
    serious: 200,
    moderate: 300,
    minor: 400,
    issueCount: 1000
  };
  const onRowClick = () => {};
  return {
    activeTab,
    actionType,
    buildData,
    eventName,
    issueSummary,
    onRowClick,
    onTabChange
  };
}
