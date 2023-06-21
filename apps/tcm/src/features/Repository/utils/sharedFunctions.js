import {
  selectMenuValueMapper,
  updateQueryParamWOEvent
} from 'utils/helperFunctions';

export const formDataRetriever = (tagsArray, formData) => {
  const hasTagsButNoMeta = tagsArray.length === 0 && formData?.tags;
  const customFields = {};

  formData?.custom_fields?.forEach((item) => {
    customFields[item.id] = item.value;
  });

  return {
    ...formData,
    priority:
      typeof formData?.priority === 'object'
        ? formData?.priority?.id
        : formData?.priority,
    tags: hasTagsButNoMeta
      ? formData?.tags
      : tagsArray.filter((item) => formData?.tags.includes(item.value)),
    issues: selectMenuValueMapper(
      formData?.issues?.map((item) => item.jira_id)
    ),
    custom_fields: customFields,
    status:
      typeof formData?.priority === 'object'
        ? formData?.status?.id
        : formData?.status,
    case_type:
      typeof formData?.priority === 'object'
        ? formData?.case_type?.id
        : formData?.case_type
  };
};

export const mapFolderAncestorHelper = (ancestorsArray, folderId) => {
  let newContentObject = null;
  ancestorsArray?.forEach((item, iDx) => {
    const newItem = item;
    newItem.isOpened = true;
    if (iDx === 0) {
      // root folder
      newItem.contents = newItem.contents.map((thisItem) =>
        thisItem.id === parseInt(folderId, 10)
          ? { ...thisItem, isSelected: true }
          : thisItem
      );
    } else {
      newItem.contents = item.contents
        ? item.contents.map((internalItem) =>
            internalItem.id === newContentObject?.id
              ? newContentObject
              : internalItem
          )
        : newContentObject;
    }
    newItem.sub_folders_count = newItem?.contents?.length;
    newContentObject = newItem;
  });
  return newContentObject;
};

export const getFilterOptions = (thisParams) => {
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

export const getFormattedBEFilter = (filterOptions) => {
  const queryParams = {};
  Object.keys(filterOptions).forEach((key) => {
    const value = Array.isArray(filterOptions[key])
      ? filterOptions[key].join(',')
      : filterOptions[key];

    if (value) {
      queryParams[`q[${key === 'q' ? 'query' : key}]`] = value;
    }
  });

  return queryParams;
};

export const getExistingQueryParams = (searchParams) => {
  const currentPage = searchParams.get('p');
  const queryParams = getFormattedBEFilter(getFilterOptions(searchParams));
  if (currentPage) {
    queryParams.p = currentPage;
  }
  return queryParams;
};

export const getCalcQueryParams = (thisFilterSearchMeta) => {
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

  return { queryParams, searchParamsTemp };
};

export const updatePageQueryParamsWORefresh = (searchParams, fetchedPage) => {
  // to update the query parms with page without triggering a refresh

  const currentPage = searchParams.get('p');
  const { searchParamsTemp } = getCalcQueryParams(
    getFilterOptions(searchParams)
  );
  if (currentPage) {
    searchParamsTemp.p = currentPage;
  }

  if (`${fetchedPage}` !== currentPage) {
    if (currentPage === null && fetchedPage === 1) {
      // currently on first page and be on first page
    } else {
      updateQueryParamWOEvent({ ...searchParamsTemp, p: fetchedPage });
    }
  }
};

// export const handleScroll = (scrollRef, dispatch, setShowFreshChatButton) => {
//   const { scrollTop, clientHeight } = scrollRef.current;

//   if (scrollTop + clientHeight >= 1204) {
//     dispatch(setShowFreshChatButton(false));
//   } else {
//     dispatch(setShowFreshChatButton(true));
//   }
// };
