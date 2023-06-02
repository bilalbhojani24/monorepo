import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllGridsData } from 'api/index';
import { setFetchedGridData } from 'globalSlice/index';
import { getUserDetails } from 'globalSlice/selector';

const useGridListing = () => {
  const dispatch = useDispatch();
  const isRounded = true;

  // All Store variables:
  const userDetails = useSelector(getUserDetails);

  // All State variables:
  const [gridList, setGridList] = useState([]);

  const tableCellWrapperClassName =
    'first:pr-3 last:pl-3 px-2 text-base-500 font-medium';

  useEffect(() => {
    const fetchAllGridsDataFromAPI = async () => {
      const res = await fetchAllGridsData(userDetails.id);

      setGridList(res.data);
      dispatch(setFetchedGridData(true));
    };

    fetchAllGridsDataFromAPI();
  }, [userDetails]);

  return {
    gridList,
    isRounded,
    tableCellWrapperClassName
  };
};

export { useGridListing };
