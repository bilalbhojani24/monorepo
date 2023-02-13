import { useSelector } from 'react-redux';

const useReport = () => {
  const count = useSelector((state) => state.counter.value);

  return { count };
};

export default useReport;
