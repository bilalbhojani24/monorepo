import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import { getTestCasesSearchFilterAPI } from 'api/testcases.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import {
  setFilterSearchMeta,
  updateAllTestCases,
  updateFoldersLoading,
  updateTestCasesListLoading
} from '../slices/repositorySlice';

const useFilter = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [isFilterVisible, setFilter] = useState(false);
  const [ownersFilteredArray, setOwnersFilteredArray] = useState([]);
  const [tagsFilteredArray, setTagsFilteredArray] = useState([]);
  const [ownerSearchKey, setOwnerSearchKey] = useState('');
  const [tagSearchKey, setTagSearchKey] = useState('');
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);

  const usersArray = useSelector((state) => state.repository.usersArray);
  const tagsArray = useSelector((state) => state.repository.tagsArray);
  const filterSearchMeta = useSelector(
    (state) => state.repository.filterSearchMeta
  );
  const isSearchFilterView = useSelector(
    (state) => state.repository.isSearchFilterView
  );

  const updateFilterSearchMeta = (data) => {
    dispatch(setFilterSearchMeta(data));
  };

  const fetchFilteredCases = (filterOptions) => {
    const queryParams = {};
    Object.keys(filterOptions).forEach((key) => {
      const value = Array.isArray(filterOptions[key])
        ? filterOptions[key].join(',')
        : filterOptions[key];

      if (value) {
        if (key === 'q') {
          queryParams[`q[name]`] = value;
          queryParams[`q[identifier]`] = value;
        } else queryParams[`q[${key}]`] = value;
      }
    });

    if (Object.keys(queryParams).length) {
      dispatch(updateTestCasesListLoading(true));
      getTestCasesSearchFilterAPI({
        projectId,
        props: queryParams
      }).then((res) => {
        const testCases = res.test_cases.map((item) => ({
          ...item,
          folders: res?.folders?.[item.id] || null
        }));
        dispatch(updateAllTestCases(testCases));
        dispatch(updateTestCasesListLoading(false));
        dispatch(updateFoldersLoading(false));
      });
    }
  };

  const applyFilterHandler = () => {
    const queryParams = {};
    const searchParamsTemp = {};
    Object.keys(filterSearchMeta).forEach((key) => {
      const value = Array.isArray(filterSearchMeta[key])
        ? filterSearchMeta[key].join(',')
        : filterSearchMeta[key];

      if (value) {
        searchParamsTemp[key] = value;
        queryParams[`q[${key}]`] = value;
      }
    });

    navigate({
      pathname: routeFormatter(AppRoute.TEST_CASES_SEARCH, {
        projectId
      }),
      search: createSearchParams(searchParamsTemp).toString()
    });
    setFilter(false);
  };

  const filterChangeHandler = (filterType, data) => {
    const isSelected = filterSearchMeta?.[filterType]?.includes(
      `${data.value}`
    );
    if (isSelected) {
      updateFilterSearchMeta({
        ...filterSearchMeta,
        [filterType]: filterSearchMeta?.[filterType].filter(
          (item) => item !== `${data.value}`
        )
      });
    } else {
      updateFilterSearchMeta({
        ...filterSearchMeta,
        [filterType]: [...filterSearchMeta?.[filterType], `${data.value}`]
      });
    }
  };

  const searchChangeHandler = (e) => {
    updateFilterSearchMeta({
      ...filterSearchMeta,
      q: e.currentTarget.value
    });
  };

  useEffect(() => {
    const tags = searchParams.get('tags');
    const owner = searchParams.get('owner');
    const priority = searchParams.get('priority');
    const q = searchParams.get('q');
    const filterOptions = {
      tags: tags?.split(',') || [],
      owner: owner?.split(',') || [],
      priority: priority?.split(',') || [],
      q: q || ''
    };
    const count = [tags, owner, priority];
    setAppliedFiltersCount(count.filter((item) => item).length);
    updateFilterSearchMeta(filterOptions);
    fetchFilteredCases(filterOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
    appliedFiltersCount,
    projectId,
    isSearchFilterView,
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
