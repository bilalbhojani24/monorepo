import { useEffect, useState } from 'react';
import { fetchBuildData } from 'api/fetchTestAutomationData';

export default function useAutomatedTestBuild() {
  const [buildData, setBuildData] = useState([]);

  useEffect(() => {
    fetchBuildData().then((response) => setBuildData(response));
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
    actionType,
    buildData,
    eventName,
    issueSummary,
    onRowClick
  };
}
