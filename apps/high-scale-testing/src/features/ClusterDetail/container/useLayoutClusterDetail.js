import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { logEvent } from '@browserstack/utils';
import { fetchClusterDataById } from 'api/index';
import { AGClusterDetailsInteracted } from 'constants/event-names';
import { setClusterData } from 'features/GridConsole/slices';
import { getUserDetails } from 'globalSlice/selector';
import { getClusterData } from '../slices/selector';

const useLayoutClusterDetail = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const { id: clusterId } = params;

  const userDetails = useSelector(getUserDetails);

  // All Store variables
  const clusterData = useSelector(getClusterData);

  // All State variables
  const [currentTab, setCurrentTab] = useState({
    index: 0,
    name: 'Overview'
  });

  const onTabChangeHandler = (e) => {
    logEvent(['amplitude'], AGClusterDetailsInteracted, {
      action: 'tab_switched',
      option: e.name.toLowerCase()
    });
    setCurrentTab(e);
  };

  useEffect(() => {
    const fetchClusterDataByIdFromAPI = async (id) => {
      const res = await fetchClusterDataById(id, userDetails.id);
      dispatch(setClusterData({ clusterData: res.data }));
    };

    if (clusterId) fetchClusterDataByIdFromAPI(clusterId);
  }, [dispatch, clusterId, userDetails]);

  return { clusterData, currentTab, onTabChangeHandler };
};

export default useLayoutClusterDetail;
