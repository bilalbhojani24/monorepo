import { useState } from 'react';

export default function useScanDetails() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabChangeHandler = (tab) => {
    setActiveTab(tab.name);
  };
  return {
    tabChangeHandler,
    activeTab
  };
}
