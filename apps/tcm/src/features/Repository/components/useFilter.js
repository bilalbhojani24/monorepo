import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTestCasesSearchFilterAPI } from 'api/testcases.api';

const useFilter = ({ onCancel }) => {
  const [filterSelections, setFilterSelections] = useState({
    owners: [],
    tags: [],
    priority: []
  });
  const [ownersFilteredArray, setOwnersFilteredArray] = useState([]);
  const [tagsFilteredArray, setTagsFilteredArray] = useState([]);

  const usersArray = useSelector((state) => state.repository.usersArray);
  const tagsArray = useSelector((state) => state.repository.tagsArray);

  const applyFilterHandler = () => {
    debugger;
    onCancel();
  };

  const filterChangeHandler = (filterType, data) => {
    const isSelected = filterSelections?.[filterType]?.includes(data.value);
    if (isSelected) {
      setFilterSelections({
        ...filterSelections,
        [filterType]: filterSelections?.[filterType].filter(
          (item) => item !== data.value
        )
      });
    } else {
      setFilterSelections({
        ...filterSelections,
        [filterType]: [...filterSelections?.[filterType], data.value]
      });
    }
  };

  useEffect(() => {
    if (usersArray)
      setOwnersFilteredArray(
        usersArray.map((item) => ({ value: item.id, label: item.full_name }))
      );
    else setOwnersFilteredArray([]);
  }, [usersArray]);

  useEffect(() => {
    if (tagsArray) setTagsFilteredArray(tagsArray);
    else setTagsFilteredArray([]);
  }, [tagsArray]);

  return {
    tagsFilteredArray,
    ownersFilteredArray,
    tagsArray,
    filterSelections,
    setFilterSelections,
    applyFilterHandler,
    filterChangeHandler
  };
};

export default useFilter;
