import { useSelector } from 'react-redux';

import { getBuildMetaData } from '../../slices/selector';

export default function useOverview() {
  const buildMetaData = useSelector(getBuildMetaData);
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
    buildMetaData,
    eventName,
    issueSummary,
    onRowClick
  };
}
