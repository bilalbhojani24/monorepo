import { useState, useEffect } from 'react';

const usePagination = (tableList, initialLimitValue) => {
  const [list, setList] = useState(() => tableList);
  const [pageSize, setPageSize] = useState(initialLimitValue);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    if (!tableList.length) {
      setPageNumber(0);
      setList([]);
    } else {
      const startIndex = pageNumber * pageSize;
      const endIndex = startIndex + pageSize;
      const newList = tableList.slice(startIndex, endIndex);
      if (!newList.length) {
        setPageNumber(0);
      } else {
        setList(newList);
      }
    }
  }, [pageNumber, pageSize, tableList]);

  return { setPageNumber, list, pageNumber, setPageSize, pageSize };
};

export default usePagination;
