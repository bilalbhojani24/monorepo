import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import { useOnClickOutside } from '@browserstack/hooks';
import { getTestCasesSearchFilterAPI } from 'api/testcases.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import {
  resetFilterMeta,
  resetFilterSearchMeta,
  setFilterSearchMeta,
  setMetaPage,
  setSearchInitiatedURL,
  updateAllTestCases,
  updateFoldersLoading,
  updateTestCasesListLoading
} from '../slices/repositorySlice';

const useFilter = (prop) => {
  const location = useLocation();
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
  const userData = useSelector((state) => state.global.user);
  const updatedMySelfLabelName = `Myself (${userData?.full_name})`;

  const usersArray = useSelector((state) => state.repository.usersArray);
  const searchInitiatedFromURL = useSelector(
    (state) => state.repository.searchInitiatedFromURL
  );
  const tagsArray = useSelector((state) => state.repository.tagsArray);
  const isSearchFilterDoneOnce = useSelector(
    (state) => state.repository.isSearchFilterDoneOnce
  );
  const filterSearchMeta = useSelector(
    (state) => state.repository.filterSearchMeta
  );
  const isSearchFilterView = useSelector(
    (state) => state.repository.isSearchFilterView
  );

  const updateFilterSearchMeta = (data) => {
    dispatch(setFilterSearchMeta(data));
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

  const applyFilterHandler = (metaData, isFilterInvoke, isClearFitlers) => {
    let thisFilterSearchMeta = {};
    const workingMetaData = metaData || filterSearchMeta;
    const existingFilterOptions = { ...getFilterOptions(searchParams) };

    if (
      isFilterInvoke &&
      !Object.values({ ...workingMetaData, q: '' }).find((item) => item.length)
    ) {
      // if not filter values then do not continue
      return;
    }

    if (isFilterInvoke) {
      // only consider the filters in the redux state
      thisFilterSearchMeta = { ...workingMetaData, q: existingFilterOptions.q };
    } else {
      // only consider the search value in the redux state
      thisFilterSearchMeta = isClearFitlers
        ? { q: workingMetaData.q }
        : { ...existingFilterOptions, q: workingMetaData.q };
    }

    const queryParams = {};
    const searchParamsTemp = {};
    Object.keys(thisFilterSearchMeta).forEach((key) => {
      const value = Array.isArray(thisFilterSearchMeta[key])
        ? thisFilterSearchMeta[key].join(',')
        : thisFilterSearchMeta[key];

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
      setAppliedFiltersCount(count.filter((item) => item).length);
    } else {
      if (!isSearchFilterView) {
        // if initial filter/search cache the current URL;
        dispatch(setSearchInitiatedURL(location.pathname));
      }

      navigate({
        pathname: routeFormatter(AppRoute.TEST_CASES_SEARCH, {
          projectId
        }),
        search: createSearchParams(searchParamsTemp).toString()
      });
    }
    setFilter(false);
  };

  const resetFilterAndSearch = (forceClearAll) => {
    if (forceClearAll) {
      // clear search and filter
      dispatch(resetFilterSearchMeta());
      navigate({
        pathname:
          searchInitiatedFromURL ||
          routeFormatter(AppRoute.TEST_CASES, {
            projectId
          })
      });
    } else {
      // clear only filter
      dispatch(resetFilterMeta());
      applyFilterHandler({ q: filterSearchMeta?.q }, false, true);
    }

    if (prop?.onFilterChange) {
      prop?.onFilterChange({});
      setAppliedFiltersCount(0);
    }
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
          dispatch(
            logEventHelper('TM_TcSearchPageLoaded', {
              project_id: projectId,
              keyword: value
            })
          );
        } else queryParams[`q[${key}]`] = value;
      }
    });

    if (page) queryParams.p = page;

    if (Object.keys(queryParams).length) {
      dispatch(updateTestCasesListLoading(true));
      getTestCasesSearchFilterAPI({
        projectId,
        props: queryParams
      })
        .then((res) => {
          const testCases = res.test_cases.map((item) => ({
            ...item,
            folders: res?.folders?.[item.test_case_folder_id] || null
          }));

          dispatch(setMetaPage(res.info));
          dispatch(updateAllTestCases(testCases));
          dispatch(updateTestCasesListLoading(false));
          dispatch(updateFoldersLoading(false));
        })
        .catch(() => {
          dispatch(updateTestCasesListLoading(false));
          dispatch(updateFoldersLoading(false));
        });
    } else if (isSearchFilterView) resetFilterAndSearch(true);
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

      const filters = [
        filterOptions.tags,
        filterOptions.owner,
        filterOptions.priority
      ];
      const filtersCount = filters.filter((item) => item.length).length;

      if (!isSearchFilterDoneOnce) {
        // only set this for the initial page load with filters from URL
        // why? else search without filter set will casuse loss in store values
        updateFilterSearchMeta(filterOptions);
      }
      setAppliedFiltersCount(filtersCount);

      if (filtersCount)
        dispatch(
          logEventHelper('TM_ApplyFiltersBtnClicked', {
            project_id: projectId,
            tags: filterOptions.tags,
            owner: filterOptions.owner,
            priority: filterOptions.priority
          })
        );

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
          .map((item) => {
            if (item.full_name === 'Myself') {
              return {
                label: updatedMySelfLabelName,
                value: item.id
              };
            }
            return { value: item.id, label: item.full_name };
          })
      );
    } else setOwnersFilteredArray([]);
  }, [usersArray, ownerSearchKey, updatedMySelfLabelName]);

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
