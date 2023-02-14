import { useEffect, useState } from 'react';
import { getTestCasesAPI } from 'api/testcases.api';

const useMiniatureRepository = ({ projectId }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [metaPage, setMetaPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFoldersLoading, setIsFoldersLoading] = useState(true);
  const [isTestCasesLoading, setIsTestCasesLoading] = useState(true);
  const [isSearchFilterView, setIsSearchFilterView] = useState(null);
  const [allTestCases, setAllTestCases] = useState(null);
  const [allFolders, setAllFolders] = useState(null);

  const onFoldersUpdate = (data) => {
    setAllFolders(data);

    if (isFoldersLoading) setIsFoldersLoading(false);

    if (!selectedFolder && data?.length) setSelectedFolder(data[0]);
  };

  const onFolderClick = (data) => {
    setSelectedFolder(data);
  };

  const fetchAllTestCases = () => {
    debugger;
    if (selectedFolder?.id) {
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
          // setSearchParams({});
        });
    } else {
      setAllTestCases([]);
      setIsTestCasesLoading(false);
    }
  };

  const onPaginationClick = ({ p }) => {
    setCurrentPage(p || 1);
  };

  useEffect(() => {
    fetchAllTestCases();
  }, [selectedFolder, currentPage]);

  return {
    metaPage,
    isSearchFilterView,
    allTestCases,
    allFolders,
    isFoldersLoading,
    isTestCasesLoading,
    selectedFolder,
    onFoldersUpdate,
    onFolderClick,
    onPaginationClick
  };
};

export default useMiniatureRepository;
