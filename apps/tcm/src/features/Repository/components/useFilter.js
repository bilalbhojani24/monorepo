import { useState } from 'react';
import { useSelector } from 'react-redux';

const useFilter = () => {
  const [isFilterVisible, setFilter] = useState(false);
  const [filterSelections, setFilterSelections] = useState({});
  const [ownersFilteredArray, setOwnersFilteredArray] = useState([]);
  const [tagsFilteredArray, setTagsFilteredArray] = useState([]);

  const usersArray = useSelector((state) => state.repository.usersArray);
  const tagsArray = useSelector((state) => state.repository.tagsArray);

  const applyFilterHandler = () => {
    debugger;
  };

  return {
    ownersFilteredArray,
    tagsArray,
    filterSelections,
    setFilterSelections,
    applyFilterHandler
  };
};

export default useFilter;
