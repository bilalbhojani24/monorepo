import { useSelector } from 'react-redux';

import { getTestMetaData } from '../../slices/selector';

export default function useOverview() {
  const testMetaData = useSelector(getTestMetaData);
  const actionType = '';
  const eventName = 'Sample event name...';

  const onRowClick = () => {};
  return {
    actionType,
    testMetaData,
    eventName,
    onRowClick
  };
}
