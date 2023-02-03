import { useState } from 'react';

const useFilter = () => {
  const [isFilterVisible, setFilter] = useState(false);

  return {
    isFilterVisible,
    setFilter
  };
};

export default useFilter;
