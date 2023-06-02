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
  setSearchEmptyText,
  setSearchInitiatedURL,
  updateAllTestCases,
  updateFoldersLoading,
  updateTestCasesListLoading
} from '../slices/repositorySlice';
import {
  getCalcQueryParams,
  getFilterOptions,
  getFormattedBEFilter
} from '../utils/sharedFunctions';

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
  const priorityOptions = useSelector(
    (state) => state.repository.priorityOptions
  );
  const priorityValueAndIntNameMapTC = useSelector(
    (state) => state.repository.priorityValueAndIntNameMapTC
  );
  const priorityValueAndNameMapTC = useSelector(
    (state) => state.repository.priorityValueAndNameMapTC
  );

  const updateFilterSearchMeta = (data) => {
    dispatch(setFilterSearchMeta(data));
  };

  const proceedWithLocalFilter = (searchParamsTemp) => {
    prop?.onFilterChange(searchParamsTemp);
    const count = [
      searchParamsTemp.tags,
      searchParamsTemp.owner,
      searchParamsTemp.priority
    ];
    setAppliedFiltersCount(count.filter((item) => item).length);
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
      // eslint-disable-next-line no-use-before-define
      applyFilterHandler({ q: filterSearchMeta?.q }, false, true);
    }

    if (prop?.onFilterChange) {
      prop?.onFilterChange({});
      setAppliedFiltersCount(0);
    }
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
      if (isSearchFilterView) {
        // if no filters selected and is currently in filter view, reset to test case view
        resetFilterAndSearch();
      }
      return;
    }

    if (isFilterInvoke) {
      // Filter apply clicked
      // only consider the filters in the redux state
      thisFilterSearchMeta = { ...workingMetaData, q: existingFilterOptions.q };
    } else if (isClearFitlers) {
      // clear filter button clicked
      // clear filter and maintain only existing search key
      thisFilterSearchMeta = { q: existingFilterOptions.q };
    } else {
      // serch enter clicked
      // only consider the search value in the redux state

      if (workingMetaData.q === '' && existingFilterOptions.q === '') return; // only consider empty search key to clear existing searchkey

      thisFilterSearchMeta = { ...existingFilterOptions, q: workingMetaData.q };
    }

    const { searchParamsTemp } = getCalcQueryParams(thisFilterSearchMeta);

    if (prop?.onFilterChange) {
      proceedWithLocalFilter(searchParamsTemp);
    } else {
      if (!isSearchFilterView) {
        // if initial filter/search cache the current URL;
        dispatch(setSearchInitiatedURL(location.pathname));
      }

      updateFilterSearchMeta({
        owner: [],
        tags: [],
        priority: [],
        q: '',
        ...thisFilterSearchMeta
      }); // reconfirm the redux states (happens when filter was updated but not applied and user goes to earch and change and hit (or other way around))
      navigate({
        pathname: routeFormatter(AppRoute.TEST_CASES_SEARCH, {
          projectId
        }),
        search: createSearchParams(searchParamsTemp).toString()
      });
    }
    setFilter(false);
  };

  const fetchFilteredCases = (filterOptions, page) => {
    const queryParams = getFormattedBEFilter(filterOptions);

    if (queryParams['q[query]']) {
      dispatch(
        logEventHelper('TM_TcSearchPageLoaded', {
          project_id: projectId,
          keyword: queryParams['q[query]']
        })
      );
    }

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

  const searchChangeHandler = (value) => {
    updateFilterSearchMeta({
      ...filterSearchMeta,
      q: value
    });
    if (!filterSearchMeta?.q)
      dispatch(setSearchInitiatedURL(location.pathname));
  };

  const setSearchErrorText = () => {
    const allKeys = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const key of searchParams.keys()) {
      allKeys.push(key);
    }
    if (allKeys.length === 1 && allKeys.includes('q')) {
      // only search is done
      dispatch(setSearchEmptyText('Try different keywords.'));
    } else {
      dispatch(setSearchEmptyText('Reset the filters or try again.'));
    }
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

      setSearchErrorText();
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
    priorityOptions,
    priorityValueAndNameMapTC,
    priorityValueAndIntNameMapTC,
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
