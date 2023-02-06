import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { getTestCasesSearchFilterAPI } from 'api/testcases.api';

import { setFilterSearchMeta } from '../slices/repositorySlice';

const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { projectId, folderId } = useParams();
  const [isFilterVisible, setFilter] = useState(false);
  const [ownersFilteredArray, setOwnersFilteredArray] = useState([]);
  const [tagsFilteredArray, setTagsFilteredArray] = useState([]);
  const [ownerSearchKey, setOwnerSearchKey] = useState('');
  const [tagSearchKey, setTagSearchKey] = useState('');

  const usersArray = useSelector((state) => state.repository.usersArray);
  const tagsArray = useSelector((state) => state.repository.tagsArray);
  const filterSearchMeta = useSelector(
    (state) => state.repository.filterSearchMeta
  );

  const updateFilterSearchMeta = (data) => {
    dispatch(setFilterSearchMeta(data));
  };

  const applyFilterHandler = () => {
    const queryParams = {};
    const searchParamsTemp = {};
    Object.keys(filterSearchMeta).forEach((key) => {
      const value = Array.isArray(filterSearchMeta[key])
        ? filterSearchMeta[key].join(',')
        : filterSearchMeta[key];

      queryParams[`q[${key}]`] = value;
      if (value) searchParamsTemp[key] = value;
    });

    setSearchParams(searchParamsTemp);
    getTestCasesSearchFilterAPI({
      projectId,
      folderId,
      props: filterSearchMeta
    }).then((res) => {
      debugger;
    });
    setFilter(false);
  };

  const filterChangeHandler = (filterType, data) => {
    const isSelected = filterSearchMeta?.[filterType]?.includes(data.value);
    if (isSelected) {
      updateFilterSearchMeta({
        ...filterSearchMeta,
        [filterType]: filterSearchMeta?.[filterType].filter(
          (item) => item !== data.value
        )
      });
    } else {
      updateFilterSearchMeta({
        ...filterSearchMeta,
        [filterType]: [...filterSearchMeta?.[filterType], data.value]
      });
    }
  };

  const searchChangeHandler = (e) => {
    updateFilterSearchMeta({
      ...filterSearchMeta,
      searchKey: e.currentTarget.value
    });
  };

  useEffect(() => {
    if (usersArray) {
      const searchKey = ownerSearchKey.toLowerCase();
      setOwnersFilteredArray(
        usersArray
          .filter((item) => item.full_name.toLowerCase().includes(searchKey))
          .map((item) => ({ value: item.id, label: item.full_name }))
      );
    } else setOwnersFilteredArray([]);
  }, [usersArray, ownerSearchKey]);

  useEffect(() => {
    if (tagsArray) {
      const searchKey = tagSearchKey.toLowerCase();
      setTagsFilteredArray(
        tagsArray.filter((item) => item.label.toLowerCase().includes(searchKey))
      );
    } else setTagsFilteredArray([]);
  }, [tagsArray, tagSearchKey]);

  return {
    tagsFilteredArray,
    ownersFilteredArray,
    tagsArray,
    filterSearchMeta,
    tagSearchKey,
    ownerSearchKey,
    isFilterVisible,
    setFilter,
    setOwnerSearchKey,
    setTagSearchKey,
    applyFilterHandler,
    filterChangeHandler,
    searchChangeHandler
  };
};

export default useFilter;
