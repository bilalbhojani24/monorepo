import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchClusterDataById } from 'api/index';
import { setClusterData } from 'features/GridConsole/slices';
import { getUserDetails } from 'globalSlice/selector';

const useLayoutClusterDetail = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const { id: clusterId } = params;

  const userDetails = useSelector(getUserDetails);

  // All State variables
  const [currentTab, setCurrentTab] = useState({
    index: 0,
    name: 'Overview'
  });

  useEffect(() => {
    const fetchClusterDataByIdFromAPI = async (id) => {
      const res = await fetchClusterDataById(id, userDetails.id);
      dispatch(setClusterData({ clusterData: res.data }));
    };

    if (clusterId) fetchClusterDataByIdFromAPI(clusterId);
  }, [dispatch, clusterId, userDetails]);

  return { setCurrentTab, currentTab };
};

export default useLayoutClusterDetail;
