import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchClusterDataById } from 'api/index';
import { AGClusterDetailsInteracted } from 'constants/event-names';
import { setClusterData } from 'features/GridConsole/slices';
import { getClustersData } from 'features/GridConsole/slices/selector';
import { getUserDetails } from 'globalSlice/selector';
import { logHSTEvent } from 'utils/logger';

const useLayoutClusterDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const { id: clusterId } = params;

  const userDetails = useSelector(getUserDetails);

  // All Store variables
  const clusterData = useSelector(getClustersData);

  // All State variables
  const [currentTab, setCurrentTab] = useState({
    index: 0,
    name: 'Overview'
  });

  const onTabChangeHandler = (e) => {
    logHSTEvent(['amplitude'], AGClusterDetailsInteracted, {
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

  useEffect(() => {
    navigate(
      `/grid-console/cluster/${clusterId}/${currentTab.name.toLowerCase()}`
    );
  }, [clusterId, currentTab]);

  return { clusterData, currentTab, onTabChangeHandler };
};

export default useLayoutClusterDetail;
