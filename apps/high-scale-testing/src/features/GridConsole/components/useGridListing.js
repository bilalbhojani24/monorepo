import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllGridsData } from 'api/index';
import { getUserDetails } from 'globalSlice/selector';

const useGridListing = () => {
  // All Store variables:
  const userDetails = useSelector(getUserDetails);

  const [gridList, setGridList] = useState([]);

  const options = [
    { id: 'delete', body: 'Delete' },
    { id: 'settings', body: 'Settings' }
  ];
  const tableCellWrapperClassName =
    'first:pr-3 last:pl-3 px-2 text-base-500 font-medium';

  useEffect(() => {
    const fetchAllGridsDataFromAPI = async () => {
      const res = await fetchAllGridsData(userDetails.id);

      setGridList(res.data);

      // eslint-disable-next-line no-console
      console.log('Log: gridList:', gridList);
    };

    fetchAllGridsDataFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    gridList,
    options,
    tableCellWrapperClassName
  };
};

export { useGridListing };
