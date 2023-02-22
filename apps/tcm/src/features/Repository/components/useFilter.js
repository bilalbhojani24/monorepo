import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import { useOnClickOutside } from '@browserstack/hooks';
import { getTestCasesSearchFilterAPI } from 'api/testcases.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import {
  resetFilterSearchMeta,
  setFilterSearchMeta,
  setMetaPage,
  updateAllTestCases,
  updateFoldersLoading,
  updateTestCasesListLoading
} from '../slices/repositorySlice';

const useFilter = (prop) => {
  const navigate = useNavigate();
  const filterBoxRef = useRef();
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

  const resetFilterAndSearch = () => {
    // if no filter/search
    if (prop?.onFilterChange) {
      prop?.onFilterChange({});
      setAppliedFiltersCount(0);
    } else
      navigate({
        pathname: routeFormatter(AppRoute.TEST_CASES, {
          projectId
        })
      });
    dispatch(resetFilterSearchMeta());
  };

  const fetchFilteredCases = (filterOptions, page) => {
    const queryParams = {};
    Object.keys(filterOptions).forEach((key) => {
      const value = Array.isArray(filterOptions[key])
        ? filterOptions[key].join(',')
        : filterOptions[key];

      if (value) {
        if (key === 'q') {
          queryParams[`q[query]`] = value;
        } else queryParams[`q[${key}]`] = value;
      }
    });

    if (page) queryParams.p = page;

    if (Object.keys(queryParams).length) {
      dispatch(updateTestCasesListLoading(true));
      getTestCasesSearchFilterAPI({
        projectId,
        props: queryParams
      }).then((res) => {
        const testCases = res.test_cases.map((item) => ({
          ...item,
          folders: res?.folders?.[item.test_case_folder_id] || null
        }));

        dispatch(setMetaPage(res.info));
        dispatch(updateAllTestCases(testCases));
        dispatch(updateTestCasesListLoading(false));
        dispatch(updateFoldersLoading(false));
      });
    } else if (isSearchFilterView) resetFilterAndSearch();
  };

  const getFilterOptions = (thisParams) => {
    const tags = thisParams.get('tags');
    const owner = thisParams.get('owner');
    const priority = thisParams.get('priority');
    const q = thisParams.get('q');
    return {
      tags: tags?.split(',') || [],
      owner: owner?.split(',') || [],
      priority: priority?.split(',') || [],
      q: q || ''
    };
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

    if (prop?.onFilterChange) {
      prop?.onFilterChange(searchParamsTemp);
      const count = [
        searchParamsTemp.tags,
        searchParamsTemp.owner,
        searchParamsTemp.priority
      ];
      // updateFilterSearchMeta(filterOptions);
      setAppliedFiltersCount(count.filter((item) => item).length);
    } else {
      navigate({
        pathname: routeFormatter(AppRoute.TEST_CASES_SEARCH, {
          projectId
        }),
        search: createSearchParams(searchParamsTemp).toString()
      });
    }
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

  const searchChangeHandler = (value) => {
    updateFilterSearchMeta({
      ...filterSearchMeta,
      q: value
    });
  };

  useEffect(() => {
    if (isSearchFilterView) {
      const filterOptions = getFilterOptions(searchParams);

      const count = [
        filterOptions.tags,
        filterOptions.owner,
        filterOptions.priority
      ];

      updateFilterSearchMeta(filterOptions);
      setAppliedFiltersCount(count.filter((item) => item.length).length);
      fetchFilteredCases(filterOptions, searchParams?.get('p'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isSearchFilterView]);

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

  useOnClickOutside(filterBoxRef, () => {
    if (isFilterVisible) setFilter(false);
  });

  return {
    filterBoxRef,
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
    searchChangeHandler,
    resetFilterAndSearch
  };
};

export default useFilter;
