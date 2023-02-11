import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const tabsOptions = {
  SUMMARY: { name: 'Summary', id: 'SUMMARY', index: 0 },
  ALLISSUES: { name: 'All Issues', id: 'ALLISSUES', index: 1 },
  SCANLOGS: { name: 'Scan Logs', id: 'SCANLOGS', index: 2 }
};

export default function useScanReport() {
  const [activeTab, setActiveTab] = useState('summary');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const tab = searchParams.get('tab');
    setActiveTab(tab);
    setActiveTabIndex(tabsOptions[tab]?.index || 0);
  }, [searchParams]);
  const onTabChange = (tab) => {
    setActiveTab(tab.id);
    navigate({
      search: `?tab=${tab.id}`
    });
    setActiveTabIndex(tab.index);
  };

  return {
    activeTab,
    onTabChange,
    activeTabIndex,
    tabsOptions
  };
}
