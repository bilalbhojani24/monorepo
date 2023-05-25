import { useState } from 'react';
import { fetchGridDataById } from 'api/index';

const useGridDetailById = () => {
  const [gridData, setGridData] = useState({});
  // loading state also needs to be added

  const fetchGridDataByIdFromAPI = async (gridId) => {
    const res = await fetchGridDataById(gridId);
    setGridData(res.data);
  };

  return { fetchGridDataByIdFromAPI, gridData };
};

export { useGridDetailById };
