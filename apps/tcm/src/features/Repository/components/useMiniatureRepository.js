import { useEffect, useState } from 'react';
import {
  getTestCasesAPI,
  getTestCasesSearchFilterAPI
} from 'api/testcases.api';

const useMiniatureRepository = ({ projectId }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [metaPage, setMetaPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFoldersLoading, setIsFoldersLoading] = useState(true);
  const [isTestCasesLoading, setIsTestCasesLoading] = useState(true);
  const [isSearchFilterView, setIsSearchFilterView] = useState(false);
  const [filterOptions, setFilterOptions] = useState({});
  const [allTestCases, setAllTestCases] = useState(null);
  const [allFolders, setAllFolders] = useState(null);

  const onFoldersUpdate = (data) => {
    setAllFolders(data);

    if (isFoldersLoading) setIsFoldersLoading(false);

    if (!selectedFolder && data?.length) setSelectedFolder(data[0]);
  };

  const onFolderClick = (data) => {
    setCurrentPage(1);
    setSelectedFolder(data);
  };

  const fetchAllTestCases = () => {
    if (Object.keys(filterOptions).length > 0) {
      // search - filter
      setIsTestCasesLoading(true);
      setIsSearchFilterView(true);
      const filterOptionsFull =
        currentPage > 1 ? { ...filterOptions, p: currentPage } : filterOptions;
      getTestCasesSearchFilterAPI({
        projectId,
        props: filterOptionsFull
      }).then((res) => {
        const testCases = res.test_cases.map((item) => ({
          ...item,
          folders: res?.folders?.[item.id] || null
        }));
        setAllTestCases(testCases);
        setMetaPage(res.info);
        // (updateTestCasesListLoading(false));
        setIsTestCasesLoading(false);
      });
    } else if (selectedFolder?.id) {
      // normal test cases load
      setIsSearchFilterView(false);
      setIsTestCasesLoading(true);
      getTestCasesAPI({
        projectId,
        folderId: selectedFolder.id,
        page: currentPage
      })
        .then((res) => {
          setAllTestCases(res?.test_cases || []);
          setMetaPage(res.info);
          setIsTestCasesLoading(false);
        })
        .catch(() => {
          // if page error, reset p=1
        });
    } else {
      setIsSearchFilterView(false);
      setAllTestCases([]);
      setIsTestCasesLoading(false);
    }
  };

  const onPaginationClick = ({ p }) => {
    setCurrentPage(p || 1);
  };

  const onFilterChange = (params) => {
    setFilterOptions(params);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchAllTestCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolder, currentPage, filterOptions]);

  return {
    filterOptions,
    metaPage,
    isSearchFilterView,
    allTestCases,
    allFolders,
    isFoldersLoading,
    isTestCasesLoading,
    selectedFolder,
    onFoldersUpdate,
    onFolderClick,
    onPaginationClick,
    onFilterChange
  };
};

export default useMiniatureRepository;
